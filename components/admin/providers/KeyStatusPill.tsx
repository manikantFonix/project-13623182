'use client';

export default function KeyStatusPill({ set }: { set: boolean }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-medium whitespace-nowrap ${
        set ? 'bg-[var(--muted)] text-[var(--text-sec)]' : 'bg-[var(--amber-bg)] text-[var(--alert-strong)]'
      }`}
    >
      {set ? 'Set' : 'Not set'}
    </span>
  );
}