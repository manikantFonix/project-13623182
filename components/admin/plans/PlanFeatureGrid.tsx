'use client';

import { FEATURE_LABELS, FEATURE_ORDER, fmtPlanPrice, type Plan } from './data';

function Column({ plan }: { plan: Plan }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-[13px] font-semibold text-[var(--text)]">{plan.name}</h3>
        <span className="text-[12px] tabular-nums text-[var(--text-sec)]">
          {fmtPlanPrice(plan.price)}
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {FEATURE_ORDER.map((key) => {
          const included = plan.features.includes(key);
          return (
            <li key={key} className="flex items-start gap-2">
              <span
                className={`mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 ${
                  included ? 'text-[var(--success)]' : 'text-[var(--muted-text)]'
                }`}
              >
                <i
                  className={included ? 'ri-check-line text-[15px]' : 'ri-subtract-line text-[15px]'}
                  aria-hidden="true"
                />
              </span>
              <span
                className={`text-[13px] leading-snug ${
                  included ? 'text-[var(--text)]' : 'text-[var(--muted-text)]'
                }`}
              >
                {FEATURE_LABELS[key]}
                {!included && <span className="sr-only"> — not included</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function PlanFeatureGrid({ plans }: { plans: Plan[] }) {
  return (
    <div className={`grid gap-4 ${plans.length >= 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
      {plans.map((plan) => (
        <Column key={plan.id} plan={plan} />
      ))}
    </div>
  );
}