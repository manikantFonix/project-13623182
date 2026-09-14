'use client';

import Link from 'next/link';
import { focusRing, type DesignRow } from './data';

const success = ['Approved', 'Completed'];

export default function ArchiveTable({ rows }: { rows: DesignRow[] }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="h-11">
              <th className="pl-4 pr-4 text-left text-[13px] font-medium text-[var(--text-sec)]">Design</th>
              <th className="pl-4 pr-4 text-left text-[13px] font-medium text-[var(--text-sec)]">Customer</th>
              <th className="pl-4 pr-4 text-left text-[13px] font-medium text-[var(--text-sec)]">Outcome</th>
              <th className="pl-4 pr-4 w-28 text-right text-[13px] font-medium text-[var(--text-sec)]">Made</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {rows.map((d) => (
              <tr key={d.id}>
                <td className="py-3 pl-4 pr-4">
                  <Link
                    href={`/requests/${d.id}`}
                    className={`flex items-center gap-3 ${focusRing} rounded-[8px]`}
                  >
                    <span
                      aria-hidden="true"
                      className="w-10 h-10 rounded-[8px] bg-[var(--muted)] overflow-hidden flex-shrink-0"
                    >
                      <img src={d.thumbnail} alt="" className="w-full h-full object-cover" />
                    </span>
                    <span>
                      <span className="block text-[13px] font-medium text-[var(--text)]">{d.number}</span>
                      <span className="block text-[12px] text-[var(--text-sec)]">{d.category}</span>
                    </span>
                  </Link>
                </td>
                <td className="py-3 pl-4 pr-4 text-[13px] text-[var(--text)]">
                  {d.customer ?? <span className="text-[13px] text-[var(--text-sec)]">—</span>}
                </td>
                <td className="py-3 pl-4 pr-4">
                  <Link
                    href={`/requests/${d.id}`}
                    className={`text-[13px] font-medium ${focusRing} rounded-[8px] ${
                      success.includes(d.outcome) ? 'text-[var(--success)]' : 'text-[var(--text-sec)]'
                    }`}
                  >
                    {d.outcome}
                  </Link>
                </td>
                <td className="py-3 pl-4 pr-4 text-right text-[13px] text-[var(--text-sec)] tabular-nums">
                  {d.madeLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}