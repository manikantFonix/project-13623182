'use client';

import DialogModal from './DialogModal';
import { focusRing } from './data';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RotateKeyDialog({ open, onClose, onConfirm }: Props) {
  return (
    <DialogModal open={open} onClose={onClose} width={520}>
      <h3 className="text-[18px] font-semibold text-[var(--text)]">
        Rotate your embed key?
      </h3>
      <div className="mt-2 space-y-2">
        <p className="text-[13px] text-[var(--text)]">
          The current key stops working immediately.
        </p>
        <p className="text-[13px] text-[var(--text)]">
          Every place you've pasted the snippet will stop loading until you
          replace it with the new one. If the widget is on more than one page,
          that's every one of them.
        </p>
        <p className="text-[13px] text-[#5D6C8A]">
          Only do this if you think the key has been misused. It doesn't fix
          anything else.
        </p>
      </div>
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
          Rotate key
        </button>
      </div>
    </DialogModal>
  );
}