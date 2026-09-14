'use client';

import { useRef } from 'react';
import DialogShell from '../DialogShell';
import { FOCUS } from '../data';

export default function QuoteSuccessDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogShell
      open={open}
      onClose={onClose}
      initialFocus={closeRef}
      labelledBy="quote-success-title"
    >
      <div className="flex justify-center">
        <span className="w-10 h-10 rounded-full bg-[#E8F1EC] flex items-center justify-center text-[#3D6B54]">
          <i className="ri-check-line text-[20px] w-5 h-5 flex items-center justify-center" />
        </span>
      </div>
      <h2
        id="quote-success-title"
        className="mt-4 text-[20px] font-semibold text-[#16233E] text-center"
      >
        Quote sent
      </h2>
      <p className="mt-1 text-[13px] text-[#16233E] text-center">The jeweler has it.</p>

      <div className="mt-5 bg-[#F3F6FC] rounded-[12px] p-4 text-[13px] text-[#5D6C8A]">
        They&apos;ll be in touch once they&apos;ve looked at it. Your quote is locked and can&apos;t
        be changed.
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:justify-end">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full bg-[var(--brand)] text-white text-[13px] font-medium whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:opacity-95 transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`}
        >
          Close
        </button>
      </div>
    </DialogShell>
  );
}