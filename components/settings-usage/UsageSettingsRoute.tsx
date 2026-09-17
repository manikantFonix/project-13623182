'use client';

import { useState } from 'react';
import SettingsLayout from '../settings/SettingsLayout';
import SettingsShell from '../settings/SettingsShell';
import UsageSettings from './UsageSettings';
import { type UsageState } from './data';
import StateSwitcherPanel from '../ui/StateSwitcherPanel';

const pageOptions: { value: UsageState; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'withBreakdown', label: 'With renders breakdown' },
  { value: 'withoutBreakdown', label: 'Without renders breakdown' },
  { value: 'lowBalance', label: 'Low balance' },
  { value: 'exhausted', label: 'Exhausted' },
  { value: 'paymentFailed', label: 'Payment failed' },
  { value: 'cancelling', label: 'Cancelling' },
  { value: 'loading', label: 'Loading' },
  { value: 'emptyHistory', label: 'Empty history' },
  { value: 'error', label: 'Error' },
];

const planOptions: { value: UsageState; label: string }[] = [
  { value: 'changePlanStudio', label: 'Change plan · Starter' },
  { value: 'changePlanCatalog', label: 'Change plan · Pro' },
  { value: 'changePlanStorefront', label: 'Change plan · Business' },
  { value: 'changePlanSent', label: 'Change plan · Request sent' },
  { value: 'changePlanFailed', label: 'Change plan · Request failed' },
  { value: 'changePlanNarrow', label: 'Change plan · Narrow' },
  { value: 'noPlan', label: 'No plan yet' },
  { value: 'noPlanModal', label: 'No plan · Plan modal' },
  { value: 'noPlanChosen', label: 'No plan · Plan chosen' },
  { value: 'noPlanFailed', label: 'No plan · Request failed' },
  { value: 'noPlanNarrow', label: 'No plan · Narrow' },
];

const cancelOptions: { value: UsageState; label: string }[] = [
  { value: 'cancelVerify', label: 'Cancel · Verify' },
  { value: 'cancelCode', label: 'Cancel · Code entry' },
  { value: 'cancelWrongCode', label: 'Cancel · Wrong code' },
  { value: 'cancelExpiredCode', label: 'Cancel · Expired code' },
  { value: 'cancelConsequences', label: 'Cancel · Consequences' },
  { value: 'cancelSmallerPlan', label: 'Cancel · Smaller plan' },
  { value: 'cancelSmallest', label: 'Cancel · Smallest tier' },
  { value: 'cancelReason', label: 'Cancel · Reason' },
  { value: 'cancelReasonOther', label: 'Cancel · Something else' },
  { value: 'cancelConfirm', label: 'Cancel · Confirm' },
  { value: 'cancelSubmitting', label: 'Cancel · Submitting' },
  { value: 'cancelDone', label: 'Cancel · Cancelled' },
  { value: 'cancelFailed', label: 'Cancel · Cancellation failed' },
];

const groups = [
  { options: pageOptions },
  { label: 'Plan', options: planOptions },
  { label: 'Cancel subscription', options: cancelOptions },
];

export default function UsageSettingsRoute() {
  const [preview, setPreview] = useState<UsageState>('withoutBreakdown');

  return (
    <SettingsShell>
      <SettingsLayout>
        <UsageSettings state={preview} />
      </SettingsLayout>
      <StateSwitcherPanel
        title="Preview state"
        icon="ri-line-chart-line"
        hint="Switch how the plan page looks"
        groups={groups}
        active={(v) => preview === v}
        onSelect={(v) => setPreview(v as UsageState)}
      />
    </SettingsShell>
  );
}