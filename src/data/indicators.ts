import { IndicatorMetadata } from '@/types/data';

/**
 * All available indicators for choropleth mapping.
 *
 * The `field` key maps directly to a property in the harmonised ward GeoJSON
 * files (manchester_wards_{year}.geojson). All three decade files share the
 * same schema — missing values are null, not omitted.
 *
 * Year-specific caveats are encoded in `description`.
 */
export const AVAILABLE_INDICATORS: IndicatorMetadata[] = [

  // ------------------------------------------------------------------ //
  // POPULATION
  // ------------------------------------------------------------------ //
  {
    id: 'total_population',
    label: 'Total Population',
    description: 'Total usual resident population of the ward',
    unit: 'count',
    year: 1981,
    category: 'demographic',
    field: 'total_population',
    colorScheme: 'sequential',
  },
  {
    id: 'total_population_1991',
    label: 'Total Population',
    description: 'Total usual resident population of the ward',
    unit: 'count',
    year: 1991,
    category: 'demographic',
    field: 'total_population',
    colorScheme: 'sequential',
  },
  {
    id: 'total_population_2001',
    label: 'Total Population',
    description: 'Total usual resident population of the ward (CS001EW)',
    unit: 'count',
    year: 2001,
    category: 'demographic',
    field: 'total_population',
    colorScheme: 'sequential',
  },

  // ------------------------------------------------------------------ //
  // ETHNICITY / ORIGIN
  // ------------------------------------------------------------------ //
  {
    id: 'pct_chinese_ethnic_1981',
    label: 'Chinese-Born %',
    description: '% residents born in China / Far East (1981: ethnic group not recorded; birth-origin used as proxy)',
    unit: 'percentage',
    year: 1981,
    category: 'ethnicity',
    field: 'pct_chinese_ethnic',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_chinese_ethnic_1991',
    label: 'Chinese Ethnicity %',
    description: '% residents of Chinese ethnic group',
    unit: 'percentage',
    year: 1991,
    category: 'ethnicity',
    field: 'pct_chinese_ethnic',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_chinese_ethnic_2001',
    label: 'Chinese Ethnicity %',
    description: '% residents of Chinese ethnic group (CT003EW)',
    unit: 'percentage',
    year: 2001,
    category: 'ethnicity',
    field: 'pct_chinese_ethnic',
    colorScheme: 'sequential',
  },
  {
    id: 'chinese_ethnic_count_1981',
    label: 'Chinese-Born Count',
    description: 'Count of residents born in China / Far East',
    unit: 'count',
    year: 1981,
    category: 'ethnicity',
    field: 'chinese_ethnic_count',
    colorScheme: 'sequential',
  },
  {
    id: 'chinese_ethnic_count_1991',
    label: 'Chinese Population',
    description: 'Count of residents of Chinese ethnic group',
    unit: 'count',
    year: 1991,
    category: 'ethnicity',
    field: 'chinese_ethnic_count',
    colorScheme: 'sequential',
  },
  {
    id: 'chinese_ethnic_count_2001',
    label: 'Chinese Population',
    description: 'Count of residents of Chinese ethnic group (CT003EW)',
    unit: 'count',
    year: 2001,
    category: 'ethnicity',
    field: 'chinese_ethnic_count',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_china_born_1981',
    label: 'China-Born %',
    description: '% residents born in China / Far East',
    unit: 'percentage',
    year: 1981,
    category: 'ethnicity',
    field: 'pct_china_born',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_china_born_1991',
    label: 'China-Born %',
    description: '% residents born in China',
    unit: 'percentage',
    year: 1991,
    category: 'ethnicity',
    field: 'pct_china_born',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_china_born_2001',
    label: 'Asia-Born % (proxy)',
    description: '% residents born in Asia (broad proxy — China-specific COB not available at ward level in 2001)',
    unit: 'percentage',
    year: 2001,
    category: 'ethnicity',
    field: 'pct_china_born',
    colorScheme: 'sequential',
  },

  // ------------------------------------------------------------------ //
  // HOUSING
  // ------------------------------------------------------------------ //
  {
    id: 'pct_owner_occ_1981',
    label: 'Homeownership %',
    description: '% households in owner-occupied tenure',
    unit: 'percentage',
    year: 1981,
    category: 'housing',
    field: 'pct_owner_occ',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_owner_occ_1991',
    label: 'Chinese Homeownership %',
    description: '% Chinese households in owner-occupied tenure (1991: Chinese sub-population only)',
    unit: 'percentage',
    year: 1991,
    category: 'housing',
    field: 'pct_owner_occ',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_owner_occ_2001',
    label: 'Homeownership %',
    description: '% household spaces that are owner-occupied (CS049EW)',
    unit: 'percentage',
    year: 2001,
    category: 'housing',
    field: 'pct_owner_occ',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_social_rent_1981',
    label: 'Social Renting %',
    description: '% households in social rented tenure',
    unit: 'percentage',
    year: 1981,
    category: 'housing',
    field: 'pct_social_rent',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_social_rent_2001',
    label: 'Council/RSL Renting %',
    description: '% household spaces rented from council or registered social landlord (CS049EW)',
    unit: 'percentage',
    year: 2001,
    category: 'housing',
    field: 'pct_social_rent',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_private_rent_2001',
    label: 'Private Renting %',
    description: '% household spaces in private rented tenure (CS049EW)',
    unit: 'percentage',
    year: 2001,
    category: 'housing',
    field: 'pct_private_rent',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_no_car_1981',
    label: 'No Car %',
    description: '% households with no car or van',
    unit: 'percentage',
    year: 1981,
    category: 'housing',
    field: 'pct_no_car',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_no_car_2001',
    label: 'No Car %',
    description: '% household spaces with no car or van (CS060EW)',
    unit: 'percentage',
    year: 2001,
    category: 'housing',
    field: 'pct_no_car',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_overcrowd_1981',
    label: 'Overcrowding %',
    description: '% households with >1.5 persons per room',
    unit: 'percentage',
    year: 1981,
    category: 'housing',
    field: 'pct_overcrowd',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_overcrowd_1991',
    label: 'Chinese Overcrowding %',
    description: '% Chinese households with >1.5 persons per room (1991: Chinese sub-population only)',
    unit: 'percentage',
    year: 1991,
    category: 'housing',
    field: 'pct_overcrowd',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_overcrowd_2001',
    label: 'Overcrowding %',
    description: '% household spaces with >1 person per room (CS052EW)',
    unit: 'percentage',
    year: 2001,
    category: 'housing',
    field: 'pct_overcrowd',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_no_bath_wc_1981',
    label: 'No Bath/WC %',
    description: '% households lacking bath or WC',
    unit: 'percentage',
    year: 1981,
    category: 'housing',
    field: 'pct_no_bath_wc',
    colorScheme: 'sequential',
  },
  {
    id: 'pct_no_bath_wc_2001',
    label: 'No Bath/WC %',
    description: '% household spaces lacking exclusive use of bath/shower and toilet (CS056EW)',
    unit: 'percentage',
    year: 2001,
    category: 'housing',
    field: 'pct_no_bath_wc',
    colorScheme: 'sequential',
  },

  // ------------------------------------------------------------------ //
  // EMPLOYMENT / ECONOMY
  // ------------------------------------------------------------------ //
  {
    id: 'emp_rate_1981',
    label: 'Employment Rate %',
    description: '% residents aged 16+ who are employed',
    unit: 'percentage',
    year: 1981,
    category: 'employment',
    field: 'emp_rate',
    colorScheme: 'sequential',
  },
  {
    id: 'emp_rate_1991',
    label: 'Chinese Econ. Activity %',
    description: '% Chinese residents economically active (1991: Chinese sub-population only)',
    unit: 'percentage',
    year: 1991,
    category: 'employment',
    field: 'emp_rate',
    colorScheme: 'sequential',
  },
  {
    id: 'emp_rate_2001',
    label: 'Economic Activity %',
    description: '% residents aged 16–74 who are economically active (CS028EW)',
    unit: 'percentage',
    year: 2001,
    category: 'employment',
    field: 'emp_rate',
    colorScheme: 'sequential',
  },
  {
    id: 'unemployment_rate_1991',
    label: 'Chinese Unemployment %',
    description: '% economically active Chinese residents who are unemployed (1991: Chinese sub-population only)',
    unit: 'percentage',
    year: 1991,
    category: 'employment',
    field: 'unemployment_rate',
    colorScheme: 'sequential',
  },
  {
    id: 'unemployment_rate_2001',
    label: 'Unemployment %',
    description: '% residents aged 16–74 who are unemployed — ILO definition (CS028EW)',
    unit: 'percentage',
    year: 2001,
    category: 'employment',
    field: 'unemployment_rate',
    colorScheme: 'sequential',
  },
  {
    id: 'self_employment_rate_2001',
    label: 'Self-Employment %',
    description: '% residents aged 16–74 who are self-employed (CS028EW)',
    unit: 'percentage',
    year: 2001,
    category: 'employment',
    field: 'self_employment_rate',
    colorScheme: 'sequential',
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Get all indicators available for a specific census year */
export function getIndicatorsByYear(year: 1981 | 1991 | 2001): IndicatorMetadata[] {
  return AVAILABLE_INDICATORS.filter((ind) => ind.year === year);
}

/** Get indicators filtered by theme/category */
export function getIndicatorsByCategory(
  category: 'demographic' | 'ethnicity' | 'housing' | 'employment'
): IndicatorMetadata[] {
  return AVAILABLE_INDICATORS.filter((ind) => ind.category === category);
}

/** Look up a single indicator by its unique ID */
export function getIndicatorById(id: string): IndicatorMetadata | undefined {
  return AVAILABLE_INDICATORS.find((ind) => ind.id === id);
}

/** Return a sensible default indicator for the given year */
export function getDefaultIndicator(year: 1981 | 1991 | 2001): IndicatorMetadata {
  const yearIndicators = getIndicatorsByYear(year);
  // Default: ethnicity (most thematically relevant for this project)
  return (
    yearIndicators.find((ind) => ind.category === 'ethnicity') ??
    yearIndicators[0] ??
    AVAILABLE_INDICATORS[0]
  );
}

