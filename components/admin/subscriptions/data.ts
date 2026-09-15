import { PLANS } from '../plans/data';

export type SubStatus = 'active' | 'cancelling' | 'awaiting' | 'disabled';

export type SubsState =
  | 'populated'
  | 'noMatch'
  | 'sortConsumption'
  | 'sortBurn'
  | 'loading'
  | 'error';

export type SortKey = 'name' | 'plan' | 'period' | 'consumption' | 'burn';
export type SortDir = 'asc' | 'desc';

export interface SortState {
  key: SortKey;
  dir: SortDir;
}

export interface SubRow {
  id: string;
  name: string;
  planId: string;
  planName: string;
  allowance: number;
  status: SubStatus;
  daysLeft: number | null;
  used: number | null;
  topUp: number;
  consumed: number | null;
}

const SEEDS: SubRow[] = [
  {
    id: 'lune',
    name: 'Lune Atelier',
    planId: 'storefront',
    planName: 'Storefront',
    allowance: 3500,
    status: 'active',
    daysLeft: 12,
    used: 2870,
    topUp: 120,
    consumed: 2990,
  },
  {
    id: 'aurora',
    name: 'Aurora & Co',
    planId: 'storefront',
    planName: 'Storefront',
    allowance: 3500,
    status: 'active',
    daysLeft: 9,
    used: 3500,
    topUp: 0,
    consumed: 3500,
  },
  {
    id: 'brightstone',
    name: 'Bright & Stone',
    planId: 'catalog',
    planName: 'Catalog',
    allowance: 1200,
    status: 'disabled',
    daysLeft: 0,
    used: 1200,
    topUp: 0,
    consumed: 1200,
  },
  {
    id: 'marchetti',
    name: 'Marchetti Fine Jewellery',
    planId: 'catalog',
    planName: 'Catalog',
    allowance: 1200,
    status: 'cancelling',
    daysLeft: 6,
    used: 1010,
    topUp: 40,
    consumed: 1050,
  },
  {
    id: 'northgate',
    name: 'Northgate Jewellers',
    planId: 'catalog',
    planName: 'Catalog',
    allowance: 1200,
    status: 'active',
    daysLeft: 20,
    used: 990,
    topUp: 50,
    consumed: 1040,
  },
  {
    id: 'hallam',
    name: 'Hallam & Finch',
    planId: 'studio',
    planName: 'Studio',
    allowance: 300,
    status: 'active',
    daysLeft: 3,
    used: 261,
    topUp: 25,
    consumed: 286,
  },
  {
    id: 'cleo',
    name: 'Cleo Atelier',
    planId: 'studio',
    planName: 'Studio',
    allowance: 300,
    status: 'active',
    daysLeft: 1,
    used: 296,
    topUp: 0,
    consumed: 296,
  },
  {
    id: 'verity',
    name: 'Verity Jewels',
    planId: 'catalog',
    planName: 'Catalog',
    allowance: 1200,
    status: 'disabled',
    daysLeft: 0,
    used: 410,
    topUp: 75,
    consumed: 485,
  },
  {
    id: 'elara',
    name: 'Elara Fine Jewels',
    planId: 'storefront',
    planName: 'Storefront',
    allowance: 3500,
    status: 'active',
    daysLeft: 18,
    used: 1420,
    topUp: 200,
    consumed: 1620,
  },
  {
    id: 'rowan',
    name: 'Rowan & Vale',
    planId: 'catalog',
    planName: 'Catalog',
    allowance: 1200,
    status: 'active',
    daysLeft: 14,
    used: 640,
    topUp: 0,
    consumed: 640,
  },
  {
    id: 'ortega',
    name: 'Ortega Goldsmiths',
    planId: 'studio',
    planName: 'Studio',
    allowance: 300,
    status: 'active',
    daysLeft: 22,
    used: 88,
    topUp: 0,
    consumed: 88,
  },
  {
    id: 'sable',
    name: 'Sable & Marsh',
    planId: 'storefront',
    planName: 'Storefront',
    allowance: 3500,
    status: 'active',
    daysLeft: 25,
    used: 980,
    topUp: 0,
    consumed: 980,
  },
  {
    id: 'penrose',
    name: 'Penrose & Co',
    planId: 'catalog',
    planName: 'Catalog',
    allowance: 1200,
    status: 'active',
    daysLeft: 7,
    used: 620,
    topUp: 100,
    consumed: 720,
  },
  {
    id: 'hartley',
    name: 'Hartley & Sons',
    planId: 'storefront',
    planName: 'Storefront',
    allowance: 3500,
    status: 'active',
    daysLeft: 13,
    used: 1645,
    topUp: 250,
    consumed: 1895,
  },
  {
    id: 'wren',
    name: 'Wren Goldsmiths',
    planId: 'studio',
    planName: 'Studio',
    allowance: 300,
    status: 'active',
    daysLeft: 11,
    used: 210,
    topUp: 0,
    consumed: 210,
  },
  {
    id: 'quillon',
    name: 'Quillon Jewels',
    planId: 'catalog',
    planName: 'Catalog',
    allowance: 1200,
    status: 'active',
    daysLeft: 16,
    used: 528,
    topUp: 25,
    consumed: 553,
  },
  {
    id: 'avalon',
    name: 'Avalon Jewels',
    planId: 'catalog',
    planName: 'Catalog',
    allowance: 1200,
    status: 'active',
    daysLeft: 19,
    used: 300,
    topUp: 0,
    consumed: 300,
  },
  {
    id: 'ivy',
    name: 'Ivy & Stone',
    planId: 'studio',
    planName: 'Studio',
    allowance: 300,
    status: 'active',
    daysLeft: 27,
    used: 60,
    topUp: 0,
    consumed: 60,
  },
  {
    id: 'tanner',
    name: 'Tanner & Roe',
    planId: 'catalog',
    planName: 'Catalog',
    allowance: 1200,
    status: 'awaiting',
    daysLeft: null,
    used: null,
    topUp: 0,
    consumed: null,
  },
  {
    id: 'ashby',
    name: 'Ashby Fine',
    planId: 'studio',
    planName: 'Studio',
    allowance: 300,
    status: 'awaiting',
    daysLeft: null,
    used: null,
    topUp: 0,
    consumed: null,
  },
];

