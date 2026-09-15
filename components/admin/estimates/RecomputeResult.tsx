'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RecomputeVerdict from './RecomputeVerdict';
import ComparisonColumn, { type ComparisonLine } from './ComparisonColumn';
import {
  LINE_LABELS,
  estimateMatches,
  labourOnlyChange,
  money,
  type Estimate,
} from './data';
import { focusRing } from '../tokens';
import { useRouter } from 'next/navigation';

export default function RecomputeResult({
  estimate,
  onClose,
}: {
  estimate: Estimate;
  onClose: () => void;
}) {
  const router = useRouter();
  const [announced, setAnnounced] = useState(false);
  const matches = estimateMatches(estimate);

  useEffect(() => {
    const timer = window.setTimeout(() => setAnnounced(true), 60);
    return () => window.clearTimeout(timer);
  }, []);

  const storedLines: ComparisonLine[] = LINE_LABELS.map((line) => ({
    label: line.label,
    value: estimate.shownLines[line.key],
  }));

  const nowLines: ComparisonLine[] = LINE_LABELS.map((line) => {
    const delta = estimate.nowLines[line.key] - estimate.shownLines[line.key];
    return {
      label: line.label,
      value: estimate.nowLines[line.key],
      note:
        delta === 0
          ? undefined
          : `${money(Math.abs(delta))} ${delta > 0 ? 'higher' : 'lower'} than stored`,
    };
  });

  const announcement = matches
    ? `Recompute finished. The stored range and the recomputed range both come to ${estimate.shownRange}. They match. The stored estimate is unchanged.`
    : `Recompute finished. The stored range is ${estimate.shownRange}; the recompute produces ${estimate.nowRange}. They differ. ${
        labourOnlyChange(estimate)
          ? `Only the labor line moved, so ${estimate.retailer}'s bench rate is the likely cause.`
          : `Either the platform configuration or ${estimate.retailer}'s bench rate has changed.`
      } The stored estimate is unchanged.`;

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
        {announced ? announcement : ''}
      </div>

      <div className="px-6 py-5">
        <RecomputeVerdict estimate={estimate} />

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <ComparisonColumn
            title="What was stored"
            sub="The range the consumer saw, and its three lines."
            range={estimate.shownRange}
            lines={storedLines}
          />
          <ComparisonColumn
            title="What it produces now"
            sub="The same calculation, from the same stored inputs."
            range={estimate.nowRange}
            rangeNote={
              matches ? undefined : `The stored range was ${estimate.shownRange}.`
            }
            lines={nowLines}
          />
        </div>

        <div className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
          <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
            <i className="ri-lock-line text-[15px]" aria-hidden="true" />
          </span>
          <p className="text-[12px] leading-relaxed text-[var(--text-sec)]">
            <span className="font-semibold text-[var(--text)]">Nothing was written.</span> The consumer
            saw {estimate.shownRange}, and that stays on the record, unchanged.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
          <Link
            href={`/admin/estimate-recompute?estimate=${estimate.reference}`}
            className={`text-[13px] font-medium text-[var(--accent)] underline-offset-2 hover:underline rounded-full focus:outline-none ${focusRing}`}
          >
            Link straight to this comparison
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin/estimate-recompute')}
              className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
            >
              Recent estimates
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`h-9 px-5 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}