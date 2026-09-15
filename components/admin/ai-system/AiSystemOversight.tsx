'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeading from '../SectionHeading';
import RoleModelCard from './RoleModelCard';
import RetryLimitCard from './RetryLimitCard';
import SettingCard from './SettingCard';
import NumberStepper from './NumberStepper';
import TogglesEmpty from './TogglesEmpty';
import AiSystemNote from './AiSystemNote';
import AiSystemSkeleton from './AiSystemSkeleton';
import AiSystemErrorState from './AiSystemErrorState';
import AiSystemStateControl from './AiSystemStateControl';
import RetryConfirmDialog from './RetryConfirmDialog';
import DiscardDialog from './DiscardDialog';
import { focusRing } from '../tokens';
import {
  DEFAULT_MODELS,
  DEFAULT_VALUES,
  ROLE_META,
  type AiSystemPreview,
  type ModelChoice,
  type Role,
  type SettingValues,
} from './data';

type ListState = 'populated' | 'loading' | 'error';

export default function AiSystemOversight() {
  const router = useRouter();
  const search = useSearchParams();
  const confirmParam = search.get('confirm');

  const [saved, setSaved] = useState<SettingValues>(DEFAULT_VALUES);
  const [values, setValues] = useState<SettingValues>(DEFAULT_VALUES);
  const [savedModels, setSavedModels] = useState<Record<Role, ModelChoice>>(DEFAULT_MODELS);
  const [models, setModels] = useState<Record<Role, ModelChoice>>(DEFAULT_MODELS);
  const [listState, setListState] = useState<ListState>('populated');
  const [preview, setPreview] = useState<AiSystemPreview>('default');
  const [retryConfirmOpen, setRetryConfirmOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    if (confirmParam !== 'retry') return;
    setListState('populated');
    setPreview('retry-confirm');
    setSubmitting(false);
    setFailed(false);
    setRetryConfirmOpen(true);
  }, [confirmParam]);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  });

  const dirty =
    JSON.stringify(values) !== JSON.stringify(saved) ||
    JSON.stringify(models) !== JSON.stringify(savedModels);

  const setValue = <K extends keyof SettingValues>(key: K, value: SettingValues[K]) => {
    setFailed(false);
    setPreview('default');
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const clearConfirmParam = () => {
    if (confirmParam) router.replace('/admin/ai-system', { scroll: false });
  };

  const persist = () => {
    setSubmitting(true);
    setFailed(false);
    setRetryConfirmOpen(true);
    window.setTimeout(() => {
      setSaved(values);
      setSavedModels(models);
      setSubmitting(false);
      setFailed(false);
      setRetryConfirmOpen(false);
      setPreview('default');
      setAnnounce('Settings saved. They take effect on the next generation.');
      clearConfirmParam();
    }, 900);
  };

  const onSave = () => {
    if (values.retryLimit !== saved.retryLimit) {
      setFailed(false);
      setSubmitting(false);
      setPreview('retry-confirm');
      setRetryConfirmOpen(true);
      return;
    }
    persist();
  };

  const onConfirmRetry = () => {
    setFailed(false);
    setSubmitting(true);
    window.setTimeout(() => {
      if (preview === 'save-failed') {
        setSubmitting(false);
        setFailed(true);
        return;
      }
      setSaved(values);
      setSavedModels(models);
      setSubmitting(false);
      setRetryConfirmOpen(false);
      setPreview('default');
      setAnnounce('Retry Limit saved. It takes effect on the next generation.');
      clearConfirmParam();
    }, 900);
  };

  const closeRetryConfirm = () => {
    if (submitting) return;
    setRetryConfirmOpen(false);
    setFailed(false);
    setSubmitting(false);
    setPreview('default');
    clearConfirmParam();
  };

  const reset = () => {
    setValues(DEFAULT_VALUES);
    setModels(DEFAULT_MODELS);
    setFailed(false);
    setSubmitting(false);
    setRetryConfirmOpen(false);
    setDiscardOpen(false);
    setListState('populated');
  };

  const applyPreview = (next: AiSystemPreview) => {
    reset();
    setPreview(next);

    switch (next) {
      case 'loading':
        setListState('loading');
        break;
      case 'error':
        setListState('error');
        break;
      case 'retry-2':
        setValues({ ...DEFAULT_VALUES, retryLimit: 2 });
        break;
      case 'retry-5':
        setValues({ ...DEFAULT_VALUES, retryLimit: 5 });
        break;
      case 'unsaved':
        setValues({ ...DEFAULT_VALUES, retryLimit: 5, timeoutSeconds: 150 });
        setDiscardOpen(false);
        break;
      case 'retry-confirm':
        setValues({ ...DEFAULT_VALUES, retryLimit: 5 });
        setRetryConfirmOpen(true);
        break;
      case 'saving':
        setValues({ ...DEFAULT_VALUES, retryLimit: 5 });
        setRetryConfirmOpen(true);
        setSubmitting(true);
        break;
      case 'save-failed':
        setValues({ ...DEFAULT_VALUES, retryLimit: 5 });
        setRetryConfirmOpen(true);
        setFailed(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-8 py-8 pb-32">
        <header className="max-w-[900px]">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
            AI &amp; system settings
          </h1>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
            The models, repair behaviour and thresholds the platform runs on. Changes apply to the
            next generation.
          </p>
          <p className="mt-2 text-[12px] text-[var(--muted-text)]">
            These are platform-wide. Running jobs continue on the settings they started with.
          </p>
        </header>

        <div aria-live="polite" className="sr-only">
          {announce}
        </div>

        <div className="mt-7 max-w-[980px]">
          {listState === 'loading' ? (
            <AiSystemSkeleton />
          ) : listState === 'error' ? (
            <AiSystemErrorState onRetry={() => applyPreview('default')} />
          ) : (
            <>
              <section aria-label="Providers and models">
                <SectionHeading
                  title="Providers and models"
                  purpose="One provider and model per role, each chosen separately."
                />
                <div className="mt-4 flex flex-col gap-3">
                  {ROLE_META.map((role) => (
                    <RoleModelCard
                      key={role.id}
                      roleId={role.id}
                      label={role.label}
                      purpose={role.purpose}
                      choice={models[role.id]}
                      disabled={submitting}
                      onChange={(choice) => {
                        setFailed(false);
                        setPreview('default');
                        setModels((prev) => ({ ...prev, [role.id]: choice }));
                      }}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[12px] text-[var(--muted-text)]">
                  Changing a provider or model does not alter renders already produced.
                </p>
              </section>

              <section aria-label="Retry Limit" className="mt-9">
                <RetryLimitCard
                  value={values.retryLimit}
                  disabled={submitting}
                  onChange={(value) => setValue('retryLimit', value)}
                />
              </section>

              <section aria-label="Thresholds" className="mt-9">
                <SectionHeading
                  title="Thresholds"
                  purpose="Timing, expiry and warning values the platform reads."
                />
                <div className="mt-4 flex flex-col gap-3">
                  <SettingCard
                    headingId="timeout-label"
                    title="Timeout threshold"
                    description="How long a generation or a check may run before it is abandoned."
                  >
                    <div className="flex flex-col items-end gap-1">
                      <label htmlFor="timeout" className="sr-only">
                        Timeout threshold in seconds
                      </label>
                      <NumberStepper
                        inputId="timeout"
                        describedBy="timeout-desc"
                        value={values.timeoutSeconds}
                        min={30}
                        max={600}
                        step={10}
                        unit="seconds"
                        disabled={submitting}
                        onChange={(value) => setValue('timeoutSeconds', value)}
                      />
                      <span id="timeout-desc" className="text-[11px] text-[var(--muted-text)]">
                        Abandoned runs are logged, not retried silently.
                      </span>
                    </div>
                  </SettingCard>

                  <SettingCard
                    headingId="link-expiry-label"
                    title="Link expiry"
                    description="How long approval and quotation links stay valid."
                    foot="No default has been settled for this value. It is held as configured and remains editable."
                  >
                    <div className="flex flex-col items-end gap-1">
                      <label htmlFor="link-expiry" className="sr-only">
                        Link expiry in days
                      </label>
                      <NumberStepper
                        inputId="link-expiry"
                        describedBy="link-expiry-desc"
                        value={values.linkExpiryDays}
                        min={1}
                        max={90}
                        step={1}
                        unit="days"
                        disabled={submitting}
                        onChange={(value) => setValue('linkExpiryDays', value)}
                      />
                      <span id="link-expiry-desc" className="text-[11px] text-[var(--muted-text)]">
                        Applies to every link issued after the change.
                      </span>
                    </div>
                  </SettingCard>

                  <SettingCard
                    headingId="low-balance-label"
                    title="Low balance threshold"
                    description="When the low-balance warning fires on a retailer's own usage screen."
                  >
                    <div className="flex flex-col items-end gap-1">
                      <label htmlFor="low-balance" className="sr-only">
                        Low balance threshold in renders
                      </label>
                      <NumberStepper
                        inputId="low-balance"
                        describedBy="low-balance-desc"
                        value={values.lowBalanceRenders}
                        min={1}
                        max={100}
                        step={1}
                        unit="renders"
                        disabled={submitting}
                        onChange={(value) => setValue('lowBalanceRenders', value)}
                      />
                      <span id="low-balance-desc" className="text-[11px] text-[var(--muted-text)]">
                        Measured against each retailer's remaining renders.
                      </span>
                    </div>
                  </SettingCard>

                  <SettingCard
                    headingId="ageing-label"
                    title="Ageing request threshold"
                    description="How long a request may sit awaiting a customer or a quote before it ages."
                    foot="Read by the Bottlenecks screen. Changing it changes what that screen reports."
                  >
                    <div className="flex flex-col items-end gap-1">
                      <label htmlFor="ageing" className="sr-only">
                        Ageing request threshold in days
                      </label>
                      <NumberStepper
                        inputId="ageing"
                        describedBy="ageing-desc"
                        value={values.ageingDays}
                        min={1}
                        max={60}
                        step={1}
                        unit="days"
                        disabled={submitting}
                        onChange={(value) => setValue('ageingDays', value)}
                      />
                      <span id="ageing-desc" className="text-[11px] text-[var(--muted-text)]">
                        Counts from the day the request was raised.
                      </span>
                    </div>
                  </SettingCard>
                </div>
              </section>

              <section aria-label="Feature toggles" className="mt-9">
                <SectionHeading
                  title="Feature toggles"
                  purpose="Platform-wide switches, applied to every retailer."
                />
                <div className="mt-4">
                  <TogglesEmpty />
                </div>
              </section>

              <div className="mt-10">
                <AiSystemNote />
              </div>
            </>
          )}
        </div>
      </main>

      {dirty && !submitting && (
        <div className="fixed bottom-6 left-6 z-[70] max-w-[calc(100vw-480px)] h-12 pl-4 pr-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-strong)] flex items-center gap-3">
          <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--alert-strong)]">
            <i className="ri-error-warning-line text-[16px]" aria-hidden="true" />
          </span>
          <span className="text-[13px] font-medium text-[var(--text)] whitespace-nowrap">
            Unsaved changes
          </span>
          <span className="text-[12px] text-[var(--text-sec)] truncate hidden lg:block">
            They apply to the next generation once saved.
          </span>
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDiscardOpen(true)}
              className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
            >
              Discard
            </button>
            <button
              type="button"
              onClick={onSave}
              className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
            >
              Save changes
            </button>
          </div>
        </div>
      )}

      {retryConfirmOpen && (
        <RetryConfirmDialog
          from={saved.retryLimit}
          to={values.retryLimit}
          submitting={submitting}
          failed={failed}
          onCancel={closeRetryConfirm}
          onConfirm={onConfirmRetry}
        />
      )}

      {discardOpen && (
        <DiscardDialog
          onCancel={() => setDiscardOpen(false)}
          onDiscard={() => {
            reset();
            setDiscardOpen(false);
            setPreview('default');
          }}
        />
      )}

      <AiSystemStateControl state={preview} onChange={applyPreview} />
    </>
  );
}