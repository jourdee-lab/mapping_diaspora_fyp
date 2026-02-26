export interface HistoricalRecord {
  id: string;
  latitude: number;
  longitude: number;
  year: number;
  type: 'residence' | 'business' | 'institution';
  ethnicity?: string;
  businessType?: string;
  address: string;
  metadata: Record<string, unknown>;
}

export interface TimeRange {
  start: number;
  end: number;
}

export interface FilterState {
  types: Set<string>;
  ethnicities: Set<string>;
  businessTypes: Set<string>;
  timeRange: TimeRange;
}

// ============================================================================
// Census Data Types (Choropleth Mapping)
// ============================================================================

// ---------------------------------------------------------------------------
// Harmonised ward-level schema (Phase 10) — shared across 1981 / 1991 / 2001
// All keys are present in every GeoJSON file; missing values are null.
// ---------------------------------------------------------------------------

export type DecadeYear = 1981 | 1991 | 2001;

/**
 * Normalised properties for a ward feature in any decade GeoJSON.
 * Keys are identical across manchester_wards_1981/1991/2001.geojson.
 */
export interface WardFeatureProperties {
  // Geographic
  ward_code: string;
  ward_name: string;
  year: DecadeYear;

  // Population
  total_population: number | null;
  pct_male: number | null;
  pct_female: number | null;

  // Ethnicity / Origin
  /** 1981: Far-East born count; 1991: Chinese ethnic count; 2001: Chinese ethnic count */
  chinese_ethnic_count: number | null;
  /** 1981: % Far-East born (proxy); 1991: % Chinese ethnic; 2001: % Chinese ethnic */
  pct_chinese_ethnic: number | null;
  /** 1981: Far-East born count; 1991: China-born count; 2001: Asia-born count (proxy) */
  china_born_count: number | null;
  /** 1981: % Far-East born; 1991: % China-born; 2001: % Asia-born (proxy) */
  pct_china_born: number | null;

  // Housing / Tenure
  total_hh: number | null;
  pct_owner_occ: number | null;
  pct_social_rent: number | null;
  pct_private_rent: number | null;
  pct_no_car: number | null;
  pct_overcrowd: number | null;
  pct_no_bath_wc: number | null;

  // Economy
  /** 1981: % employed; 1991: Chinese sub-pop econ active %; 2001: % econ active 16–74 */
  emp_rate: number | null;
  unemployment_rate: number | null;
  self_employment_rate: number | null;

  // Data quality
  interp_coverage: number | null;
  interp_uncertainty: string | null;
}

/**
 * GeoJSON Feature for a harmonised ward
 */
export interface WardFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
  properties: WardFeatureProperties;
}

/**
 * GeoJSON FeatureCollection for harmonised ward data
 */
export interface WardGeoJSON {
  type: 'FeatureCollection';
  features: WardFeature[];
}

// ---------------------------------------------------------------------------
// Legacy ED/OA-level interfaces (kept for reference — not used by choropleth)
// ---------------------------------------------------------------------------

/**
 * Properties for 1981 ED-level census indicators
 */
export interface CensusProperties1981 {
  // Geographic identifiers
  zoneid: string;
  ED_NAME?: string;
  
  // Demographic base (SAS02)
  TOTAL_RES_1981?: number;
  PCT_MALE_1981?: number;
  PCT_FEMALE_1981?: number;
  
  // Chinese / Far East presence (SAS04)
  CHINESE_BORN_1981?: number;
  FAR_EAST_BORN_1981?: number;
  PCT_CHINESE_BORN_1981?: number;
  
  // Housing and tenure (SAS10)
  TOTAL_HH_1981?: number;
  OWNER_OCC_HH_1981?: number;
  SOCIAL_RENT_HH_1981?: number;
  NO_CAR_HH_1981?: number;
  OVERCROWD_GT1P5_1981?: number;
  NO_BATH_OR_WC_HH_1981?: number;
  NO_INSIDE_BATH_OR_WC_1981?: number;
  
  PCT_OWNER_OCC_1981?: number;
  PCT_SOCIAL_RENT_1981?: number;
  PCT_NO_CAR_1981?: number;
  PCT_OVERCROWD_GT1P5_1981?: number;
  PCT_NO_BATH_OR_WC_1981?: number;
  
  // Employment / economic position (SAS07)
  RES_16PLUS_1981?: number;
  EMPLOYED_1981?: number;
  UNEMPLOYED_1981?: number;
  EMP_RATE_1981?: number;
  UNEMP_RATE_1981?: number;
}

