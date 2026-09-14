'use client';

import { useState } from 'react';
import Link from 'next/link';
import { leads, itemsLabel, type Lead, type LeadSource } from './data';
import StateSwitcherPanel from '../ui/StateSwitcherPanel';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]';

type Preview =
  | 'catalog'
  | 'widget'
  | 'loading'
  | 'catalogEmpty'
  | 'widgetEmpty'
  | 'error';

const previews: { value: Preview; label: string }[] = [
  { value: 'catalog', label: 'Catalog' },
  { value: 'widget', label: 'Widget' },
  { value: 'loading', label: 'Loading' },
  { value: 'catalogEmpty', label: 'Catalog empty' },
  { value: 'widgetEmpty', label: 'Widget empty' },
  { value: 'error', label: 'Error' },
];

type StatusFilter = 'All' | 'New' | 'Accepted' | 'Rejected';

const statusOptions: StatusFilter[] = ['All', 'New', 'Accepted', 'Rejected'];

const statusText: Record<Lead['status'], string> = {
  new: 'New',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

const statusColor: Record<Lead['status'], string> = {
  new: 'bg-[var(--muted)] text-[var(--text)]',
  accepted: 'bg-[var(--success-bg)] text-[var(--success)]',
  rejected: 'bg-[var(--surface)] border border-[var(--alert)] text-[var(--alert)]',
};

function RenderRows({ rows }: { rows: Lead[] }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] overflow-hidden">
      <div className="grid grid-cols-[1fr_160px_110px_150px_110px] items-center gap-4 px-5 h-11 border-b border-[var(--border)]">
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Customer</span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">From</span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Items</span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Received</span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Status</span>
      </div>
      {rows.map((l) => (
        <Link
          key={l.id}
          href={`/leads/${l.id}`}
          prefetch={false}
          className={`grid grid-cols-[1fr_160px_110px_150px_110px] items-center gap-4 px-5 py-3.5 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--muted)] transition-colors duration-150 ${focusRing}`}
        >
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[var(--text)]">{l.name}</p>
            <p className="text-[13px] text-[var(--text)] tabular-nums">
              {l.phone}
            </p>
          </div>
          <p className="text-[13px] text-[var(--text-sec)]">
            {l.source === 'catalog' ? l.catalogName : 'Widget'}
          </p>
          <p className="text-[13px] text-[var(--text)] tabular-nums">
            {itemsLabel(l)}
          </p>
          <p className="text-[13px] text-[var(--text-sec)]">{l.receivedLabel}</p>
          <span
            className={`inline-flex h-6 px-2.5 rounded-full text-[11px] font-medium items-center justify-self-start whitespace-nowrap ${statusColor[l.status]}`}
          >
            {statusText[l.status]}
          </span>
        </Link>
      ))}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[320px]">
      <p className="text-[13px] text-[var(--text)] max-w-[400px]">{text}</p>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] overflow-hidden">
      <div className="grid grid-cols-[1fr_160px_110px_150px_110px] items-center gap-4 px-5 h-11 border-b border-[var(--border)]">
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Customer</span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">From</span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Items</span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Received</span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Status</span>
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_160px_110px_150px_110px] items-center gap-4 px-5 py-4 border-b border-[var(--border)] last:border-b-0"
        >
          <div className="space-y-2">
            <div className="h-3.5 w-1/3 rounded-full bg-[var(--muted)]" />
            <div className="h-3 w-1/4 rounded-full bg-[var(--muted)]" />
          </div>
          <div className="h-3 w-16 rounded-full bg-[var(--muted)]" />
          <div className="h-3 w-10 rounded-full bg-[var(--muted)]" />
          <div className="h-3 w-14 rounded-full bg-[var(--muted)]" />
          <div className="h-3 w-8 rounded-full bg-[var(--muted)]" />
        </div>
      ))}
    </div>
  );
}

