'use client';

export default function PlanStatusPill({ archived }: { archived: boolean }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-medium whitespace-nowrap ${
        archived
          ? 'bg-[var(--muted)] text-[var(--text-sec)]'
          : 'bg-[var(--success-bg)] text-[var(--success)]'
      }`}
    >
      {archived ? 'Archived' : 'Live'}
    </span>
  );
}