'use client';

import { useState } from 'react';
import InvoiceStatusPill from './InvoiceStatusPill';
import RefundHistory from './RefundHistory';
import { focusRing } from '../tokens';
import {
  KIND_LABELS,
  fmtDate,
  fmtMoney,
  refundedTotal,
  remainingRefundable,
  type Invoice,
} from './data';

const head = 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

function Row({ invoice, onRefund }: { invoice: Invoice; onRefund: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const refunds = invoice.refunds ?? [];
  const hasRefunds = refunds.length > 0;
  const canRefund =
    (invoice.status === 'paid' || invoice.status === 'partial') && remainingRefundable(invoice) > 0;

  return (
    <>
      <tr className="border-b border-[var(--muted)]">
        <th scope="row" className="pl-5 pr-4 py-4 text-left align-top font-normal min-w-[150px]">
          <span className="block text-[13px] font-semibold tabular-nums text-[var(--text)]">
            {invoice.reference}
          </span>
        </th>

        <td className="px-4 py-4 align-top text-[13px] text-[var(--text-sec)]">{invoice.retailer}</td>

        <td className="px-4 py-4 align-top min-w-[220px]">
          <span className="block text-[13px] text-[var(--text)]">{invoice.description}</span>
          <span className="mt-0.5 block text-[12px] text-[var(--text-sec)]">
            {KIND_LABELS[invoice.kind]}
          </span>
        </td>

        <td className="px-4 py-4 align-top text-right whitespace-nowrap">
          <span className="block text-[13px] tabular-nums text-[var(--text)]">
            {fmtMoney(invoice.amount)}
          </span>
          {hasRefunds && (
            <span className="mt-0.5 block text-[12px] tabular-nums text-[var(--text-sec)]">
              −{fmtMoney(refundedTotal(invoice))} refunded
            </span>
          )}
        </td>

        <td className="px-4 py-4 align-top">
          <InvoiceStatusPill status={invoice.status} />
        </td>

        <td className="px-4 py-4 align-top text-[12px] tabular-nums whitespace-nowrap text-[var(--text-sec)]">
          {fmtDate(invoice.date)}
        </td>

        <td className="pl-4 pr-5 py-4 align-top text-right whitespace-nowrap">
          <div className="flex items-center justify-end gap-2">
            {hasRefunds && (
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={`h-9 px-3 rounded-full text-[13px] font-medium text-[var(--text-sec)] transition-colors duration-150 hover:bg-[var(--muted)] hover:text-[var(--text)] ${focusRing}`}
              >
                {open ? 'Hide refund' : 'Refund detail'}
              </button>
            )}
            {canRefund && (
              <button
                type="button"
                onClick={() => onRefund(invoice.id)}
                className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
              >
                Issue refund
              </button>
            )}
          </div>
        </td>
      </tr>

      {hasRefunds && open && (
        <tr className="border-b border-[var(--muted)]">
          <td colSpan={7} className="px-5 py-4 bg-[var(--muted)]">
            <RefundHistory invoice={invoice} />
          </td>
        </tr>
      )}
    </>
  );
}

export default function InvoicesTable({
  invoices,
  onRefund,
}: {
  invoices: Invoice[];
  onRefund: (id: string) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[1080px]">
        <caption className="sr-only">
          Every invoice, newest first. A failed invoice appears above paid invoices of the same date.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Reference
            </th>
            <th scope="col" className={`${head} text-left`}>Retailer</th>
            <th scope="col" className={`${head} text-left`}>For</th>
            <th scope="col" className={`${head} text-right`}>Amount</th>
            <th scope="col" className={`${head} text-left`}>Status</th>
            <th scope="col" className={`${head} text-left`}>Date</th>
            <th scope="col" className="pl-4 pr-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <Row key={invoice.id} invoice={invoice} onRefund={onRefund} />
          ))}
        </tbody>
      </table>
    </div>
  );
}