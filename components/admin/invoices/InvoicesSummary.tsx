'use client';

import { fmtMoney } from './data';
import type { Summary } from './data';

function Tile({
  label,
  value,
  sub,
  alert,
}: {
  label: string;
  value: string;
  sub: string;
  alert?: boolean;
}) {
  return (
    <div
      className={`rounded-[12px] border px-5 py-4 ${
        alert
          ? 'border-[var(--alert)] bg-[var(--amber-bg)]'
          : 'border-[var(--border)] bg-[var(--surface)]'
      }`}
    >
      <p className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-sec)]">
        {alert && (
          <span className="w-4 h-4 flex items-center justify-center text-[var(--alert-strong)]">
            <i className="ri-error-warning-line text-[15px]" aria-hidden="true" />
          </span>
        )}
        {label}
      </p>
      <p className="mt-2 text-[22px] font-semibold tabular-nums tracking-[-0.01em] text-[var(--text)]">
        {value}
      </p>
      <p className="mt-1 text-[12px] text-[var(--text-sec)]">{sub}</p>
    </div>
  );
}

export default function InvoicesSummary({ summary }: { summary: Summary }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Tile label="Invoiced this period" value={fmtMoney(summary.invoiced)} sub="All invoices issued" />
      <Tile label="Paid" value={fmtMoney(summary.paid)} sub="Settled in full or in part" />
      <Tile
        label="Failed"
        value={fmtMoney(summary.failed)}
        sub={summary.failed > 0 ? 'Awaiting resolution at the provider' : 'Nothing outstanding'}
        alert={summary.failed > 0}
      />
      <Tile label="Refunded this period" value={fmtMoney(summary.refunded)} sub="Money returned to retailers" />
    </div>
  );
}