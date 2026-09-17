'use client';

export type CancelPillTone = 'neutral' | 'success' | 'alert';

const toneClass: Record<CancelPillTone, string> = {
  neutral: 'bg-[var(--muted)] text-[var(--text-sec)]',
  success: 'bg-[var(--success-bg)] text-[var(--success)]',
  alert: 'bg-[var(--amber-bg)] text-[var(--alert-strong)]',
};

export default function CancelPill({
  tone,
  children,
}: {
  tone: CancelPillTone;
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