'use client';

import { useState } from 'react';
import SectionHeading from '../SectionHeading';
import RetailersFilters from './RetailersFilters';
import RetailersTable from './RetailersTable';
import RetailersSkeleton from './RetailersSkeleton';
import RetailersErrorState from './RetailersErrorState';
import RetailersEmptyState from './RetailersEmptyState';
import RetailersNote from './RetailersNote';
import RetailersStateControl from './RetailersStateControl';
import AdminPagination from '../AdminPagination';
import CreateRetailerDialog from './CreateRetailerDialog';
import { RETAILERS, RETAILERS_PAGE_SIZE, filterRetailers, type PlanFilter, type RetailersState, type StatusFilter } from './data';

export default function RetailersOversight() {
  const [state, setState] = useState<RetailersState>('populated');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [plan, setPlan] = useState<PlanFilter>('all');
  const [creating, setCreating] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = state === 'no-match' ? [] : filterRetailers(RETAILERS, { search, status, plan });
  const showTable = state !== 'no-match' && filtered.length > 0;
  const showEmpty = state === 'no-match' || (state === 'populated' && filtered.length === 0);
  const totalPages = Math.max(1, Math.ceil(filtered.length / RETAILERS_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * RETAILERS_PAGE_SIZE, currentPage * RETAILERS_PAGE_SIZE);

  const changeSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const changeStatus = (value: StatusFilter) => {
    setStatus(value);
    setPage(1);
  };
  const changePlan = (value: PlanFilter) => {
    setPlan(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    setPlan('all');
    setPage(1);
    if (state === 'no-match') setState('populated');
  };

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="flex flex-wrap items-start justify-between gap-4 max-w-[1280px]">
        <div className="max-w-[760px]">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">Retailers</h1>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
            Every account on the platform. Accounts needing attention come first.
          </p>
          <p className="mt-2 text-[12px] text-[var(--muted-text)]">
            Creation and disablement only
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
        >
          Create account
        </button>
      </header>

      <div className="mt-7 max-w-[1280px]">
        {state === 'loading' ? (
          <RetailersSkeleton />
        ) : state === 'error' ? (
          <RetailersErrorState onRetry={() => setState('populated')} />
        ) : (
          <>
            <section aria-label="Every retailer">
              <SectionHeading
                title="Every retailer"
                purpose="Disabled first, then zero balance."
                period={`${filtered.length} of ${RETAILERS.length} accounts`}
              />

              <div className="mt-4">
                <RetailersFilters
                  search={search}
                  onSearch={changeSearch}
                  status={status}
                  onStatus={changeStatus}
                  plan={plan}
                  onPlan={changePlan}
                  resultCount={filtered.length}
                  total={RETAILERS.length}
                />
              </div>

              <div className="mt-3">
                {showTable ? (
                  <RetailersTable retailers={visible} />
                ) : showEmpty ? (
                  <RetailersEmptyState onClear={clearFilters} />
                ) : null}
              </div>

              {showTable && filtered.length > RETAILERS_PAGE_SIZE && (
                <div className="mt-3">
                  <AdminPagination
                    page={currentPage}
                    pageSize={RETAILERS_PAGE_SIZE}
                    totalItems={filtered.length}
                    onPage={setPage}
                    label="Retailer list pages"
                  />
                </div>
              )}
            </section>

            <div className="mt-8">
              <RetailersNote />
            </div>
          </>
        )}
      </div>

      <RetailersStateControl state={state} onChange={setState} />

      {creating && <CreateRetailerDialog onClose={() => setCreating(false)} />}
    </main>
  );
}