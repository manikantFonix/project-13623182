export type RecomputeState = 'populated' | 'none' | 'loading' | 'error';

export interface EstimateLines {
  metal: number;
  stones: number;
  labour: number;
}

export interface Estimate {
  id: string;
  reference: string;
  retailer: string;
  piece: string;
  shownRange: string;
  shownLines: EstimateLines;
  nowRange: string;
  nowLines: EstimateLines;
  date: string;
}

export const PERIOD_LABEL = 'Last 7 days';
export const TOTAL_IN_PERIOD = 1284;
export const RECOMPUTES_TODAY = 12;

export const ESTIMATES: Estimate[] = [
  {
    id: 'e-0425',
    reference: 'E-20260828-0425',
    retailer: 'Halden & Voss',
    piece: 'Ring, natural, white',
    shownRange: '$1,120 – $1,230',
    shownLines: { metal: 480, stones: 520, labour: 120 },
    nowRange: '$1,140 – $1,250',
    nowLines: { metal: 480, stones: 520, labour: 140 },
    date: '28 August 2026',
  },
  {
    id: 'e-0412',
    reference: 'E-20260828-0412',
    retailer: 'Aurora & Co',
    piece: 'Ring, lab-grown, yellow',
    shownRange: '$500 – $550',
    shownLines: { metal: 210, stones: 240, labour: 53 },
    nowRange: '$500 – $550',
    nowLines: { metal: 210, stones: 240, labour: 53 },
    date: '28 August 2026',
  },
  {
    id: 'e-0388',
    reference: 'E-20260828-0388',
    retailer: 'Lune Atelier',
    piece: 'Pendant, natural, white',
    shownRange: '$1,240 – $1,370',
    shownLines: { metal: 520, stones: 610, labour: 130 },
    nowRange: '$1,270 – $1,400',
    nowLines: { metal: 545, stones: 610, labour: 133 },
    date: '28 August 2026',
  },
  {
    id: 'e-0201',
    reference: 'E-20260827-0201',
    retailer: 'Marchetti Fine Jewellery',
    piece: 'Earring, natural, rose',
    shownRange: '$2,890 – $3,180',
    shownLines: { metal: 1410, stones: 1290, labour: 224 },
    nowRange: '$2,890 – $3,180',
    nowLines: { metal: 1410, stones: 1290, labour: 224 },
    date: '27 August 2026',
  },
  {
    id: 'e-0164',
    reference: 'E-20260827-0164',
    retailer: 'Ortega Goldsmiths',
    piece: 'Bracelet, lab-grown, yellow',
    shownRange: '$760 – $840',
    shownLines: { metal: 330, stones: 340, labour: 71 },
    nowRange: '$760 – $840',
    nowLines: { metal: 330, stones: 340, labour: 71 },
    date: '27 August 2026',
  },
  {
    id: 'e-0091',
    reference: 'E-20260826-0091',
    retailer: 'Aurora & Co',
    piece: 'Necklace, natural, white',
    shownRange: '$1,980 – $2,180',
    shownLines: { metal: 980, stones: 890, labour: 141 },
    nowRange: '$1,980 – $2,180',
    nowLines: { metal: 980, stones: 890, labour: 141 },
    date: '26 August 2026',
  },
];

export const LINE_LABELS: { key: keyof EstimateLines; label: string }[] = [
  { key: 'metal', label: 'Metal' },
  { key: 'stones', label: 'Stones' },
  { key: 'labour', label: 'Labor' },
];

export const money = (value: number): string => `$${value.toLocaleString('en-US')}`;

export const findEstimate = (reference: string): Estimate | undefined =>
  ESTIMATES.find((estimate) => estimate.reference === reference);

export const filterEstimates = (query: string): Estimate[] => {
  const term = query.trim().toLowerCase();
  if (!term) return ESTIMATES;
  return ESTIMATES.filter(
    (estimate) =>
      estimate.reference.toLowerCase().includes(term) ||
      estimate.retailer.toLowerCase().includes(term)
  );
};

export const changedLines = (estimate: Estimate): { label: string; delta: number }[] =>
  LINE_LABELS.map((line) => ({
    label: line.label.toLowerCase(),
    delta: estimate.nowLines[line.key] - estimate.shownLines[line.key],
  })).filter((row) => row.delta !== 0);

export const estimateMatches = (estimate: Estimate): boolean =>
  estimate.shownRange === estimate.nowRange && changedLines(estimate).length === 0;

export const labourOnlyChange = (estimate: Estimate): boolean => {
  const rows = changedLines(estimate);
  return rows.length === 1 && rows[0].label === 'labor';
};

export const differenceSentence = (estimate: Estimate): string => {
  const rows = changedLines(estimate);
  if (rows.length === 0) return '';
  const parts = rows.map(
    (row) => `the ${row.label} line is ${money(Math.abs(row.delta))} ${row.delta > 0 ? 'higher' : 'lower'}`
  );
  const list = parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
  return `${list.charAt(0).toUpperCase()}${list.slice(1)} than when this estimate ran.`;
};