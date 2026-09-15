'use client';

import type { PillTone } from './data';

const toneClass: Record<PillTone, string> = {
  neutral: 'bg-[var(--muted)] text-[var(--text-sec)]',
  success: 'bg-[var(--success-bg)] text-[var(--success)]',
  alert: 'bg-[var(--amber-bg)] text-[var(--alert-strong)]',
};

export default function RetailerStatusPill({
  tone,
  children,
}: {
  tone: PillTone;
  children: string;
}) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-medium whitespace-nowrap ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}