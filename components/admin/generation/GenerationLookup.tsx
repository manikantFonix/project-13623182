'use client';

import { focusRing } from '../tokens';
import { REFERENCE } from './data';

export default function GenerationLookup({
  query,
  onQuery,
  onFind,
}: {
  query: string;
  onQuery: (value: string) => void;
  onFind: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onFind();
      }}
      className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <label htmlFor="generation-lookup" className="block text-[12px] font-semibold text-[var(--text)]">
        Find a product
      </label>
      <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
        Enter the product the jeweler gave you, as a catalog and product number or a reference.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
            <i className="ri-search-line text-[16px]" aria-hidden="true" />
          </span>
          <input
            id="generation-lookup"
            type="text"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder={REFERENCE.product}
            className={`h-9 w-full rounded-full border border-[var(--border)] bg-[var(--muted)] pl-9 pr-4 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
          />
        </div>
        <button
          type="submit"
          className={`h-9 px-5 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
        >
          Find log
        </button>
      </div>
      <p className="mt-2.5 text-[12px] text-[var(--muted-text)]">
        Every product generated has a log like this one.
      </p>
    </form>
  );
}