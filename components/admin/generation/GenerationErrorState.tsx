'use client';

import { focusRing } from '../tokens';

export default function GenerationErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-8">
      <span className="w-10 h-10 rounded-full bg-[var(--amber-bg)] flex items-center justify-center text-[var(--alert-strong)]">
        <i className="ri-error-warning-line text-[20px]" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-[17px] font-semibold text-[var(--text)]">
        This log could not be loaded
      </h2>
      <p className="mt-2 max-w-[620px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        Reading the record failed this time. The generation happened and the images exist.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className={`mt-5 h-9 px-5 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
      >
        Try again
      </button>
    </div>
  );
}