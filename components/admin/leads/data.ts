export type LeadsState = 'populated' | 'quiet' | 'loading' | 'error';
export type LeadsPeriodId = '30d' | '90d';

export interface LeadsPeriodOption {
  id: LeadsPeriodId;
  label: string;
  range: string;
}

export const leadsPeriods: LeadsPeriodOption[] = [
  { id: '30d', label: 'Last 30 days', range: '1 – 30 August 2026' },
  { id: '90d', label: 'Last 90 days', range: '2 June – 30 August 2026' },
];

export const leadsPeriodFor = (id: LeadsPeriodId): LeadsPeriodOption =>
  leadsPeriods.find((p) => p.id === id)!;

export interface LeadRetailer {
  id: string;
  name: string;
  received: number;
  accepted: number;
  rejected: number;
  undecided: number;
}

export interface LeadsTotals {
  received: number;
  decided: number;
  accepted: number;
  undecided: number;
}

export interface LeadsOriginData {
  catalogs: number;
  widgets: number;
}

export interface LeadsBucket {
  totals: LeadsTotals;
  origin: LeadsOriginData;
  retailers: LeadRetailer[];
}

export const decidedOf = (r: LeadRetailer): number => r.accepted + r.rejected;

export const decidedPct = (r: LeadRetailer): number =>
  r.received <= 0 ? 0 : Math.round((decidedOf(r) / r.received) * 100);

export const needsNudge = (r: LeadRetailer): boolean => r.undecided * 2 > r.received;

function orderRetailers(list: LeadRetailer[]): LeadRetailer[] {
  return [...list].sort(
    (a, b) =>
      b.undecided - a.undecided || b.received - a.received || a.name.localeCompare(b.name)
  );
}

const RETAILERS_30: LeadRetailer[] = orderRetailers([
  { id: 'marchetti', name: 'Marchetti Fine Jewellery', received: 148, accepted: 31, rejected: 4, undecided: 113 },
  { id: 'verity', name: 'Verity Jewels', received: 74, accepted: 0, rejected: 0, undecided: 74 },
  { id: 'lune', name: 'Lune Atelier', received: 184, accepted: 122, rejected: 52, undecided: 10 },
  { id: 'aurora', name: 'Aurora & Co', received: 162, accepted: 141, rejected: 18, undecided: 3 },
  { id: 'hallam', name: 'Hallam & Finch', received: 121, accepted: 98, rejected: 20, undecided: 3 },
  { id: 'ortega', name: 'Ortega Goldsmiths', received: 96, accepted: 64, rejected: 28, undecided: 4 },
  { id: 'bright', name: 'Bright & Stone', received: 88, accepted: 71, rejected: 13, undecided: 4 },
  { id: 'pearl', name: 'Pearl & Vine', received: 61, accepted: 52, rejected: 8, undecided: 1 },
]);

const RETAILERS_90: LeadRetailer[] = orderRetailers([
  { id: 'marchetti', name: 'Marchetti Fine Jewellery', received: 441, accepted: 92, rejected: 11, undecided: 338 },
  { id: 'verity', name: 'Verity Jewels', received: 214, accepted: 0, rejected: 0, undecided: 214 },
  { id: 'lune', name: 'Lune Atelier', received: 552, accepted: 366, rejected: 156, undecided: 30 },
  { id: 'aurora', name: 'Aurora & Co', received: 486, accepted: 423, rejected: 54, undecided: 9 },
  { id: 'hallam', name: 'Hallam & Finch', received: 363, accepted: 294, rejected: 60, undecided: 9 },
  { id: 'ortega', name: 'Ortega Goldsmiths', received: 288, accepted: 192, rejected: 84, undecided: 12 },
  { id: 'bright', name: 'Bright & Stone', received: 264, accepted: 213, rejected: 39, undecided: 12 },
  { id: 'pearl', name: 'Pearl & Vine', received: 183, accepted: 156, rejected: 24, undecided: 3 },
]);

const BUCKETS: Record<LeadsPeriodId, LeadsBucket> = {
  '30d': {
    totals: { received: 1060, decided: 712, accepted: 498, undecided: 348 },
    origin: { catalogs: 742, widgets: 318 },
    retailers: RETAILERS_30,
  },
  '90d': {
    totals: { received: 2791, decided: 2164, accepted: 1736, undecided: 627 },
    origin: { catalogs: 1954, widgets: 837 },
    retailers: RETAILERS_90,
  },
};

const ZERO: LeadsBucket = {
  totals: { received: 0, decided: 0, accepted: 0, undecided: 0 },
  origin: { catalogs: 0, widgets: 0 },
  retailers: [],
};

export interface LeadsView {
  period: LeadsPeriodOption;
  totals: LeadsTotals;
  origin: LeadsOriginData;
  retailers: LeadRetailer[];
  quiet: boolean;
}

export function getLeadsView(state: LeadsState, period: LeadsPeriodId): LeadsView {
  const bucket = state === 'quiet' ? ZERO : BUCKETS[period];
  return {
    period: leadsPeriodFor(period),
    totals: bucket.totals,
    origin: bucket.origin,
    retailers: bucket.retailers,
    quiet: state === 'quiet',
  };
}