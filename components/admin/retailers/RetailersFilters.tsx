'use client';

import PlanMenu from './PlanMenu';
import { focusRing } from '../tokens';
import { statusLabels, type PlanFilter, type StatusFilter } from './data';

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: statusLabels.active },
  { value: 'awaiting', label: statusLabels.awaiting },
  { value: 'disabled', label: statusLabels.disabled },
];

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

      <div className="flex items-center gap-2">
        <span id="retailer-status-label" className="text-[12px] font-medium text-[var(--text-sec)] whitespace-nowrap">
          Status
        </span>
        <div
          role="group"
          aria-labelledby="retailer-status-label"
          className="inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--muted)]"
        >
          {statusOptions.map((option) => {
            const active = option.value === status;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => onStatus(option.value)}
                className={`h-7 px-3 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                  active
                    ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                    : 'text-[var(--text-sec)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <PlanMenu value={plan} onChange={onPlan} />

      <p className="ml-auto text-[12px] tabular-nums text-[var(--text-sec)] whitespace-nowrap" aria-live="polite">
        {resultCount} of {total} retailers
      </p>
    </div>
  );
}