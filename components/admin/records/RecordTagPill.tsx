'use client';

const TONE: Record<string, string> = {
  'VIP Client': 'bg-[var(--amber-bg)] text-[var(--alert-strong)]',
  Wholesale: 'bg-[var(--muted)] text-[var(--text)]',
  Retail: 'bg-[var(--success-bg)] text-[var(--success)]',
  Private: 'bg-[var(--muted)] text-[var(--text-sec)]',
};

export default function RecordTagPill({ tag }: { tag: string }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-medium whitespace-nowrap ${
        TONE[tag] ?? 'bg-[var(--muted)] text-[var(--text-sec)]'
      }`}
    >
      {tag}
    </span>
  );
}