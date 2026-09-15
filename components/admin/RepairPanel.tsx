'use client';

import Link from 'next/link';
import type { ConsumptionCause } from './data';
import { fmt } from './data';
import { focusRing } from './tokens';

export default function RepairPanel({
  repairs,
  total,
}: {
  repairs: ConsumptionCause;
  total: number;
}) {
  const pct = total > 0 ? `${((repairs.value / total) * 100).toFixed(1)}%` : '0%';

  return (
    <div className="rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] p-5 flex flex-col">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 flex items-center justify-center text-[var(--alert-strong)]">
          <i className="ri-tools-line text-[16px]" aria-hidden="true" />
        </span>
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--alert-strong)]">
          Automatic repairs
        </p>
      </div>

      <p className="mt-3 text-[36px] font-semibold tabular-nums leading-none tracking-[-0.02em] text-[var(--text)]">
        {fmt(repairs.value)}
      </p>
      <p className="mt-1 text-[13px] tabular-nums text-[var(--alert-strong)]">renders · {pct} of everything spent</p>

      <p className="mt-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
        Renders corrected automatically when they did not match their photograph.
      </p>

      <p className="mt-4 pt-4 border-t border-[var(--border-strong)] text-[12px] leading-relaxed text-[var(--text)]">
        Per-retailer repair intensity is on{' '}
        <Link
          href="/admin/bottlenecks"
          prefetch={false}
          className={`font-semibold underline underline-offset-2 decoration-1 rounded-sm transition-colors duration-150 hover:text-[var(--alert-strong)] ${focusRing}`}
        >
          Bottlenecks
        </Link>
        .
      </p>
    </div>
  );
}