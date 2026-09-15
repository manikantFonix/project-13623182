'use client';

import { focusRing } from '../tokens';

export default function DefaultLabourRateCard({
  value,
  retailersOnDefault,
  disabled,
  onChange,
}: {
  value: number;
  retailersOnDefault: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 id="default-labour-rate-label" className="text-[13px] font-semibold text-[var(--text)]">
            Default labor day rate
          </h3>
          <p
            id="default-labour-rate-desc"
            className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]"
          >
            Used only by retailers who haven&rsquo;t set their own.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <label htmlFor="default-labour-rate" className="sr-only">
            Default labor day rate in US dollars per day
          </label>
          <span className="w-6 h-9 flex items-center justify-end text-[13px] text-[var(--text-sec)]">
            $
          </span>
          <input
            id="default-labour-rate"
            type="number"
            inputMode="decimal"
            min={0}
            step={10}
            value={value}
            disabled={disabled}
            aria-describedby="default-labour-rate-desc"
            onChange={(event) => {
              const parsed = Number(event.target.value);
              if (!Number.isFinite(parsed)) return;
              onChange(Math.max(0, parsed));
            }}
            className={`w-[120px] h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-right text-[13px] tabular-nums text-[var(--text)] transition-colors duration-150 ${focusRing}`}
          />
          <span className="text-[13px] text-[var(--text-sec)] whitespace-nowrap">per day</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-baseline justify-between gap-4">
        <span className="text-[12px] leading-relaxed text-[var(--muted-text)]">
          A retailer&rsquo;s own rate always takes precedence. Changing this touches nobody else.
        </span>
        <span className="shrink-0 text-[13px] tabular-nums text-[var(--text)]">
          <span className="font-semibold">{retailersOnDefault}</span>
          <span className="text-[var(--text-sec)]">
            {' '}
            retailer{retailersOnDefault === 1 ? '' : 's'} on the default
          </span>
        </span>
      </div>
    </div>
  );
}