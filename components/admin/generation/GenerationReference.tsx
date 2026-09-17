'use client';

import { REFERENCE } from './data';

export default function GenerationReference() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">
          Log for
        </p>
        <p className="mt-2 text-[17px] font-semibold text-[var(--text)]">{REFERENCE.product}</p>
        <p className="mt-1 text-[12px] text-[var(--text-sec)]">
          {REFERENCE.retailer} · {REFERENCE.generated}
        </p>
      </div>
      <p className="max-w-[320px] text-[12px] leading-relaxed text-[var(--muted-text)]">
        Nothing here can be re-run, regenerated or corrected.
      </p>
    </div>
  );
}