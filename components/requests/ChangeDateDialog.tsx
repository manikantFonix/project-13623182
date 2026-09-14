'use client';

import { useEffect, useRef, useState } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';

interface Props {
  open: boolean;
  value: string;
  onSave: (date: string) => void;
  onClose: () => void;
}

export default function ChangeDateDialog({ open, value, onSave, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [date, setDate] = useState(value);

  useDialogFocus(open, cardRef, cancelRef);

  useEffect(() => {
    if (!open) return;
    setDate(value);
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, value]);

  if (!open) return null;

  const disabled = !date || date === value;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-date-title"
        className="relative w-full max-w-[460px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-7"
      >
        <h2 id="change-date-title" className="text-[18px] font-semibold text-[var(--text)]">
          Change the expected date?
        </h2>
        <p className="mt-2 text-[13px] text-[var(--text)]">
          Your customer sees this on their approval link. They&#39;ll see the new
          date next time they open it.
        </p>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-4 w-full h-10 px-3 text-[13px] tabular-nums text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] focus:outline-none focus:border-[var(--accent)]"
        />

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            ref={cancelRef}
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap cursor-pointer ${FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSave(date)}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${FOCUS_RING}`}
          >
            Save date
          </button>
        </div>
      </div>
    </div>
  );
}