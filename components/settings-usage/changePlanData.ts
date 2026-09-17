import type { UsageState } from './data';

export type PlanId = 'studio' | 'catalog' | 'storefront';
export type ChangePlanView = 'plans' | 'sent';

export interface PlanFact {
  icon: string;
  text: string;
}

export interface PlanTier {
  id: PlanId;
  name: string;
  price: number;
  facts: PlanFact[];
  features: string[];
  popular?: boolean;
}

export const planTiers: PlanTier[] = [
  {
    id: 'studio',
    name: 'Starter',
    price: 149,
    facts: [
      { icon: 'ri-image-add-line', text: '300 renders a month' },
      { icon: 'ri-user-line', text: '1 person' },
      { icon: 'ri-brush-line', text: 'Bespoke work only' },
    ],
    features: [
      'Generate designs from a description, photo, sketch or voice',
      'Four angles in three metals, every time',
      'Refine a design as many times as you need',
      'Send designs to customers for approval',
      'Get quotes from several manufacturers at once',
      'Build a PDF for any customer',
      'Your logo and contact details on everything you send',
    ],
  },
  {
    id: 'catalog',
    name: 'Pro',
    price: 349,
    popular: true,
    facts: [
      { icon: 'ri-image-add-line', text: '1,200 renders a month' },
      { icon: 'ri-group-line', text: 'Up to 5 people' },
      { icon: 'ri-store-2-line', text: 'Bespoke work and an online catalog' },
    ],
    features: [
      'Everything in Starter',
      'Publish catalogs your customers can browse by link',
      'Take inquiries straight from your catalog',
      'See every inquiry in one inbox',
      'Analytics on what people are looking at',
    ],
  },
  {
    id: 'storefront',
    name: 'Business',
    price: 749,
    facts: [
      { icon: 'ri-image-add-line', text: '3,500 renders a month' },
      { icon: 'ri-group-line', text: 'Up to 15 people' },
      { icon: 'ri-global-line', text: 'Everything, including the tool on your own site' },
    ],
    features: [
      'Everything in Pro',
      'Put the design tool on your own website',
      'Visitors design a piece and ask you about it',
      'Instant price estimates for what they design',
      'Priority support',
    ],
  },
];

export const planTierById: Record<PlanId, PlanTier> = {
  studio: planTiers[0],
  catalog: planTiers[1],
  storefront: planTiers[2],
};

export const planRanks: Record<PlanId, number> = {
  studio: 0,
  catalog: 1,
  storefront: 2,
};

export interface ChangePlanPreview {
  open: boolean;
  variant: 'change' | 'first';
  currentPlanId: PlanId | null;
  view: ChangePlanView;
  error: boolean;
  narrow: boolean;
}

export function changePlanPreview(state: UsageState): ChangePlanPreview | null {
  switch (state) {
    case 'changePlanStudio':
      return { open: true, variant: 'change', currentPlanId: 'studio', view: 'plans', error: false, narrow: false };
    case 'changePlanCatalog':
      return { open: true, variant: 'change', currentPlanId: 'catalog', view: 'plans', error: false, narrow: false };
    case 'changePlanStorefront':
      return { open: true, variant: 'change', currentPlanId: 'storefront', view: 'plans', error: false, narrow: false };
    case 'changePlanSent':
      return { open: true, variant: 'change', currentPlanId: 'studio', view: 'sent', error: false, narrow: false };
    case 'changePlanFailed':
      return { open: true, variant: 'change', currentPlanId: 'studio', view: 'plans', error: true, narrow: false };
    case 'changePlanNarrow':
      return { open: true, variant: 'change', currentPlanId: 'studio', view: 'plans', error: false, narrow: true };
    case 'noPlan':
      return { open: false, variant: 'first', currentPlanId: null, view: 'plans', error: false, narrow: false };
    case 'noPlanModal':
      return { open: true, variant: 'first', currentPlanId: null, view: 'plans', error: false, narrow: false };
    case 'noPlanChosen':
      return { open: true, variant: 'first', currentPlanId: null, view: 'sent', error: false, narrow: false };
    case 'noPlanFailed':
      return { open: true, variant: 'first', currentPlanId: null, view: 'plans', error: true, narrow: false };
    case 'noPlanNarrow':
      return { open: true, variant: 'first', currentPlanId: null, view: 'plans', error: false, narrow: true };
    default:
      return null;
  }
}

export const freeStates: UsageState[] = [
  'noPlan',
  'noPlanModal',
  'noPlanChosen',
  'noPlanFailed',
  'noPlanNarrow',
];

export function isFreeState(state: UsageState): boolean {
  return freeStates.includes(state);
}