'use client';

import { useEffect, useState } from 'react';
import UsageBanner from './UsageBanner';
import PlanCard from './PlanCard';
import UsageMonthCard from './UsageMonthCard';
import RendersBreakdownCard from './RendersBreakdownCard';
import TopUpCard from './TopUpCard';
import BillingActivityCard from './BillingActivityCard';
import ChangePlanDialog from './ChangePlanDialog';
import CancelFlowDialog from './CancelFlowDialog';
import NoPlanBanner from './NoPlanBanner';
import NoPlanCard from './NoPlanCard';
import HowPlanWorksCard from './HowPlanWorksCard';
import ErrorCard from './ErrorCard';
import { changePlanPreview, isFreeState, type PlanId } from './changePlanData';
import { cancelFlowPreview } from './cancelFlowData';
import {
  getBalance,
  planData,
  purchasesData,
  topUpPacksData,
  type UsageState,
} from './data';

function LoadingCard() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6 space-y-3">
      <div className="h-4 w-1/3 rounded-full bg-[var(--muted)]" />
      <div className="h-3 w-2/3 rounded-full bg-[var(--muted)]" />
      <div className="h-3 w-1/2 rounded-full bg-[var(--muted)]" />
      <div className="h-3 w-1/4 rounded-full bg-[var(--muted)]" />
    </div>
  );
}

export default function UsageSettings({ state }: { state: UsageState }) {
  const plan =
    state === 'cancelling'
      ? { ...planData, status: 'cancelling' as const }
      : planData;
  const balance = getBalance(state);
  const emptyHistory = state === 'emptyHistory';

  const forced = changePlanPreview(state);
  const forcedCancel = cancelFlowPreview(state);
  const free = isFreeState(state);

  const [manualOpen, setManualOpen] = useState(false);
  const [manualPlan, setManualPlan] = useState<PlanId>('studio');
  const [dismissed, setDismissed] = useState(false);
  const [manualCancelOpen, setManualCancelOpen] = useState(false);
  const [cancelDismissed, setCancelDismissed] = useState(false);

  useEffect(() => {
    setManualOpen(false);
    setDismissed(false);
    setManualCancelOpen(false);
    setCancelDismissed(false);
  }, [state]);

  const openPlanModal = (p: PlanId) => {
    setManualPlan(p);
    setManualOpen(true);
  };

  const forcedOpen = forced ? forced.open : false;
  const dialogOpen = forcedOpen ? !dismissed : manualOpen;
  const closeDialog = () => {
    setDismissed(true);
    setManualOpen(false);
  };
  const variant = forced ? forced.variant : 'change';
  const currentPlanId = forced ? forced.currentPlanId : manualPlan;

  const forcedCancelOpen = forcedCancel ? forcedCancel.open : false;
  const cancelOpen = forcedCancelOpen ? !cancelDismissed : manualCancelOpen;
  const closeCancel = () => {
    setCancelDismissed(true);
    setManualCancelOpen(false);
  };
  const cancelPlanId = forcedCancel ? forcedCancel.currentPlanId : ('catalog' as PlanId);
  const handleCancelChangePlan = () => {
    closeCancel();
    openPlanModal('catalog');
  };

  const scrollToTopUp = () => {
    document.getElementById('top-up')?.scrollIntoView({ behavior: 'smooth' });
  };

  const showBanner =
    state === 'lowBalance' ||
    state === 'exhausted' ||
    state === 'paymentFailed';

  return (
    <div className="max-w-[880px]">
      <h2 className="text-[20px] font-semibold text-[var(--text)]">
        Usage and plan
      </h2>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        Your renders, your plan and your invoices.
      </p>

      {free && <NoPlanBanner />}

      {showBanner && (
        <div className="mt-4">
          {state === 'lowBalance' && (
            <UsageBanner type="low" onTopUp={scrollToTopUp} />
          )}
          {state === 'exhausted' && (
            <UsageBanner type="exhausted" onTopUp={scrollToTopUp} />
          )}
          {state === 'paymentFailed' && (
            <UsageBanner type="payment" onTopUp={scrollToTopUp} />
          )}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4">
        {free ? (
          <>
            <NoPlanCard onSelect={() => openPlanModal('studio')} />
            <HowPlanWorksCard />
          </>
        ) : state === 'loading' ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : state === 'error' ? (
          <>
            <ErrorCard />
            <ErrorCard />
            <ErrorCard />
            <ErrorCard />
            <ErrorCard />
          </>
        ) : (
          <>
            <UsageMonthCard balance={balance} plan={plan} />
            <PlanCard
              plan={plan}
              onChangePlan={() => openPlanModal('studio')}
              onCancel={() => setManualCancelOpen(true)}
            />
            {state !== 'withoutBreakdown' && <RendersBreakdownCard />}
            <TopUpCard
              packs={topUpPacksData}
              purchases={purchasesData}
              emptyHistory={emptyHistory}
            />
            <BillingActivityCard />
          </>
        )}
      </div>

      <ChangePlanDialog
        open={dialogOpen}
        onClose={closeDialog}
        variant={variant}
        currentPlanId={currentPlanId}
        initialView={forced ? forced.view : 'plans'}
        initialError={forced ? forced.error : false}
        narrow={forced ? forced.narrow : false}
      />

      <CancelFlowDialog
        open={cancelOpen}
        onClose={closeCancel}
        onChangePlan={handleCancelChangePlan}
        currentPlanId={cancelPlanId}
        forced={forcedCancel}
      />
    </div>
  );
}