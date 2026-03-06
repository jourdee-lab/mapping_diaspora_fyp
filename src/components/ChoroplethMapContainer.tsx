import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { X } from 'lucide-react';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { WardGeoJSON, WardFeatureProperties, IndicatorMetadata } from '@/types/data';
import { ChoroplethLegend } from '@/components/ChoroplethLegend';
import { Button } from './ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent } from './ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChoroplethMapContainerProps {
  year: 1981 | 1991 | 2001;
  indicator: IndicatorMetadata;
  onIndicatorChange?: (indicator: IndicatorMetadata) => void;
  availableIndicators?: IndicatorMetadata[];
}

type TileLayer = 'street' | 'satellite' | 'light' | 'dark';

const tileLayers: Record<TileLayer, { url: string; attribution: string }> = {
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri, Maxar, Earthstar Geographics',
  },
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap © CARTO',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap © CARTO',
  },
};

/**
 * Calculate color breaks using specified classification method
 */
function calculateBreaks(
  values: number[],
  steps: number,
  method: 'quantile' | 'equalInterval' | 'naturalBreaks' | 'customPercentage'
): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  if (method === 'customPercentage') {
    // Custom breaks optimized for percentage data (0-100 range)
    // Provides clear, interpretable breaks
    if (max <= 10) {
      return [0, 1, 2, 3, 5, 7, 10];
    } else if (max <= 25) {
      return [0, 2, 5, 10, 15, 20, 25];
    } else if (max <= 50) {
      return [0, 5, 10, 15, 25, 35, 50];
    } else {
      return [0, 10, 20, 30, 50, 70, 90, 100];
    }
  }

  if (method === 'equalInterval') {
    const interval = (max - min) / steps;
    return Array.from({ length: steps + 1 }, (_, i) => min + i * interval);
  }

  if (method === 'quantile') {
    const breaks = [min];
    for (let i = 1; i < steps; i++) {
      const index = Math.floor((i / steps) * sorted.length);
      breaks.push(sorted[index]);
    }
    breaks.push(max);
    return breaks;
  }

  // Simple natural breaks (Jenks-like approximation)
  const interval = (max - min) / steps;
  return Array.from({ length: steps + 1 }, (_, i) => min + i * interval);
}

/**
 * Get color from value using breaks and palette
 */
function getColor(value: number | undefined, breaks: number[], palette: string[]): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '#cccccc'; // Gray for missing data
  }

  for (let i = 0; i < breaks.length - 1; i++) {
    if (value >= breaks[i] && value < breaks[i + 1]) {
      return palette[i];
    }
  }

  return palette[palette.length - 1];
}

/**
 * ColorBrewer color palettes for better perceptual uniformity
 * https://colorbrewer2.org/
 */
