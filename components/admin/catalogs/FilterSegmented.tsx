'use client';

import { focusRing } from '../tokens';

export default function FilterSegmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  const labelId = `catalog-filter-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex items-center gap-2">
      <span id={labelId} className="text-[12px] font-medium text-[var(--text-sec)] whitespace-nowrap">
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={labelId}
        className="inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--muted)]"
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`h-7 px-3 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                active
                  ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                  : 'text-[var(--text-sec)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}