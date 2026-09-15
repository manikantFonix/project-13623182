'use client';

import { STATUS_LABELS, type InvoiceStatus } from './data';

const tone: Record<InvoiceStatus, string> = {
  paid: 'bg-[var(--success-bg)] text-[var(--success)]',
  failed: 'bg-[var(--amber-bg)] text-[var(--alert-strong)]',
  refunded: 'bg-[var(--muted)] text-[var(--text-sec)]',
  partial: 'bg-[var(--muted)] text-[var(--text-sec)]',
};

export default function InvoiceStatusPill({ status }: { status: InvoiceStatus }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-medium whitespace-nowrap ${tone[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}