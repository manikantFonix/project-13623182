'use client';

import FilterSegmented from './FilterSegmented';
import { focusRing } from '../tokens';
import type { CatalogPublish, CatalogRender } from './data';

const publishOptions: { value: CatalogPublish; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Unpublished' },
];

const renderOptions: { value: CatalogRender; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'flagged', label: 'Has flagged' },
  { value: 'passed', label: 'All passed' },
];

export default function CatalogFilters({
  search,
  onSearch,
  publish,
  onPublish,
  render,
  onRender,
  resultCount,
  total,
}: {
  search: string;
  onSearch: (value: string) => void;
  publish: CatalogPublish;
  onPublish: (value: CatalogPublish) => void;
  render: CatalogRender;
  onRender: (value: CatalogRender) => void;
  resultCount: number;
  total: number;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px] max-w-[320px]">
        <label htmlFor="catalog-search" className="sr-only">
          Search catalogs and retailers
        </label>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
          <i className="ri-search-line text-[16px]" aria-hidden="true" />
        </span>
        <input
          id="catalog-search"
          type="text"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search catalogs and retailers"
          className={`w-full h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] pl-9 pr-3 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
        />
      </div>

      <FilterSegmented label="State" options={publishOptions} value={publish} onChange={onPublish} />
      <FilterSegmented label="Render" options={renderOptions} value={render} onChange={onRender} />

      <p
        className="ml-auto text-[12px] tabular-nums text-[var(--text-sec)] whitespace-nowrap"
        aria-live="polite"
      >
        {resultCount} of {total} catalogs
      </p>
    </div>
  );
}