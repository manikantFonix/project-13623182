'use client';

import InvoiceStatusPill from './InvoiceStatusPill';
import { downloadInvoice } from './invoiceFile';
import { focusRing } from '../tokens';
import {
  KIND_LABELS,
  fmtDate,
  fmtMoney,
  type Invoice,
} from './data';

const head = 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

function Row({
  invoice,
  onView,
}: {
  invoice: Invoice;
  onView: (id: string) => void;
}) {
  return (
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
      </td>

      <td className="px-4 py-4 align-top">
        <InvoiceStatusPill status={invoice.status} />
      </td>

      <td className="px-4 py-4 align-top text-[12px] tabular-nums whitespace-nowrap text-[var(--text-sec)]">
        {fmtDate(invoice.date)}
      </td>

      <td className="pl-4 pr-5 py-4 align-top text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onView(invoice.id)}
            className={`h-9 px-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-eye-line text-[15px]" aria-hidden="true" />
            </span>
            View
          </button>
          <button
            type="button"
            onClick={() => downloadInvoice(invoice)}
            className={`h-9 px-3 rounded-full bg-[var(--accent)] text-[var(--on-accent)] flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-download-line text-[15px]" aria-hidden="true" />
            </span>
            Download
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function InvoicesTable({
  invoices,
  onView,
}: {
  invoices: Invoice[];
  onView: (id: string) => void;
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
            <Row key={invoice.id} invoice={invoice} onView={onView} />
          ))}
        </tbody>
      </table>
    </div>
  );
}