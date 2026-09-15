'use client';

import { focusRing } from '../tokens';

export default function NumberStepper({
  inputId,
  describedBy,
  value,
  min,
  max,
  step = 1,
  unit,
  disabled,
  onChange,
}: {
  inputId: string;
  describedBy: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Decrease"
        disabled={disabled || value <= min}
        onClick={() => onChange(clamp(value - step))}
        className={`w-9 h-9 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] flex items-center justify-center text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[var(--surface)] ${focusRing}`}
      >
        <i className="ri-subtract-line text-[16px]" aria-hidden="true" />
      </button>
      <input
        id={inputId}
        type="number"
        inputMode="numeric"
        aria-describedby={describedBy}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={value}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          if (!Number.isFinite(parsed)) return;
          onChange(clamp(parsed));
        }}
        className={`w-[88px] h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-center text-[13px] tabular-nums text-[var(--text)] transition-colors duration-150 ${focusRing}`}
      />
      {unit && <span className="text-[13px] text-[var(--text-sec)] whitespace-nowrap">{unit}</span>}
      <button
        type="button"
        aria-label="Increase"
        disabled={disabled || value >= max}
        onClick={() => onChange(clamp(value + step))}
        className={`w-9 h-9 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] flex items-center justify-center text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[var(--surface)] ${focusRing}`}
      >
        <i className="ri-add-line text-[16px]" aria-hidden="true" />
      </button>
    </div>
  );
}