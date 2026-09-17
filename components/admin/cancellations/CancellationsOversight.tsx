'use client';

import { useMemo, useState } from 'react';
import SectionHeading from '../SectionHeading';
import CancelConsumption from './CancelConsumption';
import CancelFreeText from './CancelFreeText';
import CancelList from './CancelList';
import CancelPeriodControl from './CancelPeriodControl';
import CancelReasonChart from './CancelReasonChart';
import CancellationsErrorState from './CancellationsErrorState';
import CancellationsNoCancel from './CancellationsNoCancel';
import CancellationsNoReason from './CancellationsNoReason';
import CancellationsNote from './CancellationsNote';
import CancellationsSkeleton from './CancellationsSkeleton';
import CancellationsStateControl from './CancellationsStateControl';
import CancellationsSummary from './CancellationsSummary';
import {
  cancelPeriodFor,
  fmtInt,
  freeTextEntries,
  getRows,
  noReasonCount,
  reasonCounts,
  stripReasons,
  summarise,
  usageByReason,
  type CancelPeriodId,
  type CancellationsState,
} from './data';

export default function CancellationsOversight() {
  const [state, setState] = useState<CancellationsState>('populated');
  const [period, setPeriod] = useState<CancelPeriodId>('30d');

  const periodMeta = cancelPeriodFor(period);

  const rows = useMemo(() => {
    const base = getRows(period);
    if (state === 'none') return [];
    if (state === 'noReason') return stripReasons(base);
    return base;
  }, [period, state]);

  const summary = useMemo(() => summarise(rows), [rows]);
  const reasons = useMemo(() => reasonCounts(rows), [rows]);
  const usage = useMemo(() => usageByReason(rows), [rows]);
  const notes = useMemo(() => freeTextEntries(rows), [rows]);
  const noReason = useMemo(() => noReasonCount(rows), [rows]);

  const showBody = state !== 'loading' && state !== 'error';
  const hasCancellations = summary.cancelled > 0;
  const hasReasons = summary.gaveReason > 0;

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="max-w-[1180px]">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Cancellations
        </h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          The reasons retailers give when they leave, and how much of their allowance they were
          actually using.
        </p>
        <p className="mt-2 text-[12px] text-[var(--muted-text)]">
          Read-only · nothing here changes a subscription
        </p>
      </header>

      <div className="mt-7 max-w-[1280px]">
        <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3 flex flex-wrap items-center gap-4">
          <CancelPeriodControl value={period} onChange={setPeriod} />
          <p className="text-[12px] tabular-nums text-[var(--text-sec)]">
            Showing <span className="font-medium text-[var(--text)]">{periodMeta.range}</span>
          </p>
        </div>

        <div className="mt-6">
          {state === 'loading' ? (
            <CancellationsSkeleton />
          ) : state === 'error' ? (
            <CancellationsErrorState onRetry={() => setState('populated')} />
          ) : (
            <>
              <CancellationsSummary summary={summary} periodRange={periodMeta.range} />

              {!hasCancellations ? (
                <div className="mt-8">
                  <CancellationsNoCancel periodRange={periodMeta.range} />
                </div>
              ) : (
                <>
                  <section aria-label="Why they left" className="mt-9">
                    <SectionHeading
                      title="Why they left"
                      purpose="How the retailers who gave a reason split across the five options."
                      period={periodMeta.short}
                    />
                    {hasReasons ? (
                      <CancelReasonChart
                        reasons={reasons}
                        noReason={noReason}
                        gaveReason={summary.gaveReason}
                      />
                    ) : (
                      <CancellationsNoReason total={summary.cancelled} />
                    )}
                  </section>

                  {hasReasons && (
                    <section aria-label="What they were using" className="mt-9">
                      <SectionHeading
                        title="What they were using"
                        purpose="Average share of allowance used in their last period, by reason."
                        period={periodMeta.short}
                      />
                      <CancelConsumption usage={usage} />
                    </section>
                  )}

                  {notes.length > 0 && (
                    <section aria-label="In their words" className="mt-9">
                      <SectionHeading
                        title="In their words"
                        purpose="What retailers wrote, exactly as they left it."
                        period={`${notes.length} ${notes.length === 1 ? 'note' : 'notes'}`}
                      />
                      <CancelFreeText entries={notes} />
                    </section>
                  )}

                  <section aria-label="Who cancelled" className="mt-9">
                    <SectionHeading
                      title="Who cancelled"
                      purpose="Every cancellation this period, most recent first."
                      period={`${fmtInt(summary.cancelled)} shown`}
                    />
                    <CancelList rows={rows} />
                  </section>
                </>
              )}

              <div className="mt-10">
                <CancellationsNote />
              </div>
            </>
          )}
        </div>
      </div>

      <CancellationsStateControl state={state} onChange={setState} />
    </main>
  );
}