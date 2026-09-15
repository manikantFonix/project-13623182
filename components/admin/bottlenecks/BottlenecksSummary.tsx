'use client';

export default function BottlenecksSummary({
  aboveCount,
  total,
}: {
  aboveCount: number;
  total: number;
}) {
  const clear = aboveCount === 0;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-[12px] border p-5 ${
        clear
          ? 'bg-[var(--success-bg)] border-[var(--border)]'
          : 'bg-[var(--amber-bg)] border-[var(--border-strong)]'
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span
              className="w-5 h-5 flex items-center justify-center shrink-0"
              style={{ color: clear ? 'var(--success)' : 'var(--alert-strong)' }}
            >
              <i
                className={`${clear ? 'ri-checkbox-circle-line' : 'ri-alert-line'} text-[16px]`}
                aria-hidden="true"
              />
            </span>
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.06em]"
              style={{ color: clear ? 'var(--success)' : 'var(--alert-strong)' }}
            >
              {clear ? 'All clear' : 'Attention needed'}
            </p>
          </div>

          <p className="mt-3.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[28px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[var(--text)]">
              {aboveCount}
            </span>
            <span className="text-[13px] font-medium text-[var(--text)]">
              of {total} indicators above threshold
            </span>
          </p>
        </div>

        <p className="text-[13px] leading-relaxed text-[var(--text-sec)] lg:max-w-[430px] lg:pt-0.5">
          {clear
            ? `None is over threshold. All are listed below.`
            : `The badge counts every open bottleneck. Each indicator names the accounts behind it.`}
        </p>
      </div>
    </div>
  );
}