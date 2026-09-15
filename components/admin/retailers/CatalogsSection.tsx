'use client';

import RetailerSection from './RetailerSection';
import { fmt } from '../data';
import type { CatalogEntry } from './data';

const th = 'py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

export default function CatalogsSection({ catalogs }: { catalogs: CatalogEntry[] }) {
  if (catalogs.length === 0) {
    return (
      <RetailerSection title="Catalogs" description="What they have published, and what is serving.">
        <p className="text-[13px] leading-relaxed text-[var(--text-sec)]">
          No catalogs yet. They appear when the retailer builds one.
        </p>
      </RetailerSection>
    );
  }

  return (
    <RetailerSection title="Catalogs" description="What they have published, and what is serving.">
      <table className="w-full">
        <caption className="sr-only">Each catalog, with product count, published state and how many products are serving.</caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className={`${th} text-left`}>Catalog</th>
            <th scope="col" className={`${th} pl-4 text-right`}>Products</th>
            <th scope="col" className={`${th} pl-4 text-left`}>State</th>
            <th scope="col" className={`${th} pl-4 text-right`}>Serving</th>
          </tr>
        </thead>
        <tbody>
          {catalogs.map((c) => (
            <tr key={c.id} className="border-b border-[var(--muted)] last:border-b-0">
              <th scope="row" className="py-2.5 pr-4 text-left align-middle text-[13px] font-medium text-[var(--text)]">
                {c.name}
              </th>
              <td className="py-2.5 pl-4 text-right align-middle text-[13px] tabular-nums text-[var(--text)] whitespace-nowrap">
                {fmt(c.products)}
              </td>
              <td className="py-2.5 pl-4 align-middle whitespace-nowrap">
                <span className="inline-flex h-6 items-center rounded-full border border-[var(--border)] px-2.5 text-[12px] font-medium text-[var(--text-sec)]">
                  {c.published ? 'Published' : 'Unpublished'}
                </span>
              </td>
              <td className="py-2.5 pl-4 text-right align-middle text-[13px] tabular-nums whitespace-nowrap text-[var(--text)]">
                {fmt(c.serving)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </RetailerSection>
  );
}