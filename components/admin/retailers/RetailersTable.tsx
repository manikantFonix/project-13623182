'use client';

import Link from 'next/link';
import RetailerStatusPill from './RetailerStatusPill';
import { balanceNote, PLANS, statusLabels, statusTone, type Retailer } from './data';
import { fmt } from '../data';
import { focusRing } from '../tokens';

const head =
  'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

function Row({ retailer }: { retailer: Retailer }) {
  const low = retailer.balance === 0;

  return (
    <tr className="border-b border-[var(--muted)] last:border-b-0">
      <th scope="row" className="pl-5 pr-4 py-4 text-left align-top font-normal min-w-[230px]">
        <Link
          href={`/admin/retailers/${retailer.id}`}
          prefetch={false}
          className={`rounded-sm text-[13px] font-semibold text-[var(--text)] transition-colors duration-150 hover:text-[var(--accent)] ${focusRing}`}
        >
          {retailer.name}
        </Link>
        <span className="mt-0.5 block text-[12px] break-words text-[var(--text-sec)]">
          {retailer.email}
        </span>
      </th>

      <td className="px-4 py-4 align-top">
        <RetailerStatusPill tone={statusTone[retailer.status]}>
          {statusLabels[retailer.status]}
        </RetailerStatusPill>
      </td>

      <td className="px-4 py-4 align-top text-[13px] whitespace-nowrap">
        {retailer.plan ? (
          <span className="text-[var(--text)]">{PLANS[retailer.plan].label}</span>
        ) : (
          <span className="text-[var(--muted-text)]">No plan</span>
        )}
      </td>

      <td className="px-4 py-4 align-top text-[12px] tabular-nums whitespace-nowrap text-[var(--text-sec)]">
        {retailer.signedUp}
      </td>

      <td className="px-4 py-4 align-top text-[12px] whitespace-nowrap text-[var(--text-sec)]">
        {retailer.lastActivity}
      </td>

      <td className="px-4 py-4 align-top text-right text-[13px] tabular-nums whitespace-nowrap text-[var(--text)]">
        {fmt(retailer.catalogs)}
      </td>

      <td className="px-4 py-4 align-top text-right whitespace-nowrap">
        <span
          className={`block text-[13px] font-medium tabular-nums ${
            low ? 'text-[var(--alert-strong)]' : 'text-[var(--text)]'
          }`}
        >
          {fmt(retailer.balance)}
        </span>
        <span className="mt-0.5 block text-[12px] text-[var(--text-sec)]">
          {balanceNote(retailer.balance)}
        </span>
      </td>

      <td className="pl-4 pr-5 py-4 align-top text-right whitespace-nowrap">
        <Link
          href={`/admin/retailers/${retailer.id}`}
          prefetch={false}
          className={`inline-flex h-9 items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-[13px] font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
        >
          Open
        </Link>
      </td>
    </tr>
  );
}

export default function RetailersTable({ retailers }: { retailers: Retailer[] }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[1180px]">
        <caption className="sr-only">
          Every retailer on the platform. Disabled accounts first, then zero balance, then by last
          activity.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Retailer
            </th>
            <th scope="col" className={`${head} text-left`}>Status</th>
            <th scope="col" className={`${head} text-left`}>Plan</th>
            <th scope="col" className={`${head} text-left`}>Signed up</th>
            <th scope="col" className={`${head} text-left`}>Last activity</th>
            <th scope="col" className={`${head} text-right`}>Catalogs</th>
            <th scope="col" className={`${head} text-right`}>Renders left</th>
            <th scope="col" className="pl-4 pr-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {retailers.map((retailer) => (
            <Row key={retailer.id} retailer={retailer} />
          ))}
        </tbody>
      </table>
    </div>
  );
}