'use client';

import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING } from './data';

interface Props {
  disabled: boolean;
  onCustomer: () => void;
  onManufacturer: () => void;
}

export default function ShareMenu({ disabled, onCustomer, onManufacturer }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`h-9 px-4 inline-flex items-center gap-2 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
          disabled
            ? 'border-[var(--border)] text-[var(--text-sec)] cursor-not-allowed'
            : 'bg-[var(--accent)] border-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]'
        }`}
      >
        <i className="ri-send-plane-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
        {open ? 'Share' : 'Share'}
        <i
          className={`ri-arrow-down-s-line text-[16px] w-4 h-4 flex items-center justify-center transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 z-20 w-[260px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-1.5"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onCustomer();
            }}
            className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[var(--canvas)] text-left transition-colors duration-150 ${FOCUS_RING}`}
          >
            <i className="ri-user-heart-line text-[18px] w-5 h-5 flex items-center justify-center text-[var(--accent-text)] mt-0.5" />
            <span>
              <span className="block text-[13px] font-medium text-[var(--text)]">
                Send to customer
              </span>
              <span className="block text-[12px] text-[var(--text-sec)] mt-0.5">
                Share the design link for approval.
              </span>
            </span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onManufacturer();
            }}
            className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[var(--canvas)] text-left transition-colors duration-150 ${FOCUS_RING}`}
          >
            <i className="ri-goblet-line text-[18px] w-5 h-5 flex items-center justify-center text-[var(--text-sec)] mt-0.5" />
            <span>
              <span className="block text-[13px] font-medium text-[var(--text)]">
                Send to manufacturer
              </span>
              <span className="block text-[12px] text-[var(--text-sec)] mt-0.5">
                Send the approved design to production.
              </span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}