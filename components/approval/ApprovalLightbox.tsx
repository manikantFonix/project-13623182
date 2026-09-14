'use client';

import { useFocusTrap } from './useFocusTrap';
import { FOCUS_BRAND } from './data';

export default function ApprovalLightbox({
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
    <div className="fixed inset-0 z-50 bg-[#16233E]/70 flex items-center justify-center p-4">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`${pieceName} ${label}`}
        className="w-full max-w-[640px] bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 h-12 border-b border-[#DCE3F0]">
          <span className="flex-1 text-[13px] font-medium text-[#16233E]">{label}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`w-9 h-9 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[#5D6C8A] hover:bg-[#F3F6FC] transition-colors duration-150 motion-reduce:transition-none ${FOCUS_BRAND}`}
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