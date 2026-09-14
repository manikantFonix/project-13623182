'use client';

import { useFocusTrap } from '../approval/useFocusTrap';
import { FOCUS } from './data';

export default function QuoteLightbox({
  label,
  src,
  pieceName,
  onClose,
}: {
  label: string;
  src: string;
  pieceName: string;
  onClose: () => void;
}) {
  const ref = useFocusTrap(true, onClose);

  return (
    <div className="fixed inset-0 z-[70] bg-[#16233E]/70 flex items-center justify-center p-4">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`${pieceName} ${label}`}
        className="w-full max-w-[640px] bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 h-14 md:h-12 border-b border-[#DCE3F0]">
          <span className="flex-1 text-[13px] font-medium text-[#16233E]">{label}</span>
          <a
            href={src}
            download
            aria-label={`Download ${label} view`}
            className={`h-11 w-11 md:h-8 md:w-8 rounded-full inline-flex items-center justify-center text-[#5D6C8A] hover:bg-[#F3F6FC] cursor-pointer transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`}
          >
            <i className="ri-download-2-line text-[18px] w-4 h-4 flex items-center justify-center" />
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`h-11 w-11 md:h-8 md:w-8 rounded-full inline-flex items-center justify-center text-[#5D6C8A] hover:bg-[#F3F6FC] cursor-pointer transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`}
          >
            <i className="ri-close-line text-[18px] w-4 h-4 flex items-center justify-center" />
          </button>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${pieceName} — ${label}`}
          className="block w-full aspect-square object-cover bg-[#E4E9F4]"
        />
      </div>
    </div>
  );
}