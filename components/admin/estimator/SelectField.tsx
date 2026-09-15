'use client';

import { useEffect, useRef, useState } from 'react';
import { focusRing } from '../tokens';

export default function SelectField({
  id,
  label,
  value,
  options,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
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

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-9 pl-3 pr-9 rounded-full border border-[var(--border)] bg-[var(--muted)] flex items-center text-[13px] text-[var(--text)] whitespace-nowrap transition-colors duration-150 disabled:opacity-50 ${focusRing}`}
      >
        <span className="truncate">{value}</span>
        <span className="pointer-events-none absolute right-3 top-0 h-9 w-4 flex items-center justify-center text-[var(--muted-text)]">
          <i className="ri-arrow-down-s-line text-[16px]" aria-hidden="true" />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="absolute z-20 mt-1 w-full max-h-[240px] overflow-y-auto rounded-[12px] border border-[var(--border)] bg-[var(--surface)] py-1"
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
                  className={`w-full px-3 py-2 flex items-center gap-2 text-left text-[13px] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing} ${
                    active ? 'text-[var(--text)] font-medium' : 'text-[var(--text-sec)]'
                  }`}
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    {active && (
                      <i className="ri-check-line text-[15px] text-[var(--accent)]" aria-hidden="true" />
                    )}
                  </span>
                  <span className="truncate">{option}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}