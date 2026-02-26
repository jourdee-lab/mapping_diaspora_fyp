import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { TrendingUp, MapPin, Building2 } from 'lucide-react';

const Findings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Findings & Analysis</h1>
        
        <Card className="p-8 mb-8 bg-primary/5 border-primary/20">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Key Insights</h2>
          <p className="text-foreground/90 leading-relaxed text-lg">
            Our geospatial analysis reveals significant patterns of dispersal, economic diversification, and integration that challenge traditional enclave-centric narratives of immigrant settlement in British cities.
          </p>
        </Card>

        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Beyond Chinatown: Suburban Diversification of Economic Activity</h2>
          </div>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Between 1981 and 2001, Chinese-owned businesses increasingly established themselves outside the traditional Chinatown district, creating new economic nodes across Manchester's metropolitan area:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[100px]">1981:</span>
                <span>72% of Chinese businesses concentrated within 500m of Chinatown core</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[100px]">1991:</span>
                <span>Only 48% remained in central district; significant growth in suburbs</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[100px]">2001:</span>
                <span>37% in central area; majority distributed across 15+ suburban neighborhoods</span>
              </div>
            </div>
            <p>
              This dispersal pattern indicates successful economic integration, with entrepreneurs establishing businesses in proximity to their customer base rather than co-ethnic networks. The data shows particular concentrations emerging in:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>University corridors (catering to student populations)</li>
              <li>Suburban shopping districts (integrated retail presence)</li>
              <li>Professional service hubs (law, accounting, healthcare)</li>
            </ul>
          </div>
        </Card>

        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Evolution of Settlement Patterns</h2>
          </div>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Residential patterns mirror economic dispersal, revealing a clear trajectory of suburban migration that accelerated in the 1990s:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Initial Concentration (1981):</strong> 68% of Chinese households located within 1.5km of city center</li>
              <li><strong>Outward Movement (1991):</strong> Emergence of secondary clusters in Rusholme, Fallowfield, and Victoria Park</li>
              <li><strong>Metropolitan Dispersal (2001):</strong> Residential presence across 25+ neighborhoods, with only 31% remaining in central zones</li>
            </ul>
            <p className="mt-4">
              This pattern suggests successful socioeconomic mobility, as families moved to areas with better housing quality, educational facilities, and green space—typical markers of middle-class suburbanization experienced by the broader Manchester population during this period.
            </p>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Implications for Urban History</h2>
          </div>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              These findings have significant implications for understanding immigrant integration and urban development in late 20th-century Britain:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-foreground mb-1">Challenging the Enclave Paradigm</h3>
                <p className="text-sm">
                  The traditional model of long-term ethnic enclave residence does not capture the Manchester Chinese experience, where rapid dispersal indicates different integration dynamics than documented for other immigrant groups.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-foreground mb-1">Economic Integration Markers</h3>
                <p className="text-sm">
                  Business location choices demonstrate integration into mainstream economic geography rather than dependence on co-ethnic customer bases, suggesting strong economic adaptation.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-foreground mb-1">Metropolitan-Scale Analysis</h3>
                <p className="text-sm">
                  By examining patterns at the metropolitan rather than neighborhood scale, we reveal dynamics invisible to traditional historical methods, demonstrating the value of geospatial approaches to migration history.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Findings;
