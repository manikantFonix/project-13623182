'use client';

import { useRef } from 'react';
import DialogShell from './DialogShell';
import { FOCUS } from './data';

export default function QuotePassDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogShell
      open={open}
      onClose={onCancel}
      initialFocus={cancelRef}
      labelledBy="quote-pass-title"
      maxWidth={420}
    >
      <h2 id="quote-pass-title" className="text-[18px] font-semibold text-[#16233E]">
        Tell them you can&apos;t take this on?
      </h2>
      <p className="mt-2 text-[13px] text-[#16233E]">
        The jeweler will see that you&apos;ve passed on it. You won&apos;t be able to quote
        afterwards.
      </p>
      <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
        <button
          ref={cancelRef}
          type="button"
          onClick={onCancel}
          className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full text-[13px] font-medium text-[#5D6C8A] whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:bg-[#F3F6FC] transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full bg-white border border-[#A8552A] text-[#A8552A] text-[13px] font-medium whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:bg-[#A8552A]/5 transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`}
        >
          Confirm
        </button>
      </div>
    </DialogShell>
  );
}