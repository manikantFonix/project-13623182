'use client';

import { useRef } from 'react';
import { useFocusTrap } from '../../approval/useFocusTrap';
import { focusRingVar } from '../../settings/theme/tokens';

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function RemoveCoverDialog({ open, onCancel, onConfirm }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const ref = useFocusTrap(open, onCancel, cancelRef);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={onCancel}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-cover-title"
        className="relative w-[460px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6"
      >
        <h2
          id="remove-cover-title"
          className="text-[18px] font-semibold text-[var(--text)]"
        >
          Remove the cover image that's live?
        </h2>
        <p className="mt-2 text-[13px] text-[var(--text)]">
          Your shared catalog will go back to showing just the name and the
          piece count. You can set another one whenever you like.
        </p>
        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className={`px-2 h-9 text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap cursor-pointer ${focusRingVar}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] rounded-full hover:bg-[var(--muted)] hover:text-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap cursor-pointer ${focusRingVar}`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}