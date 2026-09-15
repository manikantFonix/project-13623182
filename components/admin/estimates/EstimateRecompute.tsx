'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EstimateLookup from './EstimateLookup';
import EstimateSummary from './EstimateSummary';
import EstimateTable from './EstimateTable';
import EstimateNoMatch from './EstimateNoMatch';
import EstimateInputsNote from './EstimateInputsNote';
import EstimateSkeleton from './EstimateSkeleton';
import EstimateErrorState from './EstimateErrorState';
import EstimateEmptyState from './EstimateEmptyState';
import EstimateNote from './EstimateNote';
import RecomputeDialog from './RecomputeDialog';
import RecomputeResult from './RecomputeResult';
import RecomputeInProgress from './RecomputeInProgress';
import RecomputeStateControl, { type PreviewState } from './RecomputeStateControl';
import {
  PERIOD_LABEL,
  filterEstimates,
  findEstimate,
  type RecomputeState,
} from './data';

const MATCHES_REFERENCE = 'E-20260828-0412';
const DIFFERS_REFERENCE = 'E-20260828-0388';
const LABOUR_REFERENCE = 'E-20260828-0425';
const PARENT = '/admin/estimate-recompute';

function SectionHeading({
  title,
  purpose,
  meta,
}: {
  title: string;
  purpose: string;
  meta?: string;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-[17px] font-semibold text-[var(--text)]">{title}</h2>
        <p className="mt-1 max-w-[760px] text-[13px] leading-relaxed text-[var(--text-sec)]">
          {purpose}
        </p>
      </div>
      {meta && <p className="text-[12px] tabular-nums text-[var(--text-sec)]">{meta}</p>}
    </div>
  );
}

export default function EstimateRecompute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultParam = searchParams.get('estimate') ?? '';

  const [state, setState] = useState<RecomputeState>('populated');
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [query, setQuery] = useState('');
  const [resultRef, setResultRef] = useState<string | null>(null);
  const [recomputing, setRecomputing] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const startedRef = useRef<string | null>(null);

  useEffect(() => {
    if (resultParam && findEstimate(resultParam)) {
      if (startedRef.current === resultParam) return;
      setResultRef(resultParam);
      setRecomputing(false);
      setAutoComplete(false);
    } else if (!resultParam) {
      startedRef.current = null;
      setResultRef(null);
      setRecomputing(false);
      setAutoComplete(false);
    }
  }, [resultParam]);

  useEffect(() => {
    if (!recomputing || !autoComplete) return;
    const timer = window.setTimeout(() => {
      setRecomputing(false);
      setAutoComplete(false);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [recomputing, autoComplete]);

  const open = (
    reference: string,
    options: { recomputing: boolean; auto: boolean; preview: PreviewState | null }
  ) => {
    startedRef.current = reference;
    setResultRef(reference);
    setRecomputing(options.recomputing);
    setAutoComplete(options.auto);
    setPreview(options.preview);
    router.replace(`${PARENT}?estimate=${reference}`, { scroll: false });
  };

  const changeState = (value: RecomputeState) => {
    startedRef.current = null;
    setState(value);
    setPreview(null);
    setResultRef(null);
    setRecomputing(false);
    setAutoComplete(false);
    if (resultParam) router.replace(PARENT, { scroll: false });
  };

  const showPreview = (value: PreviewState) => {
    if (value === 'differs') {
      open(DIFFERS_REFERENCE, { recomputing: false, auto: false, preview: value });
      return;
    }
    if (value === 'differs-labour') {
      open(LABOUR_REFERENCE, { recomputing: false, auto: false, preview: value });
      return;
    }
    open(MATCHES_REFERENCE, {
      recomputing: value === 'recomputing',
      auto: false,
      preview: value,
    });
  };

  const closeResult = () => {
    startedRef.current = null;
    setResultRef(null);
    setRecomputing(false);
    setAutoComplete(false);
    setPreview(null);
    if (resultParam) router.replace(PARENT, { scroll: false });
  };

  const list = filterEstimates(query);
  const resultEstimate = resultRef ? findEstimate(resultRef) : undefined;

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <div className="max-w-[1280px]">
        <header>
          <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--muted-text)]">
            Monitoring
          </p>
          <h1 className="mt-1.5 text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
            Estimate recompute
          </h1>
          <p className="mt-2 max-w-[840px] text-[13px] leading-relaxed text-[var(--text-sec)]">
            Run an estimate&rsquo;s calculation again from the inputs it kept, and compare it with the
            range the consumer saw.
          </p>
          <p className="mt-2 max-w-[840px] text-[13px] leading-relaxed text-[var(--text-sec)]">
            Search by reference or retailer, or pick from the list below.
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-[var(--text-sec)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-eye-line text-[14px]" aria-hidden="true" />
              </span>
              Read-only · a recompute never overwrites the stored estimate
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{PERIOD_LABEL}</span>
          </p>
        </header>

        <div className="mt-6">
          <EstimateInputsNote />
        </div>

        <div className="mt-6">
          {state === 'loading' ? (
            <EstimateSkeleton />
          ) : state === 'error' ? (
            <EstimateErrorState onRetry={() => setState('populated')} />
          ) : state === 'none' ? (
            <EstimateEmptyState />
          ) : (
            <>
              <EstimateLookup query={query} onQuery={setQuery} />

              <div className="mt-10">
                <SectionHeading
                  title="What is here"
                  purpose="The size of the period, before the list."
                  meta={PERIOD_LABEL}
                />
                <EstimateSummary />
              </div>

              <div className="mt-10">
                <SectionHeading
                  title="Recent estimates"
                  purpose="Newest first. Older ones are reached by reference."
                  meta={`${list.length} listed`}
                />
                {list.length > 0 ? (
                  <EstimateTable
                    estimates={list}
                    onRecompute={(reference) =>
                      open(reference, { recomputing: true, auto: true, preview: null })
                    }
                  />
                ) : (
                  <EstimateNoMatch query={query} onClear={() => setQuery('')} />
                )}
              </div>

              <div className="mt-10">
                <EstimateNote />
              </div>
            </>
          )}
        </div>
      </div>

      <RecomputeStateControl
        state={state}
        preview={preview}
        onState={changeState}
        onPreview={showPreview}
      />

      {resultEstimate && (
        <RecomputeDialog labelledBy="recompute-title" onClose={closeResult}>
          {recomputing ? (
            <RecomputeInProgress estimate={resultEstimate} />
          ) : (
            <RecomputeResult estimate={resultEstimate} onClose={closeResult} />
          )}
        </RecomputeDialog>
      )}
    </main>
  );
}