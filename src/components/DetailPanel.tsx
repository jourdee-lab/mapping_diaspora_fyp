import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HistoricalRecord } from '@/types/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Building2, Users, Download, FileJson } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DetailPanelProps {
  record: HistoricalRecord | null;
}

export const DetailPanel = ({ record }: DetailPanelProps) => {
  const handleExportJSON = () => {
    if (!record) return;
    
    const dataStr = JSON.stringify(record, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `record-${record.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Record exported",
      description: `Downloaded ${exportFileDefaultName}`,
    });
  };

  if (!record) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm">Record Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Select a point on the map to view detailed information, metadata, and export options.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm">Record #{record.id}</CardTitle>
          <Badge variant="outline" className="capitalize text-xs">
            {record.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-4">
            {/* Location */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</p>
              </div>
              <div className="pl-5 space-y-1">
                <p className="text-sm font-medium">{record.address}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {record.latitude.toFixed(6)}°N, {record.longitude.toFixed(6)}°W
                </p>
              </div>
            </div>

            <Separator />

            {/* Temporal */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Temporal</p>
              </div>
              <div className="pl-5">
                <p className="text-sm font-medium">{record.year}</p>
                <p className="text-xs text-muted-foreground">Census Year</p>
              </div>
            </div>

            {record.ethnicity && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Demographics</p>
                  </div>
                  <div className="pl-5">
                    <p className="text-sm font-medium">{record.ethnicity}</p>
                  </div>
                </div>
              </>
            )}

            {record.businessType && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Economic Activity</p>
                  </div>
                  <div className="pl-5">
                    <p className="text-sm font-medium">{record.businessType}</p>
                  </div>
                </div>
              </>
            )}

            {Object.keys(record.metadata).length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Attributes</p>
                  <div className="space-y-2 pl-0">
                    {Object.entries(record.metadata).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2 text-xs">
                        <span className="text-muted-foreground capitalize font-medium">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-mono">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <div className="pt-4 mt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={handleExportJSON}
          >
            <Download className="w-3 h-3 mr-1.5" />
            Export Record (JSON)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
