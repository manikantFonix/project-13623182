'use client';

import FilterMenu from '../FilterMenu';
import { focusRing } from '../tokens';
import {
  GROUP_OPTIONS,
  PERIOD_OPTIONS,
  RETAILER_OPTIONS,
  type ActivityPeriod,
  type ActivityScopeFilter,
} from './data';

const scopes: { value: ActivityScopeFilter; label: string }[] = [
  { value: 'act', label: 'Activity' },
  { value: 'access', label: 'Record access' },
  { value: 'all', label: 'All' },
];

export default function ActivityFilters({
  query,
  onQuery,
  scope,
  onScope,
  group,
  onGroup,
  retailer,
  onRetailer,
  period,
  onPeriod,
  shown,
  total,
}: {
  query: string;
  onQuery: (value: string) => void;
  scope: ActivityScopeFilter;
  onScope: (value: ActivityScopeFilter) => void;
  group: string;
  onGroup: (value: string) => void;
  retailer: string;
  onRetailer: (value: string) => void;
  period: ActivityPeriod;
  onPeriod: (value: ActivityPeriod) => void;
  shown: number;
  total: number;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[260px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
            <i className="ri-search-line text-[15px]" aria-hidden="true" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search subjects and reasons"
            aria-label="Search activity by subject or reason"
            className={`h-9 w-full rounded-full border border-[var(--border)] bg-[var(--surface)] pl-9 pr-4 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
          />
        </div>

        <div className="flex items-center gap-2">
          <span
            id="activity-scope-label"
            className="text-[12px] font-medium text-[var(--text-sec)] whitespace-nowrap"
          >
            Show
          </span>
          <div
            role="group"
            aria-labelledby="activity-scope-label"
            className="inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--muted)]"
          >
            {scopes.map((option) => {
              const active = option.value === scope;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onScope(option.value)}
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
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--muted)] pt-3">
        <FilterMenu
          label="Filter by what happened"
          value={group}
          options={GROUP_OPTIONS}
          onChange={onGroup}
        />
        <FilterMenu
          label="Filter by retailer"
          value={retailer}
          options={RETAILER_OPTIONS}
          onChange={onRetailer}
        />
        <FilterMenu
          label="Filter by when"
          value={period}
          options={PERIOD_OPTIONS}
          onChange={(value) => onPeriod(value as ActivityPeriod)}
        />

        <p
          aria-live="polite"
          className="ml-auto text-[12px] tabular-nums text-[var(--text-sec)] whitespace-nowrap"
        >
          {shown} of {total} entries
        </p>
      </div>
    </div>
  );
}