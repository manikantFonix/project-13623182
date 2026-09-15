'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeading from '../SectionHeading';
import InvoicesSummary from './InvoicesSummary';
import InvoicesFilters from './InvoicesFilters';
import InvoicesTable from './InvoicesTable';
import InvoicesEmptyState from './InvoicesEmptyState';
import InvoicesErrorState from './InvoicesErrorState';
import InvoicesSkeleton from './InvoicesSkeleton';
import InvoicesNote from './InvoicesNote';
import InvoicesStateControl from './InvoicesStateControl';
import RefundDialog from './RefundDialog';
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
  const router = useRouter();
  const search = useSearchParams();
  const refundParam = search.get('refund');

  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES);
  const [listState, setListState] = useState<ListState>('populated');
  const [preview, setPreview] = useState<InvoicesPreview>('populated');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [kind, setKind] = useState('all');

  const [modalId, setModalId] = useState<string | null>(null);
  const [defaultReason, setDefaultReason] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    if (refundParam && INVOICES.some((invoice) => invoice.id === refundParam)) {
      setListState('populated');
      setPreview('populated');
      setSubmitting(false);
      setFailed(false);
      setDefaultReason(undefined);
      setModalId(refundParam);
    }
  }, [refundParam]);

  const clearDialog = () => {
    setModalId(null);
    setSubmitting(false);
    setFailed(false);
    setDefaultReason(undefined);
  };

  const openRefund = (id: string) => {
    setListState('populated');
    setSubmitting(false);
    setFailed(false);
    setDefaultReason(undefined);
    setModalId(id);
    setPreview('refund-sub');
  };

  const closeDialog = () => {
    if (submitting) return;
    clearDialog();
    if (refundParam) router.replace('/admin/invoices', { scroll: false });
  };

  const confirmRefund = (invoiceId: string, amount: number, reason: string) => {
    setSubmitting(true);
    setFailed(false);
    window.setTimeout(() => {
      setInvoices((prev) =>
        prev.map((invoice) => {
          if (invoice.id !== invoiceId) return invoice;
          const refunds = [
            ...(invoice.refunds ?? []),
            {
              amount: Math.round(amount * 100) / 100,
              at: '2026-09-15',
              by: 'Admin · You',
              reason,
            },
          ];
          const total = refunds.reduce((sum, entry) => sum + entry.amount, 0);
          const nextStatus = total >= invoice.amount ? 'refunded' : 'partial';
          return { ...invoice, refunds, status: nextStatus };
        })
      );
      clearDialog();
      setPreview('populated');
      setAnnounce('Refund issued. Renders are unchanged.');
      if (refundParam) router.replace('/admin/invoices', { scroll: false });
    }, 900);
  };

  const applyPreview = (next: InvoicesPreview) => {
    clearDialog();
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

    switch (next) {
      case 'refund-sub':
        setModalId('inv-0912');
        setDefaultReason('Duplicate charge on a settled billing period.');
        break;
      case 'refund-topup':
        setModalId('inv-0915');
        break;
      case 'refund-noreason':
        setModalId('inv-0912');
        break;
      case 'refund-submitting':
        setModalId('inv-0912');
        setSubmitting(true);
        break;
      case 'refund-failed':
        setModalId('inv-0912');
        setFailed(true);
        break;
      default:
        break;
    }
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
  const activeInvoice = modalId ? invoices.find((invoice) => invoice.id === modalId) : undefined;

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
        <header className="max-w-[1280px]">
          <div className="max-w-[780px]">
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
              Invoices &amp; refunds
            </h1>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
              Every invoice across every retailer, newest first. A refund returns money only.
            </p>
            <p className="mt-2 text-[12px] text-[var(--muted-text)]">
              A refund does not restore renders. Renders already spent are not returned.
            </p>
          </div>
        </header>

        <div aria-live="polite" className="sr-only">
          {announce}
        </div>

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
                    <InvoicesTable invoices={filtered} onRefund={openRefund} />
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
        <RefundDialog
          invoice={activeInvoice}
          submitting={submitting}
          failed={failed}
          defaultReason={defaultReason}
          onCancel={closeDialog}
          onConfirm={(values) => confirmRefund(activeInvoice.id, values.amount, values.reason)}
        />
      )}

      <InvoicesStateControl state={preview} onChange={applyPreview} />
    </>
  );
}