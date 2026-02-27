import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Database, Code2, Map, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Methodology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Methodology & Data</h1>

        {/* Research Overview */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Research Overview</h2>
          </div>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              This project analyses the spatial distribution and socioeconomic integration of Chinese immigrant communities
              in Greater Manchester across three census years <strong>1981, 1991, and 2001</strong>. By combining
              historical Small Area Statistics (SAS) with digitised boundary data, the project maps how patterns of
              settlement, housing tenure, employment, and economic position shifted over two decades.
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-semibold text-primary mb-1">Geographic Units</p>
                <p className="text-sm">Enumeration Districts (1981, 1991), Output Areas (2001), and harmonised Ward boundaries across all three years</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-semibold text-primary mb-1">Indicators</p>
                <p className="text-sm">29 socioeconomic indicators derived per census year, covering country of birth, housing quality, tenure, employment, and economic position</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-semibold text-primary mb-1">Source Data</p>
                <p className="text-sm">UK Census Small Area Statistics tables SAS02 (demographics), SAS04 (country of birth), SAS07 (employment), and SAS10 (housing &amp; tenure)</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Pipeline */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Data Pipeline</h2>
          </div>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              A reproducible, automated data pipeline built with Python (13 numbered scripts) handles the entire
              workflow from raw census ingestion to web-ready GeoJSON. Each stage is independently rerunnable and
              configured via YAML definition files.
            </p>
            <div className="bg-muted/30 p-6 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[160px]">1 · Ingest:</span>
                <span>Raw SAS census tables (CSV, multi-part) are parsed and merged per census year using Pandas, with column mappings defined in <code className="text-xs bg-muted px-1 py-0.5 rounded">sas_raw_file_mapping.yml</code></span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[160px]">2 · Compute Indicators:</span>
                <span>29 socioeconomic indicators are derived per geographic unit using formula definitions in <code className="text-xs bg-muted px-1 py-0.5 rounded">indicators.yml</code>, producing a single indicator CSV per census year</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[160px]">3 · Spatial Join:</span>
                <span>Indicator CSVs are joined to digitised boundary polygons (EDs, Wards, OAs) using GeoPandas, validated in QGIS with a 100% match rate achieved</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[160px]">4 · Export:</span>
                <span>Joined spatial data is exported as optimised GeoJSON for the web application and GeoPackage for archival use in QGIS</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Technology Stack */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Technology Stack</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-foreground text-base border-b border-border pb-2">Frontend & Visualisation</h3>
              <ul className="space-y-3 text-foreground/90">
                {[
                  { name: 'React + TypeScript', desc: 'Type-safe UI framework' },
                  { name: 'Leaflet.js / React-Leaflet', desc: 'Interactive choropleth mapping' },
                  { name: 'Tailwind CSS + shadcn/ui', desc: 'Responsive, accessible styling' },
                  { name: 'Vercel', desc: 'Continuous deployment platform' },
                ].map(({ name, desc }) => (
                  <li key={name} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-primary rounded-full"></span>
                    <span className="text-sm leading-snug"><strong>{name}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-foreground text-base border-b border-border pb-2">Geospatial & Data Processing</h3>
              <ul className="space-y-3 text-foreground/90">
                {[
                  { name: 'Python / Pandas', desc: 'Data ingestion and indicator computation' },
                  { name: 'GeoPandas / Shapely', desc: 'Spatial joins and boundary handling' },
                  { name: 'QGIS', desc: 'Boundary digitisation, join validation, and cartographic output' },
                  { name: 'GeoJSON / GeoPackage', desc: 'Spatial data formats for web and archival use' },
                ].map(({ name, desc }) => (
                  <li key={name} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-primary rounded-full"></span>
                    <span className="text-sm leading-snug"><strong>{name}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Resources */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Downloadable Resources</h2>
          </div>
          <p className="text-foreground/90 mb-4 leading-relaxed">
            In the spirit of open research and reproducibility, the full data pipeline source code is publicly available.
            The raw census SAS tables used in this project (SAS02, SAS04, SAS07, SAS10) are freely accessible
            through the UK Data Service census archive.
          </p>
          <p className="text-foreground/90 mb-6 leading-relaxed text-sm text-muted-foreground">
            Note: The UK Data Service requires free registration to access census microdata. Search for
            "Small Area Statistics 1981" or "1991 Census Small Area Statistics" in the catalogue.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://census.ukdataservice.ac.uk/get-data/historical-census" target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="gap-2">
                <Download className="w-4 h-4" />
                UK Data Service — Census Archive
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
