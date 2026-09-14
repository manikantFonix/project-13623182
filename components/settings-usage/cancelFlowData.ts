import { planRanks, planTiers, type PlanId, type PlanTier } from './changePlanData';
import type { UsageState } from './data';

export type CancelStep =
  | 'verify'
  | 'code'
  | 'consequences'
  | 'smaller'
  | 'reason'
  | 'confirm'
  | 'outcome';

export type CodeError = 'wrong' | 'expired' | null;

export const cancelContext = {
  email: 'elena@luxebrand.com',
  accessUntil: '12 April 2026',
  includedRenders: 152,
  topUpRenders: 40,
  currentPlanId: 'catalog' as PlanId,
};

export interface Consequence {
  icon: string;
  text: string;
}

export const cancelConsequences: Consequence[] = [
  { icon: 'ri-link-unlink-m', text: 'Every published catalog is unpublished. Share links stop working.' },
  { icon: 'ri-global-line', text: 'The widget stops generating on your website.' },
  { icon: 'ri-image-line', text: 'Your remaining included allowance expires — 152 renders.' },
  { icon: 'ri-add-circle-line', text: 'Your remaining top-up packs expire too — 40 renders.' },
];

export const cancelReasons: string[] = [
  'Too expensive',
  'Not using it enough',
  'Found something else',
  'Closed or pausing the business',
  'Something else',
];

export function tierBelow(current: PlanId): PlanTier | null {
  const rank = planRanks[current];
  return rank > 0 ? planTiers[rank - 1] : null;
}

export interface CancelFlowPreview {
  open: boolean;
  step: CancelStep;
  codeError: CodeError;
  reasonOther: boolean;
  submitting: boolean;
  error: boolean;
  currentPlanId: PlanId;
}

export function cancelFlowPreview(state: UsageState): CancelFlowPreview | null {
  const base = {
    open: true,
    codeError: null as CodeError,
    reasonOther: false,
    submitting: false,
    error: false,
    currentPlanId: cancelContext.currentPlanId,
  };
  switch (state) {
    case 'cancelVerify':
      return { ...base, step: 'verify' };
    case 'cancelCode':
      return { ...base, step: 'code' };
    case 'cancelWrongCode':
      return { ...base, step: 'code', codeError: 'wrong' };
    case 'cancelExpiredCode':
      return { ...base, step: 'code', codeError: 'expired' };
    case 'cancelConsequences':
      return { ...base, step: 'consequences' };
    case 'cancelSmallerPlan':
      return { ...base, step: 'smaller' };
    case 'cancelSmallest':
      return { ...base, step: 'consequences', currentPlanId: 'studio' };
    case 'cancelReason':
      return { ...base, step: 'reason' };
    case 'cancelReasonOther':
      return { ...base, step: 'reason', reasonOther: true };
    case 'cancelConfirm':
      return { ...base, step: 'confirm' };
    case 'cancelSubmitting':
      return { ...base, step: 'confirm', submitting: true };
    case 'cancelDone':
      return { ...base, step: 'outcome' };
    case 'cancelFailed':
      return { ...base, step: 'confirm', error: true };
    default:
      return null;
  }
}