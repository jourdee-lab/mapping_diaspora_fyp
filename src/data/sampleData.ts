import { HistoricalRecord } from '@/types/data';

// Sample historical data for Manchester (1981-2001)
export const sampleData: HistoricalRecord[] = [
  // 1981 data
  {
    id: '1',
    latitude: 53.4808,
    longitude: -2.2426,
    year: 1981,
    type: 'residence',
    address: '45 Oxford Road',
    ethnicity: 'White British',
    metadata: { occupants: 4, condition: 'good' }
  },
  {
    id: '2',
    latitude: 53.4830,
    longitude: -2.2440,
    year: 1981,
    type: 'business',
    address: '78 Portland Street',
    businessType: 'Retail',
    metadata: { businessName: 'City Centre Store', employees: 12 }
  },
  {
    id: '3',
    latitude: 53.4790,
    longitude: -2.2450,
    year: 1981,
    type: 'institution',
    address: '12 Cambridge Street',
    metadata: { institutionName: 'Manchester Community Centre', institutionType: 'Community' }
  },
  // 1991 data
  {
    id: '4',
    latitude: 53.4815,
    longitude: -2.2380,
    year: 1991,
    type: 'residence',
    address: '23 Deansgate',
    ethnicity: 'Asian British',
    metadata: { occupants: 3, condition: 'moderate' }
  },
  {
    id: '5',
    latitude: 53.4795,
    longitude: -2.2465,
    year: 1991,
    type: 'business',
    address: '156 Market Street',
    businessType: 'Food & Drink',
    metadata: { businessName: 'Cafe Manchester', employees: 8 }
  },
  {
    id: '6',
    latitude: 53.4820,
    longitude: -2.2400,
    year: 1991,
    type: 'residence',
    address: '67 Piccadilly',
    ethnicity: 'Black British',
    metadata: { occupants: 5, condition: 'good' }
  },
  // 2001 data
  {
    id: '7',
    latitude: 53.4775,
    longitude: -2.2410,
    year: 2001,
    type: 'business',
    address: '89 King Street',
    businessType: 'Professional',
    metadata: { businessName: 'Tech Solutions Ltd', employees: 25 }
  },
  {
    id: '8',
    latitude: 53.4805,
    longitude: -2.2390,
    year: 2001,
    type: 'residence',
    address: '34 Canal Street',
    ethnicity: 'Mixed',
    metadata: { occupants: 2, condition: 'excellent' }
  },
  {
    id: '9',
    latitude: 53.4785,
    longitude: -2.2435,
    year: 2001,
    type: 'institution',
    address: '45 Princess Street',
    metadata: { institutionName: 'Manchester Arts Centre', institutionType: 'Cultural' }
  },
  {
    id: '10',
    latitude: 53.4800,
    longitude: -2.2420,
    year: 2001,
    type: 'business',
    address: '101 Mosley Street',
    businessType: 'Retail',
    metadata: { businessName: 'Modern Boutique', employees: 6 }
  },
];

export const availableYears = [1981, 1991, 2001];
export const availableEthnicities = ['White British', 'Asian British', 'Black British', 'Mixed', 'Other'];
export const availableBusinessTypes = ['Retail', 'Professional', 'Food & Drink', 'Technology', 'Creative'];
