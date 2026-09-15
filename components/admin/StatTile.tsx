'use client';

import { focusRing } from './tokens';

export default function StatTile({
  label,
  value,
  caption,
  size = 'md',
  emphasis = false,
}: {
  label: string;
  value: string;
  caption?: string;
  size?: 'md' | 'lg';
  emphasis?: boolean;
}) {
  return (
    <div
      className={`h-full rounded-[12px] border p-5 flex flex-col ${
        emphasis ? 'bg-[var(--surface)] border-[var(--border-strong)]' : 'bg-[var(--surface)] border-[var(--border)]'
      }`}
    >
      <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">{label}</p>
      <p
        className={`mt-3 font-semibold tabular-nums leading-none tracking-[-0.02em] text-[var(--text)] ${
          size === 'lg' ? 'text-[40px]' : 'text-[28px]'
        }`}
      >
        {value}
      </p>
      {caption && (
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-sec)]">{caption}</p>
      )}
    </div>
  );
}