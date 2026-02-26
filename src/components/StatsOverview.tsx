import { Card, CardContent } from '@/components/ui/card';
import { HistoricalRecord } from '@/types/data';

interface StatsOverviewProps {
  filteredData: HistoricalRecord[];
  totalData: HistoricalRecord[];
}

export const StatsOverview = ({ filteredData, totalData }: StatsOverviewProps) => {
  const totalPop = filteredData.reduce((s, r) => s + (Number(r.metadata?.totalPopulation) || 0), 0);
  const totalChinese = filteredData.reduce((s, r) => s + (Number(r.metadata?.chinesePopulation) || 0), 0);

  const stats = [
    {
      label: 'Wards Shown',
      value: filteredData.length,
      color: 'text-foreground',
    },
    {
      label: 'Total Population',
      value: totalPop > 0 ? totalPop.toLocaleString() : '—',
      color: 'text-accent',
    },
    {
      label: 'Chinese Population',
      value: totalChinese > 0 ? totalChinese.toLocaleString() : '—',
      color: 'text-data-primary',
    },
    {
      label: 'High Concentration',
      value: filteredData.filter(r => r.ethnicity === 'High Concentration').length,
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
