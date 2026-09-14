import CardHeader from './CardHeader';
import { type Balance, type Plan } from './data';

interface Props {
  balance: Balance;
  plan: Plan;
}

export default function UsageMonthCard({ balance, plan }: Props) {
  const used = balance.allowanceUsed;
  const total = balance.allowanceTotal;
  const pct = total > 0 ? Math.round((used / total) * 100) : 0;
  const fill = total > 0 ? Math.min(100, (used / total) * 100) : 0;

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <CardHeader
        icon="ri-dashboard-3-line"
        title="Renders this period"
        description="What you've used and what's left."
      />

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <p className="flex items-baseline gap-2">
          <span className="text-[34px] font-semibold text-[var(--text)] tabular-nums leading-none">
            {used}
          </span>
          <span className="text-[15px] text-[var(--text-sec)]">
            of {total} included
          </span>
        </p>
        <span className="text-[13px] font-medium text-[var(--accent-text)] tabular-nums">
          {pct}%
        </span>
      </div>

      <div className="mt-4 h-[6px] w-full rounded-[999px] bg-[var(--muted)] overflow-hidden">
        <div
          className="h-full bg-[var(--accent)] rounded-[999px]"
          style={{ width: `${fill}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <span className="text-[13px] text-[var(--text)] tabular-nums">
          {balance.allowanceRemaining} renders remaining
        </span>
        <span className="text-[13px] text-[var(--text-sec)]">
          Resets {plan.nextBillingDate}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-4 py-3">
          <span className="flex items-center gap-2">
            <span className="text-[13px] text-[var(--text)]">
              Included allowance
            </span>
            <span className="inline-flex items-center h-5 px-2 rounded-full bg-[var(--success-bg)] text-[11px] font-medium text-[var(--success)] whitespace-nowrap">
              Active
            </span>
          </span>
          <span className="text-[13px] font-medium text-[var(--text)] tabular-nums">
            {balance.allowanceRemaining} of {total} left
          </span>
        </div>
        <div className="h-px bg-[var(--border)]" />
        <div className="flex items-center justify-between gap-4 py-3">
          <span className="text-[13px] text-[var(--text)]">Top-up packs</span>
          <span className="text-[13px] font-medium text-[var(--text)] tabular-nums">
            {balance.topUpRemaining} left across {balance.topUpPacks} packs
          </span>
        </div>
      </div>

      <p className="mt-3 text-[12px] text-[var(--text-sec)]">
        Your included allowance is used first, then top-up packs, oldest first.
        Unused included allowance doesn't carry into the next period.
      </p>

      <div className="mt-5 bg-[var(--muted)] rounded-[12px] p-3 space-y-2">
        <p className="flex items-start gap-2 text-[13px] text-[var(--text-sec)]">
          <i className="ri-checkbox-circle-line text-[16px] shrink-0 mt-px" />
          You're within your plan.
        </p>
        <p className="flex items-start gap-2 text-[13px] text-[var(--text-sec)]">
          <i className="ri-checkbox-circle-line text-[16px] shrink-0 mt-px" />
          At 80% we'll let you know you're getting close.
        </p>
        <p className="flex items-start gap-2 text-[13px] text-[var(--alert)]">
          <i className="ri-alert-line text-[16px] shrink-0 mt-px" />
          At 100% new renders stop until you top up. Your catalogs stay published
          and nothing is deleted.
        </p>
      </div>
    </section>
  );
}