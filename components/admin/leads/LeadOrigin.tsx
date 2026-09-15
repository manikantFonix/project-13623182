'use client';

import { fmt } from '../data';
import type { LeadsOriginData } from './data';

export default function LeadOrigin({ origin }: { origin: LeadsOriginData }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">
            From catalogs
          </p>
          <p className="mt-1.5 text-[22px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[var(--text)]">
            {fmt(origin.catalogs)}
          </p>
        </div>
        <div className="w-px self-stretch bg-[var(--border)] hidden sm:block" aria-hidden="true" />
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">
            From widgets
          </p>
          <p className="mt-1.5 text-[22px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[var(--text)]">
            {fmt(origin.widgets)}
          </p>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-[var(--text-sec)]">
        <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
          <i className="ri-information-line text-[15px]" aria-hidden="true" />
        </span>
        <span>
          A widget inquiry arrives with a design; a catalog inquiry with the selected pieces.
        </span>
      </p>
    </div>
  );
}