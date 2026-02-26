import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

import { HistoricalRecord } from '@/types/data';
import { MapLegend } from './MapLegend';
import { MapControls } from './MapControls';

// Fix for default marker icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapContainerProps {
  data: HistoricalRecord[];
  onRecordSelect: (record: HistoricalRecord | null) => void;
}

type TileLayer = 'street' | 'satellite' | 'terrain';

const tileLayers: Record<TileLayer, { url: string; attribution: string }> = {
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri, Maxar, Earthstar Geographics',
  },
  terrain: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '© OpenTopoMap contributors',
  },
};

const getMarkerColor = (type: string): string => {
  switch (type) {
    case 'residence':
      return '#3b82f6'; // data-primary
    case 'business':
      return '#a855f7'; // data-secondary
    case 'institution':
      return '#22c55e'; // data-tertiary
    default:
      return '#6b7280';
  }
};

export const MapContainer = ({ data, onRecordSelect }: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [currentLayer, setCurrentLayer] = useState<TileLayer>('street');

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Manchester
    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([53.4808, -2.2426], 13);

    // Add initial tile layer
    const layer = L.tileLayer(tileLayers.street.url, {
      attribution: tileLayers.street.attribution,
      className: 'map-tiles',
    }).addTo(map);

    tileLayerRef.current = layer;
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers with zoom-dependent styling
    const currentZoom = mapInstanceRef.current.getZoom();
    
    data.forEach(record => {
      // Adjust marker size based on zoom level
      const baseRadius = currentZoom < 12 ? 6 : currentZoom < 14 ? 8 : 10;
      
      const marker = L.circleMarker([record.latitude, record.longitude], {
        radius: baseRadius,
        fillColor: getMarkerColor(record.type),
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
        className: 'marker-transition',
      });

      marker.bindPopup(`
        <div class="p-3 min-w-[200px]">
          <p class="font-semibold text-sm mb-1">${record.address}</p>
          <div class="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>${record.year}</span>
            <span class="capitalize px-2 py-0.5 bg-secondary rounded">${record.type}</span>
          </div>
          <p class="text-xs text-muted-foreground">
            ${record.latitude.toFixed(5)}, ${record.longitude.toFixed(5)}
          </p>
        </div>
      `);

      marker.on('click', () => {
        onRecordSelect(record);
      });

      marker.addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });
    
    // Update marker sizes on zoom
    mapInstanceRef.current.on('zoomend', () => {
      const zoom = mapInstanceRef.current?.getZoom() || 13;
      const newRadius = zoom < 12 ? 6 : zoom < 14 ? 8 : 10;
      markersRef.current.forEach(m => m.setRadius(newRadius));
    });
  }, [data, onRecordSelect]);

  const handleTileLayerChange = (layer: TileLayer) => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    
    tileLayerRef.current.remove();
    
    const newLayer = L.tileLayer(tileLayers[layer].url, {
      attribution: tileLayers[layer].attribution,
      className: 'map-tiles',
    }).addTo(mapInstanceRef.current);
    
    tileLayerRef.current = newLayer;
    setCurrentLayer(layer);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden border border-border shadow-sm" />
      <MapControls onTileLayerChange={handleTileLayerChange} currentLayer={currentLayer} />
      <MapLegend />
    </div>
  );
};
