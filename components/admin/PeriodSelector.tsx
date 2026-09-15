'use client';

import { adminPeriods, type AdminPeriodId } from './data';
import { focusRing } from './tokens';

export default function PeriodSelector({
  value,
  onChange,
}: {
  value: AdminPeriodId;
  onChange: (v: AdminPeriodId) => void;
}) {
  const onKey = (e: React.KeyboardEvent) => {
    const idx = adminPeriods.findIndex((p) => p.id === value);
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (dir === 0) return;
    e.preventDefault();
    const next = adminPeriods[(idx + dir + adminPeriods.length) % adminPeriods.length];
    onChange(next.id);
  };

  return (
    <div
      role="tablist"
      aria-label="Reporting period"
      onKeyDown={onKey}
      className="inline-flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-full p-1"
    >
      {adminPeriods.map((p) => {
        const active = value === p.id;
        return (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(p.id)}
            className={`h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
              active
                ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                : 'text-[var(--text-sec)] hover:bg-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}