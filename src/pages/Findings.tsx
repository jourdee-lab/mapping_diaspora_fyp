import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';

const Findings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-12 max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Findings and Analysis</h1>

        {/* Introductory context */}
        <div className="mb-10 space-y-4 text-foreground/85 leading-relaxed text-justify border-l-2 border-border pl-5">
          <p className="text-base sm:text-lg">
            Between 1981 and 2001, Manchester's Chinese population increased from roughly 2,400
            Far East-born residents (0.55% of the city) to more than 5,100 people who self-identified
            as Chinese (1.31%). This growth occurred against a backdrop of overall urban decline, as the
            city's population fell from about 433,000 to 393,000, a loss of approximately 40,000 residents.
          </p>
          <p className="text-base sm:text-lg">
            The quantitative evidence points to a pattern of <em>asymmetric convergence</em> rather than
            straightforward linear assimilation. A settled, family-based segment of the community moved
            closer to local socio-economic norms over the twenty-year period: the Index of Dissimilarity
            declined from 0.43 in 1981 to 0.32 in 2001, average ward-level owner-occupation rose by
            7.3 percentage points, and severe overcrowding fell by 0.36 percentage points across the
            city. At the same time, the growing presence of students and transient catering workers in
            inner-city wards continued to weigh down aggregated indicators, so that the convergence of
            long-settled households with city averages is largely hidden at the level of city-wide metrics.
          </p>
        </div>

        {/* RQ1 */}
        <Card className="p-4 sm:p-8 mb-8">
          <h2 className="text-base sm:text-xl font-semibold text-foreground mb-6">Spatial Distribution and Concentration (1981 to 2001)</h2>
          <div className="divide-y divide-border/30 text-foreground/90 leading-relaxed text-justify [&>div]:py-6 [&>div:first-child]:pt-0">

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Peak Concentration Wards</h3>
              <p className="mb-4">
                In 1981, Hulme contained 6.97% Far East-born residents, the highest recorded ward-level
                concentration, a figure partly magnified by extensive redevelopment and associated population
                loss in the area. By 2001, Central ward had overtaken Hulme as the primary concentration node,
                with 6.06% Chinese residents, followed closely by Ardwick at 5.84%, reflecting the consolidation
                of Chinatown as a formalised commercial and institutional district alongside dense student
                accommodation.
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
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Index of Dissimilarity</h3>
              <p className="mb-3">
                The changing degree of residential concentration is captured by the Index of Dissimilarity (D),
                which fell from 0.43 in 1981 to 0.28 in 1991, before rising slightly to 0.32 in 2001. The 1981
                value is elevated by Hulme's unusually high share of Far East-born residents and by the reliance
                on birthplace as a proxy for ethnicity, which excludes UK-born Chinese and therefore exaggerates
                spatial unevenness. The partial rebound between 1991 and 2001 is more plausibly read as the
                effect of renewed clustering around the redeveloped Chinatown and nearby campuses than as
                evidence of a general return to segregation. A D value of 0.32 still indicates only moderate
                segregation and is substantially lower than contemporary values for Bangladeshi or Black
                Caribbean populations in comparable British cities.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Settlement Node Classification</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-border pl-4">
                  <h4 className="font-medium text-foreground mb-1">Sustained high concentration (top 10 in all three years)</h4>
                  <p className="text-sm text-foreground/80">
                    Ardwick, Cheetham, Hulme, and Longsight remain within the top ten Chinese-concentration
                    wards across all three census years, acting as enduring settlement nodes that sustain
                    institutions, catering businesses, and social networks over time.
                  </p>
                </div>
                <div className="border-l-2 border-border pl-4">
                  <h4 className="font-medium text-foreground mb-1">Ascending wards (entering top 10 by 2001)</h4>
                  <p className="text-sm text-foreground/80">
                    Central, Rusholme, Moss Side, and Beswick and Clayton appear as ascending wards: Central, in
                    particular, rises from just 0.16% Chinese residents in 1981 to 6.06% in 2001, a thirty-eight-fold
                    increase that aligns with the formalisation of Chinatown and the expansion of nearby
                    university-linked housing.
                  </p>
                </div>
                <div className="border-l-2 border-border pl-4">
                  <h4 className="font-medium text-foreground mb-1">Declining wards (leaving top 10 by 2001)</h4>
                  <p className="text-sm text-foreground/80">
                    Conversely, Barlow Moor, Fallowfield, Old Moat, and Whalley Range move out of the top ten
                    by 2001, consistent with a pattern in which long-established families leave early concentration
                    areas and diffuse into the broader housing market, reducing visible clustering without erasing
                    community presence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* RQ2 */}
        <Card className="p-4 sm:p-8 mb-8">
          <h2 className="text-base sm:text-xl font-semibold text-foreground mb-6">Housing Tenure and Quality</h2>
          <div className="divide-y divide-border/30 text-foreground/90 leading-relaxed text-justify [&>div]:py-6 [&>div:first-child]:pt-0">

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Owner-Occupation</h3>
              <p>
                In 1991, Chinese households achieved an aggregated owner-occupation rate of 38.4%, slightly higher
                than the 1981 Manchester ward mean of roughly 35.5% and broadly consonant with city-wide norms. By
                2001, however, the five wards with the highest Chinese concentrations registered lower owner-occupation
                than the Manchester average (38.0% compared with 43.0%), not because Chinese residents were
                systematically excluded from ownership, but because these wards were dominated by inner-city housing
                forms, namely private renting and social housing, that depress owner-occupation across all groups.
                In Central, Ardwick, and Hulme, where Chinese concentrations were greatest in 2001, owner-occupation
                rates stood at 20.7%, 11.3%, and 18.0% respectively, reflecting the structure of the local housing
                stock rather than a specific ethnic deficit.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Overcrowding</h3>
              <p className="mb-3">
                Wards with above-median Chinese concentrations consistently show higher rates of severe overcrowding
                than the city as a whole, yet these rates decline over time. In 1991, Chinese-headed households
                in wards with more than five Chinese households recorded an aggregated severe overcrowding rate
                of 2.25%, with Old Moat at 6.3% and Rusholme and Ardwick both at 4.3%. By 2001, severe overcrowding
                in high-Chinese wards had fallen to 1.22%, compared with 0.46% in low-Chinese wards and a Manchester
                mean of 0.85%. This downward trend is consistent with a gradual shift away from above-the-shop
                catering accommodation and towards more standard tenancies as the community's housing pathways
                diversified.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Basic Amenities</h3>
              <p>
                In 1981, the five wards with the highest Chinese presence had markedly lower rates of households
                lacking a bath or WC than the Manchester average, with Hulme at just 0.41% compared with a city
                mean of 3.31%, a result of post-war redevelopment and relatively modern housing stock following
                clearance. By 2001, however, the top-five Chinese wards showed amenity-lack rates at or above
                the Manchester mean (Central at 9.82%, Rusholme at 7.85%, compared with 9.29% city-wide). This
                reversal reflects a compositional shift in which Chinese concentrations by 2001 are located in
                older inner-city housing and houses in multiple occupation with declining amenity profiles,
                rather than any absolute deterioration in the quality of accommodation occupied by Chinese
                residents.
              </p>
            </div>
          </div>
        </Card>

        {/* RQ3 */}
        <Card className="p-4 sm:p-8 mb-8">
          <h2 className="text-base sm:text-xl font-semibold text-foreground mb-6">Employment and Economic Position</h2>
          <div className="divide-y divide-border/30 text-foreground/90 leading-relaxed text-justify [&>div]:py-6 [&>div:first-child]:pt-0">

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Chinese Employment Rates (1991)</h3>
              <p className="mb-4">
                In 1991, across Manchester, Chinese residents aged sixteen and over recorded an economic activity
                rate of 52.8% and an ILO unemployment rate of 23.9%, headline figures heavily skewed by the large
                student population in inner-city wards. In Hulme, for instance, the Chinese employment rate stood
                at just 26.6%, reflecting an area profile dominated by students. In contrast, suburban wards
                associated with family settlement show Chinese employment rates substantially above local ward
                averages: Baguley at 73.7%, Northenden at 72.9%, and Moston at 70.5%. Taken together, these
                values reveal a clear divide between student and newcomer-dominated inner wards and the more
                established suburban household clusters further out.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Self-Employment and the Enclave Economy (2001)</h3>
              <p>
                Self-employment patterns in 2001 challenge a straightforward reading of Chinatown as a classic
                ethnic enclave economy. The Manchester mean self-employment rate was 4.6%, yet the ten wards
                with the highest Chinese concentrations all recorded self-employment rates below or equal to
                this figure, ranging from 2.2% to 4.5%. Across all thirty-three wards, there was a negative
                correlation between Chinese concentration and self-employment, with a Pearson correlation
                coefficient of -0.30. Rather than indicating low entrepreneurial activity, this pattern
                supports the argument that Chinese catering businesses deliberately spread across suburban
                space to avoid market saturation. The ward map shows a broadly even distribution of
                takeaway outlets and restaurants rather than a tight commercial cluster, meaning much
                Chinese self-employment falls below the resolution of area-based measures.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Employment and Chinese Presence (1981)</h3>
              <p>
                In 1981, a negative correlation existed between ward-level Chinese concentration and ward-level
                employment rates. Wards in the highest quintile of Chinese presence had a mean employment rate
                of 20.2%, compared with 21.6% in the lowest quintile. This association does not imply that
                Chinese presence depressed employment; instead, it reflects the geography of early settlement,
                in which Chinese migrants were disproportionately located in already deprived inner-city wards
                such as Hulme, Cheetham, and Ardwick that were characterised by structurally low employment
                across all resident groups. When the data are plotted spatially, Chinese presence appears
                superimposed upon pre-existing landscapes of industrial restructuring and urban disinvestment,
                rather than generating these patterns.
              </p>
            </div>
          </div>
        </Card>

        {/* RQ4 */}
        <Card className="p-4 sm:p-8 mb-8">
          <h2 className="text-base sm:text-xl font-semibold text-foreground mb-6">Age Structure and Settlement Depth (1991)</h2>
          <div className="divide-y divide-border/30 text-foreground/90 leading-relaxed text-justify [&>div]:py-6 [&>div:first-child]:pt-0">

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Age Profile</h3>
              <p className="mb-4">
                In 1991, the Manchester Chinese population was dominated by those aged sixteen to twenty-nine
                and those aged thirty to pensionable age, signalling a large working-age and student cohort.
                Children under sixteen made up more than one fifth of the population, pointing to active
                family formation, particularly in suburban wards. These figures capture two contrasting
                geographies: an inner-city corridor of youth mobility and a suburban belt of family
                consolidation.
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
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">Two Settlement Geographies</h3>
              <p>
                The distribution of these age groups across wards reveals a clear spatial bifurcation. Inner-city
                wards near university campuses, such as Rusholme, Barlow Moor, and Hulme, are dominated by young
                adults, consistent with student and newly arrived catering-worker populations. By contrast,
                suburban wards such as Northenden, Sharston, and Newton Heath show a much higher share of their
                Chinese residents under sixteen, signalling more established family households and the emergence
                of a second generation. Central ward presents an outlying profile, with a notably high proportion
                of residents at pensionable age, pointing to a concentration of older, long-term residents linked
                to the pioneer catering wave of the 1950s and 1960s. Across the city as a whole, the presence
                of at least one pensionable-age Chinese resident in the majority of wards demonstrates that the
                community's roots reach beyond the temporary student and worker populations most visible in
                city-centre addresses.
              </p>
            </div>
          </div>
        </Card>

        {/* RQ5 */}
        <Card className="p-4 sm:p-8 mb-8">
          <h2 className="text-base sm:text-xl font-semibold text-foreground mb-6">Temporal Change and Integration Trajectory</h2>
          <div className="divide-y divide-border/30 text-foreground/90 leading-relaxed text-justify [&>div]:py-6 [&>div:first-child]:pt-0">

            <p>
              Across the full twenty-year span, the ward-level data show an uneven but broadly convergent
              picture. Chinese concentration rose in almost every ward between 1981 and 2001, with only
              Hulme recording a decline (-3.40pp) driven by redevelopment and displacement rather than
              voluntary dispersal. Over the same period, mean ward owner-occupation increased and mean
              severe overcrowding fell, indicating general improvements in housing conditions. In the
              wards with the highest Chinese concentrations, the gap with the Manchester mean in car
              deprivation narrowed, a modest but measurable move towards parity in material living
              standards.
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
          <h2 className="text-base sm:text-xl font-semibold text-foreground mb-6">Synthesis: Integration in Context</h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed text-justify">
            <p>
              Across all four dimensions, the picture is broadly consistent. In suburban wards,
              settled family households moved closer to local norms on tenure, crowding, and
              employment, with Chinese employment rates in the range of roughly two thirds to three
              quarters often matching or exceeding ward averages. The Index of Dissimilarity fell over
              the period, placing the Chinese community among the least residentially segregated
              non-white groups in the city.
            </p>
            <p>
              This convergence was obscured at the aggregate level by a growing transient student and
              catering-worker population concentrated in inner-city wards. Their structural
              characteristics, namely private renting, high turnover, and low car ownership,
              persistently held down composite indicators. The geographically dispersed nature of
              Chinese self-employment, which ran counter to enclave economy predictions, shows that
              the catering-sector economy functioned at a metropolitan rather than neighbourhood scale.
            </p>
            <p>
              The Chinatown of Central ward and surrounding areas took on an increasingly symbolic,
              institutional, and commercial role by 2001, while the residential centre of gravity of
              the settled Chinese community had moved to the inner southern and northern suburbs.
              This combination of institutional visibility and residential dispersal sets Manchester's
              Chinese community apart from both the sustained enclave model recorded for some South
              Asian groups and the rapid full assimilation predicted by classical spatial assimilation
              theory. It points instead to a selective form of integration in which ethnic
              infrastructure was kept in place even as residential and economic boundaries grew
              gradually more permeable.
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
