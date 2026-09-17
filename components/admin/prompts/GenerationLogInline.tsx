'use client';

import { useCallback, useState } from 'react';
import SectionHeading from '../SectionHeading';
import GenerationAccessNote from '../generation/GenerationAccessNote';
import GenerationLookup from '../generation/GenerationLookup';
import GenerationReference from '../generation/GenerationReference';
import GenerationSummary from '../generation/GenerationSummary';
import GenerationPromptPin from '../generation/GenerationPromptPin';
import GenerationStepList from '../generation/GenerationStepList';
import GenerationCostPanel from '../generation/GenerationCostPanel';
import GenerationNothingChosen from '../generation/GenerationNothingChosen';
import GenerationSkeleton from '../generation/GenerationSkeleton';
import GenerationErrorState from '../generation/GenerationErrorState';
import GenerationNote from '../generation/GenerationNote';
import GenerationStepDetail from '../generation/GenerationStepDetail';
import GenerationStateControl, { type LogPreview } from '../generation/GenerationStateControl';
import { findStep, RENDER_COUNT, STEPS_TOTAL, type LogState } from '../generation/data';

const DEFAULT_QUERY = 'Bridal 2026 · Product 14';

export default function GenerationLogInline() {
  const [state, setState] = useState<LogState>('populated');
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [stepId, setStepId] = useState<string | null>(null);

  const openStep = useCallback((id: string) => {
    setState('populated');
    setStepId(id);
  }, []);

  const closeStep = useCallback(() => {
    setStepId(null);
  }, []);

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
    <>
      <div className="px-7 py-7 pb-24">
        <div className="mt-0">
          <GenerationAccessNote />
        </div>

        <div className="mt-7">
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
      </div>

      <GenerationStateControl state={preview} onChange={onPreview} />

      {step && <GenerationStepDetail step={step} onClose={closeStep} />}
    </>
  );
}