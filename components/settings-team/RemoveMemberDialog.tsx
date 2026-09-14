'use client';

import { useEffect, useRef } from 'react';
import DialogModal from '../settings-widget/DialogModal';
import { focusRingVar } from '../settings/theme/tokens';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}

export default function RemoveMemberDialog({ open, onClose, onConfirm, name }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  return (
    <DialogModal open={open} onClose={onClose} width={460}>
      <h3 className="text-[18px] font-semibold text-[var(--text)]">
        Remove {name}?
      </h3>
      <p className="mt-3 text-[13px] text-[var(--text)]">
        They'll lose access straight away.
      </p>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        Nothing they created is deleted. Designs, catalogs, requests and leads
        all stay on the account.
      </p>
      <div className="mt-5 flex items-center justify-end gap-4">
        <button
          ref={cancelRef}
          type="button"
          onClick={onClose}
          className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] hover:text-[var(--text-sec)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`h-9 px-6 text-[13px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] rounded-full hover:text-[var(--alert-strong)] hover:border-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
        >
          Remove
        </button>
      </div>
    </DialogModal>
  );
}