'use client';

import PlanMenu from './PlanMenu';
import StatusMenu from './StatusMenu';
import { focusRing } from '../tokens';
import type { PlanFilter, StatusFilter } from './data';

export default function RetailersFilters({
  search,
  onSearch,
  status,
  onStatus,
  plan,
  onPlan,
  resultCount,
  total,
}: {
  search: string;
  onSearch: (value: string) => void;
  status: StatusFilter;
  onStatus: (value: StatusFilter) => void;
  plan: PlanFilter;
  onPlan: (value: PlanFilter) => void;
  resultCount: number;
  total: number;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px] max-w-[300px]">
        <label htmlFor="retailer-search" className="sr-only">
          Search by business name or email
        </label>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
          <i className="ri-search-line text-[16px]" aria-hidden="true" />
        </span>
        <input
          id="retailer-search"
          type="text"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search name or email"
          className={`w-full h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] pl-9 pr-3 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
        />
      </div>

      <StatusMenu value={status} onChange={onStatus} />

      <PlanMenu value={plan} onChange={onPlan} />

      <p className="ml-auto text-[12px] tabular-nums text-[var(--text-sec)] whitespace-nowrap" aria-live="polite">
        {resultCount} of {total} retailers
      </p>
    </div>
  );
}