'use client';

import { useEffect, useRef } from 'react';
import { CUSTOMER_FOCUS_RING, type RecordItem } from './data';
import { useDialogFocus } from '../../lib/useDialogFocus';

interface Props {
  open: boolean;
  record: RecordItem;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ManufacturerRemoveDialog({ open, record, onClose, onConfirm }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(22,35,62,0.4)]"
      role="dialog"
      aria-modal="true"
      aria-label="Remove manufacturer"
    >
      <div ref={cardRef} className="w-[440px] bg-[var(--surface)] border border-[var(--border)] rounded-[16px] p-8 text-center">
        <span className="mx-auto w-14 h-14 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--alert)]">
          <i className="ri-building-2-line text-[24px] w-7 h-7 flex items-center justify-center" />
        </span>
        <h2 className="mt-4 text-[18px] font-semibold text-[var(--text)]">
          Remove Manufacturer?
        </h2>
        <p className="mt-2 text-[13px] text-[var(--text-sec)] leading-relaxed">
          Are you sure you want to remove <span className="text-[var(--text)] font-medium">{record.name}</span> from your
          manufacturer list? This action cannot be undone.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`h-11 px-8 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[10px] hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-11 px-8 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--alert)] border border-[var(--alert)] rounded-[10px] hover:bg-[var(--alert-strong)] hover:border-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}