'use client';

import { focusRing } from '../tokens';

export default function EstimateNoMatch({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-6">
      <p className="text-[13px] font-semibold text-[var(--text)]">
        No estimate matches {query.trim()}
      </p>
      <p className="mt-1.5 max-w-[620px] text-[12px] leading-relaxed text-[var(--text-sec)]">
        Search covers only the recent list. Clear it to see the list again.
      </p>
      <button
        type="button"
        onClick={onClear}
        className={`mt-4 h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
      >
        Clear the search
      </button>
    </div>
  );
}