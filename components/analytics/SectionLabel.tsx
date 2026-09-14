'use client';

export default function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[12px] font-medium text-[var(--text-sec)] uppercase tracking-[0.06em]">
      {children}
    </p>
  );
}