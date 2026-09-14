'use client';

import DialogModal from './DialogModal';
import { focusRing } from './data';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemoveOriginDialog({ open, onClose, onConfirm }: Props) {
  return (
    <DialogModal open={open} onClose={onClose} width={460}>
      <h3 className="text-[18px] font-semibold text-[var(--text)]">
        Remove your last website?
      </h3>
      <p className="mt-2 text-[13px] text-[var(--text)]">
        The widget will stop working straight away. The snippet can stay on your
        site — it just won't load anything until you add a website back.
      </p>
      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] hover:text-[var(--text-sec)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`h-9 px-4 text-[13px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] rounded-full hover:bg-[var(--alert)]/10 transition-colors duration-150 whitespace-nowrap ${focusRing}`}
        >
          Remove
        </button>
      </div>
    </DialogModal>
  );
}