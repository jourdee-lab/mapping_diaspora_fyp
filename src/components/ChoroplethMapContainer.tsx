import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import type { Feature, FeatureCollection } from 'geojson';
import { WardGeoJSON, WardFeatureProperties, IndicatorMetadata } from '@/types/data';
import { ChoroplethLegend } from '@/components/ChoroplethLegend';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ChoroplethMapContainerProps {
  year: 1981 | 1991 | 2001;
  indicator: IndicatorMetadata;
  onIndicatorChange?: (indicator: IndicatorMetadata) => void;
  availableIndicators?: IndicatorMetadata[];
}

type TileLayer = 'street' | 'satellite' | 'light';

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

  const [currentTileLayer, setCurrentTileLayer] = useState<TileLayer>('light');
  const [geojsonData, setGeojsonData] = useState<WardGeoJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<WardFeatureProperties | null>(null);

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

    // Cleanup only on unmount
    return () => {
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
      // Style function with improved boundary visualization
      const style = (feature?: Feature) => {
        const value = feature.properties[indicator.field];
        return {
          fillColor: getColor(value, breaks, palette),
          weight: 0.5,           // Thin boundaries
          opacity: 0.22,         // subtle boundaries
          color: '#ffffff',      // White separator lines
          fillOpacity: 0.65,     // Middleground: choropleth visible, base map partially showing
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
        <div class="p-2">
          <div class="font-semibold">${props.ward_name || props.ward_code || 'Unknown Ward'}</div>
          <div class="text-sm mt-1">
            <span class="text-gray-600">${indicator.label}:</span>
            <span class="ml-1 font-medium">${displayValue}</span>
          </div>
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
        },
        mouseover: (e: L.LeafletMouseEvent) => {
          const target = e.target;
          target.setStyle({
            weight: 2,
            color: '#000000',
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
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-[2000]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#e8eaed] border-t-[#1a73e8] mx-auto mb-4"></div>
            <p className="text-sm text-[#5f6368]">Loading census data for {year}...</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-[2000]">
          <div className="text-center p-4">
            <p className="font-semibold text-[#d93025] mb-2">Error Loading Data</p>
            <p className="text-sm text-[#5f6368]">{error}</p>
          </div>
        </div>
      )}

      {/* No Data Overlay */}
      {!loading && !error && !geojsonData && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-[2000]">
          <p className="text-sm text-[#5f6368]">No data available for {year}</p>
        </div>
      )}

      {/* Indicator Selector - Floating pill top right */}
      {availableIndicators.length > 0 && onIndicatorChange && (
        <div className="absolute top-24 right-2 md:right-4 z-[1000]">
          <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-float px-3 md:px-4 py-2 md:py-2.5">
            <Select
              value={indicator.id}
              onValueChange={(id) => {
                const selected = availableIndicators.find((i) => i.id === id);
                if (selected) onIndicatorChange(selected);
              }}
            >
              <SelectTrigger className="w-32 md:w-44 h-8 border-0 bg-transparent shadow-none rounded-full text-xs md:text-sm font-medium text-[#202124] focus:ring-0 hover:bg-[#f1f3f4]/50 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-2xl shadow-float border-[#e8eaed] w-44">
                {availableIndicators.map((ind) => (
                  <SelectItem 
                    key={ind.id} 
                    value={ind.id}
                    className="rounded-xl text-sm cursor-pointer"
                  >
                    {ind.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Legend - Floating bottom right */}
      {breaks.length > 0 && (
        <div className="absolute bottom-4 md:bottom-6 right-2 md:right-5 z-[1000]">
          <ChoroplethLegend
            title={indicator.label}
            unit={indicator.unit}
            breaks={breaks}
            colors={palette}
          />
        </div>
      )}

      {/* Detail Panel - left side on mobile (avoids legend), bottom-left on desktop */}
      {selectedFeature && (
        <div className="absolute bottom-4 md:bottom-6 left-2 right-[186px] md:left-5 md:right-auto z-[1000] bg-white/90 backdrop-blur-xl rounded-3xl shadow-float p-4 md:p-5 md:max-w-xs">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-sm text-[#202124] mb-0.5">{indicator.label}</h3>
              <p className="text-xs text-[#5f6368]">{selectedFeature.ward_name || selectedFeature.ward_code}</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full h-7 w-7 p-0 text-[#5f6368] hover:bg-[#f1f3f4]" onClick={() => setSelectedFeature(null)}>
              ×
            </Button>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#5f6368]">Value</span>
              <span className="font-semibold text-[#202124]">
                {(() => {
                  const val = selectedFeature[indicator.field as keyof typeof selectedFeature] as number | string | null | undefined;
                  if (typeof val === 'number') {
                    return indicator.unit === 'percentage'
                      ? `${(val as number).toFixed(1)}%`
                      : (val as number).toLocaleString();
                  }
                  return 'No data';
                })()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
