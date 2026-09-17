'use client';

import { useMemo, useState } from 'react';
import SectionHeading from '../SectionHeading';
import SubsErrorState from './SubsErrorState';
import SubsFilters from './SubsFilters';
import SubsNoMatch from './SubsNoMatch';
import SubsNote from './SubsNote';
import SubsSkeleton from './SubsSkeleton';
import SubsStateControl from './SubsStateControl';
import SubsSummary from './SubsSummary';
import SubsTable from './SubsTable';
import SubsViewDialog from './SubsViewDialog';
import {
  ROWS,
  TOPUP_ROWS,
  activeCount,
  atZeroCount,
  cancellingCount,
  consumedTotal,
  filterRows,
  sortAnnouncement,
  sortRows,
  trialCount,
  type SortKey,
  type SortState,
  type SubsState,
  type SubView,
} from './data';

const DEFAULT_SORT: SortState = { key: 'consumption', dir: 'desc' };

export default function SubscriptionsOversight() {
  const [state, setState] = useState<SubsState>('populated');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [plan, setPlan] = useState('all');
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const [selected, setSelected] = useState<SubView | null>(null);

  const filtered = useMemo(() => filterRows(ROWS, status, plan, query), [status, plan, query]);
  const sorted = useMemo(() => sortRows(filtered, sort), [filtered, sort]);
  const rowsShown = useMemo(
    () => (state === 'topUp' ? sortRows(TOPUP_ROWS, sort) : sorted),
    [state, sort, sorted]
  );

  const clearFilters = () => {
    setQuery('');
    setStatus('all');
    setPlan('all');
  };

  const applyState = (next: SubsState) => {
    setState(next);
    if (next === 'loading' || next === 'error') return;
    clearFilters();
    if (next === 'noMatch') {
      setQuery('harbour light jewellers');
      return;
    }
    if (next === 'sortConsumption') {
      setSort({ key: 'consumption', dir: 'desc' });
      return;
    }
    if (next === 'topUp') {
      setSort({ key: 'name', dir: 'asc' });
      return;
    }
    setSort(DEFAULT_SORT);
  };

  const handleSort = (key: SortKey) => {
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: key === 'name' || key === 'plan' ? 'asc' : 'desc' }
    );
  };

  const summary = {
    active: activeCount(ROWS),
    trial: trialCount(ROWS),
    cancelling: cancellingCount(ROWS),
    atZero: atZeroCount(ROWS),
    consumed: consumedTotal(ROWS),
  };

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="max-w-[1180px]">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Subscriptions
        </h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          Every retailer with their plan, balances and consumption, sortable so unusual use stands
          out. Read-only — plan changes happen on the retailer&rsquo;s own record.
        </p>
        <p className="mt-2 text-[12px] text-[var(--muted-text)]">
          Read-only · no plan or top-up controls on this screen
        </p>
      </header>

      <div className="mt-7 max-w-[1280px]">
        {state === 'loading' ? (
          <SubsSkeleton />
        ) : state === 'error' ? (
          <SubsErrorState onRetry={() => applyState('populated')} />
        ) : (
          <>
            <SubsSummary
              active={summary.active}
              trial={summary.trial}
              cancelling={summary.cancelling}
              atZero={summary.atZero}
              consumed={summary.consumed}
            />

            <section aria-label="Every subscription" className="mt-8">
              <SectionHeading
                title="Every retailer"
                purpose={
                  state === 'topUp'
                    ? 'Retailers whose included usage is used up and are now spending their top-up balance.'
                    : 'One row per subscription. Sort any column to reorder.'
                }
                period={`${rowsShown.length} of ${ROWS.length} shown`}
              />

              {state !== 'topUp' && (
                <SubsFilters
                  query={query}
                  onQuery={setQuery}
                  status={status}
                  onStatus={setStatus}
                  plan={plan}
                  onPlan={setPlan}
                  shown={filtered.length}
                  total={ROWS.length}
                />
              )}

              <p aria-live="polite" className="sr-only">
                {sortAnnouncement(sort)}
              </p>

              <div className="mt-3">
                {rowsShown.length > 0 ? (
                  <SubsTable rows={rowsShown} sort={sort} onSort={handleSort} onView={setSelected} />
                ) : (
                  <SubsNoMatch onClear={clearFilters} />
                )}
              </div>
            </section>

            <div className="mt-10">
              <SubsNote />
            </div>
          </>
        )}
      </div>

      <SubsStateControl state={state} onChange={applyState} />

      {selected && <SubsViewDialog row={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}