'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeading from '../SectionHeading';
import ProviderModePill from './ProviderModePill';
import KeyCard from './KeyCard';
import EndpointCard from './EndpointCard';
import EventsTable from './EventsTable';
import EventsEmpty from './EventsEmpty';
import SignatureFailures from './SignatureFailures';
import TaxCard from './TaxCard';
import ProvidersNote from './ProvidersNote';
import ProvidersSkeleton from './ProvidersSkeleton';
import ProvidersErrorState from './ProvidersErrorState';
import ProvidersStateControl from './ProvidersStateControl';
import ReplaceKeyDialog from './ReplaceKeyDialog';
import {
  PROVIDER_EVENTS,
  PROVIDER_KEYS,
  PROVIDER_MODE,
  acceptedEvents,
  rejectedEvents,
  type ProviderKey,
  type ProviderEvent,
  type ProvidersPreview,
} from './data';

type Modal = { keyId: string; step: 'enter' | 'confirm'; seed: string };
type ListState = 'populated' | 'loading' | 'error';

const DEMO_NEW = 'pk_live_demo_value_9d4c';

export default function ProvidersOversight() {
  const router = useRouter();
  const search = useSearchParams();
  const replaceParam = search.get('replace');

  const [keys, setKeys] = useState<ProviderKey[]>(PROVIDER_KEYS);
  const [events, setEvents] = useState<ProviderEvent[]>(PROVIDER_EVENTS);
  const [listState, setListState] = useState<ListState>('populated');
  const [preview, setPreview] = useState<ProvidersPreview>('populated');
  const [modal, setModal] = useState<Modal | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    if (replaceParam && PROVIDER_KEYS.some((key) => key.id === replaceParam)) {
      setListState('populated');
      setPreview('replace-confirm');
      setSubmitting(false);
      setFailed(false);
      setModal({ keyId: replaceParam, step: 'confirm', seed: DEMO_NEW });
    }
  }, [replaceParam]);

  const reset = () => {
    setModal(null);
    setSubmitting(false);
    setFailed(false);
  };

  const openKey = (keyId: string) => {
    reset();
    setListState('populated');
    setPreview('replacing');
    setModal({ keyId, step: 'enter', seed: '' });
  };

  const closeModal = () => {
    if (submitting) return;
    reset();
    setPreview('populated');
    if (replaceParam) router.replace('/admin/providers', { scroll: false });
  };

  const saveKey = (keyId: string, tail: string) => {
    setSubmitting(true);
    setFailed(false);
    window.setTimeout(() => {
      setKeys((prev) =>
        prev.map((key) =>
          key.id === keyId
            ? { ...key, set: true, tail, enteredAt: '2026-09-15', enteredBy: 'Admin · You' }
            : key
        )
      );
      reset();
      setPreview('populated');
      setAnnounce('Key saved. It will not be shown in full again.');
      if (replaceParam) router.replace('/admin/providers', { scroll: false });
    }, 900);
  };

  const applyPreview = (next: ProvidersPreview) => {
    reset();
    setListState('populated');
    setKeys(PROVIDER_KEYS);
    setEvents(PROVIDER_EVENTS);
    setPreview(next);

    switch (next) {
      case 'loading':
        setListState('loading');
        break;
      case 'error':
        setListState('error');
        break;
      case 'never-entered':
        setKeys(PROVIDER_KEYS.map((key) =>
          key.id === 'secret' ? { ...key, set: false, enteredAt: undefined, enteredBy: undefined } : key
        ));
        break;
      case 'replacing':
        setModal({ keyId: 'secret', step: 'enter', seed: '' });
        break;
      case 'replace-confirm':
        setModal({ keyId: 'secret', step: 'confirm', seed: DEMO_NEW });
        break;
      case 'saving':
        setModal({ keyId: 'secret', step: 'confirm', seed: DEMO_NEW });
        setSubmitting(true);
        break;
      case 'save-failed':
        setModal({ keyId: 'secret', step: 'confirm', seed: DEMO_NEW });
        setFailed(true);
        break;
      case 'events-accepted':
        setEvents(acceptedEvents(PROVIDER_EVENTS));
        break;
      case 'events-none':
        setEvents([]);
        break;
      default:
        break;
    }
  };

  const publishable = keys.find((key) => key.id === 'publishable');
  const secret = keys.find((key) => key.id === 'secret');
  const signing = keys.find((key) => key.id === 'signing');
  const failures = rejectedEvents(events);
  const accepted = acceptedEvents(events);
  const activeKey = modal ? keys.find((key) => key.id === modal.keyId) : undefined;

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
        <header className="max-w-[1180px]">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
            Provider configuration
          </h1>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
            Keys and webhook settings for the payment provider. Keys are entered once and never shown in full.
          </p>
          <p className="mt-2 text-[12px] text-[var(--muted-text)]">
            A key can be replaced but never read back.
          </p>
        </header>

        <div aria-live="polite" className="sr-only">
          {announce}
        </div>

        <div className="mt-7 max-w-[1280px]">
          {listState === 'loading' ? (
            <ProvidersSkeleton />
          ) : listState === 'error' ? (
            <ProvidersErrorState onRetry={() => applyPreview('populated')} />
          ) : (
            <>
              <section aria-label="Stripe keys">
                <div className="flex items-start justify-between gap-4">
                  <SectionHeading
                    title="Stripe keys"
                    purpose="Publishable and secret keys. Both are masked after entry."
                  />
                  <div className="mt-0.5 shrink-0">
                    <ProviderModePill mode={PROVIDER_MODE} />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  {publishable && <KeyCard item={publishable} onAction={() => openKey(publishable.id)} />}
                  {secret && <KeyCard item={secret} onAction={() => openKey(secret.id)} />}
                </div>
              </section>

              <section aria-label="Webhook" className="mt-9">
                <SectionHeading
                  title="Webhook"
                  purpose="Where events are sent and how their signatures are verified."
                />
                <div className="mt-4 flex flex-col gap-3">
                  <EndpointCard />
                  {signing && <KeyCard item={signing} onAction={() => openKey(signing.id)} />}
                </div>
              </section>

              <section aria-label="Recent events" className="mt-9">
                <SectionHeading
                  title="Recent events"
                  purpose="Every event is logged, including the ones that fail verification."
                  period={events.length > 0 ? `${events.length} recent` : undefined}
                />
                <div className="mt-4 flex flex-col gap-3">
                  {events.length === 0 ? (
                    <EventsEmpty />
                  ) : (
                    <>
                      {failures.length > 0 && <SignatureFailures events={failures} />}
                      {accepted.length > 0 && <EventsTable events={accepted} />}
                    </>
                  )}
                </div>
              </section>

              <section aria-label="Tax" className="mt-9">
                <SectionHeading
                  title="Tax"
                  purpose="Held as the provider needs it. The arithmetic is the provider's."
                />
                <div className="mt-4">
                  <TaxCard />
                </div>
              </section>

              <div className="mt-10">
                <ProvidersNote />
              </div>
            </>
          )}
        </div>
      </main>

      {modal && activeKey && (
        <ReplaceKeyDialog
          key={activeKey.id}
          item={activeKey}
          initialStep={modal.step}
          seedValue={modal.seed}
          submitting={submitting}
          failed={failed}
          onCancel={closeModal}
          onConfirm={(tail) => saveKey(activeKey.id, tail)}
        />
      )}

      <ProvidersStateControl state={preview} onChange={applyPreview} />
    </>
  );
}