'use client';

import type { ReactNode } from 'react';

type AlertVariant = 'info' | 'warning' | 'error';

const config: Record<
  AlertVariant,
  { bar: string; bg: string; icon: string; iconColor: string; text: string }
> = {
  info: {
    bar: 'border-[var(--accent)]',
    bg: 'bg-[var(--muted)]',
    icon: 'ri-information-line',
    iconColor: 'text-[var(--accent-text)]',
    text: 'text-[var(--text)]',
  },
  warning: {
    bar: 'border-[var(--alert)]',
    bg: 'bg-[var(--surface)]',
    icon: 'ri-alert-line',
    iconColor: 'text-[var(--alert)]',
    text: 'text-[var(--alert)]',
  },
  error: {
    bar: 'border-[var(--alert)]',
    bg: 'bg-[var(--surface)]',
    icon: 'ri-close-circle-line',
    iconColor: 'text-[var(--alert)]',
    text: 'text-[var(--alert)]',
  },
};

export default function Alert({
  variant = 'info',
  children,
  className = '',
}: {
  variant?: AlertVariant;
  children: ReactNode;
  className?: string;
}) {
  const c = config[variant];
  return (
    <div
      className={`flex items-start gap-2.5 rounded-r-[8px] border-l-2 ${c.bar} ${c.bg} px-3 py-2.5 ${className}`}
    >
      <i className={`${c.icon} ${c.iconColor} text-[16px] leading-none mt-0.5`} />
      <p className={`text-[13px] leading-snug ${c.text}`}>{children}</p>
    </div>
  );
}