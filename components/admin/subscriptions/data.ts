import { PLANS } from '../plans/data';

export type SubStatus = 'active' | 'trial' | 'cancelling' | 'awaiting' | 'disabled';

export type BillingCycle = 'monthly' | 'yearly';

export type SubsState =
  | 'populated'
  | 'noMatch'
  | 'sortConsumption'
  | 'topUp'
  | 'loading'
  | 'error';

export type SortKey = 'name' | 'plan' | 'period' | 'consumption';
export type SortDir = 'asc' | 'desc';

export interface SortState {
  key: SortKey;
  dir: SortDir;
}

export interface SubRow {
  id: string;
  name: string;
  email: string;
  planId: string;
  planName: string;
  allowance: number;
  status: SubStatus;
  cycle: BillingCycle;
  daysLeft: number | null;
  used: number | null;
  topUp: number;
  topUpTotal?: number;
  consumed: number | null;
}

const SEEDS: SubRow[] = [
  {
    id: 'lune',
    name: 'Lune Atelier',
    email: 'hello@luneatelier.com',
    cycle: 'monthly',
    planId: 'business',
    planName: 'Business',
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
    email: 'studio@auroraandco.com',
    planId: 'business',
    planName: 'Business',
    allowance: 3500,
    status: 'active',
    cycle: 'yearly',
    daysLeft: 110,
    used: 3500,
    topUp: 0,
    consumed: 3500,
  },
  {
    id: 'brightstone',
    name: 'Bright & Stone',
    email: 'accounts@brightandstone.co',
    cycle: 'monthly',
    planId: 'pro',
    planName: 'Pro',
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
    email: 'orders@marchettijewellery.com',
    cycle: 'monthly',
    planId: 'pro',
    planName: 'Pro',
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
    email: 'info@northgatejewellers.co.uk',
    cycle: 'monthly',
    planId: 'pro',
    planName: 'Pro',
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
    email: 'hello@hallamandfinch.com',
    cycle: 'monthly',
    planId: 'starter',
    planName: 'Starter',
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
    email: 'cleo@cleoatelier.co',
    cycle: 'monthly',
    planId: 'starter',
    planName: 'Starter',
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
    email: 'studio@verityjewels.com',
    cycle: 'monthly',
    planId: 'pro',
    planName: 'Pro',
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
    email: 'hello@elarafinejewels.com',
    planId: 'business',
    planName: 'Business',
    allowance: 3500,
    status: 'active',
    cycle: 'yearly',
    daysLeft: 219,
    used: 1420,
    topUp: 200,
    consumed: 1620,
  },
  {
    id: 'rowan',
    name: 'Rowan & Vale',
    email: 'shop@rowanandvale.co.uk',
    cycle: 'monthly',
    planId: 'pro',
    planName: 'Pro',
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
    email: 'ortega@ortegagoldsmiths.com',
    cycle: 'monthly',
    planId: 'starter',
    planName: 'Starter',
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
    email: 'hello@sableandmarsh.com',
    planId: 'business',
    planName: 'Business',
    allowance: 3500,
    status: 'active',
    cycle: 'yearly',
    daysLeft: 303,
    used: 980,
    topUp: 0,
    consumed: 980,
  },
  {
    id: 'penrose',
    name: 'Penrose & Co',
    email: 'team@penroseandco.com',
    cycle: 'monthly',
    planId: 'pro',
    planName: 'Pro',
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
    email: 'sales@hartleyandsons.co.uk',
    planId: 'business',
    planName: 'Business',
    allowance: 3500,
    status: 'active',
    cycle: 'yearly',
    daysLeft: 157,
    used: 1645,
    topUp: 250,
    consumed: 1895,
  },
  {
    id: 'wren',
    name: 'Wren Goldsmiths',
    email: 'studio@wrengoldsmiths.co.uk',
    cycle: 'monthly',
    planId: 'starter',
    planName: 'Starter',
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
    email: 'hello@quillonjewels.com',
    cycle: 'monthly',
    planId: 'pro',
    planName: 'Pro',
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
    email: 'shop@avalonjewels.com',
    cycle: 'monthly',
    planId: 'pro',
    planName: 'Pro',
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
    email: 'hello@ivyandstone.com',
    cycle: 'monthly',
    planId: 'starter',
    planName: 'Starter',
    allowance: 300,
    status: 'trial',
    daysLeft: 8,
    used: 60,
    topUp: 0,
    consumed: 60,
  },
  {
    id: 'tanner',
    name: 'Tanner & Roe',
    email: 'team@tannerandroe.co.uk',
    cycle: 'monthly',
    planId: 'pro',
    planName: 'Pro',
    allowance: 1200,
    status: 'trial',
    daysLeft: 9,
    used: 210,
    topUp: 0,
    consumed: 210,
  },
  {
    id: 'ashby',
    name: 'Ashby Fine',
    email: 'hello@ashbyfine.com',
    cycle: 'monthly',
    planId: 'starter',
    planName: 'Starter',
    allowance: 300,
    status: 'awaiting',
    daysLeft: null,
    used: null,
    topUp: 0,
    consumed: null,
  },
];

const CYCLE_DAYS: Record<BillingCycle, number> = { monthly: 30, yearly: 365 };

export const cycleLabel = (cycle: BillingCycle): string =>
  cycle === 'yearly' ? 'Yearly' : 'Monthly';

