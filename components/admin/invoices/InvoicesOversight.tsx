'use client';

import { useState } from 'react';
import SectionHeading from '../SectionHeading';
import InvoicesSummary from './InvoicesSummary';
import InvoicesFilters from './InvoicesFilters';
import InvoicesTable from './InvoicesTable';
import InvoicesEmptyState from './InvoicesEmptyState';
import InvoicesErrorState from './InvoicesErrorState';
import InvoicesSkeleton from './InvoicesSkeleton';
import InvoicesNote from './InvoicesNote';
import InvoicesStateControl from './InvoicesStateControl';
import InvoiceViewDialog from './InvoiceViewDialog';
import {
  INVOICES,
  filterInvoices,
  sortInvoices,
  summarise,
  type Invoice,
  type InvoicesPreview,
} from './data';

type ListState = 'populated' | 'no-match' | 'loading' | 'error';

export default function InvoicesOversight() {
  const [invoices] = useState<Invoice[]>(INVOICES);
  const [listState, setListState] = useState<ListState>('populated');
  const [preview, setPreview] = useState<InvoicesPreview>('populated');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [kind, setKind] = useState('all');

  const [viewId, setViewId] = useState<string | null>(null);

  const openView = (id: string) => {
    setListState('populated');
    setViewId(id);
  };

  const applyPreview = (next: InvoicesPreview) => {
    setViewId(null);
    setListState('populated');

    if (next === 'loading' || next === 'error') {
      setListState(next);
      setPreview(next);
      return;
    }
    if (next === 'no-match') {
      setListState('no-match');
      setPreview(next);
      return;
    }

    setPreview(next);
  };

  const changeQuery = (value: string) => {
    setQuery(value);
    if (listState === 'no-match') setListState('populated');
  };
  const changeStatus = (value: string) => {
    setStatus(value);
    if (listState === 'no-match') setListState('populated');
  };
  const changeKind = (value: string) => {
    setKind(value);
    if (listState === 'no-match') setListState('populated');
  };

  const clearFilters = () => {
    setQuery('');
    setStatus('all');
    setKind('all');
    setListState('populated');
    setPreview('populated');
  };

  const filtered = sortInvoices(filterInvoices(invoices, { search: query, status, kind }));
  const summary = summarise(invoices);
  const showEmpty = listState === 'no-match' || filtered.length === 0;
  const activeInvoice = viewId ? invoices.find((invoice) => invoice.id === viewId) : undefined;

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
        <header className="max-w-[1280px]">
          <div className="max-w-[780px]">
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
              Invoices
            </h1>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
              Every invoice across every retailer, newest first. Open one to view or download it.
            </p>
          </div>
        </header>

        <div className="mt-7 max-w-[1280px]">
          {listState === 'loading' ? (
            <InvoicesSkeleton />
          ) : listState === 'error' ? (
            <InvoicesErrorState onRetry={() => applyPreview('populated')} />
          ) : (
            <>
              <InvoicesSummary summary={summary} />

              <section aria-label="Invoices" className="mt-8">
                <SectionHeading
                  title="Invoices"
                  purpose="Search by reference or retailer. Filter by status and what it was for."
                />

                <div className="mt-4">
                  <InvoicesFilters
                    search={query}
                    onSearch={changeQuery}
                    status={status}
                    onStatus={changeStatus}
                    kind={kind}
                    onKind={changeKind}
                    resultCount={filtered.length}
                    total={invoices.length}
                  />
                </div>

                <div className="mt-3">
                  {showEmpty ? (
                    <InvoicesEmptyState onClear={clearFilters} />
                  ) : (
                    <InvoicesTable invoices={filtered} onView={openView} />
                  )}
                </div>
              </section>

              <div className="mt-8">
                <InvoicesNote />
              </div>
            </>
          )}
        </div>
      </main>

      {activeInvoice && (
        <InvoiceViewDialog invoice={activeInvoice} onClose={() => setViewId(null)} />
      )}

      <InvoicesStateControl state={preview} onChange={applyPreview} />
    </>
  );
}