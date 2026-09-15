'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeading from '../SectionHeading';
import ComplexityCard from './ComplexityCard';
import BaseDaysTable from './BaseDaysTable';
import DefaultLabourRateCard from './DefaultLabourRateCard';
import UpliftCard from './UpliftCard';
import PriceApiCard from './PriceApiCard';
import RefreshRuleCard from './RefreshRuleCard';
import HeldPricesCard from './HeldPricesCard';
import MetalWeightNote from './MetalWeightNote';
import EstimatorNote from './EstimatorNote';
import EstimatorSkeleton from './EstimatorSkeleton';
import EstimatorErrorState from './EstimatorErrorState';
import EstimatorStateControl from './EstimatorStateControl';
import SaveConfirmDialog, { type EstimatorChange } from './SaveConfirmDialog';
import DiscardDialog from './DiscardDialog';
import CredentialReplaceDialog from './CredentialReplaceDialog';
import { focusRing } from '../tokens';
import {
  DEFAULT_FALLBACK_LABOUR_RATE,
  DEFAULT_MULTIPLIERS,
  DEFAULT_PRICE_APIS,
  DEFAULT_ROUNDING,
  DEFAULT_UPLIFT_PERCENT,
  ESTIMATOR_CATEGORIES,
  HELD_PRICES,
  RETAILERS_ON_DEFAULT_RATE,
  type EstimatorCategory,
  type EstimatorPreview,
  type Multipliers,
  type PriceApi,
} from './data';

type ListState = 'populated' | 'loading' | 'error';

interface Draft {
  multipliers: Multipliers;
  defaultLabourRate: number;
  uplift: number;
  rounding: number;
}

const DEFAULT_DRAFT: Draft = {
  multipliers: DEFAULT_MULTIPLIERS,
  defaultLabourRate: DEFAULT_FALLBACK_LABOUR_RATE,
  uplift: DEFAULT_UPLIFT_PERCENT,
  rounding: DEFAULT_ROUNDING,
};

