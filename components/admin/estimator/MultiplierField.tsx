'use client';

import { focusRing } from '../tokens';

export default function MultiplierField({
  id,
  label,
  value,
  error,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  error?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[12px] font-semibold text-[var(--text)]">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={1.01}
        step={0.1}
        value={value}
        disabled={disabled}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          if (!Number.isFinite(parsed)) return;
          onChange(parsed);
        }}
        className={`mt-1.5 w-full h-9 rounded-full border bg-[var(--muted)] px-3 text-[13px] tabular-nums text-[var(--text)] transition-colors duration-150 ${focusRing} ${
          error ? 'border-[var(--alert)]' : 'border-[var(--border)]'
        }`}
      />
      <p className="mt-1 text-[11px] text-[var(--muted-text)]">Applied to every category's base days.</p>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[11px] leading-relaxed text-[var(--alert-strong)]">
          {error}
        </p>
      )}
    </div>
  );
}