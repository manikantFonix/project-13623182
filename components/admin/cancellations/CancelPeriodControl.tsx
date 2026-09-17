'use client';

import { focusRing } from '../tokens';
import { CANCEL_PERIODS, type CancelPeriodId } from './data';

export default function CancelPeriodControl({
  value,
  onChange,
}: {
  value: CancelPeriodId;
  onChange: (next: CancelPeriodId) => void;
}) {
  const onKey = (event: React.KeyboardEvent) => {
    const index = CANCEL_PERIODS.findIndex((period) => period.id === value);
    const dir = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (dir === 0) return;
    event.preventDefault();
    const next = CANCEL_PERIODS[(index + dir + CANCEL_PERIODS.length) % CANCEL_PERIODS.length];
    onChange(next.id);
  };

  return (
    <div
      role="group"
      aria-label="Reporting period"
      onKeyDown={onKey}
      className="inline-flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-full p-1"
    >
      {CANCEL_PERIODS.map((period) => {
        const active = value === period.id;
        return (
          <button
            key={period.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(period.id)}
            className={`h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
              active
                ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                : 'text-[var(--text-sec)] hover:bg-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            {period.label}
          </button>
        );
      })}
    </div>
  );
}