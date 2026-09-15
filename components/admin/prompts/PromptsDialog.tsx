'use client';

import type { ReactNode, RefObject } from 'react';
import { useFocusTrap } from '../../approval/useFocusTrap';

export default function PromptsDialog({
  labelledBy,
  onClose,
  initialFocus,
  size = 'md',
  children,
}: {
  labelledBy: string;
  onClose: () => void;
  initialFocus?: RefObject<HTMLElement | null>;
  size?: 'md' | 'lg';
  children: ReactNode;
}) {
  const ref = useFocusTrap(true, onClose, initialFocus ?? undefined);
  const width = size === 'lg' ? 'max-w-[720px]' : 'max-w-[560px]';

  return (
    <div className="fixed inset-0 z-[75] bg-[#16233E]/40 flex items-center justify-center p-4">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`w-full ${width} max-h-[calc(100vh-48px)] overflow-y-auto bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-7`}
      >
        {children}
      </div>
    </div>
  );
}