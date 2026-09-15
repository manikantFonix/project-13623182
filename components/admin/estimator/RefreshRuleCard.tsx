'use client';

import { REFRESH_HOLD_DAYS, REFRESH_UPLIFT_PERCENT } from './data';

export default function RefreshRuleCard() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4">
      <h3 className="text-[13px] font-semibold text-[var(--text)]">Price refresh rule</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
        How a captured price is reused before it is refreshed.
      </p>

      <dl className="mt-3 flex flex-wrap gap-x-10 gap-y-2">
        <div className="flex items-baseline gap-2">
          <dt className="text-[12px] text-[var(--text-sec)]">Allowed drift</dt>
          <dd className="text-[13px] font-semibold tabular-nums text-[var(--text)]">
            {REFRESH_UPLIFT_PERCENT}%
          </dd>
        </div>
        <div className="flex items-baseline gap-2">
          <dt className="text-[12px] text-[var(--text-sec)]">Hold</dt>
          <dd className="text-[13px] font-semibold tabular-nums text-[var(--text)]">
            {REFRESH_HOLD_DAYS} days
          </dd>
        </div>
      </dl>

      <p className="mt-3 pt-3 border-t border-[var(--border-strong)] text-[12px] leading-relaxed text-[var(--muted-text)]">
        Fixed system logic. Shown so it is understood.
      </p>
    </div>
  );
}