/**
 * Properties for 1991 ED-level census indicators
 */
export interface CensusProperties1991 {
  // Geographic identifiers
  zoneid: string;
  name?: string;
  label?: string;
  ward_code?: string;
  year?: number;
  
  // Demographic base
  TOTAL_RES_1991?: number;
  TOTAL_MALE_1991?: number;
  TOTAL_FEMALE_1991?: number;
  
  // Chinese ethnic group
  CHINESE_ETHNIC_1991?: number;
  CHINESE_ETHNIC_MALE_1991?: number;
  CHINESE_ETHNIC_FEMALE_1991?: number;
  PCT_CHINESE_ETHNIC_1991?: number;
  
  // Chinese age structure
  CHINESE_AGE_0_4_1991?: number;
  CHINESE_AGE_5_15_1991?: number;
  CHINESE_AGE_16_29_1991?: number;
  CHINESE_AGE_30_PENSION_1991?: number;
  CHINESE_PENSIONABLE_1991?: number;
  CHINESE_LIMITING_ILLNESS_1991?: number;
  
  // Country of birth
  CHINA_BORN_1991?: number;
  PCT_CHINA_BORN_1991?: number;
  
  // Economic activity
  CHINESE_16PLUS_1991?: number;
  CHINESE_ECON_ACTIVE_1991?: number;
  CHINESE_UNEMPLOYED_1991?: number;
  
  // Housing
  CHINESE_HOUSEHOLDS_1991?: number;
  CHINESE_OVERCROWD_GT1P5_1991?: number;
  CHINESE_OWNER_OCC_1991?: number;
  PCT_CHINESE_OVERCROWD_1991?: number;
  PCT_CHINESE_OWNER_OCC_1991?: number;
}

/**
 * Properties for 2001 OA-level census indicators
 */
export interface CensusProperties2001 {
  // Geographic identifiers
  zoneid: string;
  OA01CD?: string;
  OA01CDOLD?: string;
  ward_code?: string;
  year?: number;

  // Demographic base (CS001EW)
  total_pop?: number;

  // Ethnicity (CT003EW)
  chinese_ethnic_count?: number;
  chinese_ethnic_pct?: number;

  // Country of birth – Asia proxy (CS015EW)
  asia_born_count?: number;
  asia_born_pct?: number;
  asia_born_pct_is_proxy?: boolean;

  // Economic activity (CS028EW, base = persons 16–74)
  pop_16_74?: number;
  econ_active_rate?: number;
  unemployment_rate?: number;
  self_employment_rate?: number;

  // Tenure (CS049EW)
  total_hh_spaces?: number;
  owner_occ_rate?: number;
  council_rent_rate?: number;
  private_rent_rate?: number;

  // Overcrowding (CS052EW)
  overcrowd_rate?: number;
  overcrowd_severe_rate?: number;

  // Amenities (CS056EW)
  no_bath_wc_rate?: number;

  // Car ownership (CS060EW)
  no_car_rate?: number;
}

/**
 * Union type for all census year properties
 */
export type CensusProperties =
  | WardFeatureProperties
  | CensusProperties1981
  | CensusProperties1991
  | CensusProperties2001;

/**
 * GeoJSON Feature for census data with typed properties
 */
export interface CensusFeature<T extends CensusProperties = WardFeatureProperties> {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
  properties: T;
}

/**
 * GeoJSON FeatureCollection for census data.
 * The default type parameter is WardFeatureProperties (harmonised ward schema).
 */
export interface CensusGeoJSON<T extends CensusProperties = WardFeatureProperties> {
  type: 'FeatureCollection';
  features: CensusFeature<T>[];
}

/**
 * Available indicator fields for choropleth mapping
 */
export interface IndicatorMetadata {
  id: string;
  label: string;
  description: string;
  unit: 'percentage' | 'count' | 'rate';
  year: 1981 | 1991 | 2001;
  category: 'demographic' | 'ethnicity' | 'housing' | 'employment';
  field: string;  // Can be any property key from CensusProperties
  minValue?: number;
  maxValue?: number;
  colorScheme: 'sequential' | 'diverging' | 'categorical';
}

/**
 * Choropleth map configuration
 */
export interface ChoroplethConfig {
  indicator: IndicatorMetadata;
  year: 1981 | 1991 | 2001;
  colorSteps: number;
  classificationMethod: 'quantile' | 'equalInterval' | 'naturalBreaks' | 'manual';
  customBreaks?: number[];
  colorPalette: string[];
  opacity: number;
  showLegend: boolean;
  showTooltip: boolean;
}
