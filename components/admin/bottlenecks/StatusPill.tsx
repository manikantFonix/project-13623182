'use client';

export default function StatusPill({ above }: { above: boolean }) {
  return (
    <span
      className={`shrink-0 h-7 px-3 rounded-full text-[12px] font-medium whitespace-nowrap flex items-center ${
        above
          ? 'bg-[var(--amber-bg)] text-[var(--alert-strong)]'
          : 'bg-[var(--success-bg)] text-[var(--success)]'
      }`}
    >
      {above ? 'Above threshold' : 'Within threshold'}
    </span>
  );
}