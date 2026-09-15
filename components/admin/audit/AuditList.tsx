'use client';

import AuditEntryRow from './AuditEntryRow';
import type { AuditDay } from './data';

const head =
  'px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

export default function AuditList({ days }: { days: AuditDay[] }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[1040px]">
        <caption className="sr-only">
          Audit trail, newest first and grouped by day. Each entry states what happened, what it
          happened to, the retailer it concerned and the administrator who did it.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              When
            </th>
            <th scope="col" className={head}>
              Entry
            </th>
            <th scope="col" className={head}>
              Concerned
            </th>
            <th scope="col" className={head}>
              Administrator
            </th>
          </tr>
        </thead>

        {days.map((day) => (
          <tbody key={day.date}>
            <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
              <th scope="colgroup" colSpan={4} className="px-5 py-2.5 text-left">
                <span className="text-[12px] font-semibold text-[var(--text)]">{day.label}</span>
                <span className="ml-2 text-[12px] font-medium tabular-nums text-[var(--muted-text)]">
                  {day.entries.length} {day.entries.length === 1 ? 'entry' : 'entries'}
                </span>
              </th>
            </tr>
            {day.entries.map((entry) => (
              <AuditEntryRow key={entry.id} entry={entry} />
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}