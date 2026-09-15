'use client';

import FilterMenu from '../FilterMenu';
import { focusRing } from '../tokens';
import { PLAN_OPTIONS, STATUS_OPTIONS } from './data';

export default function SubsFilters({
  query,
  onQuery,
  status,
  onStatus,
  plan,
  onPlan,
  shown,
  total,
}: {
  query: string;
  onQuery: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
  plan: string;
  onPlan: (value: string) => void;
  shown: number;
  total: number;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[260px]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
          <i className="ri-search-line text-[15px]" aria-hidden="true" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Search retailers"
          aria-label="Search subscriptions by retailer name"
          className={`h-9 w-full rounded-full border border-[var(--border)] bg-[var(--surface)] pl-9 pr-4 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
        />
      </div>

      <FilterMenu label="Filter by status" value={status} options={STATUS_OPTIONS} onChange={onStatus} />
      <FilterMenu label="Filter by plan" value={plan} options={PLAN_OPTIONS} onChange={onPlan} />

      <p
        aria-live="polite"
        className="ml-auto text-[12px] tabular-nums text-[var(--text-sec)] whitespace-nowrap"
      >
        {shown} of {total} retailers
      </p>
    </div>
  );
}