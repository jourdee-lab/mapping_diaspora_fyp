interface ChoroplethLegendProps {
  title: string;
  unit: 'percentage' | 'count' | 'rate';
  breaks: number[];
  colors: string[];
}

export function ChoroplethLegend({ title, unit, breaks, colors }: ChoroplethLegendProps) {
  const formatValue = (value: number): string => {
    if (unit === 'percentage') {
      if (Number.isInteger(value)) {
        return `${value}%`;
      }
      return `${value.toFixed(1)}%`;
    }
    if (Number.isInteger(value)) {
      return value.toLocaleString();
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-float p-3 md:p-4 max-w-[170px] md:max-w-[220px]">
      <h4 className="font-semibold text-xs text-[#202124] mb-2 md:mb-3 truncate">{title}</h4>
      <div className="space-y-1">
        {colors.map((color, index) => {
          const minValue = breaks[index];
          const maxValue = breaks[index + 1];

          if (maxValue === undefined) return null;

          return (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div
                className="w-5 h-3.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-[#5f6368]">
                {formatValue(minValue)} – {formatValue(maxValue)}
              </span>
            </div>
          );
        })}
        <div className="flex items-center gap-2 text-xs mt-2 pt-2 border-t border-[#e8eaed]">
          <div className="w-5 h-3.5 bg-[#dadce0] rounded-sm flex-shrink-0" />
          <span className="text-[#9aa0a6] italic">No data</span>
        </div>
      </div>
    </div>
  );
}
