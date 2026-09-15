'use client';

import { focusRing } from '../tokens';

const roundTo = (value: number, step: number): number => Math.round(value / step) * step;

const money = (value: number): string => `$${value.toLocaleString('en-US')}`;

export default function UpliftCard({
  uplift,
  rounding,
  disabled,
  onChange,
}: {
  uplift: number;
  rounding: number;
  disabled?: boolean;
  onChange: (next: { uplift: number; rounding: number }) => void;
}) {
  const sample = 1000;
  const low = roundTo(sample, rounding);
  const high = roundTo(sample * (1 + uplift / 100), rounding);

  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-[13px] font-semibold text-[var(--text)]">Range uplift and rounding</h3>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
            The computed figure is the low end. The high end is that figure plus the uplift.
          </p>
        </div>
        <div className="shrink-0 flex items-end gap-5">
          <div>
            <label htmlFor="uplift" className="block text-[12px] font-semibold text-[var(--text)]">
              Uplift
            </label>
            <div className="mt-1.5 flex items-center gap-1.5">
              <input
                id="uplift"
                type="number"
                inputMode="decimal"
                min={0}
                step={1}
                value={uplift}
                disabled={disabled}
                onChange={(event) => {
                  const parsed = Number(event.target.value);
                  if (!Number.isFinite(parsed)) return;
                  onChange({ uplift: Math.max(0, parsed), rounding });
                }}
                className={`w-[72px] h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-right text-[13px] tabular-nums text-[var(--text)] transition-colors duration-150 ${focusRing}`}
              />
              <span className="text-[13px] text-[var(--text-sec)]">%</span>
            </div>
          </div>
          <div>
            <label htmlFor="rounding" className="block text-[12px] font-semibold text-[var(--text)]">
              Rounding
            </label>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="text-[13px] text-[var(--text-sec)]">$</span>
              <input
                id="rounding"
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={rounding}
                disabled={disabled}
                onChange={(event) => {
                  const parsed = Number(event.target.value);
                  if (!Number.isFinite(parsed)) return;
                  onChange({ uplift, rounding: Math.max(1, parsed) });
                }}
                className={`w-[72px] h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-right text-[13px] tabular-nums text-[var(--text)] transition-colors duration-150 ${focusRing}`}
              />
              <span className="text-[13px] text-[var(--text-sec)]">to nearest</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-[var(--border)] text-[12px] tabular-nums text-[var(--muted-text)]">
        A computed {money(sample)} shows as {money(low)} to {money(high)}. Rounding applies to both ends.
      </div>
    </div>
  );
}