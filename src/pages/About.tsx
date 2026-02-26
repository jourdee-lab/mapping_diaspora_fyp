import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">About the Project</h1>
        
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Project Overview</h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              This research project will investigate the spatial evolution and economic integration of Chinese immigrant communities in Manchester between 1981 and 2001. Using geospatial analysis and digital humanities methodologies, we examine a fundamental question: <strong>To what extent did Chinese immigrant settlement patterns and economic activities evolve beyond traditional ethnic enclaves, and what does this reveal about their economic integration and urban development?</strong>
            </p>
            <p>
              By adopting a metropolitan-scale approach, this project challenges conventional enclave-centric studies that focus primarily on concentrated ethnic neighborhoods like Chinatown. Instead, we capture the broader dynamics of suburbanisation and the transformation of ethnic geography across the entire Manchester metropolitan area.
            </p>
            <p>
              The methodology use ED_Level cencus data with computational geocoding techniques to create a comprehensive geospatial analysis. This allows us to visualise and analyze changes in residential patterns, business locations, and community institutions over three decades of significant social and economic change.
            </p>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Relevance to Digital Humanities</h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              This project is relevant to Digital Humanities because it applies computational methods to answer historical questions about marginalised communities. Through the integration of:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Geospatial Analysis:</strong> LUsing GIS technologies to map historical data and reveal spatial patterns invisible to traditional historical methods</li>
              <li><strong>Data Science:</strong> Building a reproducible pipeline to process and analyse large volumes of historical census data</li>
              <li><strong>Interactive Visualization:</strong> Creating accessible, web-based tools that democratise access to historical research</li>
              <li><strong>Critical Methodology:</strong> Combining quantitative analysis and qualitative interpretation to produce historical insights</li>
            </ul>
            <p className="mt-4">
              By giving voice to a historically marginalized group through data-driven storytelling, this project demonstrates how computational approaches can recover and represent diverse historical experiences that have often been overlooked in traditional narratives.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default About;
