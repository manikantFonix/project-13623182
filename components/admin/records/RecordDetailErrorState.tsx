'use client';

import { focusRing } from '../tokens';

export default function RecordDetailErrorState({
  title,
  body,
  onRetry,
}: {
  title: string;
  body: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[12px] px-6 py-8 max-w-[620px]"
    >
      <span className="w-9 h-9 rounded-full bg-[var(--amber-bg)] flex items-center justify-center text-[var(--alert-strong)]">
        <i className="ri-error-warning-line text-[20px]" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-[17px] font-semibold text-[var(--text)]">{title}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-sec)]">{body}</p>
      <button
        type="button"
        onClick={onRetry}
        className={`mt-5 h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
      >
        Try again
      </button>
    </div>
  );
}