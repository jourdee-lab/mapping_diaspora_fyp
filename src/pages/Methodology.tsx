import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Methodology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 md:px-8 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Methodology & Data</h1>

        {/* Research Overview */}
        <Card className="p-4 sm:p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Research Overview</h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed text-justify">
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
                <p className="text-sm">UK Census Small Area Statistics: 4 tables for 1981, 6 tables for 1991, and 8 ONS Census Area Statistics tables for 2001 — all sourced via the UK Data Service</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Pipeline */}
        <Card className="p-4 sm:p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Data Pipeline</h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p className="text-justify">
              A reproducible, automated data pipeline built with Python (13 numbered scripts) handles the entire
              workflow from raw census ingestion to web-ready GeoJSON. Each stage is independently rerunnable and
              configured via YAML definition files.
            </p>
            <ol className="divide-y divide-border/60">
              <li className="flex items-start gap-4 py-4 first:pt-0">
                <span className="flex-none w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mt-0.5">1</span>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground mb-1">Ingest</p>
                  <p className="text-sm text-foreground/80 leading-relaxed text-justify">1981 and 1991 SAS tables arrive as 4–5 horizontal CSV parts per table and are concatenated on <code className="text-xs bg-muted px-1 py-0.5 rounded">zoneid</code>. 2001 Census Area Statistics arrive as long-format ONS dissemination files, pivoted to wide format. All years are filtered to Greater Manchester by LAD prefix (<code className="text-xs bg-muted px-1 py-0.5 rounded">03BN</code> for 1981/1991, <code className="text-xs bg-muted px-1 py-0.5 rounded">00BN</code> for 2001) via <code className="text-xs bg-muted px-1 py-0.5 rounded">sas_raw_file_mapping.yml</code>.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 py-4">
                <span className="flex-none w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mt-0.5">2</span>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground mb-1">Compute Indicators</p>
                  <p className="text-sm text-foreground/80 leading-relaxed text-justify">29 socioeconomic indicators are derived per geographic unit using formula definitions in <code className="text-xs bg-muted px-1 py-0.5 rounded">indicators.yml</code>, producing a single indicator CSV per census year.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 py-4">
                <span className="flex-none w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mt-0.5">3</span>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground mb-1">Spatial Join</p>
                  <p className="text-sm text-foreground/80 leading-relaxed text-justify">Indicator CSVs are joined to boundary shapefiles (<code className="text-xs bg-muted px-1 py-0.5 rounded">ED_1981_EW.shp</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">england_wa_1991.shp</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">england_oa_2001.shp</code>) using GeoPandas, validated in QGIS with a 100% match rate.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 py-4">
                <span className="flex-none w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mt-0.5">4</span>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground mb-1">Harmonise</p>
                  <p className="text-sm text-foreground/80 leading-relaxed text-justify">Ward boundaries are harmonised to a common 2001 anchor geography (<code className="text-xs bg-muted px-1 py-0.5 rounded">england_caswa_2001_clipped.shp</code>). 1981 EDs are aggregated by areal interpolation; 1991 wards map directly — boundaries are geographically identical, only codes changed.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 py-4 last:pb-0">
                <span className="flex-none w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mt-0.5">5</span>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground mb-1">Export</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">Joined spatial data is exported as optimised GeoJSON for the web application and GeoPackage for archival use in QGIS.</p>
                </div>
              </li>
            </ol>
          </div>
        </Card>

        {/* Technology Stack */}
        <Card className="p-4 sm:p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Technology Stack</h2>
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

        {/* Raw Data Inventory */}
        <Card className="p-4 sm:p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Census Raw Data Inventory</h2>
          <p className="text-foreground/90 mb-6 leading-relaxed text-justify">
            All raw files are sourced from the{' '}
            <a href="https://census.ukdataservice.ac.uk/get-data/historical-census" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">UK Data Service Census Archive</a>{' '}
            (free registration required). Boundary shapefiles are obtained via EDINA Census Geography.
            Raw files are not committed to the repository; place them in <code className="text-xs bg-muted px-1 py-0.5 rounded">data/raw/</code> before running the pipeline.
          </p>

          <div className="space-y-8">
            {/* 1981 */}
            <div>
              <h3 className="font-semibold text-foreground mb-1 text-base">1981 — Small Area Statistics (SAS)</h3>
              <p className="text-xs text-muted-foreground mb-3">Geography: Enumeration Districts &nbsp;·&nbsp; LAD prefix: <code className="bg-muted px-1 rounded">03BN</code> &nbsp;·&nbsp; Place files in <code className="bg-muted px-1 rounded">data/raw/sas/</code></p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-medium text-foreground/70">Files</th>
                      <th className="text-left py-2 pr-4 font-medium text-foreground/70">Table</th>
                      <th className="text-left py-2 font-medium text-foreground/70">Topic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-foreground/80">
                    {[
                      ['1981_sas02_part{1–5}.csv', 'SAS02', 'Demographics — total population by age/sex'],
                      ['1981_sas04_part{1–5}.csv', 'SAS04', 'Country of birth (birthplace)'],
                      ['1981_sas07_part{1–5}.csv', 'SAS07', 'Employment & economic activity'],
                      ['1981_sas10_part{1–5}.csv', 'SAS10', 'Housing & tenure'],
                    ].map(([file, table, topic]) => (
                      <tr key={table}>
                        <td className="py-2 pr-4"><code className="text-xs bg-muted px-1 py-0.5 rounded">{file}</code></td>
                        <td className="py-2 pr-4 font-mono text-xs">{table}</td>
                        <td className="py-2 text-xs">{topic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Boundary: <code className="bg-muted px-1 rounded">gis_boundaries/1981/ED_1981_EW.shp</code></p>
            </div>

            {/* 1991 */}
            <div>
              <h3 className="font-semibold text-foreground mb-1 text-base">1991 — Small Area Statistics (SAS)</h3>
              <p className="text-xs text-muted-foreground mb-3">Geography: Enumeration Districts aggregated to Electoral Wards &nbsp;·&nbsp; LAD prefix: <code className="bg-muted px-1 rounded">03BN</code> &nbsp;·&nbsp; Place sub-folders in <code className="bg-muted px-1 rounded">data/raw/</code></p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-medium text-foreground/70">Files</th>
                      <th className="text-left py-2 pr-4 font-medium text-foreground/70">Table</th>
                      <th className="text-left py-2 font-medium text-foreground/70">Topic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-foreground/80">
                    {[
                      ['s02ews/s02ews{1–4}.csv', 'S02EWS', 'Demographics — age & marital status'],
                      ['s06ews/s06ews{1–4}.csv', 'S06EWS', 'Ethnic group'],
                      ['s07ews/s07ews{1–4}.csv', 'S07EWS', 'Country of birth'],
                      ['s09ews/s09ews{1–4}.csv', 'S09EWS', 'Economic position'],
                      ['s16ew+s/s16ew{1–4}.csv', 'S16EW+S', 'Tenure & amenities'],
                      ['s81ews/s81ews{1–4}.csv', 'S81EWS', 'Communal establishments'],
                    ].map(([file, table, topic]) => (
                      <tr key={table}>
                        <td className="py-2 pr-4"><code className="text-xs bg-muted px-1 py-0.5 rounded">{file}</code></td>
                        <td className="py-2 pr-4 font-mono text-xs">{table}</td>
                        <td className="py-2 text-xs">{topic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Boundary: <code className="bg-muted px-1 rounded">gis_boundaries/1991/england_wa_1991.shp</code></p>
            </div>

            {/* 2001 */}
            <div>
              <h3 className="font-semibold text-foreground mb-1 text-base">2001 — Census Area Statistics (CAS)</h3>
              <p className="text-xs text-muted-foreground mb-3">Geography: Output Areas &nbsp;·&nbsp; OA prefix: <code className="bg-muted px-1 rounded">00BN</code> &nbsp;·&nbsp; Place files directly in <code className="bg-muted px-1 rounded">data/raw/</code></p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-medium text-foreground/70">File</th>
                      <th className="text-left py-2 pr-4 font-medium text-foreground/70">Table</th>
                      <th className="text-left py-2 font-medium text-foreground/70">Topic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-foreground/80">
                    {[
                      ['c01cs001_ons.csv', 'CS001EW', 'Total population'],
                      ['c01ct003_ons.csv', 'CT003EW', 'Ethnic group (incl. Chinese/Chinese British)'],
                      ['c01cs015_ons.csv', 'CS015EW', 'Country of birth — Asia proxy'],
                      ['c01cs028_ons.csv', 'CS028EW', 'Economic activity (ages 16–74)'],
                      ['c01cs049_ons.csv', 'CS049EW', 'Tenure'],
                      ['c01cs052_ons.csv', 'CS052EW', 'Persons per room (overcrowding)'],
                      ['c01cs056_ons.csv', 'CS056EW', 'Amenities (bath/WC)'],
                      ['c01cs060_ons.csv', 'CS060EW', 'Car or van ownership'],
                    ].map(([file, table, topic]) => (
                      <tr key={table}>
                        <td className="py-2 pr-4"><code className="text-xs bg-muted px-1 py-0.5 rounded">{file}</code></td>
                        <td className="py-2 pr-4 font-mono text-xs">{table}</td>
                        <td className="py-2 text-xs">{topic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Boundaries: <code className="bg-muted px-1 rounded">gis_boundaries/2001/OA/england_oa_2001.shp</code>
                {' '}·{' '}
                <code className="bg-muted px-1 rounded">gis_boundaries/2001/wards/england_caswa_2001_clipped.shp</code>
              </p>
            </div>
          </div>
        </Card>

        {/* Resources */}
        <Card className="p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Reproduce This Project</h2>
          <p className="text-foreground/90 mb-4 leading-relaxed text-justify">
            The full data pipeline source code is publicly available. Once you have obtained the raw census files
            from the UK Data Service and placed them in <code className="text-xs bg-muted px-1 py-0.5 rounded">data/raw/</code> as described above,
            run the 13 numbered pipeline scripts in order to reproduce all indicators and GeoJSON outputs.
          </p>
          <p className="text-foreground/90 mb-6 leading-relaxed text-sm text-muted-foreground text-justify">
            Free UK Data Service registration is required to download census microdata. Search the catalogue for
            "Small Area Statistics 1981", "1991 Census Small Area Statistics England &amp; Wales", and
            "2001 Census Area Statistics" to locate the relevant datasets.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <a href="https://census.ukdataservice.ac.uk/get-data/historical-census" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="default" className="w-full sm:w-auto">
                UK Data Service — Census Archive
              </Button>
            </a>
            <a href="https://github.com/jourdee-lab/manchester-spatial-analysis-data-lab" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
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
