'use client';

import { focusRing } from '../tokens';

export default function EstimateLookup({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (value: string) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-4">
      <label htmlFor="estimate-search" className="block text-[12px] font-semibold text-[var(--text)]">
        Search estimates
      </label>
      <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
        By reference, or by the retailer that issued it.
      </p>
      <div className="relative mt-3 max-w-[420px]">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
          <i className="ri-search-line text-[16px]" aria-hidden="true" />
        </span>
        <input
          id="estimate-search"
          type="text"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="E-20260828-0412 or Aurora & Co"
          className={`h-9 w-full rounded-full border border-[var(--border)] bg-[var(--muted)] pl-9 pr-4 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
        />
      </div>
    </div>
  );
}