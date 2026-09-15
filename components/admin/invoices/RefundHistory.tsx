'use client';

import { fmtDate, fmtMoney, type Invoice } from './data';

export default function RefundHistory({ invoice }: { invoice: Invoice }) {
  const refunds = invoice.refunds ?? [];

  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
      <p className="text-[12px] font-semibold text-[var(--text)]">Refunds on this invoice</p>
      <ul className="mt-2 flex flex-col gap-2.5">
        {refunds.map((refund, index) => (
          <li key={index} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[13px] font-semibold tabular-nums text-[var(--text)]">
              {fmtMoney(refund.amount)}
            </span>
            <span className="text-[12px] tabular-nums text-[var(--text-sec)]">
              {fmtDate(refund.at)}
            </span>
            <span className="text-[12px] text-[var(--text-sec)]">{refund.by}</span>
            <span className="w-full text-[12px] leading-relaxed text-[var(--text-sec)]">
              {refund.reason}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}