const colorPalettes = {
  // Sequential schemes (single-hue)
  sequential_blue: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c'],
  sequential_red: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d'],
  sequential_green: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32'],
  sequential_purple: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486'],
  
  // Multi-hue sequential (better for visual discrimination)
  sequential_yellow_green_blue: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'],
  sequential_yellow_orange_red: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'],
  
  // Diverging scheme (for data with meaningful midpoint)
  diverging_red_blue: ['#d73027', '#f46d43', '#fdae61', '#fee090', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4'],
  diverging_brown_teal: ['#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#c7eae5', '#80cdc1', '#35978f', '#01665e'],
};

// ---------------------------------------------------------------------------
// Ward Shape SVG — renders the ward's polygon in a normalised 100×100 viewBox
// ---------------------------------------------------------------------------
function WardShapeSVG({ geometry, fillColor }: { geometry: Geometry; fillColor: string }) {
  const rings: number[][][] = [];
  if (geometry.type === 'Polygon') {
    (geometry.coordinates as number[][][]).forEach(r => rings.push(r));
  } else if (geometry.type === 'MultiPolygon') {
    (geometry.coordinates as number[][][][]).forEach(poly => poly.forEach(r => rings.push(r)));
  }
  if (rings.length === 0) return null;

  const flat = rings.flat();
  const lngs = flat.map(c => c[0]);
  const lats = flat.map(c => c[1]);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const range = Math.max(maxLng - minLng, maxLat - minLat) || 1;
  const pad = range * 0.06;

  // Project to 0-100 square, Y flipped (SVG y=0 is top, lat increases upward)
  const px = (lng: number) => ((lng - minLng + pad) / (range + 2 * pad)) * 100;
  const py = (lat: number) => 100 - ((lat - minLat + pad) / (range + 2 * pad)) * 100;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
      {rings.map((ring, i) => (
        <polygon
          key={i}
          points={ring.map(([lng, lat]) => `${px(lng)},${py(lat)}`).join(' ')}
          fill={fillColor}
          fillOpacity={0.8}
          stroke="white"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function ChoroplethMapContainer({
  year,
  indicator,
  onIndicatorChange,
  availableIndicators = [],
}: ChoroplethMapContainerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const isMobile = useIsMobile();

  // Initialise from localStorage synchronously to avoid flash
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    const isDark = stored === 'dark';
    if (isDark) document.documentElement.classList.add('dark');
    return isDark;
  });
  // Ref mirror so event handlers always read the current theme without stale closures
  const darkRef = useRef(dark);
  useEffect(() => { darkRef.current = dark; }, [dark]);

  const [currentTileLayer, setCurrentTileLayer] = useState<TileLayer>(() =>
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );
  const [geojsonData, setGeojsonData] = useState<WardGeoJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<WardFeatureProperties | null>(null);
  const [selectedGeometry, setSelectedGeometry] = useState<Geometry | null>(null);

  // Load GeoJSON data
  // Note: For optimal rendering performance and clean boundaries:
  // - GeoJSON geometry should be pre-simplified using tools like mapshaper or QGIS
  // - Topology should be validated to eliminate gaps/overlaps (use QGIS topology checker)
  // - Recommended simplification tolerance: ~10-20m for ED-level data at Manchester scale
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `/geojson/manchester_wards_${year}.geojson`;
        console.log(`[Data Load] Fetching: ${url}`);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`[Data Load] ✓ Loaded ${data.features?.length || 0} features for ${year}`);
        setGeojsonData(data);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load census data';
        console.error('[Data Load] ✗ Error:', errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [year]);

  // Calculate color breaks
  const { breaks, palette } = useMemo(() => {
    if (!geojsonData) {
      return { breaks: [], palette: colorPalettes.sequential_blue };
    }

    const values = geojsonData.features
      .map((f) => {
        const val = f.properties[indicator.field as keyof typeof f.properties];
        return typeof val === 'number' ? val : NaN;
      })
      .filter((v) => v !== undefined && v !== null && !isNaN(v));

    if (values.length === 0) {
      return { breaks: [0, 1], palette: colorPalettes.sequential_blue };
    }

    // Use custom breaks for percentage indicators for cleaner legend
    const breakMethod = indicator.unit === 'percentage' ? 'customPercentage' : 'quantile';
    const calculatedBreaks = calculateBreaks(values, 7, breakMethod);
    
    // Select palette based on indicator category and scheme
    let selectedPalette;
    if (indicator.colorScheme === 'diverging') {
      selectedPalette = colorPalettes.diverging_red_blue;
    } else if (indicator.category === 'ethnicity') {
      selectedPalette = colorPalettes.sequential_yellow_orange_red;
    } else if (indicator.category === 'housing') {
      selectedPalette = colorPalettes.sequential_yellow_green_blue;
    } else if (indicator.category === 'employment') {
      selectedPalette = colorPalettes.sequential_purple;
    } else {
      selectedPalette = colorPalettes.sequential_blue;
    }

    return { breaks: calculatedBreaks, palette: selectedPalette };
  }, [geojsonData, indicator]);

  // Initialize map (only once)
  useEffect(() => {
    if (!containerRef.current) {
      console.log('[Map Init] ✗ Container ref not ready');
      return;
    }
    
    if (mapRef.current) {
      console.log('[Map Init] → Map already initialized, skipping');
      return;
    }

    console.log('[Map Init] → Initializing Leaflet map...');
    try {
      const map = L.map(containerRef.current, {
        center: [53.4808, -2.2426], // Manchester city center
        zoom: 12,
        zoomControl: false,
        preferCanvas: true,  // Canvas renderer eliminates anti-aliasing seam gaps between adjacent polygons
      });

      const tileLayer = L.tileLayer(tileLayers[currentTileLayer].url, {
        attribution: tileLayers[currentTileLayer].attribution,
        maxZoom: 18,
      });

      tileLayer.addTo(map);
      console.log('[Map Init] ✓ Tile layer added');

      mapRef.current = map;
      tileLayerRef.current = tileLayer;

      // Force map to redraw
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          console.log('[Map Init] ✓ Map size invalidated');
        }
      }, 100);
    } catch (err) {
      console.error('[Map Init] ✗ Error:', err);
    }

    // Track container size changes (orientation change, virtual keyboard, window resize)
    const resizeObserver = new ResizeObserver(() => {
      mapRef.current?.invalidateSize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Sync tile layer and dark state when Header dispatches a theme change
    const onThemeChange = (e: Event) => {
      const isDark = (e as CustomEvent<{ dark: boolean }>).detail.dark;
      setDark(isDark);
      setCurrentTileLayer(prev =>
        prev === 'light' || prev === 'dark' ? (isDark ? 'dark' : 'light') : prev
      );
    };
    window.addEventListener('themechange', onThemeChange);

    // Cleanup only on unmount
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('themechange', onThemeChange);
      console.log('[Map Init] → Component unmounting, cleaning up map');
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        tileLayerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once (tile layer updates handled by separate effect)

  // Update tile layer
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;

    tileLayerRef.current.remove();
    const newTileLayer = L.tileLayer(tileLayers[currentTileLayer].url, {
      attribution: tileLayers[currentTileLayer].attribution,
      maxZoom: 18,
    });
    newTileLayer.addTo(mapRef.current);
    tileLayerRef.current = newTileLayer;
  }, [currentTileLayer]);

  // Render choropleth layer
  useEffect(() => {
    if (!mapRef.current) {
      console.log('[Choropleth] ✗ Map not ready');
      return;
    }
    
    if (!geojsonData || !geojsonData.features) {
      console.log('[Choropleth] ✗ GeoJSON data not loaded yet');
      return;
    }
    
    if (breaks.length === 0) {
      console.log('[Choropleth] ✗ No breaks calculated');
      return;
    }
    
    console.log(`[Choropleth] → Rendering ${geojsonData.features.length} features...`);

    // Remove existing layer
    if (geoJsonLayerRef.current) {
      try {
        mapRef.current.removeLayer(geoJsonLayerRef.current);
        console.log('[Choropleth] → Removed old layer');
      } catch (e) {
        console.log('[Choropleth] → No old layer to remove');
      }
    }

    try {
      // Style function — in dark mode, border matches fill to hide anti-aliasing seams
      const isDark = darkRef.current;
      const style = (feature?: Feature) => {
        const value = feature.properties[indicator.field];
        const fill = getColor(value, breaks, palette);
        return {
          fillColor: fill,
          weight: isDark ? 1 : 0.5,
          opacity: isDark ? 1 : 0.22,
          color: isDark ? fill : '#ffffff',  // Match fill in dark mode to hide seams
          fillOpacity: 0.65,
        };
      };

    // Create tooltip content
    const onEachFeature = (feature: Feature, layer: L.Layer) => {
      const props = feature.properties;
      const value = props[indicator.field];
      const displayValue =
        value !== undefined && value !== null
          ? indicator.unit === 'percentage'
            ? `${value.toFixed(1)}%`
            : value.toLocaleString()
          : 'No data';

      const tooltipContent = `
        <div style="padding:8px 10px;min-width:140px;">
          <div style="font-weight:600;font-size:13px;color:#202124;margin-bottom:4px;">${props.ward_name || props.ward_code || 'Unknown'}</div>
          <div style="font-size:12px;color:#5f6368;">${indicator.label}</div>
          <div style="font-size:14px;font-weight:700;color:#202124;margin-top:2px;">${displayValue}</div>
        </div>
      `;

      layer.bindTooltip(tooltipContent, {
        sticky: true,
        className: 'custom-tooltip',
      });

      // Click handler
      layer.on({
        click: () => {
          setSelectedFeature(props as WardFeatureProperties);
          setSelectedGeometry(feature.geometry);
        },
        mouseover: (e: L.LeafletMouseEvent) => {
          const target = e.target;
          target.setStyle({
            weight: 2,
            color: darkRef.current ? '#ffffff' : '#000000',
            opacity: 0.8,
            fillOpacity: 0.80,
          });
        },
        mouseout: (e: L.LeafletMouseEvent) => {
          geoJsonLayerRef.current?.resetStyle(e.target);
        },
      });
    };

    // Add GeoJSON layer
    const geoJsonLayer = L.geoJSON(geojsonData as FeatureCollection, {
      style,
      onEachFeature,
    });

    geoJsonLayer.addTo(mapRef.current);
    geoJsonLayerRef.current = geoJsonLayer;
    console.log('[Choropleth] ✓ GeoJSON layer added');

    // Fit bounds to data
    const bounds = geoJsonLayer.getBounds();
    mapRef.current.fitBounds(bounds);
    console.log('[Choropleth] ✓ Bounds fitted');
    } catch (err) {
      console.error('[Choropleth] ✗ Error rendering:', err);
    }
  }, [geojsonData, indicator.field, indicator.label, indicator.unit, breaks, palette]);

  // Lightweight effect: restyle borders on theme toggle (no rebuild, no fitBounds reset)
  useEffect(() => {
    if (!geoJsonLayerRef.current) return;
    geoJsonLayerRef.current.eachLayer((layer: L.Layer) => {
      const pathLayer = layer as L.Path & { feature?: Feature };
      if (pathLayer.feature && pathLayer.setStyle) {
        const value = pathLayer.feature.properties?.[indicator.field];
        const fill = getColor(value, breaks, palette);
        pathLayer.setStyle({
          color: dark ? fill : '#ffffff',
          opacity: dark ? 1 : 0.22,
          weight: dark ? 1 : 0.5,
        });
      }
    });
  }, [dark, indicator.field, breaks, palette]);

  return (
    <div className="relative w-full h-full bg-[#e8eaed]">
      {/* Map Container - full screen */}
      <div 
        ref={containerRef} 
        className="absolute inset-0" 
        style={{ background: '#aad3df' }}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-[2000]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-border border-t-primary mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading census data for {year}...</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-[2000]">
          <div className="text-center p-4">
            <p className="font-semibold text-destructive mb-2">Error Loading Data</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {/* No Data Overlay */}
      {!loading && !error && !geojsonData && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-[2000]">
          <p className="text-sm text-muted-foreground">No data available for {year}</p>
        </div>
      )}

      {/* Map controls column – reset view only (dark mode moved to Header) */}
      <div className="absolute top-40 right-2 md:right-4 z-[1000] flex flex-col gap-2" onWheel={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        {/* Reset view */}
        <button
          onClick={() => {
            if (mapRef.current && geoJsonLayerRef.current) {
              mapRef.current.fitBounds(geoJsonLayerRef.current.getBounds());
            }
          }}
          title="Reset map view"
          className="bg-card/90 backdrop-blur-xl rounded-full shadow-float w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Reset map to Manchester"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>
      </div>

      {/* Indicator Selector - Floating pill top right */}
      {availableIndicators.length > 0 && onIndicatorChange && (
        <div className="absolute top-24 right-2 md:right-4 z-[1000]" onWheel={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
          <div className="bg-card rounded-full p-1 shadow-float overflow-hidden">
            <Select
              value={indicator.id}
              onValueChange={(id) => {
                const selected = availableIndicators.find((i) => i.id === id);
                if (selected) onIndicatorChange(selected);
              }}
            >
              <SelectTrigger className="h-auto px-4 md:px-5 py-2 md:py-2.5 border-0 bg-transparent shadow-none rounded-full text-sm font-medium text-foreground focus:ring-0 hover:bg-muted/50 transition-colors w-auto max-w-[10rem] md:max-w-[14rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-2xl shadow-float border-border/50 w-56 md:w-64 backdrop-blur-xl bg-popover/95">
                {(() => {
                  const grouped = availableIndicators.reduce<Record<string, typeof availableIndicators>>((acc, ind) => {
                    (acc[ind.category] ??= []).push(ind);
                    return acc;
                  }, {});
                  const categoryLabels: Record<string, string> = {
                    demographic: 'Population',
                    ethnicity: 'Ethnicity & Origin',
                    housing: 'Housing & Tenure',
                    employment: 'Employment',
                  };
                  return Object.entries(grouped).map(([cat, items]) => (
                    <SelectGroup key={cat}>
                      <SelectLabel className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-semibold px-3 pt-2.5 pb-1">
                        {categoryLabels[cat] ?? cat}
                      </SelectLabel>
                      {items.map((ind) => (
                        <SelectItem
                          key={ind.id}
                          value={ind.id}
                          className="rounded-lg text-sm cursor-pointer py-2"
                        >
                          {ind.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ));
                })()}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Legend - Floating bottom right */}
      {breaks.length > 0 && (
        <div className="absolute bottom-4 md:bottom-6 right-2 md:right-5 z-[1000]" onWheel={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
          <ChoroplethLegend
            title={indicator.label}
            unit={indicator.unit}
            breaks={breaks}
            colors={palette}
          />
        </div>
      )}

      {/* Mobile indicator info strip – bottom left, visible when no feature is selected */}
      {!selectedFeature && (
        <div className="md:hidden absolute bottom-4 left-2 z-[1000] bg-card/90 backdrop-blur-xl rounded-2xl shadow-float p-3 max-w-[160px]" onWheel={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
          <p className="text-xs font-semibold text-foreground leading-snug">{indicator.label}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-snug line-clamp-2">{indicator.description}</p>
        </div>
      )}

      {/* Detail Panel – bottom Sheet on mobile, floating panel on desktop */}
      {isMobile ? (
        <Sheet open={!!selectedFeature} onOpenChange={(open) => { if (!open) { setSelectedFeature(null); setSelectedGeometry(null); } }}>
          <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-8 pt-5 z-[2000]">
            {selectedFeature && (() => {
              const val = selectedFeature[indicator.field as keyof typeof selectedFeature] as number | null | undefined;
              const displayVal = typeof val === 'number'
                ? indicator.unit === 'percentage' ? `${val.toFixed(1)}%` : val.toLocaleString()
                : 'No data';
              const wardColor = getColor(typeof val === 'number' ? val : undefined, breaks, palette);
              return (
                <div className="flex gap-4 items-start">
                  {selectedGeometry && (
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-muted">
                      <WardShapeSVG geometry={selectedGeometry} fillColor={wardColor} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground mb-0.5">{selectedFeature.ward_name || selectedFeature.ward_code}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{indicator.label}</p>
                    <p className="text-2xl font-bold text-foreground">{displayVal}</p>
                  </div>
                </div>
              );
            })()}
          </SheetContent>
        </Sheet>
      ) : (
        selectedFeature && (() => {
          const val = selectedFeature[indicator.field as keyof typeof selectedFeature] as number | null | undefined;
          const displayVal = typeof val === 'number'
            ? indicator.unit === 'percentage' ? `${val.toFixed(1)}%` : val.toLocaleString()
            : 'No data';
          const wardColor = getColor(typeof val === 'number' ? val : undefined, breaks, palette);
          return (
            <div className="absolute bottom-6 left-5 z-[1000] bg-card/90 backdrop-blur-xl rounded-3xl shadow-float p-4 w-64" onWheel={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-3 items-start">
                {selectedGeometry && (
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-muted">
                    <WardShapeSVG geometry={selectedGeometry} fillColor={wardColor} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-xs text-muted-foreground leading-snug">{indicator.label}</p>
                    <Button variant="ghost" size="sm" className="rounded-full h-6 w-6 p-0 -mt-0.5 -mr-1 text-muted-foreground hover:bg-muted" onClick={() => { setSelectedFeature(null); setSelectedGeometry(null); }}>
                      <X size={12} />
                    </Button>
                  </div>
                  <p className="font-semibold text-sm text-foreground mt-0.5 truncate">{selectedFeature.ward_name || selectedFeature.ward_code}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{displayVal}</p>
                </div>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
