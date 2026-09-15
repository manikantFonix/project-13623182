'use client';

import { useState } from 'react';
import PeriodSelector from './PeriodSelector';
import AdminStateControl from './AdminStateControl';
import AdminSkeleton from './AdminSkeleton';
import AdminErrorState from './AdminErrorState';
import SectionHeading from './SectionHeading';
import AccountsSection from './AccountsSection';
import ConsumptionTable from './ConsumptionTable';
import RepairPanel from './RepairPanel';
import ActivitySection from './ActivitySection';
import ConsumerSection from './ConsumerSection';
import FeedSection from './FeedSection';
import AggregatesNote from './AggregatesNote';
import { SNAPSHOT_DATE, getAdminData, type AdminPeriodId, type AdminState } from './data';

export default function AdminDashboard() {
  const [state, setState] = useState<AdminState>('populated');
  const [period, setPeriod] = useState<AdminPeriodId>('30d');
  const data = getAdminData(state, period);

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
            Platform Monitoring
          </h1>
          <p className="mt-1 text-[13px] text-[var(--text-sec)]">
            Every account on the platform, read-only.
          </p>
          <p className="mt-2 text-[12px] tabular-nums text-[var(--muted-text)]">
            Showing {data.period.label} · {data.period.range}
          </p>
        </div>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      <div className="mt-6">
        {state === 'loading' ? (
          <AdminSkeleton />
        ) : state === 'error' ? (
          <AdminErrorState onRetry={() => setState('populated')} />
        ) : (
          <>
            <section aria-label="Platform state">
              <SectionHeading
                title="Platform state"
                purpose="Where every retailer stands right now."
                period={`As of ${SNAPSHOT_DATE}`}
              />
              <AccountsSection
                accounts={data.accounts}
                periodLabel={data.period.label}
                total={data.total}
              />
            </section>

            <section aria-label="Where the renders went" className="mt-10">
              <SectionHeading
                title="Where the renders went"
                purpose="Every render spent, by cause. Repairs are held apart."
                period={data.period.range}
              />
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
                <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                  <ConsumptionTable causes={data.causes} total={data.total} />
                </div>
                <RepairPanel repairs={data.repairs} total={data.total} />
              </div>
            </section>

            <section aria-label="Activity" className="mt-10">
              <SectionHeading
                title="Activity"
                purpose="The two halves of the product: bespoke and catalogs."
                period={data.period.range}
              />
              <ActivitySection
                phase1={data.phase1}
                phase2={data.phase2}
                period={data.period.range}
              />
            </section>

            <section aria-label="Consumer activity" className="mt-8">
              <SectionHeading
                title="Consumer activity"
                purpose="What visitors did on catalogs and widgets."
                period={data.period.range}
              />
              <ConsumerSection consumer={data.consumer} />
            </section>

            <section aria-label="Recent activity" className="mt-10">
              <SectionHeading
                title="Recent activity"
                purpose="Notable events across every account, most recent first."
                period="Independent of the selected period"
              />
              <FeedSection feed={data.feed} />
            </section>

            <div className="mt-8">
              <AggregatesNote period={data.period.label} />
            </div>
          </>
        )}
      </div>

      <AdminStateControl state={state} onChange={setState} />
    </main>
  );
}