export const ORDERED_ROUTES = [
  { path: '/', label: 'Interactive Map' },
  { path: '/census-explorer', label: 'Census Explorer' },
  { path: '/about', label: 'About' },
  { path: '/methodology', label: 'Methodology' },
  { path: '/findings', label: 'Findings' },
] as const;

export type RoutePath = (typeof ORDERED_ROUTES)[number]['path'];
