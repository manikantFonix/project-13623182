'use client';

import { cardBase } from '../tokens';
import { fmtInt, type ReasonUsage } from './data';

export default function CancelConsumption({ usage }: { usage: ReasonUsage[] }) {
  const heaviest = [...usage].sort((a, b) => b.average - a.average)[0];
  const lightest = [...usage].sort((a, b) => a.average - b.average)[0];

  return (
    <div className={`${cardBase} p-5`}>
      <ul className="flex flex-col gap-4">
        {usage.map((reason) => (
          <li key={reason.id} className="grid grid-cols-[minmax(180px,220px)_1fr_auto] items-center gap-4">
            <div>
              <p className="text-[13px] font-medium text-[var(--text)]">{reason.label}</p>
              <p className="mt-0.5 text-[12px] tabular-nums text-[var(--muted-text)]">
                {fmtInt(reason.retailers)} {reason.retailers === 1 ? 'retailer' : 'retailers'}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--muted)]"
            >
              <span
                className="block h-full rounded-full bg-[#152E56]"
                style={{ width: `${Math.max(2, reason.average)}%` }}
              />
            </span>
            <p className="text-right text-[13px] font-semibold tabular-nums text-[var(--text)] whitespace-nowrap">
              {reason.average}%
              <span className="ml-2 font-normal text-[var(--muted-text)]">
                {reason.low}–{reason.high}%
              </span>
            </p>
          </li>
        ))}
      </ul>

      {heaviest && lightest && (
        <div className="mt-5 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-3.5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-sec)]">
            The contrast
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text)]">
            Retailers citing &ldquo;{lightest.label}&rdquo; were using about {lightest.average}% of
            their allowance, while those citing &ldquo;{heaviest.label}&rdquo; were using about{' '}
            {heaviest.average}%.
          </p>
        </div>
      )}

      <p className="mt-4 text-[12px] leading-relaxed text-[var(--muted-text)]">
        Share of included allowance used in each retailer&rsquo;s last full period.
      </p>
    </div>
  );
}