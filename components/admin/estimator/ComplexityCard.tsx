'use client';

import MultiplierField from './MultiplierField';
import type { Multipliers } from './data';

export default function ComplexityCard({
  multipliers,
  midError,
  highError,
  disabled,
  onChange,
}: {
  multipliers: Multipliers;
  midError?: string;
  highError?: string;
  disabled?: boolean;
  onChange: (next: Multipliers) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="max-w-[560px]">
        <h3 className="text-[13px] font-semibold text-[var(--text)]">Complexity multipliers</h3>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
          Three complexity levels scale every category's base days.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-5 max-w-[720px]">
        <div>
          <span className="block text-[12px] font-semibold text-[var(--text)]">Simple</span>
          <div
            className="mt-1.5 h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 flex items-center text-[13px] tabular-nums text-[var(--text-sec)]"
            aria-label="Simple multiplier, fixed at 1.0"
          >
            1.0
          </div>
          <p className="mt-1 text-[11px] text-[var(--muted-text)]">Fixed at 1.0. Not editable.</p>
        </div>

        <MultiplierField
          id="multiplier-mid"
          label="Moderate"
          value={multipliers.mid}
          error={midError}
          disabled={disabled}
          onChange={(mid) => onChange({ ...multipliers, mid })}
        />

        <MultiplierField
          id="multiplier-high"
          label="Complex"
          value={multipliers.high}
          error={highError}
          disabled={disabled}
          onChange={(high) => onChange({ ...multipliers, high })}
        />
      </div>
    </div>
  );
}