'use client';

import type { BottleneckIndicator } from './data';
import IndicatorAccount from './IndicatorAccount';
import StatusPill from './StatusPill';
import { num } from '../tokens';

export default function IndicatorCard({
  indicator,
}: {
  indicator: BottleneckIndicator;
}) {
  const titleId = `bottleneck-${indicator.id}-title`;

  return (
    <section
      aria-labelledby={titleId}
      className="group relative overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--surface)] transition-colors duration-150 hover:border-[var(--border-strong)]"
    >
      <header className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--muted)] text-[var(--text-sec)]">
            <i className={`${indicator.icon} text-[16px]`} aria-hidden="true" />
          </span>
          <h3
            id={titleId}
            className="truncate text-[15px] font-semibold tracking-[-0.01em] text-[var(--text)]"
          >
            {indicator.title}
          </h3>
        </div>
        <StatusPill above={indicator.above} />
      </header>

      <div className="grid lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--muted)_55%,var(--surface))] px-5 py-5 lg:border-b-0 lg:border-r">
          <p className="flex items-baseline gap-2">
            <span
              className={`text-[40px] font-semibold leading-none tracking-[-0.03em] text-[var(--text)] ${num}`}
            >
              {indicator.figure}
            </span>
            <span className="text-[13px] font-medium text-[var(--text-sec)]">{indicator.unit}</span>
          </p>
          <p className="mt-3.5 text-[13px] leading-relaxed text-[var(--text-sec)]">
            {indicator.measures}
          </p>
          {indicator.threshold && (
            <p className="mt-4 flex items-start gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 text-[12px] leading-relaxed text-[var(--muted-text)]">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                <i className="ri-settings-3-line text-[14px]" aria-hidden="true" />
              </span>
              <span>{indicator.threshold}</span>
            </p>
          )}
        </div>

        <div className="min-w-0 px-5 py-5">
          {indicator.accounts.length > 0 ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted-text)]">
                Accounts behind this
              </p>
              <ul className="mt-2 divide-y divide-[var(--border)]">
                {indicator.accounts.map((a) => (
                  <IndicatorAccount key={a.id} account={a} />
                ))}
              </ul>
              {indicator.moreCount > 0 && (
                <p className="mt-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
                  and {indicator.moreCount} more{' '}
                  {indicator.moreCount === 1 ? indicator.moreNoun : `${indicator.moreNoun}s`}
                </p>
              )}
            </>
          ) : (
            <p className="text-[13px] leading-relaxed text-[var(--text-sec)]">
              Checked and clear. No account behind it.
            </p>
          )}

          {indicator.above && indicator.goingOn && (
            <div className="mt-5 flex items-start gap-2.5 rounded-[10px] border border-[var(--border)] bg-[var(--muted)] px-3 py-2.5">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-[var(--text-sec)]">
                <i className="ri-information-line text-[15px]" aria-hidden="true" />
              </span>
              <p className="text-[13px] leading-relaxed text-[var(--text)]">{indicator.goingOn}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}