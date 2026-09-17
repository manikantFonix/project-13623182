'use client';

import PlanStatusPill from './PlanStatusPill';
import { focusRing } from '../tokens';
import { fmtInt, fmtPlanPrice, type Plan } from './data';

const head = 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

function Row({
  plan,
  onEdit,
  onArchive,
  onRestore,
}: {
  plan: Plan;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
}) {
  const archived = plan.status === 'archived';

  return (
    <tr className="border-b border-[var(--muted)] last:border-b-0">
      <th scope="row" className="pl-5 pr-4 py-4 text-left align-top font-normal min-w-[180px]">
        <span className="block text-[13px] font-semibold text-[var(--text)]">{plan.name}</span>
        <span className="mt-1 flex flex-wrap items-center gap-1.5">
          <PlanStatusPill archived={archived} />
          {plan.popular && (
            <span className="inline-flex h-6 items-center gap-1 rounded-full bg-[var(--amber-bg)] px-2.5 text-[12px] font-medium text-[var(--alert-strong)] whitespace-nowrap">
              <i className="ri-star-fill text-[12px]" aria-hidden="true" />
              Popular
            </span>
          )}
        </span>
      </th>
      <td className="px-4 py-4 align-top text-right text-[13px] tabular-nums whitespace-nowrap text-[var(--text)]">
        {fmtPlanPrice(plan.price)}
      </td>
      <td className="px-4 py-4 align-top text-right whitespace-nowrap">
        <span className="block text-[13px] tabular-nums text-[var(--text)]">
          {fmtInt(plan.allowance)}
        </span>
        <span className="mt-0.5 block text-[12px] text-[var(--text-sec)]">renders</span>
      </td>
      <td className="px-4 py-4 align-top text-right whitespace-nowrap">
        <span className="block text-[13px] font-semibold tabular-nums text-[var(--text)]">
          {fmtInt(plan.subscribers)}
        </span>
        <span className="mt-0.5 block text-[12px] text-[var(--text-sec)]">on this plan</span>
      </td>
      <td className="pl-4 pr-5 py-4 align-top text-right whitespace-nowrap">
        {archived ? (
          <button
            type="button"
            onClick={() => onRestore(plan.id)}
            className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
          >
            Restore
          </button>
        ) : (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => onEdit(plan.id)}
              className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onArchive(plan.id)}
              className={`h-9 px-3 rounded-full text-[13px] font-medium text-[var(--text-sec)] transition-colors duration-150 hover:bg-[var(--muted)] hover:text-[var(--alert-strong)] ${focusRing}`}
            >
              Archive
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default function PlansTable({
  plans,
  caption,
  onEdit,
  onArchive,
  onRestore,
}: {
  plans: Plan[];
  caption: string;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[820px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Plan
            </th>
            <th scope="col" className={`${head} text-right`}>Price</th>
            <th scope="col" className={`${head} text-right`}>Base allowance</th>
            <th scope="col" className={`${head} text-right`}>Subscribers</th>
            <th scope="col" className="pl-4 pr-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <Row key={plan.id} plan={plan} onEdit={onEdit} onArchive={onArchive} onRestore={onRestore} />
          ))}
        </tbody>
      </table>
    </div>
  );
}