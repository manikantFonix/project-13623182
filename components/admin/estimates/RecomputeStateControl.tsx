'use client';

import { useState } from 'react';
import type { RecomputeState } from './data';
import { focusRing } from '../tokens';

const states: { value: RecomputeState; label: string }[] = [
  { value: 'populated', label: 'Populated' },
  { value: 'none', label: 'No estimates' },
  { value: 'loading', label: 'Loading' },
  { value: 'error', label: 'Error' },
];

export type PreviewState = 'matched' | 'differs' | 'differs-labour' | 'recomputing';

const previews: { value: PreviewState; label: string }[] = [
  { value: 'matched', label: 'Result — matches' },
  { value: 'differs', label: 'Result — differs' },
  { value: 'differs-labour', label: 'Result — differs, labor only' },
  { value: 'recomputing', label: 'Recomputing' },
];

export default function RecomputeStateControl({
  state,
  preview,
  onState,
  onPreview,
}: {
  state: RecomputeState;
  preview: PreviewState | null;
  onState: (value: RecomputeState) => void;
  onPreview: (value: PreviewState) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-2 w-[248px] rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3">
          <p className="px-6 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
            Screen state
          </p>
          <div className="mt-2.5 flex flex-col gap-1.5">
            {states.map((option) => {
              const active = !preview && state === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    onState(option.value);
                    setOpen(false);
                  }}
                  className={`h-9 w-full rounded-full px-4 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                    active
                      ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                      : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--muted)]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
            {previews.map((option) => {
              const active = preview === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    onPreview(option.value);
                    setOpen(false);
                  }}
                  className={`h-9 w-full rounded-full px-4 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                    active
                      ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                      : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--muted)]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2.5 px-1 text-[11px] leading-relaxed text-[var(--muted-text)]">
            Temporary. Remove before this screen is used for real.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={`ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] focus:outline-none ${focusRing}`}
        aria-label="Show the screen state control"
      >
        <i className="ri-equalizer-2-line text-[17px]" aria-hidden="true" />
      </button>
    </div>
  );
}