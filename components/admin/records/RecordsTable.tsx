'use client';

import Link from 'next/link';
import RecordStatusPill from './RecordStatusPill';
import { fmt } from '../data';
import { focusRing } from '../tokens';
import { fmtDate, type RecordConfig, type RecordEntry } from './data';

const head = 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

function Row({ record, config }: { record: RecordEntry; config: RecordConfig }) {
  const href = `${config.basePath}?record=${record.id}`;

  return (
    <tr className="border-b border-[var(--muted)] last:border-b-0">
      <th scope="row" className="pl-5 pr-4 py-4 text-left align-top font-normal min-w-[220px]">
        <Link
          href={href}
          prefetch={false}
          className={`rounded-sm text-[13px] font-semibold text-[var(--text)] transition-colors duration-150 hover:text-[var(--accent)] ${focusRing}`}
        >
          {record.name}
        </Link>
      </th>

      <td className="px-4 py-4 align-top text-[13px] text-[var(--text-sec)]">{record.retailer}</td>

      {config.hasActive && (
        <td className="px-4 py-4 align-top">
          <RecordStatusPill tone={record.active ? 'success' : 'neutral'}>
            {record.active ? 'Active' : 'Inactive'}
          </RecordStatusPill>
        </td>
      )}

      <td className="px-4 py-4 align-top text-right text-[13px] tabular-nums whitespace-nowrap text-[var(--text)]">
        {fmt(record.requests.length)}
      </td>

      <td className="px-4 py-4 align-top text-[12px] tabular-nums whitespace-nowrap text-[var(--text-sec)]">
        {fmtDate(record.created)}
      </td>

      <td className="pl-4 pr-5 py-4 align-top text-right whitespace-nowrap">
        <Link
          href={href}
          prefetch={false}
          className={`inline-flex h-9 items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-[13px] font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
        >
          Open
        </Link>
      </td>
    </tr>
  );
}

export default function RecordsTable({
  records,
  config,
}: {
  records: RecordEntry[];
  config: RecordConfig;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[980px]">
        <caption className="sr-only">
          Every {config.itemNoun} record, with the owning retailer, request count and creation date.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Name
            </th>
            <th scope="col" className={`${head} text-left`}>Retailer</th>
            {config.hasActive && <th scope="col" className={`${head} text-left`}>State</th>}
            <th scope="col" className={`${head} text-right`}>Requests</th>
            <th scope="col" className={`${head} text-left`}>Created</th>
            <th scope="col" className="pl-4 pr-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <Row key={record.id} record={record} config={config} />
          ))}
        </tbody>
      </table>
    </div>
  );
}