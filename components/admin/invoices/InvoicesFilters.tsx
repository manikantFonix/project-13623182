'use client';

import InvoicesMenu from './InvoicesMenu';
import { focusRing } from '../tokens';
import { STATUS_OPTIONS } from './filterOptions';

export default function InvoicesFilters({
  search,
  onSearch,
  status,
  onStatus,
  kind,
  onKind,
  resultCount,
  total,
}: {
  search: string;
  onSearch: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
  kind: string;
  onKind: (value: string) => void;
  resultCount: number;
  total: number;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px] max-w-[300px]">
        <label htmlFor="invoice-search" className="sr-only">
          Search by invoice reference or retailer
        </label>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
          <i className="ri-search-line text-[16px]" aria-hidden="true" />
        </span>
        <input
          id="invoice-search"
          type="text"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search reference or retailer"
          className={`w-full h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] pl-9 pr-3 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
        />
      </div>

      <InvoicesMenu label="Status" value={status} options={STATUS_OPTIONS} onChange={onStatus} />
      <InvoicesMenu
        label="For"
        value={kind}
        options={[
          { value: 'all', label: 'All invoices' },
          { value: 'subscription', label: 'Subscription' },
          { value: 'topup', label: 'Top-up' },
        ]}
        onChange={onKind}
      />

      <p className="ml-auto text-[12px] tabular-nums text-[var(--text-sec)] whitespace-nowrap" aria-live="polite">
        {resultCount} of {total} invoices
      </p>
    </div>
  );
}