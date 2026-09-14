'use client';

import { useState } from 'react';
import Link from 'next/link';
import LeadDetail from './LeadDetail';
import { getLead, type Lead } from './data';
import StateSwitcherPanel from '../ui/StateSwitcherPanel';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]';

type Preview =
  | 'newCatalog'
  | 'multiItem'
  | 'widgetEstimate'
  | 'widgetNoEstimate'
  | 'accepted'
  | 'rejected'
  | 'loading'
  | 'notFound';

const previews: { value: Preview; label: string; leadId: string | null }[] = [
  { value: 'newCatalog', label: 'New catalog lead', leadId: 'c-1001' },
  { value: 'multiItem', label: 'Multi-item lead', leadId: 'c-1002' },
  { value: 'widgetEstimate', label: 'Widget lead w/ estimate', leadId: 'w-2001' },
  { value: 'widgetNoEstimate', label: 'Widget lead no estimate', leadId: 'w-2002' },
  { value: 'accepted', label: 'Accepted', leadId: 'c-1006' },
  { value: 'rejected', label: 'Rejected', leadId: 'c-1004' },
  { value: 'loading', label: 'Loading', leadId: null },
  { value: 'notFound', label: 'Not found', leadId: null },
];

function Loading() {
  const card = (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <div className="space-y-2">
        <div className="h-3.5 w-1/4 rounded-full bg-[var(--muted)]" />
        <div className="h-3 w-3/4 rounded-full bg-[var(--muted)]" />
      </div>
      <div className="mt-4 flex gap-4">
        <div className="w-[120px] h-[120px] rounded-[12px] bg-[var(--muted)]" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-1/3 rounded-full bg-[var(--muted)]" />
          <div className="h-3 w-2/3 rounded-full bg-[var(--muted)]" />
        </div>
      </div>
    </div>
  );
  return (
    <main className="min-h-screen bg-[var(--canvas)] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="h-3.5 w-24 rounded-full bg-[var(--muted)]" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="flex flex-col gap-5">
            {card}
            {card}
          </div>
          <aside className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
            <div className="h-4 w-1/2 rounded-full bg-[var(--muted)]" />
            <div className="mt-4 h-5 w-2/3 rounded-full bg-[var(--muted)]" />
            <div className="mt-6 h-9 w-full rounded-full bg-[var(--muted)]" />
            <div className="mt-6 space-y-2">
              <div className="h-3 w-1/4 rounded-full bg-[var(--muted)]" />
              <div className="h-3 w-1/2 rounded-full bg-[var(--muted)]" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function LeadDetailRoute({ leadId }: { leadId: string }) {
  const [preview, setPreview] = useState<Preview | null>(null);

  const applied = preview ?? 'newCatalog';

  const renderLead = () => {
    if (applied === 'loading') return <Loading />;

    if (applied === 'notFound') {
      return (
        <main className="min-h-screen bg-[var(--canvas)] pt-8 pb-16">
          <div className="max-w-[1180px] mx-auto px-8">
            <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <p className="text-[15px] text-[var(--text)]">
                This lead doesn't exist.
              </p>
              <Link
                href="/leads"
                prefetch={false}
                className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap inline-flex items-center ${focusRing}`}
              >
                Back to leads
              </Link>
            </div>
          </div>
        </main>
      );
    }

    const lead = preview
      ? (getLead(previews.find((x) => x.value === preview)?.leadId ?? leadId) as Lead)
      : (getLead(leadId) as Lead);
    return <LeadDetail key={lead?.id ?? 'none'} lead={lead} />;
  };

  return (
    <>
      {renderLead()}
      <StateSwitcherPanel
        title="Preview state"
        icon="ri-chat-3-line"
        hint="Switch how the lead detail page looks"
        groups={[{ options: previews.map((p) => ({ value: p.value, label: p.label })) }]}
        active={(v) => applied === v}
        onSelect={(v) => setPreview(v as Preview)}
      />
    </>
  );
}