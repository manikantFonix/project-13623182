export type PlanStatus = 'live' | 'archived';
export type FeatureKey = 'bespoke' | 'catalogs' | 'leads' | 'widget' | 'estimator';
export type AccessKey = 'logo' | 'brand' | 'color' | 'unlimited';

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  allowance: number;
  subscribers: number;
  status: PlanStatus;
  popular: boolean;
  features: FeatureKey[];
  points: string[];
  access: AccessKey[];
}

export const ACCESS_ORDER: AccessKey[] = ['logo', 'brand', 'color', 'unlimited'];

export const ACCESS_LABELS: Record<AccessKey, string> = {
  logo: 'Logo',
  brand: 'Brand Name',
  color: 'Custom Color',
  unlimited: 'Unlimited Render',
};

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
    id: 'starter',
    name: 'Starter',
    description: 'For a single designer running bespoke work end to end.',
    price: 149,
    allowance: 300,
    subscribers: 42,
    status: 'live',
    popular: false,
    features: ['bespoke'],
    points: [
      '300 renders a month',
      'Bespoke design workflow',
    ],
    access: ['logo'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For small teams publishing catalogs and fielding leads.',
    price: 349,
    allowance: 1200,
    subscribers: 71,
    status: 'live',
    popular: true,
    features: ['bespoke', 'catalogs', 'leads'],
    points: [
      '1,200 renders a month',
      'Published catalogs and lead inbox',
      'Brand name and logo on every page',
    ],
    access: ['logo', 'brand'],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'The full suite: widget, estimator and unlimited renders.',
    price: 749,
    allowance: 3500,
    subscribers: 26,
    status: 'live',
    popular: false,
    features: ['bespoke', 'catalogs', 'leads', 'widget', 'estimator'],
    points: [
      '3,500 renders a month',
      'Website widget and estimator',
      'Custom colour and branding controls',
    ],
    access: ['logo', 'brand', 'color', 'unlimited'],
  },
  {
    id: 'free-trial',
    name: 'Free Trial',
    description: 'The full workflow for fourteen days before any billing starts.',
    price: 0,
    allowance: 50,
    subscribers: 9,
    status: 'live',
    popular: false,
    features: ['bespoke'],
    points: [
      '50 renders a month',
      'Full bespoke design workflow',
    ],
    access: ['logo'],
  },
];

export interface TopUp {
  id: string;
  size: number;
  price: number;
  bought: number;
  enabled: boolean;
}

export const TOPUPS: TopUp[] = [
  { id: 'pack-25', size: 25, price: 24.99, bought: 184, enabled: true },
  { id: 'pack-50', size: 50, price: 39.99, bought: 96, enabled: true },
  { id: 'pack-100', size: 100, price: 49.99, bought: 41, enabled: true },
];

export type PlansState = 'populated' | 'loading' | 'error';

export const fmtInt = (n: number): string => n.toLocaleString('en-US');

export const fmtPlanPrice = (n: number): string => `$${n.toLocaleString('en-US')}`;

export const fmtMoney = (n: number): string =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const perRender = (pack: TopUp): string => fmtMoney(pack.price / pack.size);