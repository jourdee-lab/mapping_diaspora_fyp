import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface TimeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  availableYears: number[];
}

export const TimeSlider = ({ value, onChange, availableYears }: TimeSliderProps) => {
  // Work with indices so the slider produces exactly N stops, one per decade
  const currentIndex = Math.max(0, availableYears.indexOf(value));

  const handleSliderChange = ([index]: number[]) => {
    const year = availableYears[index];
    if (year !== undefined) onChange(year);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-foreground">Temporal Range</Label>
        <span className="text-3xl font-semibold text-accent">{value}</span>
      </div>
      <Slider
        value={[currentIndex]}
        onValueChange={handleSliderChange}
        min={0}
        max={availableYears.length - 1}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground font-medium">
        <span>{availableYears[0]}</span>
        <span>{availableYears[availableYears.length - 1]}</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {availableYears.map(year => (
          <button
            key={year}
            onClick={() => onChange(year)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
              year === value
                ? 'bg-accent text-accent-foreground shadow-md scale-105'
                : 'bg-muted text-muted-foreground hover:bg-muted/70 hover:scale-105'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};