export interface SubView extends SubRow {
  cycleDays: number;
  nextBillingOn: string | null;
  nextBillingLabel: string;
  includedLeft: number | null;
  usedShare: number | null;
  elapsedShare: number | null;
  burn: number | null;
  endsOn: string | null;
  atZero: boolean;
  burningFast: boolean;
  onTrial: boolean;
  topUpTotal: number;
  topUpUsed: number;
  onTopUp: boolean;
  paymentBrand: string | null;
  paymentLast4: string | null;
  paymentExpiry: string | null;
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
  trial: 'Free trial',
  cancelling: 'Cancelling',
  awaiting: 'Free Trial',
  disabled: 'Inactive',
};

export const statusTone: Record<SubStatus, 'success' | 'alert' | 'neutral'> = {
  active: 'success',
  trial: 'success',
  cancelling: 'alert',
  awaiting: 'neutral',
  disabled: 'neutral',
};

export const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'trial', label: 'Free trial' },
  { value: 'cancelling', label: 'Cancelling' },
  { value: 'awaiting', label: 'Free Trial' },
  { value: 'disabled', label: 'Inactive' },
];

export const PLAN_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All plans' },
  { value: 'trial', label: 'Free Trial' },
  ...PLANS.filter((plan) => plan.status === 'live' && plan.id !== 'free-trial').map((plan) => ({
    value: plan.id,
    label: plan.name,
  })),
];

const CARD_BRANDS = ['Visa', 'Mastercard', 'Amex'];
const MONTHS_TWO = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const cardFor = (id: string): { brand: string; last4: string; expiry: string } => {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 9973;
  const brand = CARD_BRANDS[h % CARD_BRANDS.length];
  const last4 = String(1000 + (h % 9000));
  const expiry = `${MONTHS_TWO[h % 12]}/${27 + (h % 4)}`;
  return { brand, last4, expiry };
};

const view = (row: SubRow): SubView => {
  const awaiting = row.status === 'awaiting' || row.used === null || row.daysLeft === null;
  const card = awaiting ? null : cardFor(row.id);
  const topUpTotal = row.topUpTotal ?? (row.topUp > 0 ? row.topUp * 2 : 0);
  const topUpUsed = Math.max(0, topUpTotal - row.topUp);
  const cycleDays = CYCLE_DAYS[row.cycle];
  const includedLeft = awaiting ? null : row.allowance - (row.used ?? 0);
  const usedShare = awaiting ? null : Math.round(((row.used ?? 0) / row.allowance) * 100);
  const elapsedShare = awaiting
    ? null
    : Math.round(((cycleDays - (row.daysLeft ?? 0)) / cycleDays) * 100);
  const burn =
    awaiting || !usedShare || !elapsedShare ? null : Number((usedShare / elapsedShare).toFixed(1));
  const atZero = !awaiting && includedLeft !== null && includedLeft <= 0 && row.topUp <= 0;
  const burningFast = !awaiting && usedShare !== null && elapsedShare !== null && usedShare - elapsedShare >= 20;
  const nextBillingLabel = awaiting
    ? ''
    : row.status === 'cancelling'
      ? 'Access ends'
      : row.status === 'trial'
        ? 'Billing starts'
        : 'Next billing';

  return {
    ...row,
    cycleDays,
    nextBillingOn: awaiting ? null : endsOn(row.daysLeft ?? 0),
    nextBillingLabel,
    includedLeft,
    usedShare,
    elapsedShare,
    burn,
    endsOn: row.daysLeft === null ? null : endsOn(row.daysLeft),
    atZero,
    burningFast,
    onTrial: row.status === 'trial',
    topUpTotal,
    topUpUsed,
    onTopUp: !awaiting && includedLeft !== null && includedLeft <= 0 && topUpTotal > 0,
    paymentBrand: card?.brand ?? null,
    paymentLast4: card?.last4 ?? null,
    paymentExpiry: card ? card.expiry : null,
  };
};

export const ROWS: SubView[] = SEEDS.map(view);

export const TOPUP_ROWS: SubView[] = ROWS.filter(
  (row) => row.topUp > 0 && row.status !== 'awaiting'
).map((row) => {
  const exhausted = view({ ...row, used: row.allowance });
  return { ...exhausted, burningFast: false };
});

export const consumedTotal = (rows: SubView[]): number =>
  rows.reduce((sum, row) => sum + (row.consumed ?? 0), 0);

export const activeCount = (rows: SubView[]): number =>
  rows.filter((row) => row.status === 'active').length;

export const cancellingCount = (rows: SubView[]): number =>
  rows.filter((row) => row.status === 'cancelling').length;

export const trialCount = (rows: SubView[]): number =>
  rows.filter((row) => row.onTrial).length;

export const atZeroCount = (rows: SubView[]): number => rows.filter((row) => row.atZero).length;

export const filterRows = (rows: SubView[], status: string, plan: string, query: string): SubView[] => {
  const term = query.trim().toLowerCase();
  return rows.filter((row) => {
    if (status !== 'all' && row.status !== status) return false;
    if (plan === 'trial' && !row.onTrial) return false;
    if (plan !== 'all' && plan !== 'trial' && row.planId !== plan) return false;
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
  };
  return `Sorted by ${labels[sort.key]}, ${sort.dir === 'asc' ? 'lowest first' : 'highest first'}.`;
};