export default function EstimatorOversight() {
  const router = useRouter();
  const search = useSearchParams();
  const confirmParam = search.get('confirm');

  const [saved, setSaved] = useState<Draft>(DEFAULT_DRAFT);
  const [draft, setDraft] = useState<Draft>(DEFAULT_DRAFT);
  const [savedCategories, setSavedCategories] = useState<EstimatorCategory[]>(ESTIMATOR_CATEGORIES);
  const [categories, setCategories] = useState<EstimatorCategory[]>(ESTIMATOR_CATEGORIES);
  const [savedApis, setSavedApis] = useState<PriceApi[]>(DEFAULT_PRICE_APIS);
  const [apis, setApis] = useState<PriceApi[]>(DEFAULT_PRICE_APIS);

  const [listState, setListState] = useState<ListState>('populated');
  const [preview, setPreview] = useState<EstimatorPreview>('default');
  const [beyondWindow, setBeyondWindow] = useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [announce, setAnnounce] = useState('');
  const [cred, setCred] = useState<{ id: string; step: 'enter' | 'confirm'; seed: string } | null>(null);
  const [credSubmitting, setCredSubmitting] = useState(false);
  const [credFailed, setCredFailed] = useState(false);

  useEffect(() => {
    if (confirmParam !== 'save') return;
    setListState('populated');
    setPreview('save-confirm');
    setSubmitting(false);
    setFailed(false);
    setSaveConfirmOpen(true);
  }, [confirmParam]);

  const midError =
    draft.multipliers.mid <= 1
      ? 'A multiplier must be greater than 1.0, or it would not increase complexity.'
      : undefined;
  const highError =
    draft.multipliers.high <= 1
      ? 'A multiplier must be greater than 1.0, or it would not increase complexity.'
      : undefined;

  const dirty =
    JSON.stringify(draft) !== JSON.stringify(saved) ||
    JSON.stringify(categories) !== JSON.stringify(savedCategories) ||
    JSON.stringify(apis) !== JSON.stringify(savedApis);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  const clearConfirmParam = () => {
    if (confirmParam) router.replace('/admin/estimator', { scroll: false });
  };

  const setMultipliers = (multipliers: Multipliers) => {
    setFailed(false);
    setPreview('default');
    setDraft((prev) => ({ ...prev, multipliers }));
  };

  const setCategoryBase = (id: string, baseDays: number) => {
    setFailed(false);
    setPreview('default');
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, baseDays } : c)));
  };

  const updateApi = (id: string, patch: Partial<PriceApi>) => {
    setFailed(false);
    setPreview('default');
    setApis((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };

  const buildChanges = (): EstimatorChange[] => {
    const out: EstimatorChange[] = [];
    if (saved.defaultLabourRate !== draft.defaultLabourRate) {
      out.push({
        term: 'Default labor day rate',
        from: `$${saved.defaultLabourRate}/day`,
        to: `$${draft.defaultLabourRate}/day`,
      });
    }
    if (saved.multipliers.mid !== draft.multipliers.mid) {
      out.push({
        term: 'Moderate multiplier',
        from: saved.multipliers.mid.toFixed(2),
        to: draft.multipliers.mid.toFixed(2),
      });
    }
    if (saved.multipliers.high !== draft.multipliers.high) {
      out.push({
        term: 'Complex multiplier',
        from: saved.multipliers.high.toFixed(2),
        to: draft.multipliers.high.toFixed(2),
      });
    }
    return out;
  };

  const needsConfirm =
    saved.defaultLabourRate !== draft.defaultLabourRate ||
    saved.multipliers.mid !== draft.multipliers.mid ||
    saved.multipliers.high !== draft.multipliers.high;

  const commit = () => {
    setSaved(draft);
    setSavedCategories(categories);
    setSavedApis(apis);
    setSubmitting(false);
    setFailed(false);
    setSaveConfirmOpen(false);
    setPreview('default');
    setAnnounce('Estimator settings saved. They apply to estimates produced after the save.');
    clearConfirmParam();
  };

  const onSave = () => {
    if (midError || highError) {
      setAnnounce('A multiplier is below the minimum and cannot be saved.');
      return;
    }
    setFailed(false);
    if (needsConfirm) {
      setSubmitting(false);
      setPreview('save-confirm');
      setSaveConfirmOpen(true);
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      if (preview === 'save-failed') {
        setSubmitting(false);
        setFailed(true);
        return;
      }
      commit();
    }, 900);
  };

  const onConfirmSave = () => {
    setFailed(false);
    setSubmitting(true);
    window.setTimeout(() => {
      if (preview === 'save-failed') {
        setSubmitting(false);
        setFailed(true);
        return;
      }
      commit();
    }, 900);
  };

  const closeSaveConfirm = () => {
    if (submitting) return;
    setSaveConfirmOpen(false);
    setFailed(false);
    setSubmitting(false);
    setPreview('default');
    clearConfirmParam();
  };

  const onConfirmCredential = (tail: string) => {
    if (!cred) return;
    setCredSubmitting(true);
    setCredFailed(false);
    window.setTimeout(() => {
      if (preview === 'save-failed') {
        setCredSubmitting(false);
        setCredFailed(true);
        return;
      }
      const patch: Partial<PriceApi> = {
        keySet: true,
        keyTail: tail,
        keyEnteredAt: '2026-09-15',
        keyEnteredBy: 'Admin · You',
      };
      setApis((prev) => prev.map((a) => (a.id === cred.id ? { ...a, ...patch } : a)));
      setSavedApis((prev) => prev.map((a) => (a.id === cred.id ? { ...a, ...patch } : a)));
      setCredSubmitting(false);
      setCred(null);
      setPreview('default');
      setAnnounce('The price API key was replaced. Only its tail is kept for identification.');
    }, 800);
  };

  const reset = () => {
    setSaved(DEFAULT_DRAFT);
    setDraft(DEFAULT_DRAFT);
    setSavedCategories(ESTIMATOR_CATEGORIES);
    setCategories(ESTIMATOR_CATEGORIES);
    setSavedApis(DEFAULT_PRICE_APIS);
    setApis(DEFAULT_PRICE_APIS);
    setBeyondWindow(false);
    setFailed(false);
    setSubmitting(false);
    setSaveConfirmOpen(false);
    setDiscardOpen(false);
    setCred(null);
    setCredSubmitting(false);
    setCredFailed(false);
    setListState('populated');
  };

  const applyPreview = (next: EstimatorPreview) => {
    reset();
    setPreview(next);

    switch (next) {
      case 'loading':
        setListState('loading');
        break;
      case 'error':
        setListState('error');
        break;
      case 'multiplier-changed':
        setDraft((prev) => ({ ...prev, multipliers: { ...prev.multipliers, high: 2.2 } }));
        break;
      case 'multiplier-refused':
        setDraft((prev) => ({ ...prev, multipliers: { ...prev.multipliers, high: 0.9 } }));
        break;
      case 'base-edited':
        setCategories((prev) => prev.map((c) => (c.id === 'ring' ? { ...c, baseDays: 2 } : c)));
        break;
      case 'unsaved':
        setDraft((prev) => ({ ...prev, multipliers: { ...prev.multipliers, high: 2.2 }, defaultLabourRate: 500 }));
        setDiscardOpen(false);
        break;
      case 'save-confirm':
        setDraft((prev) => ({ ...prev, multipliers: { ...prev.multipliers, high: 2.2 } }));
        setSaveConfirmOpen(true);
        break;
      case 'saving':
        setDraft((prev) => ({ ...prev, multipliers: { ...prev.multipliers, high: 2.2 } }));
        setSaveConfirmOpen(true);
        setSubmitting(true);
        break;
      case 'save-failed':
        setDraft((prev) => ({ ...prev, multipliers: { ...prev.multipliers, high: 2.2 } }));
        setSaveConfirmOpen(true);
        setFailed(true);
        break;
      case 'price-beyond-window':
        setBeyondWindow(true);
        break;
      case 'api-not-configured':
        setApis((prev) => prev.map((a) => (a.id === 'stone' ? { ...a, keySet: false } : a)));
        setSavedApis((prev) => prev.map((a) => (a.id === 'stone' ? { ...a, keySet: false } : a)));
        break;
      default:
        break;
    }
  };

  const heldPrices = beyondWindow
    ? HELD_PRICES.map((p) => (p.id === 'diamond' ? { ...p, status: 'beyond' as const } : p))
    : HELD_PRICES;

  const credApi = cred ? apis.find((a) => a.id === cred.id) ?? null : null;

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-8 py-8 pb-32">
        <header className="max-w-[920px]">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
            Estimator configuration
          </h1>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
            The numbers behind every price range a consumer sees. Changes apply to estimates produced
            after the save.
          </p>
          <p className="mt-2 text-[12px] text-[var(--muted-text)]">
            Changing any of these never alters an existing estimate. An estimate keeps the figure the
            consumer was shown.
          </p>
        </header>

        <div aria-live="polite" className="sr-only">
          {announce}
        </div>

        <div className="mt-7 max-w-[1100px]">
          {listState === 'loading' ? (
            <EstimatorSkeleton />
          ) : listState === 'error' ? (
            <EstimatorErrorState onRetry={() => applyPreview('default')} />
          ) : (
            <>
              <section aria-label="Complexity multipliers">
                <SectionHeading
                  title="Complexity multipliers"
                  purpose="Applied to every category's base days to produce the day count."
                />
                <div className="mt-4">
                  <ComplexityCard
                    multipliers={draft.multipliers}
                    midError={midError}
                    highError={highError}
                    disabled={submitting}
                    onChange={(multipliers) => setMultipliers(multipliers)}
                  />
                </div>
              </section>

              <section aria-label="Base days" className="mt-9">
                <SectionHeading
                  title="Base days by category"
                  purpose="Each category's base days and the day count it produces at every level."
                />
                <div className="mt-4">
                  <BaseDaysTable
                    categories={categories}
                    multipliers={draft.multipliers}
                    disabled={submitting}
                    onChange={setCategoryBase}
                  />
                </div>
                <p className="mt-2 text-[12px] text-[var(--muted-text)]">
                  The whole table recomputes when a multiplier changes. Simple stays at 1.0.
                </p>
              </section>

              <section aria-label="Default labor day rate" className="mt-9">
                <DefaultLabourRateCard
                  value={draft.defaultLabourRate}
                  retailersOnDefault={RETAILERS_ON_DEFAULT_RATE}
                  disabled={submitting}
                  onChange={(defaultLabourRate) => {
                    setFailed(false);
                    setPreview('default');
                    setDraft((prev) => ({ ...prev, defaultLabourRate }));
                  }}
                />
              </section>

              <section aria-label="Range uplift and rounding" className="mt-9">
                <UpliftCard
                  uplift={draft.uplift}
                  rounding={draft.rounding}
                  disabled={submitting}
                  onChange={(next) => {
                    setFailed(false);
                    setPreview('default');
                    setDraft((prev) => ({ ...prev, uplift: next.uplift, rounding: next.rounding }));
                  }}
                />
              </section>

              <section aria-label="Price APIs" className="mt-9">
                <SectionHeading
                  title="Metal and stone price APIs"
                  purpose="The providers the estimator reads prices from, one configuration each."
                />
                <div className="mt-4 flex flex-col gap-3">
                  {apis.map((api) => (
                    <PriceApiCard
                      key={api.id}
                      api={api}
                      disabled={submitting}
                      onChange={(next) => {
                        setFailed(false);
                        setPreview('default');
                        setApis((prev) =>
                          prev.map((a) =>
                            a.id === api.id
                              ? { ...a, provider: next.provider, pollHours: next.pollHours }
                              : a
                          )
                        );
                      }}
                      onReplaceKey={() => setCred({ id: api.id, step: 'enter', seed: '' })}
                    />
                  ))}
                </div>
              </section>

              <section aria-label="Price refresh rule" className="mt-9">
                <RefreshRuleCard />
              </section>

              <section aria-label="Held price status" className="mt-9">
                <HeldPricesCard prices={heldPrices} />
              </section>

              <div className="mt-9">
                <MetalWeightNote />
              </div>

              <div className="mt-10">
                <EstimatorNote />
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
            {failed ? 'Save failed' : 'Unsaved changes'}
          </span>
          <span className="text-[12px] text-[var(--text-sec)] truncate hidden lg:block">
            {failed
              ? 'The estimator is unchanged. Try saving again.'
              : 'They apply to estimates produced after the save.'}
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

      {saveConfirmOpen && (
        <SaveConfirmDialog
          changes={buildChanges()}
          submitting={submitting}
          failed={failed}
          onCancel={closeSaveConfirm}
          onConfirm={onConfirmSave}
        />
      )}

      {credApi && cred && (
        <CredentialReplaceDialog
          api={credApi}
          initialStep={cred.step}
          seedValue={cred.seed}
          submitting={credSubmitting}
          failed={credFailed}
          onCancel={() => {
            if (credSubmitting) return;
            setCred(null);
            setCredFailed(false);
            setCredSubmitting(false);
          }}
          onConfirm={onConfirmCredential}
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

      <EstimatorStateControl state={preview} onChange={applyPreview} />
    </>
  );
}