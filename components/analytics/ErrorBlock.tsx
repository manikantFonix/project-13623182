'use client';

import { focusRing } from './data';

export default function ErrorBlock() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6 flex flex-col items-center justify-center text-center min-h-[120px] space-y-3">
      <p className="text-[13px] text-[var(--text)]">We couldn't load this.</p>
      <button
        type="button"
        className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
      >
        Try again
      </button>
    </div>
  );
}