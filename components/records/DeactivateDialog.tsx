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

export default function DeactivateDialog({ open, record, onClose, onConfirm }: Props) {
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
      aria-label="Make inactive"
    >
      <div ref={cardRef} className="w-[460px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-7">
        <h2 className="text-[18px] font-semibold text-[var(--text)]">
          Make {record.name} inactive?
        </h2>
        <p className="mt-3 text-[13px] text-[var(--text)]">
          They won't appear when you route a new request. Nothing is deleted, and any
          request already with them is unaffected — including one waiting on their
          quote, which they can still send.
        </p>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] hover:text-[var(--text-sec)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Make inactive
          </button>
        </div>
      </div>
    </div>
  );
}