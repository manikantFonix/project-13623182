'use client';

import { useRef } from 'react';
import { useFocusTrap } from './useFocusTrap';
import { FOCUS_BRAND } from './data';

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  tone,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  tone: 'primary' | 'alert';
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const ref = useFocusTrap(open, onCancel, cancelRef);

  if (!open) return null;

  const confirmClass =
    tone === 'primary'
      ? 'bg-[var(--brand)] text-white'
      : 'bg-white border border-[#A8552A] text-[#A8552A] hover:bg-[#A8552A]/5';

  return (
    <div className="fixed inset-0 z-50 bg-[#16233E]/40 flex items-center justify-center p-4">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="approval-confirm-title"
        className="w-full max-w-[400px] bg-white border border-[#DCE3F0] rounded-[12px] p-5"
      >
        <h2
          id="approval-confirm-title"
          className="text-[15px] font-medium text-[#16233E]"
        >
          {title}
        </h2>
        <p className="mt-2 text-[13px] text-[#5D6C8A]">{message}</p>

        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full bg-white border border-[#C6D0E6] text-[13px] font-medium text-[#16233E] whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:bg-[#F3F6FC] transition-colors duration-150 motion-reduce:transition-none ${FOCUS_BRAND}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full text-[13px] font-medium whitespace-nowrap cursor-pointer inline-flex items-center justify-center transition-colors duration-150 motion-reduce:transition-none ${confirmClass} ${FOCUS_BRAND}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}