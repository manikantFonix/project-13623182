'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeading from '../SectionHeading';
import GenerationAccessNote from './GenerationAccessNote';
import GenerationLookup from './GenerationLookup';
import GenerationReference from './GenerationReference';
import GenerationSummary from './GenerationSummary';
import GenerationPromptPin from './GenerationPromptPin';
import GenerationStepList from './GenerationStepList';
import GenerationCostPanel from './GenerationCostPanel';
import GenerationNothingChosen from './GenerationNothingChosen';
import GenerationSkeleton from './GenerationSkeleton';
import GenerationErrorState from './GenerationErrorState';
import GenerationNote from './GenerationNote';
import GenerationStepDetail from './GenerationStepDetail';
import GenerationStateControl, { type LogPreview } from './GenerationStateControl';
import { findStep, RENDER_COUNT, STEPS_TOTAL, type LogState } from './data';

const DEFAULT_QUERY = 'Bridal 2026 · Product 14';

export default function GenerationLog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step');

  const [state, setState] = useState<LogState>('populated');
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [stepId, setStepId] = useState<string | null>(null);

  useEffect(() => {
    setStepId(stepParam && findStep(stepParam) ? stepParam : null);
  }, [stepParam]);

  const openStep = useCallback(
    (id: string) => {
      setState('populated');
      setStepId(id);
      router.replace(`/admin/generation-log?step=${id}`, { scroll: false });
    },
    [router]
  );

  const closeStep = useCallback(() => {
    setStepId(null);
    if (stepParam) router.replace('/admin/generation-log', { scroll: false });
  }, [router, stepParam]);

  const find = () => {
    setState(query.trim() ? 'populated' : 'none');
    setStepId(null);
  };

  const preview: LogPreview =
    state === 'loading'
      ? 'loading'
      : state === 'error'
        ? 'error'
        : stepId
          ? 'step'
          : state === 'none'
            ? 'none'
            : 'populated';

  const onPreview = (next: LogPreview) => {
    if (next === 'step') {
      openStep('side-repair');
      return;
    }
    setStepId(null);
    if (stepParam) router.replace('/admin/generation-log', { scroll: false });
    if (next === 'none') {
      setState('none');
      setQuery('');
      return;
    }
    if (next === 'populated') {
      setState('populated');
      setQuery(DEFAULT_QUERY);
      return;
    }
    setState(next);
  };

  const step = stepId ? findStep(stepId) : undefined;

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="max-w-[880px]">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Generation log
        </h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          What was generated for one product, in order. Evidence for a disputed render or bill.
        </p>
        <p className="mt-2 text-[12px] text-[var(--muted-text)]">
          Read-only · administrators only
        </p>
      </header>

      <div className="mt-6 max-w-[1280px]">
        <GenerationAccessNote />
      </div>

      <div className="mt-7 max-w-[1280px]">
        {state === 'loading' ? (
          <GenerationSkeleton />
        ) : state === 'error' ? (
          <GenerationErrorState onRetry={() => setState('populated')} />
        ) : (
          <>
            <GenerationLookup query={query} onQuery={setQuery} onFind={find} />

            {state === 'none' ? (
              <div className="mt-6">
                <GenerationNothingChosen
                  onExample={() => {
                    setQuery(DEFAULT_QUERY);
                    setState('populated');
                  }}
                />
              </div>
            ) : (
              <>
                <div className="mt-6">
                  <GenerationReference />
                </div>

                <section aria-label="What this generation came to" className="mt-6">
                  <SectionHeading
                    title="What this generation came to"
                    purpose="The generation at a glance, before the steps."
                  />
                  <GenerationSummary />
                </section>

                <div className="mt-6">
                  <GenerationPromptPin />
                </div>

                <section aria-label="Every step in order" className="mt-10">
                  <SectionHeading
                    title="Every step in order"
                    purpose={`Draws and repairs cost a render. Checks don't.`}
                    period={`${STEPS_TOTAL} steps · ${RENDER_COUNT} cost a render`}
                  />
                  <GenerationStepList onOpen={openStep} />
                </section>

                <div className="mt-8">
                  <GenerationCostPanel />
                </div>

                <div className="mt-10">
                  <GenerationNote />
                </div>
              </>
            )}
          </>
        )}
      </div>

      <GenerationStateControl state={preview} onChange={onPreview} />

      {step && <GenerationStepDetail step={step} onClose={closeStep} />}
    </main>
  );
}