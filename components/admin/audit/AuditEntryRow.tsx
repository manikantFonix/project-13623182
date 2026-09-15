'use client';

import AuditKindPill from './AuditKindPill';
import type { AuditEntry } from './data';

export default function AuditEntryRow({ entry }: { entry: AuditEntry }) {
  const failed = entry.kind === 'Webhook signature failed';

  return (
    <tr className="border-b border-[var(--muted)] last:border-b-0 align-top">
      <th scope="row" className="pl-5 pr-4 py-4 text-left align-top font-normal">
        <time
          dateTime={`${entry.date}T${entry.time}`}
          className="text-[13px] tabular-nums text-[var(--text)]"
        >
          {entry.time}
        </time>
      </th>

      <td className="px-4 py-4 align-top min-w-[360px] max-w-[600px]">
        <AuditKindPill tone={failed ? 'alert' : 'neutral'}>{entry.kind}</AuditKindPill>
        <p className="mt-2 text-[13px] font-semibold text-[var(--text)]">{entry.subject}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">{entry.summary}</p>

        {entry.change && (
          <p className="mt-1.5 text-[13px] tabular-nums text-[var(--text)]">
            <span className="text-[var(--text-sec)]">{entry.change.label} </span>
            {entry.change.from && <span className="text-[var(--text-sec)]">{entry.change.from} → </span>}
            {entry.change.to}
          </p>
        )}

        {entry.reason && (
          <p className="mt-2 border-l-2 border-[var(--border-strong)] pl-2.5 text-[13px] leading-relaxed text-[var(--text)] select-all">
            {entry.reason}
          </p>
        )}
      </td>

      <td className="px-4 py-4 align-top min-w-[150px] text-[13px] text-[var(--text-sec)]">
        {entry.retailer ?? '—'}
      </td>

      <td className="pl-4 pr-5 py-4 align-top min-w-[210px] text-[13px] break-all text-[var(--text-sec)]">
        {entry.actor}
      </td>
    </tr>
  );
}