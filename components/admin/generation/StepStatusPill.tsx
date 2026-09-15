'use client';

import type { StepStatus } from './data';

const tone: Record<StepStatus, string> = {
  produced: 'bg-[var(--muted)] text-[var(--text-sec)]',
  passed: 'bg-[var(--success-bg)] text-[var(--success)]',
  failed: 'bg-[var(--amber-bg)] text-[var(--alert-strong)]',
};

export default function StepStatusPill({
  status,
  label,
}: {
  status: StepStatus;
  label: string;
}) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-medium tabular-nums whitespace-nowrap ${tone[status]}`}
    >
      {label}
    </span>
  );
}