const PERIOD_DAYS = 30;

export interface SubView extends SubRow {
  includedLeft: number | null;
  usedShare: number | null;
  elapsedShare: number | null;
  burn: number | null;
  endsOn: string | null;
  atZero: boolean;
  burningFast: boolean;
}

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const today = new Date(Date.UTC(2026, 8, 15));

const endsOn = (daysLeft: number): string => {
  const date = new Date(today);
  date.setUTCDate(date.getUTCDate() + daysLeft);
  return `${date.getUTCDate()} ${MONTHS_SHORT[date.getUTCMonth()]}`;
};

export const fmtInt = (n: number): string => n.toLocaleString('en-US');

export const statusLabel: Record<SubStatus, string> = {
  active: 'Active',
  cancelling: 'Cancelling',
  awaiting: 'Awaiting a plan',
  disabled: 'Disabled',
};

export const statusTone: Record<SubStatus, 'success' | 'alert' | 'neutral'> = {
  active: 'success',
  cancelling: 'alert',
  awaiting: 'neutral',
  disabled: 'neutral',
};

export const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'cancelling', label: 'Cancelling' },
  { value: 'awaiting', label: 'Awaiting a plan' },
  { value: 'disabled', label: 'Disabled' },
];

export const PLAN_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All plans' },
  ...PLANS.filter((plan) => plan.status === 'live').map((plan) => ({
    value: plan.id,
    label: plan.name,
  })),
];

const view = (row: SubRow): SubView => {
  const awaiting = row.status === 'awaiting' || row.used === null || row.daysLeft === null;
  const includedLeft = awaiting ? null : row.allowance - (row.used ?? 0);
  const usedShare = awaiting ? null : Math.round(((row.used ?? 0) / row.allowance) * 100);
  const elapsedShare = awaiting
    ? null
    : Math.round(((PERIOD_DAYS - (row.daysLeft ?? 0)) / PERIOD_DAYS) * 100);
  const burn =
    awaiting || !usedShare || !elapsedShare ? null : Number((usedShare / elapsedShare).toFixed(1));
  const atZero = !awaiting && includedLeft !== null && includedLeft <= 0 && row.topUp <= 0;
  const burningFast = !awaiting && usedShare !== null && elapsedShare !== null && usedShare - elapsedShare >= 20;

  return {
    ...row,
    includedLeft,
    usedShare,
    elapsedShare,
    burn,
    endsOn: row.daysLeft === null ? null : endsOn(row.daysLeft),
    atZero,
    burningFast,
  };
};

export const ROWS: SubView[] = SEEDS.map(view);

export const consumedTotal = (rows: SubView[]): number =>
  rows.reduce((sum, row) => sum + (row.consumed ?? 0), 0);

export const activeCount = (rows: SubView[]): number =>
  rows.filter((row) => row.status === 'active').length;

export const cancellingCount = (rows: SubView[]): number =>
  rows.filter((row) => row.status === 'cancelling').length;

export const atZeroCount = (rows: SubView[]): number => rows.filter((row) => row.atZero).length;

export const filterRows = (rows: SubView[], status: string, plan: string, query: string): SubView[] => {
  const term = query.trim().toLowerCase();
  return rows.filter((row) => {
    if (status !== 'all' && row.status !== status) return false;
    if (plan !== 'all' && row.planId !== plan) return false;
    if (term && !row.name.toLowerCase().includes(term)) return false;
    return true;
  });
};

const numeric = (value: number | null): number => (value === null ? Number.NEGATIVE_INFINITY : value);

export const sortRows = (rows: SubView[], sort: SortState): SubView[] => {
  const direction = sort.dir === 'asc' ? 1 : -1;
  const sorted = [...rows].sort((a, b) => {
    let result = 0;
    switch (sort.key) {
      case 'name':
        result = a.name.localeCompare(b.name);
        break;
      case 'plan':
        result = a.planName.localeCompare(b.planName) || a.name.localeCompare(b.name);
        break;
      case 'period':
        result = numeric(a.daysLeft) - numeric(b.daysLeft);
        break;
      case 'consumption':
        result = numeric(a.consumed) - numeric(b.consumed);
        break;
      case 'burn':
        result = numeric(a.burn) - numeric(b.burn);
        break;
      default:
        result = 0;
    }
    return result * direction;
  });
  return sorted;
};

export const sortDirectionName = (sort: SortState): string => (sort.dir === 'asc' ? 'ascending' : 'descending');

export const sortAnnouncement = (sort: SortState): string => {
  const labels: Record<SortKey, string> = {
    name: 'retailer',
    plan: 'plan',
    period: 'period remaining',
    consumption: 'consumption',
    burn: 'burn rate',
  };
  return `Sorted by ${labels[sort.key]}, ${sort.dir === 'asc' ? 'lowest first' : 'highest first'}.`;
};