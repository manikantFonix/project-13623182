'use client';

import { useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({ open, onCancel, onConfirm }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(19,26,31,0.4)]"
        onClick={onCancel}
      />
      <div className="relative w-[460px] bg-white border border-[#DDE3E6] rounded-[28px] p-6">
        <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#131A1F]">
          Delete this product permanently?
        </h2>
        <p className="mt-2 text-sm text-[#131A1F] leading-relaxed">
          Its photographs and all generated images will be removed. This can't
          be undone.
        </p>
        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="px-2 h-9 text-sm font-medium text-[#5C6870] hover:text-[#131A1F] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-9 px-4 text-sm font-medium text-white bg-[#A8552A] border border-[#A8552A] rounded-full hover:bg-[#91441E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          >
            Delete permanently
          </button>
        </div>
      </div>
    </div>
  );
}