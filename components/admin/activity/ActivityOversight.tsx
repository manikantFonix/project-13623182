'use client';

import { useMemo, useState } from 'react';
import SectionHeading from '../SectionHeading';
import ActivityFilters from './ActivityFilters';
import ActivityFeed from './ActivityFeed';
import ActivityNoMatch from './ActivityNoMatch';
import ActivityNote from './ActivityNote';
import ActivitySingleAdminNote from './ActivitySingleAdminNote';
import ActivitySkeleton from './ActivitySkeleton';
import ActivityErrorState from './ActivityErrorState';
import ActivityStateControl from './ActivityStateControl';
import {
  ENTRIES,
  filterEntries,
  sortEntries,
  type ActivityPeriod,
  type ActivityScopeFilter,
  type ActivityState,
} from './data';

export default function ActivityOversight() {
  const [state, setState] = useState<ActivityState>('populated');
  const [scope, setScope] = useState<ActivityScopeFilter>('act');
  const [group, setGroup] = useState('all');
  const [retailer, setRetailer] = useState('all');
  const [period, setPeriod] = useState<ActivityPeriod>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => sortEntries(filterEntries(ENTRIES, { scope, group, retailer, period, query })),
    [scope, group, retailer, period, query]
  );

  const resetAll = (nextScope: ActivityScopeFilter) => {
    setScope(nextScope);
    setGroup('all');
    setRetailer('all');
    setPeriod('all');
    setQuery('');
  };

  const applyState = (next: ActivityState) => {
    setState(next);
    if (next === 'loading' || next === 'error') return;
    if (next === 'noMatch') {
      resetAll('all');
      setQuery('quarterly compliance review');
      return;
    }
    if (next === 'access') {
      resetAll('access');
      return;
    }
    resetAll('act');
  };

  const clearFilters = () => resetAll('act');

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="max-w-[1180px]">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Activity
        </h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          What has been happening across the platform, newest first. Entries are written once and
          never changed.
        </p>
        <p className="mt-2 text-[12px] text-[var(--muted-text)]">
          Append only · entries are never edited, deleted or removed
        </p>
      </header>

      <div className="mt-7 max-w-[1280px]">
        {state === 'loading' ? (
          <ActivitySkeleton />
        ) : state === 'error' ? (
          <ActivityErrorState onRetry={() => applyState('populated')} />
        ) : (
          <>
            <section aria-label="Recent activity">
              <SectionHeading
                title="Recent activity"
                purpose="Newest first, with record access kept apart from everything else."
              />

              <ActivityFilters
                query={query}
                onQuery={setQuery}
                scope={scope}
                onScope={setScope}
                group={group}
                onGroup={setGroup}
                retailer={retailer}
                onRetailer={setRetailer}
                period={period}
                onPeriod={setPeriod}
                shown={filtered.length}
                total={ENTRIES.length}
              />

              <div className="mt-2.5">
                <ActivitySingleAdminNote />
              </div>

              <div className="mt-3">
                {filtered.length > 0 ? (
                  <ActivityFeed entries={filtered} />
                ) : (
                  <ActivityNoMatch filtered={scope !== 'access' && state !== 'access'} onClear={clearFilters} />
                )}
              </div>
            </section>

            <div className="mt-10">
              <ActivityNote />
            </div>
          </>
        )}
      </div>

      <ActivityStateControl state={state} onChange={applyState} />
    </main>
  );
}