export default function LeadInbox() {
  const [preview, setPreview] = useState<Preview>('catalog');
  const [source, setSource] = useState<LeadSource>('catalog');
  const [filter, setFilter] = useState<StatusFilter>('All');
  const [statusOpen, setStatusOpen] = useState(false);

  const catalogLeads = leads.filter((l) => l.source === 'catalog');
  const widgetLeads = leads.filter((l) => l.source === 'widget');

  const sourceLeads = source === 'catalog' ? catalogLeads : widgetLeads;
  const undecidedCount = sourceLeads.filter((l) => l.status === 'new').length;

  const isCatalogSection = source === 'catalog';
  const empty =
    (isCatalogSection && preview === 'catalogEmpty') ||
    (!isCatalogSection && preview === 'widgetEmpty');
  const sectionLeads = empty ? [] : sourceLeads;

  const filtered = sectionLeads.filter(
    (l) => filter === 'All' || statusText[l.status] === filter
  );

  const filteredEmpty = !empty && preview !== 'loading' && filtered.length === 0 && sectionLeads.length > 0;

  const renderBody = () => {
    if (preview === 'loading') return <LoadingRows />;
    if (preview === 'error') {
      return (
        <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
          <p className="text-[13px] text-[var(--text)]">
            We couldn't load your inquiries.
          </p>
          <button
            onClick={() => setPreview('catalog')}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
          >
            Try again
          </button>
        </div>
      );
    }
    if (empty) {
      return (
        <EmptyState
          text={
            isCatalogSection
              ? 'No catalog inquiries yet. They arrive here when someone sends a request from your published catalog.'
              : 'No widget inquiries yet. They arrive here when someone sends a request from the widget on your website.'
          }
        />
      );
    }
    if (filteredEmpty) {
      return (
        <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
          <p className="text-[13px] text-[var(--text)]">
            No inquiries match this filter.
          </p>
          <button
            onClick={() => setFilter('All')}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
          >
            Clear filter
          </button>
        </div>
      );
    }
    return <RenderRows rows={filtered} />;
  };

  const renderStatusCount = (opt: StatusFilter) => {
    if (opt === 'All') return false;
    return sectionLeads.some((l) => statusText[l.status] === opt);
  };

  return (
    <main className="min-h-screen bg-[var(--canvas)] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Leads
        </h1>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div
            role="radiogroup"
            aria-label="Inquiry source"
            className="inline-flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-full p-1 h-9"
          >
            {(['catalog', 'widget'] as LeadSource[]).map((s) => {
              const isSel = source === s;
              const count = (
                s === 'catalog' ? catalogLeads : widgetLeads
              ).filter((l) => l.status === 'new').length;
              const label = s === 'catalog' ? 'Catalog inquiries' : 'Widget inquiries';
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={isSel}
                  onClick={() => setSource(s)}
                  className={`h-7 px-3 text-[13px] font-medium rounded-full flex items-center gap-2 transition-colors duration-150 whitespace-nowrap ${focusRing} ${
                    isSel
                      ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                      : 'text-[var(--text-sec)] hover:text-[var(--text)]'
                  }`}
                >
                  {label}
                  {count > 0 && (
                    <span
                      className={`inline-flex items-center justify-center min-w-[16px] h-5 px-1 rounded-full text-[11px] font-medium tabular-nums ${
                        isSel
                          ? 'bg-[var(--surface)] text-[var(--accent-text)]'
                          : 'bg-[var(--accent)]/10 text-[var(--text)]'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {filter !== 'All' && (
              <button
                onClick={() => setFilter('All')}
                className={`text-[13px] text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
              >
                Clear
              </button>
            )}
            <div className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={statusOpen}
                onClick={() => setStatusOpen((v) => !v)}
                className={`h-9 px-4 text-[13px] font-medium rounded-full border flex items-center gap-2 transition-colors duration-150 whitespace-nowrap ${focusRing} ${
                  filter !== 'All'
                    ? 'bg-[var(--surface)] border-[var(--accent)] text-[var(--accent-text)]'
                    : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text)] hover:bg-[var(--canvas)]'
                }`}
              >
                Status
                <i className="ri-arrow-down-s-line text-[16px] w-4 h-4 flex items-center justify-center" />
              </button>
              {statusOpen && (
                <div className="absolute right-0 mt-1 z-30 w-[140px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-1">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setFilter(opt);
                        setStatusOpen(false);
                      }}
                      className={`w-full text-left px-3 h-9 text-[13px] rounded-[8px] flex items-center justify-between transition-colors duration-150 whitespace-nowrap ${focusRing} ${
                        filter === opt
                          ? 'text-[var(--accent-text)] font-medium bg-[var(--muted)]'
                          : 'text-[var(--text)] hover:bg-[var(--canvas)]'
                      }`}
                    >
                      {opt}
                      {filter === opt && (
                        <i className="ri-check-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6" aria-live="polite">
          {renderBody()}
        </div>
      </div>

      <StateSwitcherPanel
        title="Preview state"
        icon="ri-inbox-2-line"
        hint="Switch how the leads page looks"
        groups={[{ options: previews.map((p) => ({ value: p.value, label: p.label })) }]}
        active={(v) => preview === v}
        onSelect={(v) => setPreview(v as Preview)}
      />
    </main>
  );
}