'use client';

import { focusRing, type Invoice } from './data';

interface Props {
  invoices: Invoice[];
  hasMore: boolean;
  empty: boolean;
}

const statusColor: Record<Invoice['status'], string> = {
  Paid: 'text-[var(--success)]',
  Failed: 'text-[var(--alert)]',
  Refunded: 'text-[var(--text-sec)]',
};

export default function InvoicesCard({ invoices, hasMore, empty }: Props) {
  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--success-bg)]">
          <i className="ri-file-text-line text-[15px] text-[var(--success)]" />
        </span>
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Past Invoices
        </h2>
      </div>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        View and download your past invoices.
      </p>

      {empty ? (
        <div className="mt-6 bg-[var(--muted)] rounded-[12px] py-10 flex flex-col items-center justify-center text-center">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)]">
            <i className="ri-file-3-line text-[18px] text-[var(--text-sec)]" />
          </span>
          <p className="mt-3 text-[13px] font-medium text-[var(--text)]">
            No invoices yet
          </p>
          <p className="mt-1 text-[13px] text-[var(--text-sec)]">
            Your first invoice appears after your first billing date.
          </p>
        </div>
      ) : (
        <div className="mt-5">
          <div className="grid grid-cols-[1fr_150px_120px_120px_120px] items-center gap-4 px-2 h-9 border-b border-[var(--border)]">
            <span className="text-[13px] font-medium text-[var(--text-sec)]">
              Invoice
            </span>
            <span className="text-[13px] font-medium text-[var(--text-sec)]">Date</span>
            <span className="text-[13px] font-medium text-[var(--text-sec)]">
              Amount
            </span>
            <span className="text-[13px] font-medium text-[var(--text-sec)]">
              Status
            </span>
            <span className="text-right" />
          </div>
          {invoices.map((inv) => (
            <div
              key={inv.reference}
              className="grid grid-cols-[1fr_150px_120px_120px_120px] items-center gap-4 px-2 py-3 border-b border-[var(--border)] last:border-b-0"
            >
              <p className="text-[13px] text-[var(--text)]">{inv.reference}</p>
              <p className="text-[13px] text-[var(--text-sec)]">{inv.date}</p>
              <p className="text-[13px] text-[var(--text)] tabular-nums">
                ${inv.amount}
              </p>
              <p className={`text-[13px] font-medium ${statusColor[inv.status]}`}>
                {inv.status}
              </p>
              <div className="flex justify-end">
                <button
                  className={`h-8 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--muted)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
          {hasMore && (
            <div className="mt-3">
              <button
                className={`text-[13px] font-medium text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
              >
                View all invoices
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}