'use client';

import { useState } from 'react';
import { decidedPct, needsNudge, type LeadRetailer } from './data';
import { fmt } from '../data';
import AdminPagination from '../AdminPagination';

const PAGE_SIZE = 5;

const numCell = 'px-4 py-4 text-right align-middle text-[13px] tabular-nums text-[var(--text)] whitespace-nowrap';

function Row({ retailer }: { retailer: LeadRetailer }) {
  const pct = decidedPct(retailer);
  const nudge = needsNudge(retailer);

  return (
    <tr className="border-b border-[var(--muted)] last:border-b-0">
      <th scope="row" className="pl-5 pr-4 py-4 text-left align-middle font-normal">
        <span className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[var(--text)]">{retailer.name}</span>
          {nudge && (
            <span className="inline-flex h-5 items-center gap-1 rounded-full bg-[var(--amber-bg)] px-2 text-[11px] font-medium whitespace-nowrap text-[var(--alert-strong)]">
              <i className="ri-alert-line text-[12px]" aria-hidden="true" />
              Needs a nudge
            </span>
          )}
        </span>
      </th>

      <td className={numCell}>{fmt(retailer.received)}</td>
      <td className={numCell}>{fmt(retailer.accepted)}</td>
      <td className={numCell}>{fmt(retailer.rejected)}</td>
      <td className={`${numCell} font-semibold`}>{fmt(retailer.undecided)}</td>

      <td className="pl-4 pr-5 py-4 align-middle">
        <div className="flex items-center justify-end gap-3">
          <span
            className="hidden h-1.5 w-20 shrink-0 rounded-full bg-[var(--muted)] lg:block xl:w-24"
            aria-hidden="true"
          >
            <span
              className="block h-full rounded-full bg-[var(--accent)]"
              style={{ width: pct <= 0 ? '0%' : `${pct}%` }}
            />
          </span>
          <span className="w-[42px] shrink-0 text-right text-[13px] tabular-nums text-[var(--text)]">
            {pct}%
          </span>
        </div>
      </td>
    </tr>
  );
}

export default function LeadsTable({ retailers }: { retailers: LeadRetailer[] }) {
  const [page, setPage] = useState(1);
  const head = 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

  const totalPages = Math.max(1, Math.ceil(retailers.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = retailers.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <table className="w-full">
        <caption className="sr-only">
          Every retailer with inquiries, ordered by undecided, largest first.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Retailer
            </th>
            <th scope="col" className={`${head} text-right`}>Received</th>
            <th scope="col" className={`${head} text-right`}>Accepted</th>
            <th scope="col" className={`${head} text-right`}>Rejected</th>
            <th scope="col" className={`${head} text-right`}>Undecided</th>
            <th scope="col" className="pl-4 pr-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Decided
            </th>
          </tr>
        </thead>
        <tbody>
          {visible.map((retailer) => (
            <Row key={retailer.id} retailer={retailer} />
          ))}
        </tbody>
      </table>

      {retailers.length > 0 && (
        <div className="border-t border-[var(--border)] px-5 py-3.5">
          <AdminPagination
            page={current}
            pageSize={PAGE_SIZE}
            totalItems={retailers.length}
            onPage={setPage}
            label="Retailer list pages"
          />
        </div>
      )}
    </div>
  );
}