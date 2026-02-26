import { Card } from '@/components/ui/card';
import { Circle } from 'lucide-react';

export const MapLegend = () => {
  const legendItems = [
    { label: 'Residence', color: 'hsl(var(--data-primary))', type: 'residence' },
    { label: 'Business', color: 'hsl(var(--data-secondary))', type: 'business' },
    { label: 'Institution', color: 'hsl(var(--data-tertiary))', type: 'institution' },
  ];

  return (
    <Card className="absolute bottom-6 left-6 z-[1000] bg-background/95 backdrop-blur border-border shadow-lg">
      <div className="p-4 space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Map Legend
        </h3>
        <div className="space-y-2">
          {legendItems.map((item) => (
            <div key={item.type} className="flex items-center gap-2.5">
              <Circle
                className="w-3 h-3 flex-shrink-0"
                fill={item.color}
                stroke="#ffffff"
                strokeWidth={1.5}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
