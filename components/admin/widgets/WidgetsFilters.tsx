'use client';

import { focusRing } from '../tokens';
import type { WidgetsFilter } from './data';

const options: { value: WidgetsFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'look', label: 'Needs a look' },
];

export default function WidgetsFilters({
  filter,
  onFilter,
  resultCount,
  total,
}: {
  filter: WidgetsFilter;
  onFilter: (filter: WidgetsFilter) => void;
  resultCount: number;
  total: number;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span
          id="widgets-filter-label"
          className="text-[12px] font-medium text-[var(--text-sec)] whitespace-nowrap"
        >
          Show
        </span>
        <div
          role="group"
          aria-labelledby="widgets-filter-label"
          className="inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--muted)]"
        >
          {options.map((option) => {
            const active = option.value === filter;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => onFilter(option.value)}
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

      <p className="ml-auto text-[12px] tabular-nums text-[var(--text-sec)] whitespace-nowrap" aria-live="polite">
        {resultCount} of {total} installations
      </p>
    </div>
  );
}