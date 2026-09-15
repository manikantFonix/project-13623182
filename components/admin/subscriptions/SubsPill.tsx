'use client';

export type SubsPillTone = 'neutral' | 'success' | 'alert';

const toneClass: Record<SubsPillTone, string> = {
  neutral: 'bg-[var(--muted)] text-[var(--text-sec)]',
  success: 'bg-[var(--success-bg)] text-[var(--success)]',
  alert: 'bg-[var(--amber-bg)] text-[var(--alert-strong)]',
};

export default function SubsPill({
  tone,
  children,
}: {
  tone: SubsPillTone;
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