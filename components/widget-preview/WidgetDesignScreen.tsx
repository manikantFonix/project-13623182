'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import PipelinePanel from './PipelinePanel';
import DesignResult from './DesignResult';
import EstimateModal from './EstimateModal';
import RequestModal from './RequestModal';
import { SAMPLE_DESC, categoryLabel } from './data';
import { STAGES, stageLabelFor, statusesFor } from './pipeline';
import { useWidgetState } from './store';
import type { EstimateResult } from './types';

export default function WidgetDesignScreen({
  token,
  openEstimateOnMount = false,
  openRequestOnMount = false,
}: {
  token: string;
  openEstimateOnMount?: boolean;
  openRequestOnMount?: boolean;
}) {
  const router = useRouter();
  const [state, update] = useWidgetState();
  const getPriceRef = useRef<HTMLButtonElement>(null);

  const openRequest = (estimate: EstimateResult | null) => {
    update({
      requestOpen: true,
      requestStep: 'form',
      requestSending: false,
      requestError: false,
      requestErrorMessage: '',
      requestEstimate: estimate,
    });
  };

  const category = state.category ?? 'ring';
  const description =
    state.description.trim() !== '' ? state.description : SAMPLE_DESC;

  const failed = state.screenTwo === 'failed';
  const statuses = statusesFor(state.screenTwo, state.stageIndex, state.failedAt);
  const stageLabel =
    state.screenTwo === 'generating' ? stageLabelFor(state.stageIndex) : null;

  useEffect(() => {
    if (!openEstimateOnMount) return;
    update({
      screenTwo: 'arrived',
      stageIndex: STAGES.length,
      live: false,
      failedAt: null,
      estimateOpen: true,
      estimateStep: 'form',
      estimateRunning: false,
    });
  }, [openEstimateOnMount, update]);

  useEffect(() => {
    if (!openRequestOnMount) return;
    update({
      screenTwo: 'arrived',
      stageIndex: STAGES.length,
      live: false,
      failedAt: null,
      requestOpen: true,
      requestStep: 'form',
      requestSending: false,
      requestError: false,
      requestErrorMessage: '',
    });
  }, [openRequestOnMount, update]);

  useEffect(() => {
    if (state.estimateCategory !== category) {
      update({ estimateCategory: category, sizeValue: '' });
    }
  }, [category, state.estimateCategory, update]);

  useEffect(() => {
    if (state.screenTwo !== 'generating' || !state.live) return;
    if (state.connection === 'reconnecting') return;
    const t = setTimeout(() => {
      if (state.stageIndex < STAGES.length - 1) {
        update({ stageIndex: state.stageIndex + 1 });
      } else {
        update({ screenTwo: 'arrived', stageIndex: STAGES.length, live: false });
      }
    }, 1100);
    return () => clearTimeout(t);
  }, [state.screenTwo, state.live, state.stageIndex, state.connection, update]);

  return (
    <div>
      {state.screenTwo !== 'arrived' && (
        <PipelinePanel
          statuses={statuses}
          stageLabel={stageLabel}
          failed={failed}
          reconnecting={state.connection === 'reconnecting'}
          categoryLabel={categoryLabel(category)}
          onRetry={() =>
            update({
              screenTwo: 'generating',
              stageIndex: 0,
              live: true,
              failedAt: null,
            })
          }
        />
      )}

      {state.screenTwo === 'arrived' && (
        <DesignResult
          category={category}
          description={description}
          getPriceRef={getPriceRef}
          onTrySomethingElse={() => router.push(`/widget/${token}`)}
          onGetPrice={() =>
            update({ estimateOpen: true, estimateStep: 'form' })
          }
        />
      )}

      <EstimateModal
        open={state.estimateOpen}
        returnFocusRef={getPriceRef}
        onSendToJeweler={openRequest}
      />

      <RequestModal open={state.requestOpen} returnFocusRef={getPriceRef} />
    </div>
  );
}