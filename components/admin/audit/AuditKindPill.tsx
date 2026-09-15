'use client';

export type AuditPillTone = 'neutral' | 'alert';

const toneClass: Record<AuditPillTone, string> = {
  neutral: 'bg-[var(--muted)] text-[var(--text-sec)]',
  alert: 'bg-[var(--amber-bg)] text-[var(--alert-strong)]',
};

export default function AuditKindPill({
  tone,
  children,
}: {
  tone: AuditPillTone;
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