'use client';

import { useEffect, useRef, useState } from 'react';
import { focusRing } from '../tokens';
import { PLANS, planOrder, type PlanFilter } from './data';

export default function PlanMenu({
  value,
  onChange,
}: {
  value: PlanFilter;
  onChange: (value: PlanFilter) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = value === 'all' ? 'All plans' : PLANS[value].label;
  const options: PlanFilter[] = ['all', ...planOrder];

  return (
    <div className="flex items-center gap-2">
      <span className="text-[12px] font-medium text-[var(--text-sec)] whitespace-nowrap">Plan</span>
      <div ref={ref} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`h-9 pl-3 pr-2 rounded-full border border-[var(--border)] bg-[var(--muted)] flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--surface)] ${focusRing}`}
        >
          <span className="whitespace-nowrap">{label}</span>
          <span className="w-4 h-4 flex items-center justify-center text-[var(--text-sec)]">
            <i className="ri-arrow-down-s-line text-[16px]" aria-hidden="true" />
          </span>
        </button>

        {open && (
          <ul
            role="listbox"
            aria-label="Plan"
            className="absolute z-40 mt-1 w-[180px] rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-1"
          >
            {options.map((option) => {
              const active = option === value;
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={`w-full h-8 px-3 rounded-[8px] flex items-center justify-between gap-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                      active
                        ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                        : 'text-[var(--text-sec)] hover:bg-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    <span>{option === 'all' ? 'All plans' : PLANS[option].label}</span>
                    {active && (
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-check-line text-[15px]" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}