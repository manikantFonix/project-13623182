'use client';

import { useState } from 'react';
import { focusRing } from '../tokens';
import type { LeadsState } from './data';

const options: { value: LeadsState; label: string }[] = [
  { value: 'populated', label: 'Populated' },
  { value: 'quiet', label: 'Quiet period' },
  { value: 'loading', label: 'Loading' },
  { value: 'error', label: 'Error' },
];

export default function LeadsStateControl({
  state,
  onChange,
}: {
  state: LeadsState;
  onChange: (state: LeadsState) => void;
}) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 h-9 px-3 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2 text-[13px] font-medium text-[var(--text)] hover:bg-[var(--muted)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
      >
        <span className="w-4 h-4 flex items-center justify-center text-[var(--text-sec)]">
          <i className="ri-flask-line text-[16px]" aria-hidden="true" />
        </span>
        Preview state
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[min(340px,calc(100vw-32px))] bg-[var(--surface)] border border-[var(--border)] rounded-[16px]">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[var(--border)]">
        <span className="w-6 h-6 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
          <i className="ri-flask-line text-[14px]" aria-hidden="true" />
        </span>
        <span className="flex-1 text-[13px] font-semibold text-[var(--text)]">Preview state</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Minimise preview controls"
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-sec)] hover:bg-[var(--muted)] transition-colors duration-150 ${focusRing}`}
        >
          <i className="ri-eye-off-line text-[16px]" aria-hidden="true" />
        </button>
      </div>

      <div className="p-2.5">
        <div className="flex flex-wrap gap-1.5">
          {options.map((option) => {
            const active = state === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(option.value)}
                className={`h-8 px-3 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 ${focusRing} ${
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

      <div className="px-3 py-1.5 border-t border-[var(--border)]">
        <span className="text-[11px] text-[var(--muted-text)]">Switch how this screen looks</span>
      </div>
    </div>
  );
}