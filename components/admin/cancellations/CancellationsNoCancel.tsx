'use client';

import { fmtInt } from './data';

export default function CancellationsNoCancel({
  periodRange,
}: {
  periodRange: string;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--success-bg)] px-6 py-8">
      <span className="w-9 h-9 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--success)]">
        <i className="ri-emotion-happy-line text-[20px]" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-[17px] font-semibold text-[var(--text)]">
        Nobody cancelled in this period
      </h2>
      <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        No retailer left between <span className="tabular-nums">{periodRange}</span>. Nothing to
        review here — this is the outcome you want.
      </p>
      <p className="mt-2 text-[12px] tabular-nums text-[var(--muted-text)]">
        {fmtInt(0)} cancellations recorded
      </p>
    </div>
  );
}