import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Database, Code2, Map, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Methodology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Methodology & Data</h1>
        
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Data Pipeline</h2>
          </div>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              The project uses a reproducable, automated data pipeline built with Python to handle the entire workflow from data collection to geospatial analysis
            </p>
            <div className="bg-muted/30 p-6 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[120px]">Collection:</span>
                <span>Extraction of historical records from digitized census ED-Level data</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[120px]">Cleaning:</span>
                <span>Standardization of addresses, names, and categorical data using Pandas for consistent analysis</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[120px]">Geocoding:</span>
                <span>Conversion of historical addresses to precise latitude/longitude coordinates using QGIS</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[120px]">Storage:</span>
                <span>All ED-Level processed data is stored locally, with plans for a cloud-based storage solution in the future</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Technology Stack</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">Frontend & Visualisation</h3>
              <ul className="space-y-2 text-foreground/90">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span><strong>React:</strong> User interface framework</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span><strong>Typescript:</strong> Type-safe development</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span><strong>Leaflet.js:</strong> Interactive mapping</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span><strong>Tailwind CSS:</strong> Responsive styling</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">Mapping & Data Processing</h3>
              <ul className="space-y-2 text-foreground/90">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span><strong>QGIS:</strong> Geospatial data processing and visualization</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span><strong>Python:</strong> Data processing & automation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span><strong>Pandas:</strong> Data manipulation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span><strong>VSCode:</strong> Development environment</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Downloadable Resources</h2>
          </div>
          <p className="text-foreground/90 mb-6 leading-relaxed">
            In the spirit of open research and reproducibility, access to the automated scripts is provided. However all data will be available on the UK Statistic Office website. These resources would enable other researchers to validate the findings, build upon the methodology for this project, and apply similar approaches to different geographic or temporal contexts.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://statistics.ukdataservice.ac.uk/dataset/" target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="gap-2">
                <Download className="w-4 h-4" />
                Download Dataset (CSV)
              </Button>
            </a>
            <a href="https://github.com/jourdee-lab/manchester-spatial-analysis-data-lab" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Code2 className="w-4 h-4" />
                View Source Code
              </Button>
            </a>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Methodology;
