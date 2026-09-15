'use client';

import RecordSection from './RecordSection';
import { fmtDate, type RecordConfig, type RecordEntry } from './data';

const th = 'py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

export default function RecordRequests({
  record,
  config,
}: {
  record: RecordEntry;
  config: RecordConfig;
}) {
  const isManufacturer = record.kind === 'manufacturers';
  const refLabel = isManufacturer ? 'Outcome' : 'Status';

  return (
    <RecordSection title="Requests" description={config.requestsDescription}>
      {record.requests.length === 0 ? (
        <p className="text-[13px] leading-relaxed text-[var(--text-sec)]">{config.noRequests}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px]">
            <caption className="sr-only">{config.requestsDescription}</caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className={`${th} text-left`}>Reference</th>
                <th scope="col" className={`${th} pl-4 text-left`}>Piece</th>
                <th scope="col" className={`${th} pl-4 text-left`}>{refLabel}</th>
                <th scope="col" className={`${th} pl-4 text-right`}>Date</th>
              </tr>
            </thead>
            <tbody>
              {record.requests.map((request) => (
                <tr key={request.id} className="border-b border-[var(--muted)] last:border-b-0">
                  <th
                    scope="row"
                    className="py-2.5 pr-4 text-left align-middle text-[12px] font-medium tabular-nums text-[var(--text)] whitespace-nowrap"
                  >
                    {request.reference}
                  </th>
                  <td className="py-2.5 pl-4 text-left align-middle text-[13px] text-[var(--text-sec)]">
                    {request.piece}
                  </td>
                  <td className="py-2.5 pl-4 text-left align-middle text-[13px] text-[var(--text)] whitespace-nowrap">
                    {isManufacturer ? request.outcome : request.status}
                  </td>
                  <td className="py-2.5 pl-4 text-right align-middle text-[12px] tabular-nums text-[var(--text-sec)] whitespace-nowrap">
                    {fmtDate(request.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </RecordSection>
  );
}