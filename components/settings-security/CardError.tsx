'use client';

import { focusRingVar } from '../settings/theme/tokens';

export default function CardError() {
  return (
    <div className="mt-4 bg-[var(--muted)] rounded-[12px] p-4">
      <p className="text-[13px] text-[var(--text)]">We couldn't load this.</p>
      <button
        type="button"
        className={`mt-3 h-9 px-4 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
      >
        Try again
      </button>
    </div>
  );
}