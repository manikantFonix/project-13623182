'use client';

import { focusRing } from './data';

export default function ErrorCard() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5 flex flex-col items-center justify-center text-center min-h-[120px] space-y-3">
      <p className="text-[13px] text-[var(--text)]">We couldn't load this.</p>
      <button
        onClick={() => {}}
        className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--muted)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
      >
        Try again
      </button>
    </div>
  );
}