'use client';

import type { ReactNode, RefObject } from 'react';
import { useFocusTrap } from '../approval/useFocusTrap';

export default function DialogShell({
  open,
  onClose,
  initialFocus,
  labelledBy,
  maxWidth = 520,
  children,
}: {
  open: boolean;
  onClose: () => void;
  initialFocus?: RefObject<HTMLElement | null>;
  labelledBy: string;
  maxWidth?: number;
  children: ReactNode;
}) {
  const ref = useFocusTrap(open, onClose, initialFocus);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[75] bg-[#16233E]/40 flex items-center justify-center p-4">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        style={{ maxWidth }}
        className="w-full bg-white border border-[#DCE3F0] rounded-[12px] p-7"
      >
        {children}
      </div>
    </div>
  );
}