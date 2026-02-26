import { Card, CardContent } from '@/components/ui/card';
import { HistoricalRecord } from '@/types/data';

interface StatsOverviewProps {
  filteredData: HistoricalRecord[];
  totalData: HistoricalRecord[];
}

export const StatsOverview = ({ filteredData, totalData }: StatsOverviewProps) => {
  const stats = [
    {
      label: 'Total Records',
      value: totalData.length,
      color: 'text-foreground',
    },
    {
      label: 'Filtered',
      value: filteredData.length,
      color: 'text-accent',
    },
    {
      label: 'Residences',
      value: filteredData.filter(r => r.type === 'residence').length,
      color: 'text-data-primary',
    },
    {
      label: 'Businesses',
      value: filteredData.filter(r => r.type === 'business').length,
      color: 'text-data-secondary',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
          <CardContent className="pt-8 pb-6">
            <div className="text-center space-y-2">
              <p className={`text-4xl font-semibold ${stat.color} transition-transform duration-200 group-hover:scale-105`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
