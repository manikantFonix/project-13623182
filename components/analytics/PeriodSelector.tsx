'use client';

import { useRef, useState, useEffect } from 'react';
import { periods, periodFor, focusRing, type PeriodId } from './data';

export default function PeriodSelector({
  value,
  onChange,
  disabled,
}: {
  value: PeriodId;
  onChange: (v: PeriodId) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const current = periodFor(value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`h-9 px-3 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)] hover:bg-[var(--muted)] transition-colors duration-150 whitespace-nowrap ${focusRing} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {current.label}
        <span className="w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
          <i className={`ri-arrow-down-s-line text-[18px] transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Reporting period"
          className="absolute right-0 mt-2 w-48 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-1 z-30"
        >
          {periods.map((p) => {
            const active = p.id === value;
            return (
              <button
                key={p.id}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(p.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 h-9 rounded-[8px] text-[13px] font-medium transition-colors duration-150 text-left whitespace-nowrap ${focusRing} ${
                  active ? 'bg-[var(--canvas)] text-[var(--text)]' : 'text-[var(--text)] hover:bg-[var(--muted)]'
                }`}
              >
                {p.label}
                {active && (
                  <i className="ri-check-line text-[16px] w-4 h-4 flex items-center justify-center text-[var(--accent-text)]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}