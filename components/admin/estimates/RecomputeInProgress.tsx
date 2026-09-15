'use client';

import type { Estimate } from './data';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function ColumnSkeleton({ title, sub }: { title: string; sub: string }) {
  return (
    <section
      aria-hidden="true"
      className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <h3 className="text-[13px] font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">{sub}</p>
      <div className={`${block} mt-4 h-7 w-40`} />
      <div className="mt-4 border-t border-[var(--muted)] pt-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between gap-6 py-3">
            <div className={`${block} h-3 w-16`} />
            <div className={`${block} h-3 w-20`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function RecomputeInProgress({ estimate }: { estimate: Estimate }) {
  return (
    <div>
      <div className="px-6 pt-6 pr-16">
        <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--muted-text)]">
          Recompute
        </p>
        <h2 id="recompute-title" className="mt-1.5 text-[19px] font-semibold text-[var(--text)]">
          <span className="font-mono tabular-nums">{estimate.reference}</span>
        </h2>
        <p className="mt-1 text-[12px] text-[var(--text-sec)]">
          {estimate.retailer} · {estimate.piece} · {estimate.date}
        </p>
      </div>

      <div aria-live="polite" className="sr-only">
        Recomputing {estimate.reference} from its stored inputs.
      </div>

      <div className="px-6 py-5">
        <div className="rounded-[12px] border border-[var(--border-strong)] bg-[var(--muted)] px-5 py-5">
          <p className="text-[15px] font-semibold text-[var(--text)]">
            Running the same calculation, from the same stored inputs
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-sec)]">
            The stored range is {estimate.shownRange}. The recompute reads the estimate's own inputs
            and runs them again.
          </p>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <ColumnSkeleton
            title="What was stored"
            sub="The range the consumer saw, and its three lines."
          />
          <ColumnSkeleton
            title="What it produces now"
            sub="The same calculation, from the same stored inputs."
          />
        </div>
      </div>
    </div>
  );
}