'use client';

export default function MeterBar({
  value,
  max,
  tone = 'strong',
}: {
  value: number;
  max: number;
  tone?: 'strong' | 'soft';
}) {
  const share = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <span className="block h-1.5 w-full rounded-full bg-[var(--muted)]" aria-hidden="true">
      <span
        className={`block h-full rounded-full transition-colors duration-150 ${
          tone === 'soft' ? 'bg-[var(--muted-text)]' : 'bg-[var(--accent)]'
        }`}
        style={{ width: share <= 0 ? '0%' : `${Math.max(share, 2)}%` }}
      />
    </span>
  );
}