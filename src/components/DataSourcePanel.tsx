import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Database, Calendar, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const DataSourcePanel = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          <CardTitle className="text-sm">Dataset Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Database className="w-3.5 h-3.5 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-medium">Primary Source</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                UK Census Small Area Statistics (1981, 1991, 2001) — UK Data Service
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-2">
            <Calendar className="w-3.5 h-3.5 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-medium">Temporal Coverage</p>
              <p className="text-xs text-muted-foreground">1981 · 1991 · 2001 (ward-level, harmonised)</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-medium">Spatial Level</p>
              <p className="text-xs text-muted-foreground">
                33 wards (2001 boundaries). 1981 & 1991 EDs interpolated to 2001 wards.
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-xs font-medium">Version & Status</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">v10.0</Badge>
            <Badge variant="outline" className="text-xs">Phase 10</Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Harmonised indicators: population, ethnicity (Chinese), housing, employment.
            Geometry simplified for web performance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
