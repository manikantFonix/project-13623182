'use client';

import { leadsPeriods, type LeadsPeriodId } from './data';
import { focusRing } from '../tokens';

export default function LeadsPeriodControl({
  value,
  onChange,
}: {
  value: LeadsPeriodId;
  onChange: (value: LeadsPeriodId) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span id="leads-period-label" className="text-[12px] font-medium text-[var(--text-sec)] whitespace-nowrap">
        Period
      </span>
      <div
        role="group"
        aria-labelledby="leads-period-label"
        className="inline-flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-full p-1"
      >
        {leadsPeriods.map((option) => {
          const active = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.id)}
              className={`h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                active
                  ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                  : 'text-[var(--text-sec)] hover:bg-[var(--muted)] hover:text-[var(--text)]'
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