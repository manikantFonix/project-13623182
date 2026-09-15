'use client';

import { useState } from 'react';
import SectionHeading from '../SectionHeading';
import LeadsPrivacyNote from './LeadsPrivacyNote';
import LeadsPeriodControl from './LeadsPeriodControl';
import LeadsSummary from './LeadsSummary';
import LeadOrigin from './LeadOrigin';
import LeadsTable from './LeadsTable';
import LeadsSkeleton from './LeadsSkeleton';
import LeadsQuietState from './LeadsQuietState';
import LeadsErrorState from './LeadsErrorState';
import LeadsNote from './LeadsNote';
import LeadsStateControl from './LeadsStateControl';
import { getLeadsView, type LeadsPeriodId, type LeadsState } from './data';

export default function LeadsOversight() {
  const [state, setState] = useState<LeadsState>('populated');
  const [period, setPeriod] = useState<LeadsPeriodId>('30d');
  const view = getLeadsView(state, period);

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="max-w-[880px]">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">Leads</h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          Whether the platform generates inquiries, and whether retailers deal with them.
        </p>
        <p className="mt-2 text-[12px] text-[var(--muted-text)]">
          Volume and outcome only · read-only · no individual inquiries
        </p>
      </header>

      <div className="mt-6 max-w-[1280px]">
        <LeadsPrivacyNote />
      </div>

      <div className="mt-7 max-w-[1280px]">
        {state === 'loading' ? (
          <LeadsSkeleton />
        ) : state === 'error' ? (
          <LeadsErrorState onRetry={() => setState('populated')} />
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <LeadsPeriodControl value={period} onChange={setPeriod} />
              <p className="text-[12px] tabular-nums text-[var(--muted-text)]">
                {view.period.label} · {view.period.range}
              </p>
            </div>

            <section aria-label="Platform totals" className="mt-6">
              <SectionHeading
                title="Platform totals"
                purpose="The whole platform across every retailer, for this window."
                period={view.period.range}
              />
              <LeadsSummary totals={view.totals} />
              <div className="mt-3">
                <LeadOrigin origin={view.origin} />
              </div>
            </section>

            <section aria-label="By retailer" className="mt-10">
              <SectionHeading
                title="By retailer"
                purpose="Ordered by undecided. Retailers with over half undecided are marked."
                period={view.period.range}
              />
              {view.quiet ? <LeadsQuietState /> : <LeadsTable key={period} retailers={view.retailers} />}
            </section>

            <div className="mt-10">
              <LeadsNote />
            </div>
          </>
        )}
      </div>

      <LeadsStateControl state={state} onChange={setState} />
    </main>
  );
}