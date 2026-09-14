'use client';

import CardHeader from './CardHeader';
import { focusRing, type Plan } from './data';

interface Props {
  plan: Plan;
  onChangePlan: () => void;
  onCancel: () => void;
}

export default function PlanCard({ plan, onChangePlan, onCancel }: Props) {
  const cancelling = plan.status === 'cancelling';

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <CardHeader
        icon="ri-vip-diamond-line"
        title="Your plan"
        description="What you're on and when it renews."
        right={
          cancelling ? (
            <span className="inline-flex items-center h-5 px-2 rounded-full text-[11px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] whitespace-nowrap">
              Cancels {plan.cancelDate}
            </span>
          ) : (
            <span className="inline-flex items-center h-5 px-2 rounded-full text-[11px] font-medium text-[var(--success)] bg-[var(--success-bg)] whitespace-nowrap">
              Active
            </span>
          )
        }
      />

      <p className="mt-5 text-[20px] font-semibold text-[var(--text)]">
        {plan.name}
      </p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-[15px] text-[var(--text)] tabular-nums">
          ${plan.price}
        </span>
        <span className="text-[13px] text-[var(--text-sec)]">
          {plan.interval}
        </span>
      </p>

      <div className="my-5 h-px bg-[var(--border)]" />

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-[12px] text-[var(--text-sec)]">Billing period</p>
          <p className="mt-1 text-[13px] text-[var(--text)] tabular-nums">
            {plan.billingPeriod}
          </p>
        </div>
        <div>
          <p className="text-[12px] text-[var(--text-sec)]">
            Included each period
          </p>
          <p className="mt-1 text-[13px] text-[var(--text)] tabular-nums">
            {plan.includedRenders} renders
          </p>
        </div>
        <div>
          <p className="text-[12px] text-[var(--text-sec)]">
            {cancelling ? 'Access ends' : 'Next renewal'}
          </p>
          <p className="mt-1 text-[13px] text-[var(--text)] tabular-nums">
            {plan.nextBillingDate}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          onClick={onCancel}
          className={`text-[13px] font-medium text-[var(--alert)] hover:text-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap cursor-pointer ${focusRing}`}
        >
          Cancel subscription
        </button>
        <button
          onClick={onChangePlan}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium hover:bg-[var(--accent-hover)] transition-colors duration-150 motion-reduce:transition-none whitespace-nowrap cursor-pointer ${focusRing}`}
        >
          Change plan
        </button>
      </div>
    </section>
  );
}