import { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, Tooltip, ReferenceLine, YAxis } from 'recharts';
import { WardGeoJSON, IndicatorMetadata, WardFeatureProperties } from '@/types/data';

interface IndicatorDistributionChartProps {
  geojsonData: WardGeoJSON | null;
  indicator: IndicatorMetadata;
  selectedFeature: WardFeatureProperties | null;
  hoveredFeature: WardFeatureProperties | null;
}

export function IndicatorDistributionChart({ 
  geojsonData, 
  indicator, 
  selectedFeature, 
  hoveredFeature 
}: IndicatorDistributionChartProps) {
  const activeFeature = hoveredFeature || selectedFeature;
  const activeValue = activeFeature ? activeFeature[indicator.field as keyof WardFeatureProperties] as number : null;

  const data = useMemo(() => {
    if (!geojsonData || !geojsonData.features) return [];
    
    // Extract all valid numbers
    const values = geojsonData.features
      .map(f => f.properties[indicator.field as keyof WardFeatureProperties] as number)
      .filter(v => typeof v === 'number' && !isNaN(v));

    if (values.length === 0) return [];

    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Create 20 bins
    const binCount = 20;
    const binSize = (max - min) / binCount;
    
    const bins = Array.from({ length: binCount }, (_, i) => ({
      binStart: min + i * binSize,
      binEnd: min + (i + 1) * binSize,
      count: 0,
      id: i
    }));

    // Assign values to bins
    values.forEach(val => {
      let binIndex = Math.floor((val - min) / binSize);
      if (binIndex >= binCount) binIndex = binCount - 1;
      if (binIndex >= 0) {
        bins[binIndex].count += 1;
      }
    });

    return bins;
  }, [geojsonData, indicator.field]);

  if (!data.length) return null;

  // Find which bin the active feature belongs to
  let activeBinIndex = -1;
  if (activeValue !== null) {
    const min = data[0].binStart;
    const max = data[data.length - 1].binEnd;
    const binSize = (max - min) / data.length;
    activeBinIndex = Math.floor((activeValue - min) / binSize);
    if (activeBinIndex >= data.length) activeBinIndex = data.length - 1;
  }

  const formatValue = (val: number) => {
    if (indicator.unit === 'percentage') return `${val.toFixed(1)}%`;
    if (val > 1000) return `${(val / 1000).toFixed(1)}k`;
    return Math.round(val).toString();
  };

  return (
    <div className="w-full h-32 mt-6 relative">
      <div className="flex justify-between text-[11px] font-medium text-muted-foreground mb-2 px-1">
        <span>{formatValue(data[0].binStart)}</span>
        <span>{formatValue(data[data.length - 1].binEnd)}</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barCategoryGap={1}>
          <Tooltip 
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-popover text-popover-foreground text-xs rounded shadow-md p-2 border border-border">
                    <p className="font-semibold">{formatValue(data.binStart)} - {formatValue(data.binEnd)}</p>
                    <p className="text-muted-foreground">{data.count} wards</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[3, 3, 0, 0]} isAnimationActive={false} minPointSize={2}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === activeBinIndex ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.3)'} 
                className="transition-colors duration-200"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
