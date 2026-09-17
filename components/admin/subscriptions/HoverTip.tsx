'use client';

import type { ReactNode } from 'react';

export default function HoverTip({
  content,
  children,
  side = 'top',
}: {
  content: string;
  children: ReactNode;
  side?: 'top' | 'bottom';
}) {
  return (
    <span className="group relative inline-flex items-center">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-30 w-max max-w-[220px] rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[12px] font-normal normal-case leading-relaxed tracking-normal text-[var(--text-sec)] opacity-0 shadow-[0_8px_24px_rgba(22,35,62,0.12)] transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 ${
          side === 'bottom' ? 'top-[calc(100%+6px)] right-0' : 'bottom-[calc(100%+6px)] right-0'
        }`}
      >
        {content}
      </span>
    </span>
  );
}