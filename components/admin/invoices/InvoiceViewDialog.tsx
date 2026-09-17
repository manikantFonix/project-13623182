'use client';

import { useRef } from 'react';
import InvoicesDialog from './InvoicesDialog';
import InvoiceStatusPill from './InvoiceStatusPill';
import { focusRing } from '../tokens';
import { downloadInvoice } from './invoiceFile';
import {
  KIND_LABELS,
  fmtDate,
  fmtInt,
  fmtMoney,
  type Invoice,
} from './data';

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <dt className="text-[12px] text-[var(--text-sec)]">{term}</dt>
      <dd className="text-[13px] tabular-nums text-[var(--text)]">{value}</dd>
    </div>
  );
}

export default function InvoiceViewDialog({
  invoice,
  onClose,
}: {
  invoice: Invoice;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <InvoicesDialog labelledBy="invoice-view-title" onClose={onClose} initialFocus={closeRef}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="invoice-view-title" className="text-[18px] font-semibold text-[var(--text)]">
            {invoice.reference}
          </h2>
          <p className="mt-1 text-[12px] text-[var(--text-sec)]">
            Issued {fmtDate(invoice.date)}
          </p>
        </div>
        <InvoiceStatusPill status={invoice.status} />
      </div>

      <dl className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-2">
        <Fact term="Retailer" value={invoice.retailer} />
        <Fact term="For" value={`${invoice.description} · ${KIND_LABELS[invoice.kind]}`} />
        <Fact term="Amount" value={fmtMoney(invoice.amount)} />
        <Fact
          term="Renders used"
          value={`${fmtInt(invoice.renders.consumed)} of ${fmtInt(invoice.renders.total)}`}
        />
      </dl>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium whitespace-nowrap text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
        >
          Close
        </button>
        <button
          type="button"
          onClick={() => downloadInvoice(invoice)}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] flex items-center gap-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-download-line text-[15px]" aria-hidden="true" />
          </span>
          Download
        </button>
      </div>
    </InvoicesDialog>
  );
}