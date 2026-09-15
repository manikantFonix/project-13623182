'use client';

import type { ProviderEvent, EventResult } from './data';
import { fmtDateTime } from './data';

function ResultPill({ result }: { result: EventResult }) {
  const accepted = result === 'accepted';
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-medium whitespace-nowrap ${
        accepted ? 'bg-[var(--success-bg)] text-[var(--success)]' : 'bg-[var(--amber-bg)] text-[var(--alert-strong)]'
      }`}
    >
      {accepted ? 'Accepted' : 'Rejected'}
    </span>
  );
}

export default function EventsTable({
  events,
  showNote,
}: {
  events: ProviderEvent[];
  showNote?: boolean;
}) {
  const head = 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[680px]">
        <caption className="sr-only">Recent webhook events with the result of each.</caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className={`${head} pl-5 pr-4 text-left`}>Event</th>
            <th scope="col" className={`${head} text-left`}>Received</th>
            <th scope="col" className={`${head} text-left`}>Result</th>
            {showNote && <th scope="col" className={`${head} pl-4 pr-5 text-left`}>Detail</th>}
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-[var(--muted)] last:border-b-0">
              <th scope="row" className="pl-5 pr-4 py-3.5 text-left align-top font-normal">
                <span className="block font-mono text-[13px] text-[var(--text)]">{event.type}</span>
              </th>
              <td className="px-4 py-3.5 align-top text-[12px] tabular-nums whitespace-nowrap text-[var(--text-sec)]">
                {fmtDateTime(event.at)}
              </td>
              <td className="px-4 py-3.5 align-top">
                <ResultPill result={event.result} />
              </td>
              {showNote && (
                <td className="pl-4 pr-5 py-3.5 align-top text-[12px] leading-relaxed text-[var(--alert-strong)] min-w-[280px]">
                  {event.note ?? '—'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}