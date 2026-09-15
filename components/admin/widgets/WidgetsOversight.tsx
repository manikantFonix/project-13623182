'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeading from '../SectionHeading';
import WidgetsFilters from './WidgetsFilters';
import WidgetsTable from './WidgetsTable';
import WidgetsSkeleton from './WidgetsSkeleton';
import WidgetsErrorState from './WidgetsErrorState';
import WidgetsNoMatch from './WidgetsNoMatch';
import WidgetsNote from './WidgetsNote';
import WidgetsStateControl, { type WidgetsPreview } from './WidgetsStateControl';
import SuspendDialog from './SuspendDialog';
import ReinstateDialog from './ReinstateDialog';
import {
  INSTALLATIONS,
  applyWidgetFilter,
  findInstallation,
  type InstallStatus,
  type WidgetsFilter,
  type WidgetsState,
} from './data';

type Modal = { id: string; kind: 'suspend' | 'reinstate' };

const DEFAULT_ID = 'aurora';

export default function WidgetsOversight() {
  const router = useRouter();
  const search = useSearchParams();
  const suspendParam = search.get('suspend');
  const reinstateParam = search.get('reinstate');

  const [state, setState] = useState<WidgetsState>('populated');
  const [preview, setPreview] = useState<WidgetsPreview>('populated');
  const [filter, setFilter] = useState<WidgetsFilter>('all');
  const [modal, setModal] = useState<Modal | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, InstallStatus>>({});

  useEffect(() => {
    if (suspendParam && findInstallation(suspendParam)) {
      setState('populated');
      setPreview('suspend');
      setModal({ id: suspendParam, kind: 'suspend' });
      setSubmitting(false);
      setAutoComplete(true);
    } else if (reinstateParam && findInstallation(reinstateParam)) {
      setState('populated');
      setPreview('populated');
      setModal({ id: reinstateParam, kind: 'reinstate' });
      setSubmitting(false);
      setAutoComplete(true);
    }
  }, [suspendParam, reinstateParam]);

  useEffect(() => {
    if (!submitting || !modal || !autoComplete) return;
    const timer = setTimeout(() => {
      setOverrides((prev) => ({
        ...prev,
        [modal.id]: modal.kind === 'suspend' ? 'suspended' : 'working',
      }));
      setSubmitting(false);
      setModal(null);
      setAutoComplete(false);
      setPreview('populated');
      router.replace('/admin/widgets', { scroll: false });
    }, 900);
    return () => clearTimeout(timer);
  }, [submitting, modal, autoComplete, router]);

  const installations = INSTALLATIONS.map((item) =>
    overrides[item.id] ? { ...item, install: overrides[item.id] } : item
  );
  const list = state === 'none' ? [] : applyWidgetFilter(installations, filter);
  const installation = modal ? findInstallation(modal.id) : undefined;

  const openSuspend = (id: string) => {
    setModal({ id, kind: 'suspend' });
    setSubmitting(false);
    setAutoComplete(true);
    setPreview('suspend');
    router.replace(`/admin/widgets?suspend=${id}`, { scroll: false });
  };

  const openReinstate = (id: string) => {
    setModal({ id, kind: 'reinstate' });
    setSubmitting(false);
    setAutoComplete(true);
    router.replace(`/admin/widgets?reinstate=${id}`, { scroll: false });
  };

  const closeModal = () => {
    if (submitting) return;
    setModal(null);
    setSubmitting(false);
    setAutoComplete(false);
    setPreview('populated');
    if (suspendParam || reinstateParam) router.replace('/admin/widgets', { scroll: false });
  };

  const changeFilter = (next: WidgetsFilter) => {
    setFilter(next);
    setState('populated');
    setPreview('populated');
  };

  const applyPreview = (next: WidgetsPreview) => {
    setPreview(next);
    setSubmitting(false);
    setAutoComplete(false);
    if (next === 'loading' || next === 'error' || next === 'none') {
      setState(next);
      setModal(null);
      return;
    }
    setState('populated');
    if (next === 'suspend') {
      setModal({ id: DEFAULT_ID, kind: 'suspend' });
      return;
    }
    if (next === 'submitting') {
      setModal({ id: DEFAULT_ID, kind: 'suspend' });
      setSubmitting(true);
      return;
    }
    setModal(null);
    setFilter('all');
  };

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="max-w-[1180px]">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">Widgets</h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          Every widget installation. What works, what only looks broken, what is wrong.
        </p>
        <p className="mt-2 text-[12px] text-[var(--muted-text)]">
          Refusals counted this period · read-only apart from suspending
        </p>
      </header>

      <div className="mt-7 max-w-[1280px]">
        {state === 'loading' ? (
          <WidgetsSkeleton />
        ) : state === 'error' ? (
          <WidgetsErrorState onRetry={() => applyPreview('populated')} />
        ) : (
          <>
            <section aria-label="Every installation">
              <SectionHeading
                title="Every installation"
                purpose="One row per site. Each reason sits next to the state it explains."
                period={`${list.length} of ${installations.length} installations`}
              />

              <div className="mt-4">
                <WidgetsFilters
                  filter={filter}
                  onFilter={changeFilter}
                  resultCount={list.length}
                  total={installations.length}
                />
              </div>

              <div className="mt-3">
                {list.length > 0 ? (
                  <WidgetsTable
                    installations={list}
                    onSuspend={openSuspend}
                    onReinstate={openReinstate}
                  />
                ) : (
                  <WidgetsNoMatch onClear={() => applyPreview('populated')} />
                )}
              </div>
            </section>

            <div className="mt-10">
              <WidgetsNote />
            </div>
          </>
        )}
      </div>

      {modal?.kind === 'suspend' && installation && (
        <SuspendDialog
          origin={installation.origin}
          retailer={installation.retailer}
          submitting={submitting}
          onCancel={closeModal}
          onConfirm={() => setSubmitting(true)}
        />
      )}

      {modal?.kind === 'reinstate' && installation && (
        <ReinstateDialog
          origin={installation.origin}
          onCancel={closeModal}
          onConfirm={() => setSubmitting(true)}
        />
      )}

      <WidgetsStateControl state={preview} onChange={applyPreview} />
    </main>
  );
}