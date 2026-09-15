'use client';

import Link from 'next/link';
import { focusRingOnDark } from './tokens';

export default function AdminNavRow({
  label,
  icon,
  href,
  active = false,
  variant = 'screen',
  count,
  countLabel,
}: {
  label: string;
  icon: string;
  href?: string;
  active?: boolean;
  variant?: 'area' | 'screen';
  count?: number;
  countLabel?: string;
}) {
  const isArea = variant === 'area';
  const base = `flex items-center gap-2.5 h-9 px-3 rounded-full text-[13px] whitespace-nowrap transition-colors duration-150 ${focusRingOnDark} ${
    isArea ? 'font-semibold' : 'font-medium'
  }`;

  const hasCount = typeof count === 'number';

  const inner = (
    <>
      <span className="w-4 h-4 flex items-center justify-center shrink-0">
        <i className={`${icon} text-[16px]`} aria-hidden="true" />
      </span>
      <span className="flex-1 text-left truncate">{label}</span>
      {hasCount && (
        <span
          className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-medium tabular-nums flex items-center justify-center ${
            active
              ? 'bg-[var(--accent)] text-[var(--on-accent)]'
              : 'bg-[var(--amber-bg)] text-[var(--alert-strong)]'
          }`}
          aria-hidden="true"
        >
          {count}
        </span>
      )}
      {hasCount && countLabel && <span className="sr-only">{countLabel}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        prefetch={false}
        aria-current={active ? 'page' : undefined}
        className={`${base} ${
          active
            ? 'bg-[var(--on-accent)] text-[var(--accent)]'
            : 'text-[var(--on-accent-soft)] hover:bg-[var(--on-accent)]/10 hover:text-[var(--on-accent)]'
        }`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      aria-disabled="true"
      className={`${base} ${
        isArea ? 'text-[var(--on-accent-soft)]' : 'text-[var(--on-accent-muted)]'
      } cursor-default`}
    >
      {inner}
    </div>
  );
}