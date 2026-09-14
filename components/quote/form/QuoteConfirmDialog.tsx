'use client';

import { useRef } from 'react';
import DialogShell from '../DialogShell';
import { FOCUS } from '../data';

export default function QuoteConfirmDialog({
  open,
  piece,
  reference,
  jeweler,
  price,
  days,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  piece: string;
  reference: string;
  jeweler: string;
  price: string;
  days: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogShell
      open={open}
      onClose={onCancel}
      initialFocus={cancelRef}
      labelledBy="quote-confirm-title"
    >
      <div className="flex justify-center">
        <span className="w-10 h-10 rounded-full bg-[#F3F6FC] flex items-center justify-center text-[#A8552A]">
          <i className="ri-alert-line text-[20px] w-5 h-5 flex items-center justify-center" />
        </span>
      </div>
      <h2
        id="quote-confirm-title"
        className="mt-4 text-[20px] font-semibold text-[#16233E] text-center"
      >
        Send this quote?
      </h2>
      <p className="mt-1 text-[13px] text-[#5D6C8A] text-center">
        It can&apos;t be changed afterwards.
      </p>

      <div className="mt-5 bg-[#F3F6FC] rounded-[12px] p-4">
        <div className="border-b border-[#DCE3F0] pb-3">
          <p className="text-[12px] text-[#5D6C8A]">Piece</p>
          <p className="mt-0.5 text-[15px] font-medium text-[#16233E]">{piece}</p>
        </div>
        <div className="border-b border-[#DCE3F0] py-3">
          <p className="text-[12px] text-[#5D6C8A]">Job</p>
          <p className="mt-0.5 text-[15px] font-medium text-[#16233E] tabular-nums">{reference}</p>
        </div>
        <div className="border-b border-[#DCE3F0] py-3">
          <p className="text-[12px] text-[#5D6C8A]">Jeweler</p>
          <p className="mt-0.5 text-[15px] font-medium text-[#16233E]">{jeweler}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-3">
          <div>
            <p className="text-[12px] text-[#5D6C8A]">Your price</p>
            <p className="mt-0.5 text-[15px] font-medium text-[#16233E] tabular-nums">{price}</p>
          </div>
          <div>
            <p className="text-[12px] text-[#5D6C8A]">How long</p>
            <p className="mt-0.5 text-[15px] font-medium text-[#16233E] tabular-nums">{days}</p>
          </div>
        </div>
      </div>

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
          className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full bg-[var(--brand)] text-white text-[13px] font-medium whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:opacity-95 transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`}
        >
          Send quote
        </button>
      </div>
    </DialogShell>
  );
}