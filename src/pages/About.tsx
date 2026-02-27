import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">About the Project</h1>
        
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Research Context</h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              This project examines the spatial distribution and socioeconomic position of Chinese immigrant communities in Manchester across the census years 1981, 1991, and 2001. Existing scholarship on ethnic settlement in British cities has concentrated heavily on inner-city enclaves such as Chinatown districts, a focus that obscures the extent to which communities dispersed across wider metropolitan areas over time. This project takes a metropolitan-scale approach, mapping settlement and housing patterns across all Manchester Enumeration Districts to assess how the spatial geography of this community changed over two decades.
            </p>
            <p>
              The study addresses three research questions. First, how did the residential distribution of Chinese-born residents in Manchester shift between 1981 and 2001? Second, what changes occurred in housing tenure, housing quality, and employment rates in areas with higher concentrations of Chinese-born residents? Third, do the trajectories observed at enumeration district level support or complicate existing accounts of suburban dispersal and socioeconomic integration among minority ethnic communities in post-industrial British cities?
            </p>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Digital Humanities Approach</h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              The historical record of small minority communities is rarely preserved in forms amenable to aggregate spatial analysis. Census small area statistics provide a rare opportunity to reconstruct population distributions at fine geographic resolution across multiple decades, but the data requires substantial processing before spatial patterns become legible. Applying GIS methods to digitised boundary data and historical census tables allows questions about residential change and socioeconomic position to be posed at a scale and precision that qualitative archival sources alone cannot support.
            </p>
            <p>
              Presenting this analysis through an interactive web application extends the research beyond the academic paper. Choropleth mapping at ward and enumeration district level makes the underlying spatial patterns directly inspectable, allowing readers to situate specific areas within the broader metropolitan distribution and to compare indicators across census years. The application does not substitute for interpretive analysis but provides a transparent interface to the underlying data on which that analysis rests.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default About;
