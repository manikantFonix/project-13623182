'use client';

import type { Catalog } from './data';
import { needsAttention } from './data';
import { fmt } from '../data';

function servingPct(catalog: Catalog): number {
  if (catalog.products <= 0) return 0;
  return Math.round((catalog.serving / catalog.products) * 100);
}

function Row({ catalog }: { catalog: Catalog }) {
  const pct = servingPct(catalog);
  const attention = needsAttention(catalog);

  return (
    <tr className="border-b border-[var(--muted)] last:border-b-0">
      <th scope="row" className="pl-5 pr-4 py-3.5 text-left align-middle font-normal">
        <span className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[var(--text)]">{catalog.name}</span>
          {attention && (
            <span className="inline-flex h-5 items-center rounded-full bg-[var(--amber-bg)] px-2 text-[11px] font-medium whitespace-nowrap text-[var(--alert-strong)]">
              Needs attention
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[12px] text-[var(--text-sec)]">{catalog.retailer}</span>
      </th>

      <td className="px-4 py-3.5 align-middle">
        <span className="inline-flex h-6 items-center rounded-full border border-[var(--border)] px-2.5 text-[12px] font-medium whitespace-nowrap text-[var(--text-sec)]">
          {catalog.published ? 'Published' : 'Unpublished'}
        </span>
      </td>

      <td className="px-4 py-3.5 text-right align-middle text-[13px] tabular-nums text-[var(--text)] whitespace-nowrap">
        {fmt(catalog.products)}
      </td>

      <td className="px-4 py-3.5 text-right align-middle text-[13px] tabular-nums text-[var(--text)] whitespace-nowrap">
        {fmt(catalog.serving)}
      </td>

      <td className="pl-4 pr-5 py-3.5 align-middle">
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
          <span className="w-[86px] shrink-0 text-right text-[12px] tabular-nums text-[var(--text-sec)]">
            {fmt(catalog.flagged)} flagged
          </span>
        </div>
      </td>
    </tr>
  );
}

export default function CatalogsTable({ catalogs }: { catalogs: Catalog[] }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <table className="w-full">
        <caption className="sr-only">
          Every catalog, ordered by attention: serving gaps first, then by retailer.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th
              scope="col"
              className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]"
            >
              Catalog
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]"
            >
              State
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]"
            >
              Products
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]"
            >
              Serving
            </th>
            <th
              scope="col"
              className="pl-4 pr-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]"
            >
              Render health
            </th>
          </tr>
        </thead>
        <tbody>
          {catalogs.map((catalog) => (
            <Row key={catalog.id} catalog={catalog} />
          ))}
        </tbody>
      </table>
    </div>
  );
}