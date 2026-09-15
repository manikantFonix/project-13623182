'use client';

import { useState } from 'react';
import Dropdown from '../Dropdown';
import { focusRing } from './tokens';

export default function FilterMenu({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = options.find((option) => option.value === value) ?? options[0];
  const isDefault = options[0]?.value === value;

  return (
    <Dropdown
      open={open}
      onToggle={setOpen}
      panelClass="min-w-[230px] max-h-[320px] overflow-y-auto"
      trigger={
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`h-9 max-w-[280px] rounded-full border pl-3.5 pr-3 flex items-center gap-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
            isDefault
              ? 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-sec)] hover:bg-[var(--muted)]'
              : 'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]'
          }`}
        >
          <span className="truncate">{active.label}</span>
          <span className="w-4 h-4 flex items-center justify-center shrink-0">
            <i className="ri-arrow-down-s-line text-[16px]" aria-hidden="true" />
          </span>
        </button>
      }
    >
      <ul role="listbox" aria-label={label}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full h-9 px-3 rounded-[8px] flex items-center gap-2 text-left text-[13px] whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                  selected
                    ? 'bg-[var(--muted)] text-[var(--text)] font-medium'
                    : 'text-[var(--text-sec)] hover:bg-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                <span className="flex-1 truncate">{option.label}</span>
                {selected && (
                  <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--accent)]">
                    <i className="ri-check-line text-[15px]" aria-hidden="true" />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </Dropdown>
  );
}