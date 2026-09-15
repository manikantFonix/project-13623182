'use client';

import { useMemo, useState } from 'react';
import SectionHeading from '../SectionHeading';
import AuditFilters from './AuditFilters';
import AuditList from './AuditList';
import AuditNoMatch from './AuditNoMatch';
import AuditNote from './AuditNote';
import AuditSkeleton from './AuditSkeleton';
import AuditErrorState from './AuditErrorState';
import AuditStateControl from './AuditStateControl';
import {
  ADMIN_FOCUS,
  ENTRIES,
  filterEntries,
  groupByDay,
  type AuditPeriod,
  type AuditScopeFilter,
  type AuditState,
} from './data';

export default function AuditOversight() {
  const [state, setState] = useState<AuditState>('acts');
  const [scope, setScope] = useState<AuditScopeFilter>('acts');
  const [group, setGroup] = useState('all');
  const [actor, setActor] = useState('all');
  const [retailer, setRetailer] = useState('all');
  const [period, setPeriod] = useState<AuditPeriod>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => filterEntries(ENTRIES, { scope, group, actor, retailer, period, query }),
    [scope, group, actor, retailer, period, query]
  );
  const days = useMemo(() => groupByDay(filtered), [filtered]);

  const resetAll = (nextScope: AuditScopeFilter) => {
    setScope(nextScope);
    setGroup('all');
    setActor('all');
    setRetailer('all');
    setPeriod('all');
    setQuery('');
  };

  const applyState = (next: AuditState) => {
    setState(next);
    if (next === 'loading' || next === 'error') return;
    if (next === 'noMatch') {
      resetAll('all');
      setQuery('quarterly compliance review');
      return;
    }
    if (next === 'oneAdmin') {
      resetAll('all');
      setActor(ADMIN_FOCUS);
      return;
    }
    if (next === 'acts') {
      resetAll('acts');
      return;
    }
    if (next === 'access') {
      resetAll('access');
      return;
    }
    resetAll('all');
  };

  const clearFilters = () => resetAll('acts');

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="max-w-[1180px]">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Audit trail
        </h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          Everything consequential an administrator does in the console, in order. Entries are
          written once and never changed.
        </p>
        <p className="mt-2 text-[12px] text-[var(--muted-text)]">
          Append only · nothing here can be edited, deleted or exported
        </p>
      </header>

      <div className="mt-7 max-w-[1280px]">
        {state === 'loading' ? (
          <AuditSkeleton />
        ) : state === 'error' ? (
          <AuditErrorState onRetry={() => applyState('acts')} />
        ) : (
          <>
            <section aria-label="The audit trail">
              <SectionHeading
                title="The trail"
                purpose="Newest first. Record access is separated from the acts."
              />

              <AuditFilters
                query={query}
                onQuery={setQuery}
                scope={scope}
                onScope={setScope}
                group={group}
                onGroup={setGroup}
                actor={actor}
                onActor={setActor}
                retailer={retailer}
                onRetailer={setRetailer}
                period={period}
                onPeriod={setPeriod}
                shown={filtered.length}
                total={ENTRIES.length}
              />

              <div className="mt-3">
                {days.length > 0 ? <AuditList days={days} /> : <AuditNoMatch onClear={clearFilters} />}
              </div>
            </section>

            <div className="mt-10">
              <AuditNote />
            </div>
          </>
        )}
      </div>

      <AuditStateControl state={state} onChange={applyState} />
    </main>
  );
}