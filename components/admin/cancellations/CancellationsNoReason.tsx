'use client';

import { fmtInt } from './data';

export default function CancellationsNoReason({ total }: { total: number }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-6 py-7">
      <span className="w-9 h-9 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--text-sec)]">
        <i className="ri-question-line text-[20px]" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-[15px] font-semibold text-[var(--text)]">
        Nobody gave a reason this period
      </h2>
      <p className="mt-2 max-w-[580px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        All {fmtInt(total)} retailers who cancelled left without answering. The reason is optional,
        so there is no distribution to show — &ldquo;No reason given&rdquo; is the whole figure.
      </p>
    </div>
  );
}