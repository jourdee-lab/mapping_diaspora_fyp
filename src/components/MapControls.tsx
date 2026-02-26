import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, Map as MapIcon, Satellite } from 'lucide-react';

interface MapControlsProps {
  onTileLayerChange: (layer: 'street' | 'satellite' | 'terrain') => void;
  currentLayer: 'street' | 'satellite' | 'terrain';
}

export const MapControls = ({ onTileLayerChange, currentLayer }: MapControlsProps) => {
  return (
    <Card className="absolute top-6 left-6 z-[1000] bg-background/95 backdrop-blur border-border shadow-lg">
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Layers className="w-3.5 h-3.5 text-muted-foreground" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Base Map
          </h3>
        </div>
        <Tabs value={currentLayer} onValueChange={(v) => onTileLayerChange(v as any)}>
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="street" className="text-xs h-7 px-2">
              <MapIcon className="w-3 h-3 mr-1" />
              Street
            </TabsTrigger>
            <TabsTrigger value="satellite" className="text-xs h-7 px-2">
              <Satellite className="w-3 h-3 mr-1" />
              Aerial
            </TabsTrigger>
            <TabsTrigger value="terrain" className="text-xs h-7 px-2">
              <Layers className="w-3 h-3 mr-1" />
              Terrain
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Card>
  );
};
