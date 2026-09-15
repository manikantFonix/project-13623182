'use client';

import { PERIOD_LABEL } from './data';

export default function EstimateEmptyState() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-8">
      <span className="w-10 h-10 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
        <i className="ri-inbox-line text-[20px]" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-[17px] font-semibold text-[var(--text)]">
        No estimates were produced in this period
      </h2>
      <p className="mt-2 max-w-[620px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        {PERIOD_LABEL}. A zero is a real answer: estimates appear as visitors use the widget, and none
        came through this window.
      </p>
      <p className="mt-2 max-w-[620px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        Broaden the period, or check whether the widget is loading at all.
      </p>
    </div>
  );
}