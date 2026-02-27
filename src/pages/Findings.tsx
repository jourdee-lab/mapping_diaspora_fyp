import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { TrendingUp, MapPin, Building2, Users, Home, BarChart3 } from 'lucide-react';

const Findings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-12 max-w-5xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">Findings and Analysis</h1>
        <p className="text-foreground/70 text-base sm:text-lg mb-8">
          Spatial analysis of Chinese immigrant integration in Manchester across three census years (1981, 1991, 2001),
          based on 33 harmonised ward geographies and Small Area Statistics data.
        </p>

        {/* Summary card */}
        <Card className="p-4 sm:p-8 mb-8 bg-primary/5 border-primary/20">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
          <p className="text-foreground/90 leading-relaxed text-lg mb-4">
            Manchester's Chinese community grew from approximately 2,400 Far East-born residents (0.55% of the city's population)
            in 1981 to over 5,100 self-identified Chinese in 2001 (1.31%), a more than twofold increase set against a backdrop
            of citywide depopulation from 433,000 to 393,000. The analysis reveals a trajectory of asymmetric convergence:
            the settled, family-based segment of the community moved measurably closer to local socioeconomic norms over the
            period, while a growing student and transient population continued to depress aggregate indicators.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">0.43 → 0.32</div>
              <div className="text-sm text-foreground/60 mt-1">Index of Dissimilarity 1981 to 2001</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">+7.3pp</div>
              <div className="text-sm text-foreground/60 mt-1">Mean ward owner-occupation rise</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">-0.36pp</div>
              <div className="text-sm text-foreground/60 mt-1">Mean ward severe overcrowding fall</div>
            </div>
          </div>
        </Card>

        {/* RQ1 */}
        <Card className="p-4 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
            <h2 className="text-lg sm:text-2xl font-semibold text-foreground">Spatial Distribution and Concentration (1981 to 2001)</h2>
          </div>
          <div className="space-y-6 text-foreground/90 leading-relaxed">

            <div>
              <h3 className="font-semibold text-foreground mb-3">Peak Concentration Wards</h3>
              <p className="mb-4">
                The centre of gravity of Chinese settlement shifted substantially across the twenty-year period.
                Hulme dominated in 1981 (6.97% Far East-born), reflecting its proximity to the historical Chinatown
                district, though this figure is partly inflated by Hulme's severe population loss through comprehensive
                redevelopment. By 2001, Central ward had become the primary concentration node at 6.06%, with adjacent
                Ardwick at 5.84%, corresponding to the formalised Chinatown precinct and nearby student accommodation.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold">#</th>
                      <th className="text-left py-2 pr-4 font-semibold">1981</th>
                      <th className="text-left py-2 pr-4 font-semibold">1991</th>
                      <th className="text-left py-2 font-semibold">2001</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      ['1', 'Hulme (6.97%)', 'Hulme (3.61%)', 'Central (6.06%)'],
                      ['2', 'Cheetham (1.27%)', 'Ardwick (2.09%)', 'Ardwick (5.84%)'],
                      ['3', 'Fallowfield (0.90%)', 'Central (1.70%)', 'Hulme (3.58%)'],
                      ['4', 'Whalley Range (0.85%)', 'Longsight (1.54%)', 'Rusholme (2.81%)'],
                      ['5', 'Withington (0.72%)', 'Cheetham (1.31%)', 'Bradford (2.12%)'],
                    ].map(([rank, y81, y91, y01]) => (
                      <tr key={rank}>
                        <td className="py-2 pr-4 text-foreground/60">{rank}</td>
                        <td className="py-2 pr-4">{y81}</td>
                        <td className="py-2 pr-4">{y91}</td>
                        <td className="py-2">{y01}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Index of Dissimilarity</h3>
              <p className="mb-3">
                Residential segregation, measured by the Index of Dissimilarity (D), fell from 0.43 in 1981 to 0.28
                in 1991before a partial rebound to 0.32 by 2001. The 1981 figure is elevated by the extreme
                concentration in Hulme and by the birthplace proxy, which excludes UK-born Chinese residents.
                The partial rebound between 1991 and 2001 plausibly reflects re-concentration around the
                redeveloped Chinatown in Central ward rather than a reversal of the broader dispersal trend.
                A D of 0.32 indicates moderate segregation, well below levels recorded for Bangladeshi
                (approximately 0.70) or Black Caribbean (approximately 0.55) communities in comparable
                UK cities at the same period.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg grid grid-cols-3 gap-4">
                {[['1981', '0.43'], ['1991', '0.28'], ['2001', '0.32']].map(([yr, val]) => (
                  <div key={yr} className="text-center">
                    <div className="text-xl font-bold text-primary">{val}</div>
                    <div className="text-xs text-foreground/60">{yr}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Settlement Node Classification</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium text-foreground mb-1">Sustained high concentration (top 10 in all three years)</h4>
                  <p className="text-sm">
                    Ardwick, Cheetham, Hulme, and Longsight maintained Chinese presence across all three census
                    periods, providing continuity of ethnic infrastructure, community institutions, and catering
                    businesses throughout the study window.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-medium text-foreground mb-1">Ascending wards (entering top 10 by 2001)</h4>
                  <p className="text-sm">
                    Central ward rose from 0.16% in 1981 to 6.06% in 2001, a 38-fold increase driven by Chinatown
                    formalisation and student accommodation development near Manchester Metropolitan University and UMIST.
                    Rusholme (+2.37 percentage points), Moss Side, and Beswick and Clayton also grew substantially.
                  </p>
                </div>
                <div className="border-l-4 border-muted-foreground pl-4">
                  <h4 className="font-medium text-foreground mb-1">Declining wards (leaving top 10 by 2001)</h4>
                  <p className="text-sm">
                    Barlow Moor, Fallowfield, Old Moat, and Whalley Range saw relative declines, consistent with
                    residential assimilation of settled Chinese families whose concentration fell below citywide
                    thresholds as they dispersed into the wider housing market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* RQ2 */}
        <Card className="p-4 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-6 h-6 text-primary flex-shrink-0" />
            <h2 className="text-lg sm:text-2xl font-semibold text-foreground">Housing Tenure and Quality</h2>
          </div>
          <div className="space-y-6 text-foreground/90 leading-relaxed">

            <div>
              <h3 className="font-semibold text-foreground mb-3">Owner-Occupation</h3>
              <p>
                Chinese households achieved an aggregated owner-occupation rate of 38.4% in 1991, marginally above the
                Manchester ward mean of approximately 35.5% in 1981 and broadly in line with citywide norms. However,
                by 2001, the top-five Chinese concentration wards recorded markedly lower owner-occupation than the
                Manchester average (38.0% versus 43.0%), reflecting the inner-city character of those wards rather
                than a Chinese-specific tenure disadvantage. Central, Ardwick, and Hulme wards, where Chinese
                concentration was highest, had owner-occupation rates of 20.7%, 11.3%, and 18.0% respectively in
                2001, consistent with their dense private-rented and social-housing stock. This finding aligns with
                Parker's (1998) observation that owner-occupation among permanently settled Chinese families is
                comparable to the host population, while transient student and catering-sector residents inflate
                the renting statistics in concentration wards.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Overcrowding</h3>
              <p className="mb-3">
                Wards with above-median Chinese concentration consistently showed higher severe overcrowding
                (more than 1.5 persons per room) than the rest of the city across all three periods, though
                rates fell over time. In 1991, Chinese-headed households in wards where Chinese households
                exceeded five showed an aggregated severe overcrowding rate of 2.25%, with the highest
                rates in Old Moat (6.3%), Rusholme (4.3%), and Ardwick (4.3%). By 2001, severe overcrowding
                in high-Chinese wards stood at 1.22%, compared to 0.46% in low-Chinese wards and a
                Manchester mean of 0.85%. The declining trajectory is consistent with gradual transition
                from above-the-shop catering accommodation towards standard residential tenancies as the
                community matured.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Basic Amenities</h3>
              <p>
                In 1981, the top-five Chinese wards recorded amenity-lack rates substantially below the
                Manchester mean. Hulme, for example, had only 0.41% of households lacking a bath or WC,
                against a city mean of 3.31%. This reflected the relatively modern post-war housing stock
                in Hulme following clearance. By 2001, the relationship reversed: the top-five Chinese
                wards showed rates at or above the Manchester mean (Central: 9.82%, Rusholme: 7.85%,
                Manchester mean: 9.29%). This compositional shift reflects the fact that the wards
                which became Chinese concentration areas by 2001 contain older housing stock and
                houses in multiple occupation with deteriorating amenity profiles, rather than a
                deterioration in the housing conditions occupied by Chinese residents specifically.
              </p>
            </div>
          </div>
        </Card>

        {/* RQ3 */}
        <Card className="p-4 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary flex-shrink-0" />
            <h2 className="text-lg sm:text-2xl font-semibold text-foreground">Employment and Economic Position</h2>
          </div>
          <div className="space-y-6 text-foreground/90 leading-relaxed">

            <div>
              <h3 className="font-semibold text-foreground mb-3">Chinese Employment Rates (1991)</h3>
              <p className="mb-4">
                Manchester-wide, Chinese residents aged 16 and over recorded an economic activity rate of
                52.8% and an ILO unemployment rate of 23.9% in 1991. These aggregate figures are heavily
                distorted by the student population in inner-city wards. Hulme, for instance, had a Chinese
                employment rate of only 26.6%, reflecting its large student cohort. In contrast, suburban
                family-settlement wards showed Chinese employment rates of 70 to 74% (Baguley: 73.7%,
                Northenden: 72.9%, Moston: 70.5%), substantially above local ward averages. This bifurcation
                between student-dominated inner wards and family-settled suburban wards reveals two distinct
                Chinese sub-populations with fundamentally different economic profiles.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center text-sm">
                <div>
                  <div className="text-lg font-bold text-primary">52.8%</div>
                  <div className="text-foreground/60">Economic activity rate</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">40.2%</div>
                  <div className="text-foreground/60">Employment rate (16+)</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">23.9%</div>
                  <div className="text-foreground/60">ILO unemployment rate</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Self-Employment and the Enclave Economy (2001)</h3>
              <p>
                The Manchester mean self-employment rate in 2001 was 4.6%. Counter to the enclave economy
                hypothesis, the top-ten Chinese-concentration wards all recorded self-employment rates
                below or at the Manchester mean (range: 2.2 to 4.5%), with a negative correlation between
                Chinese concentration and self-employment across all 33 wards (Pearson r = -0.30). This
                finding supports Benton and Gomez's (2008) observation that the Chinese catering economy
                deliberately disperses geographically to avoid market saturation, distributing takeaway
                businesses across suburban wards rather than concentrating them in Chinatown. The absence
                of spatially concentrated self-employment in high-Chinese wards therefore does not indicate
                low entrepreneurial activity, but rather a dispersed economic geography invisible at the
                ward level to area-based measures.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Employment and Chinese Presence (1981)</h3>
              <p>
                A negative correlation (r = -0.50) existed in 1981 between ward-level Chinese concentration
                and ward-level employment rates. Wards in the highest Chinese-presence quintile had a mean
                employment rate of 20.2%, compared to 21.6% in the lowest quintile. This reflects confounding
                geography: Chinese immigrants in 1981 settled disproportionately in deprived inner-city wards
                (Hulme, Cheetham, Ardwick) which had structurally low employment rates across all resident
                groups, not a causal relationship between Chinese presence and labour market outcomes.
              </p>
            </div>
          </div>
        </Card>

        {/* RQ4 */}
        <Card className="p-4 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary flex-shrink-0" />
            <h2 className="text-lg sm:text-2xl font-semibold text-foreground">Age Structure and Settlement Depth (1991)</h2>
          </div>
          <div className="space-y-6 text-foreground/90 leading-relaxed">

            <div>
              <h3 className="font-semibold text-foreground mb-3">Age Profile</h3>
              <p className="mb-4">
                The Manchester-wide Chinese age structure in 1991 (n = 3,103) was dominated by the 16 to 29 cohort
                (37.5%) and the 30 to pensionable-age group (36.4%), reflecting a large working-age and student
                population. Children under 16 comprised 21.3% of the Chinese population, indicating active family
                formation particularly in suburban wards.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold">Age group</th>
                      <th className="text-right py-2 pr-4 font-semibold">Count</th>
                      <th className="text-right py-2 font-semibold">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      ['0 to 4', '223', '7.2%'],
                      ['5 to 15', '438', '14.1%'],
                      ['16 to 29', '1,165', '37.5%'],
                      ['30 to pensionable age', '1,131', '36.4%'],
                      ['Pensionable age and over', '146', '4.7%'],
                    ].map(([ag, n, pct]) => (
                      <tr key={ag}>
                        <td className="py-2 pr-4">{ag}</td>
                        <td className="py-2 pr-4 text-right">{n}</td>
                        <td className="py-2 text-right font-medium text-primary">{pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Two Settlement Geographies</h3>
              <p>
                The age data reveals a clear spatial bifurcation. Inner-city wards near university campuses
                (Rusholme: 64.4% aged 16 to 29, Barlow Moor: 62.5%, Hulme: 56.2%) had profiles dominated by
                young adults, consistent with student and newly arrived catering-worker populations. Suburban
                wards (Northenden, Sharston, Newton Heath) showed 40 to 43% of their Chinese residents under
                16, indicating established family households in their second generation. Central ward had an
                exceptional profile, with 23.4% of its Chinese residents at pensionable age, reflecting
                long-term elderly residents associated with the pioneer catering-sector wave of the 1950s
                and 1960s. Across the city, 27 of 33 wards contained at least one pensionable-age Chinese
                resident, confirming that community roots extended well beyond the transient population
                recorded at city-centre addresses.
              </p>
            </div>
          </div>
        </Card>

        {/* RQ5 */}
        <Card className="p-4 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
            <h2 className="text-lg sm:text-2xl font-semibold text-foreground">Temporal Change and Integration Trajectory</h2>
          </div>
          <div className="space-y-6 text-foreground/90 leading-relaxed">

            <p>
              Across all 33 wards, Chinese concentration rose in 32 cases between 1981 and 2001 (mean increase:
              +0.78 percentage points), with only Hulme recording a decline (-3.40pp) due to redevelopment
              displacing residents. Mean ward owner-occupation increased by 7.3 percentage points, and mean
              severe overcrowding fell by 0.36 percentage points, indicating broad improvements in housing
              conditions city-wide. In the top-five Chinese-concentration wards, the gap relative to the
              Manchester mean on car deprivation narrowed from +15.8 percentage points in 1981 to
              +11.4 percentage points in 2001, suggesting modest convergence on material living standards.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-semibold">Ward</th>
                    <th className="text-right py-2 pr-4 font-semibold">Chinese %</th>
                    <th className="text-right py-2 pr-4 font-semibold hidden sm:table-cell">Owner-occ</th>
                    <th className="text-right py-2 font-semibold hidden sm:table-cell">Overcrowding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[
                    ['Central', '+5.90pp', '+17.6pp', '-0.32pp'],
                    ['Ardwick', '+5.17pp', '+7.4pp', '-0.46pp'],
                    ['Rusholme', '+2.37pp', '-8.8pp', '-0.27pp'],
                    ['Bradford', '+1.57pp', '+3.9pp', '-0.45pp'],
                    ['Longsight', '+1.11pp', '-7.1pp', '-0.05pp'],
                    ['Moss Side', '+1.07pp', '-11.5pp', '-1.07pp'],
                    ['Hulme', '-3.40pp', '+15.5pp', '+0.73pp'],
                  ].map(([ward, ch, oo, oc]) => (
                    <tr key={ward}>
                      <td className="py-2 pr-4 font-medium">{ward}</td>
                      <td className={`py-2 pr-4 text-right ${ch.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>{ch}</td>
                      <td className={`py-2 pr-4 text-right hidden sm:table-cell ${oo.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>{oo}</td>
                      <td className={`py-2 text-right hidden sm:table-cell ${oc.startsWith('-') ? 'text-primary' : 'text-destructive'}`}>{oc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Synthesis */}
        <Card className="p-4 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-primary flex-shrink-0" />
            <h2 className="text-lg sm:text-2xl font-semibold text-foreground">Synthesis: Integration in Context</h2>
          </div>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              The overall integration trajectory of Manchester's Chinese community between 1981 and 2001
              is best characterised as asymmetric convergence. The settled, family-based segment showed
              clear movement towards local socioeconomic norms on housing tenure, overcrowding, and
              employment, particularly in suburban wards where Chinese employment rates of 65 to 74%
              were comparable to or above local averages. Residential segregation declined substantially
              over the period (D = 0.43 to 0.32), placing the Chinese community among the least
              residentially segregated non-white groups in the city.
            </p>
            <p>
              However, this convergence was masked at the aggregate level by a growing transient student
              and catering-worker population concentrated in inner-city wards, whose structural characteristics
              (private renting, high turnover, low car ownership) persistently depressed composite indicators.
              The spatially dispersed nature of Chinese self-employment, counter to enclave economy predictions,
              further illustrates that the catering-sector economy operated at a metropolitan rather than
              neighbourhood scale.
            </p>
            <p>
              The Chinatown of Central ward and surrounding areas served an increasingly symbolic,
              institutional, and commercial function by 2001, while the residential centre of gravity
              of the settled Chinese community had shifted to the inner southern and northern suburbs.
              This pattern of institutional visibility alongside residential dispersal distinguishes
              Manchester's Chinese community from both the sustained enclave model documented for
              some South Asian groups and the rapid full assimilation predicted by classical spatial
              assimilation theory, suggesting instead a selective and geographically selective form
              of integration in which ethnic infrastructure was maintained while residential and
              economic boundaries became progressively more permeable.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg mt-4">
              <p className="text-sm text-foreground/70">
                <strong>Methodological note:</strong> 1981 figures use country of birth (Far East-born) as a
                proxy for Chinese ethnicity, which understates true population size by excluding UK-born
                Chinese residents. 1991 and 2001 figures use self-identified ethnicity and are directly
                comparable with each other but not with 1981. Two wards (Gorton South, Woodhouse Park)
                had 1981 interpolation coverage below 0.95 and should be treated with caution in
                ward-level comparisons.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Findings;
