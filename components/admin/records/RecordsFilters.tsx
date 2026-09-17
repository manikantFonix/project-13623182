'use client';

import RecordMenu from './RecordMenu';
import { focusRing } from '../tokens';
import type { ActiveFilter, RecordConfig } from './data';

const activeOptions: { value: ActiveFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function RecordsFilters({
  config,
  search,
  onSearch,
  retailer,
  onRetailer,
  retailerList,
  active,
  onActive,
  resultCount,
  total,
}: {
  config: RecordConfig;
  search: string;
  onSearch: (value: string) => void;
  retailer: string;
  onRetailer: (value: string) => void;
  retailerList: string[];
  active: ActiveFilter;
  onActive: (value: ActiveFilter) => void;
  resultCount: number;
  total: number;
}) {
  const searchId = `${config.kind}-record-search`;

  const retailerMenu = [
    { value: 'all', label: 'All retailers' },
    ...retailerList.map((name) => ({ value: name, label: name })),
  ];

  const stateMenu = activeOptions.map((option) => ({ value: option.value, label: option.label }));

  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px] max-w-[300px]">
        <label htmlFor={searchId} className="sr-only">
          Search by name or retailer
        </label>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
          <i className="ri-search-line text-[16px]" aria-hidden="true" />
        </span>
        <input
          id={searchId}
          type="text"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={config.searchPlaceholder}
          className={`w-full h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] pl-9 pr-3 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
        />
      </div>

      <RecordMenu label="Retailer" value={retailer} options={retailerMenu} onChange={onRetailer} />

      {config.hasActive && (
        <RecordMenu
          label="State"
          value={active}
          options={stateMenu}
          onChange={(value) => onActive(value as ActiveFilter)}
        />
      )}

      <p className="ml-auto text-[12px] tabular-nums text-[var(--text-sec)] whitespace-nowrap" aria-live="polite">
        {resultCount} of {total} {config.countNoun}
      </p>
    </div>
  );
}