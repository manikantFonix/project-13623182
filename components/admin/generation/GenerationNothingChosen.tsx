'use client';

export default function GenerationNothingChosen({ onExample }: { onExample: () => void }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-8">
      <span className="w-10 h-10 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
        <i className="ri-file-search-line text-[20px]" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-[17px] font-semibold text-[var(--text)]">No product chosen yet</h2>
      <p className="mt-2 max-w-[620px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        Enter the product the jeweler gave you above. Every generated product has a log.
      </p>
      <p className="mt-2 max-w-[620px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        It shows what ran, in order, with the prompt pinned at the time. Nothing can be re-run.
      </p>
      <button
        type="button"
        onClick={onExample}
        className="mt-5 h-9 px-5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)]"
      >
        Open Bridal 2026 · Product 14
      </button>
    </div>
  );
}