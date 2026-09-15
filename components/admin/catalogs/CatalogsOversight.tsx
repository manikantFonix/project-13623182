'use client';

import { useState } from 'react';
import SectionHeading from '../SectionHeading';
import CatalogSummary from './CatalogSummary';
import CatalogFilters from './CatalogFilters';
import CatalogsTable from './CatalogsTable';
import CatalogsSkeleton from './CatalogsSkeleton';
import CatalogsErrorState from './CatalogsErrorState';
import CatalogsEmptyState from './CatalogsEmptyState';
import CatalogsNoMatch from './CatalogsNoMatch';
import CatalogsNote from './CatalogsNote';
import CatalogsPagination from './CatalogsPagination';
import CatalogsStateControl from './CatalogsStateControl';
import {
  CATALOGS,
  CATALOG_PAGE_SIZE,
  EMPTY_SUMMARY,
  PLATFORM_SUMMARY,
  applyFilters,
  type CatalogPublish,
  type CatalogRender,
  type CatalogState,
} from './data';

export default function CatalogsOversight() {
  const [state, setState] = useState<CatalogState>('populated');
  const [search, setSearch] = useState('');
  const [publish, setPublish] = useState<CatalogPublish>('all');
  const [render, setRender] = useState<CatalogRender>('all');
  const [page, setPage] = useState(1);

  const hasCatalogs = state === 'populated' || state === 'no-match';
  const summary = state === 'empty' ? EMPTY_SUMMARY : PLATFORM_SUMMARY;
  const filtered = hasCatalogs ? applyFilters(CATALOGS, { search, publish, render }) : [];
  const totalPages = Math.max(1, Math.ceil(filtered.length / CATALOG_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * CATALOG_PAGE_SIZE, currentPage * CATALOG_PAGE_SIZE);
  const showTable = state === 'populated' && filtered.length > 0;
  const showNoMatch = state === 'no-match' || (state === 'populated' && filtered.length === 0);

  const changeSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const changePublish = (value: CatalogPublish) => {
    setPublish(value);
    setPage(1);
  };
  const changeRender = (value: CatalogRender) => {
    setRender(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setPublish('all');
    setRender('all');
    setPage(1);
    if (state === 'no-match') setState('populated');
  };

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="max-w-[1280px]">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Catalog oversight
        </h1>
        <p className="mt-1 text-[13px] text-[var(--text-sec)]">
          Every catalog on the platform. What is live, and what is missing.
        </p>
        <p className="mt-2 text-[12px] text-[var(--muted-text)]">
          Current state · read-only · no period
        </p>
      </header>

      <div className="mt-7 max-w-[1280px]">
        {state === 'loading' ? (
          <CatalogsSkeleton />
        ) : state === 'error' ? (
          <CatalogsErrorState onRetry={() => setState('populated')} />
        ) : (
          <>
            <CatalogSummary summary={summary} />

            <section aria-label="Every catalog" className="mt-10">
              <SectionHeading
                title="Every catalog"
                purpose="Problems first, then by retailer."
              />

              {hasCatalogs && (
                <div className="mt-4">
                  <CatalogFilters
                    search={search}
                    onSearch={changeSearch}
                    publish={publish}
                    onPublish={changePublish}
                    render={render}
                    onRender={changeRender}
                    resultCount={state === 'no-match' ? 0 : filtered.length}
                    total={CATALOGS.length}
                  />
                </div>
              )}

              <div className="mt-3">
                {showTable ? (
                  <CatalogsTable catalogs={visible} />
                ) : showNoMatch ? (
                  <CatalogsNoMatch onClear={clearFilters} />
                ) : (
                  <CatalogsEmptyState />
                )}
              </div>

              {showTable && filtered.length > CATALOG_PAGE_SIZE && (
                <div className="mt-3">
                  <CatalogsPagination
                    page={currentPage}
                    pageSize={CATALOG_PAGE_SIZE}
                    totalItems={filtered.length}
                    onPage={setPage}
                  />
                </div>
              )}
            </section>

            <div className="mt-10">
              <CatalogsNote />
            </div>
          </>
        )}
      </div>

      <CatalogsStateControl state={state} onChange={setState} />
    </main>
  );
}