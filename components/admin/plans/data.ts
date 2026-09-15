export type PlanStatus = 'live' | 'archived';
export type BillingInterval = 'month' | 'year';
export type FeatureKey = 'bespoke' | 'catalogs' | 'leads' | 'widget' | 'estimator';

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: BillingInterval;
  allowance: number;
  seats: number;
  subscribers: number;
  status: PlanStatus;
  features: FeatureKey[];
}

export const FEATURE_ORDER: FeatureKey[] = ['bespoke', 'catalogs', 'leads', 'widget', 'estimator'];

export const FEATURE_LABELS: Record<FeatureKey, string> = {
  bespoke: 'Bespoke design workflow',
  catalogs: 'Published catalogs',
  leads: 'Lead inbox',
  widget: 'Website widget',
  estimator: 'Estimator',
};

export const PLANS: Plan[] = [
  {
    id: 'studio',
    name: 'Studio',
    price: 149,
    interval: 'month',
    allowance: 300,
    seats: 1,
    subscribers: 42,
    status: 'live',
    features: ['bespoke'],
  },
  {
    id: 'catalog',
    name: 'Catalog',
    price: 349,
    interval: 'month',
    allowance: 1200,
    seats: 5,
    subscribers: 71,
    status: 'live',
    features: ['bespoke', 'catalogs', 'leads'],
  },
  {
    id: 'storefront',
    name: 'Storefront',
    price: 749,
    interval: 'month',
    allowance: 3500,
    seats: 15,
    subscribers: 26,
    status: 'live',
    features: ['bespoke', 'catalogs', 'leads', 'widget', 'estimator'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    interval: 'month',
    allowance: 200,
    seats: 1,
    subscribers: 9,
    status: 'archived',
    features: ['bespoke'],
  },
];

export interface TopUp {
  size: number;
  price: number;
  bought: number;
}

export const TOPUPS: TopUp[] = [
  { size: 25, price: 24.99, bought: 184 },
  { size: 50, price: 39.99, bought: 96 },
  { size: 100, price: 49.99, bought: 41 },
];

export type PlansState = 'populated' | 'loading' | 'error';

export const intervalLabel = (interval: BillingInterval): string =>
  interval === 'month' ? 'Monthly' : 'Yearly';

export const fmtInt = (n: number): string => n.toLocaleString('en-US');

export const fmtPlanPrice = (n: number): string => `$${n.toLocaleString('en-US')}`;

export const fmtMoney = (n: number): string =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const perRender = (pack: TopUp): string => fmtMoney(pack.price / pack.size);