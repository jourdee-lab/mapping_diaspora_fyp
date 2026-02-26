import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { MapContainer } from '@/components/MapContainer';
import { TimeSlider } from '@/components/TimeSlider';
import { FilterPanel } from '@/components/FilterPanel';
import { DetailPanel } from '@/components/DetailPanel';
import { StatsOverview } from '@/components/StatsOverview';
import { DataSourcePanel } from '@/components/DataSourcePanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sampleData, availableYears, availableEthnicities, availableBusinessTypes } from '@/data/sampleData';
import { HistoricalRecord } from '@/types/data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
const Index = () => {
  const [selectedYear, setSelectedYear] = useState(2001);
  const [selectedTypes, setSelectedTypes] = useState(new Set(['residence', 'business', 'institution']));
  const [selectedEthnicities, setSelectedEthnicities] = useState(new Set(availableEthnicities));
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState(new Set(availableBusinessTypes));
  const [selectedRecord, setSelectedRecord] = useState<HistoricalRecord | null>(null);
  const filteredData = useMemo(() => {
    return sampleData.filter(record => {
      const yearMatch = record.year <= selectedYear;
      const typeMatch = selectedTypes.has(record.type);
      const ethnicityMatch = !record.ethnicity || selectedEthnicities.has(record.ethnicity);
      const businessMatch = !record.businessType || selectedBusinessTypes.has(record.businessType);
      return yearMatch && typeMatch && ethnicityMatch && businessMatch;
    });
  }, [selectedYear, selectedTypes, selectedEthnicities, selectedBusinessTypes]);
  const toggleType = (type: string) => {
    const newSet = new Set(selectedTypes);
    if (newSet.has(type)) {
      newSet.delete(type);
    } else {
      newSet.add(type);
    }
    setSelectedTypes(newSet);
  };
  const toggleEthnicity = (ethnicity: string) => {
    const newSet = new Set(selectedEthnicities);
    if (newSet.has(ethnicity)) {
      newSet.delete(ethnicity);
    } else {
      newSet.add(ethnicity);
    }
    setSelectedEthnicities(newSet);
  };
  const toggleBusinessType = (businessType: string) => {
    const newSet = new Set(selectedBusinessTypes);
    if (newSet.has(businessType)) {
      newSet.delete(businessType);
    } else {
      newSet.add(businessType);
    }
    setSelectedBusinessTypes(newSet);
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between py-2">
          <p className="text-muted-foreground">Tracing the spatial evolution of Chinese communities across Manchester from traditional enclaves to suburban integration.</p>
          <Link to="/about" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 shrink-0 ml-4">
            Learn more <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <StatsOverview filteredData={filteredData} totalData={sampleData} />
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 space-y-6">
            <FilterPanel selectedTypes={selectedTypes} selectedEthnicities={selectedEthnicities} selectedBusinessTypes={selectedBusinessTypes} onTypeToggle={toggleType} onEthnicityToggle={toggleEthnicity} onBusinessTypeToggle={toggleBusinessType} availableEthnicities={availableEthnicities} availableBusinessTypes={availableBusinessTypes} />
            <DataSourcePanel />
          </div>

          <div className="col-span-6 space-y-6">
            <Card className="p-6">
              <TimeSlider
                value={selectedYear}
                onChange={setSelectedYear}
                min={1981}
                max={2001}
                availableYears={[...availableYears]}
              />
            </Card>
            
            <div className="h-[600px]">
              <MapContainer data={filteredData} onRecordSelect={setSelectedRecord} />
            </div>
          </div>

          <div className="col-span-3">
            <DetailPanel record={selectedRecord} />
          </div>
        </div>
      </div>
    </div>;
};
export default Index;