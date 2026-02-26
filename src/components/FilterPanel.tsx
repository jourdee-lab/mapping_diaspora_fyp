import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface FilterPanelProps {
  selectedTypes: Set<string>;
  selectedEthnicities: Set<string>;
  selectedBusinessTypes: Set<string>;
  onTypeToggle: (type: string) => void;
  onEthnicityToggle: (ethnicity: string) => void;
  onBusinessTypeToggle: (businessType: string) => void;
  availableEthnicities: string[];
  availableBusinessTypes: string[];
}

const recordTypes = [
  { id: 'institution', label: 'Top-5 Chinese wards', color: 'data-primary' },
  { id: 'business', label: 'Mid-concentration wards', color: 'data-secondary' },
  { id: 'residence', label: 'Low-concentration wards', color: 'data-tertiary' },
];

export const FilterPanel = ({
  selectedTypes,
  selectedEthnicities,
  selectedBusinessTypes,
  onTypeToggle,
  onEthnicityToggle,
  onBusinessTypeToggle,
  availableEthnicities,
  availableBusinessTypes,
}: FilterPanelProps) => {
  return (
    <Card className="p-8">
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="space-y-8 pr-4">
          <div>
            <Label className="text-sm font-semibold mb-4 block text-foreground">Record Types</Label>
            <div className="space-y-4">
              {recordTypes.map(type => (
                <div key={type.id} className="flex items-center space-x-3 group">
                  <Checkbox
                    id={type.id}
                    checked={selectedTypes.has(type.id)}
                    onCheckedChange={() => onTypeToggle(type.id)}
                  />
                  <label
                    htmlFor={type.id}
                    className="text-sm leading-none cursor-pointer flex items-center gap-2.5 transition-all duration-200 group-hover:text-foreground"
                  >
                    <span
                      className="w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: `hsl(var(--${type.color}))` }}
                    />
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-semibold mb-4 block text-foreground">Chinese Concentration</Label>
            <div className="space-y-4">
              {availableEthnicities.map(ethnicity => (
                <div key={ethnicity} className="flex items-center space-x-3 group">
                  <Checkbox
                    id={`ethnicity-${ethnicity}`}
                    checked={selectedEthnicities.has(ethnicity)}
                    onCheckedChange={() => onEthnicityToggle(ethnicity)}
                  />
                  <label
                    htmlFor={`ethnicity-${ethnicity}`}
                    className="text-sm leading-none cursor-pointer transition-all duration-200 group-hover:text-foreground"
                  >
                    {ethnicity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-semibold mb-4 block text-foreground">Business Type</Label>
            <div className="space-y-4">
              {availableBusinessTypes.map(businessType => (
                <div key={businessType} className="flex items-center space-x-3 group">
                  <Checkbox
                    id={`business-${businessType}`}
                    checked={selectedBusinessTypes.has(businessType)}
                    onCheckedChange={() => onBusinessTypeToggle(businessType)}
                  />
                  <label
                    htmlFor={`business-${businessType}`}
                    className="text-sm leading-none cursor-pointer transition-all duration-200 group-hover:text-foreground"
                  >
                    {businessType}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};
