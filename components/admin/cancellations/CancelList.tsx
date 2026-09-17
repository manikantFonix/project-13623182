'use client';

import CancelPill from './CancelPill';
import { REASON_LABELS, type CancelRow } from './data';

const head = 'text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-sec)]';

export default function CancelList({ rows }: { rows: CancelRow[] }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[980px] border-collapse">
        <caption className="sr-only">
          Every cancellation in the period, most recent first, with plan, tenure, allowance used,
          reason and access status
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
            <th scope="col" className={`px-4 py-3 text-left ${head}`}>
              Retailer
            </th>
            <th scope="col" className={`px-4 py-3 text-left ${head}`}>
              Plan
            </th>
            <th scope="col" className={`px-4 py-3 text-left ${head}`}>
              Tenure
            </th>
            <th scope="col" className={`px-4 py-3 text-right ${head}`}>
              Allowance used
            </th>
            <th scope="col" className={`px-4 py-3 text-left ${head}`}>
              Reason
            </th>
            <th scope="col" className={`px-4 py-3 text-right ${head}`}>
              Cancelled
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[var(--muted)] last:border-b-0 align-top">
              <th scope="row" className="px-4 py-4 text-left font-normal min-w-[230px]">
                <p className="text-[13px] font-semibold text-[var(--text)]">{row.name}</p>
                <p className="mt-0.5 text-[12px] text-[var(--muted-text)]">{row.email}</p>
              </th>
              <td className="px-4 py-4">
                <p className="text-[13px] text-[var(--text)] whitespace-nowrap">{row.plan}</p>
              </td>
              <td className="px-4 py-4">
                <p className="text-[13px] tabular-nums text-[var(--text-sec)] whitespace-nowrap">
                  {row.tenure}
                </p>
              </td>
              <td className="px-4 py-4 text-right">
                <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">
                  {row.allowancePct}%
                </p>
                <p className="mt-0.5 text-[12px] text-[var(--muted-text)]">of allowance</p>
              </td>
              <td className="px-4 py-4 min-w-[190px]">
                <p
                  className={`text-[13px] ${
                    row.reason === 'none' ? 'text-[var(--muted-text)]' : 'text-[var(--text)]'
                  }`}
                >
                  {REASON_LABELS[row.reason]}
                </p>
                {row.reason === 'other' && (
                  <p className="mt-0.5 text-[12px] text-[var(--muted-text)]">Left a note below.</p>
                )}
              </td>
              <td className="px-4 py-4 text-right">
                <p className="text-[13px] tabular-nums text-[var(--text)]">{row.cancelledOn}</p>
                <span className="mt-1.5 inline-block">
                  {row.accessEnded ? (
                    <CancelPill tone="neutral">Access ended</CancelPill>
                  ) : (
                    <CancelPill tone="success">
                      {`Active until ${row.accessEndsOn ?? 'period end'}`}
                    </CancelPill>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}