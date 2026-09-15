'use client';

import { FREE_COUNT, RENDER_COUNT } from './data';

export default function GenerationCostPanel() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <h3 className="flex items-center gap-2 text-[15px] font-semibold text-[var(--text)]">
        <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
          <i className="ri-scales-3-line text-[16px]" aria-hidden="true" />
        </span>
        Closing the loop on cost
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-3.5">
          <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">
            Steps that cost a render
          </p>
          <p className="mt-2 text-[22px] font-semibold leading-none tabular-nums text-[var(--text)]">
            {RENDER_COUNT}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-sec)]">
            Draws and repairs are billed renders.
          </p>
        </div>
        <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-3.5">
          <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">
            Steps that cost nothing
          </p>
          <p className="mt-2 text-[22px] font-semibold leading-none tabular-nums text-[var(--text)]">
            {FREE_COUNT}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-sec)]">
            Checks make no image and are never billed.
          </p>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-sec)]">
        {RENDER_COUNT} images against a quoted floor of at least 4. The side view needed one repair
        pass, and a repair is a render.
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-sec)]">
        The same count the retailer sees under “Repair passes”.
      </p>
    </div>
  );
}