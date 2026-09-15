export interface EstimatorCategory {
  id: string;
  label: string;
  baseDays: number;
}

export interface Multipliers {
  mid: number;
  high: number;
}

export interface PriceApi {
  id: 'metal' | 'stone';
  label: string;
  purpose: string;
  provider: string;
  providers: string[];
  pollHours: number;
  keySet: boolean;
  keyLabel: string;
  keyTail: string;
  keyEnteredAt?: string;
  keyEnteredBy?: string;
}

export type HeldStatus = 'current' | 'beyond';

export interface HeldPrice {
  id: string;
  material: string;
  unit: string;
  price: string;
  capturedAt: string;
  status: HeldStatus;
}

export type EstimatorPreview =
  | 'default'
  | 'multiplier-changed'
  | 'multiplier-refused'
  | 'base-edited'
  | 'unsaved'
  | 'save-confirm'
  | 'saving'
  | 'save-failed'
  | 'price-beyond-window'
  | 'api-not-configured'
  | 'loading'
  | 'error';

export const SIMPLE_MULTIPLIER = 1.0;

export const DEFAULT_MULTIPLIERS: Multipliers = {
  mid: 1.4,
  high: 1.8,
};

export const DEFAULT_FALLBACK_LABOUR_RATE = 420;

export const RETAILERS_ON_DEFAULT_RATE = 9;

export const DEFAULT_UPLIFT_PERCENT = 10;

export const DEFAULT_ROUNDING = 10;

export const ESTIMATOR_CATEGORIES: EstimatorCategory[] = [
  { id: 'ring', label: 'Ring', baseDays: 1.5 },
  { id: 'pendant', label: 'Pendant', baseDays: 1.0 },
  { id: 'necklace', label: 'Necklace', baseDays: 2.5 },
  { id: 'earring', label: 'Earring', baseDays: 1.2 },
  { id: 'bracelet', label: 'Bracelet', baseDays: 2.0 },
  { id: 'brooch', label: 'Brooch', baseDays: 1.6 },
  { id: 'body', label: 'Body Jewelry', baseDays: 1.4 },
  { id: 'grillz', label: 'Grillz', baseDays: 2.2 },
  { id: 'watch', label: 'Watch', baseDays: 3.0 },
  { id: 'bail', label: 'Bail', baseDays: 0.6 },
  { id: 'clasp', label: 'Clasp', baseDays: 0.8 },
  { id: 'buckle', label: 'Buckle', baseDays: 1.1 },
  { id: 'cufflink', label: 'Cufflink', baseDays: 0.9 },
  { id: 'chain', label: 'Chain', baseDays: 1.8 },
];

export const DEFAULT_PRICE_APIS: PriceApi[] = [
  {
    id: 'metal',
    label: 'Metal price API',
    purpose: 'Supplies the daily metal prices the estimator reads.',
    provider: 'Metals-API',
    providers: ['Metals-API', 'GoldAPI', 'MetalpriceAPI'],
    pollHours: 12,
    keySet: true,
    keyLabel: 'API key',
    keyTail: '8ac1',
    keyEnteredAt: '2026-08-20',
    keyEnteredBy: 'Admin · R. Mensah',
  },
  {
    id: 'stone',
    label: 'Stone price API',
    purpose: 'Supplies the stone and diamond prices the estimator reads.',
    provider: 'Rapaport feed',
    providers: ['Rapaport feed', 'IDEX', 'StoneAlgo'],
    pollHours: 24,
    keySet: true,
    keyLabel: 'API key',
    keyTail: 'd47f',
    keyEnteredAt: '2026-08-20',
    keyEnteredBy: 'Admin · R. Mensah',
  },
];

export const HELD_PRICES: HeldPrice[] = [
  {
    id: 'gold-18',
    material: 'Gold 18k',
    unit: 'per gram',
    price: 'US$68.40',
    capturedAt: '2026-09-15 06:00',
    status: 'current',
  },
  {
    id: 'gold-24',
    material: 'Gold 24k',
    unit: 'per gram',
    price: 'US$91.10',
    capturedAt: '2026-09-15 06:00',
    status: 'current',
  },
  {
    id: 'platinum',
    material: 'Platinum 950',
    unit: 'per gram',
    price: 'US$34.75',
    capturedAt: '2026-09-15 06:00',
    status: 'current',
  },
  {
    id: 'silver',
    material: 'Silver 925',
    unit: 'per gram',
    price: 'US$1.12',
    capturedAt: '2026-09-15 06:00',
    status: 'current',
  },
  {
    id: 'diamond',
    material: 'Diamond · 1ct round',
    unit: 'per carat',
    price: 'US$4,180',
    capturedAt: '2026-09-15 06:00',
    status: 'current',
  },
];

export const REFRESH_UPLIFT_PERCENT = 5;
export const REFRESH_HOLD_DAYS = 2;

export const dayCount = (baseDays: number, multiplier: number): number => baseDays * multiplier;

export const fmtDays = (value: number): string => value.toFixed(2);

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const fmtDate = (iso: string): string => {
  const [date] = iso.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

export const fmtDateTime = (iso: string): string => {
  const [date, time] = iso.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}, ${time}`;
};

export const maskKey = (api: PriceApi): string =>
  `••••••••${api.keyTail}`;