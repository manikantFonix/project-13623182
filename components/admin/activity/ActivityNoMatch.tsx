'use client';

import { focusRing } from '../tokens';

export default function ActivityNoMatch({
  filtered,
  onClear,
}: {
  filtered: boolean;
  onClear: () => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-6 py-12 flex flex-col items-center text-center">
      <span className="w-9 h-9 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
        <i className="ri-history-line text-[20px]" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-[15px] font-semibold text-[var(--text)]">
        {filtered ? 'No entries match these filters' : 'No activity yet'}
      </h3>
      <p className="mt-2 max-w-[500px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        {filtered
          ? 'Nothing has been removed. Entries appear here as the console is used.'
          : 'Entries appear here as the console is used. A quiet week is ordinary.'}
      </p>
      {filtered && (
        <button
          type="button"
          onClick={onClear}
          className={`mt-5 h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium whitespace-nowrap text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}