'use client';

import EstimateRangeCard from './EstimateRangeCard';
import EstimateFailedCard from './EstimateFailedCard';
import { computeEstimate } from './estimate';
import { useWidgetState } from './store';
import type { EstimateResult } from './types';

export default function EstimateResultStep({
  onSend,
}: {
  onSend: (estimate: EstimateResult | null) => void;
}) {
  const [state, update] = useWidgetState();
  const category = state.category ?? 'ring';

  const result =
    state.estimateOutcome === 'failed'
      ? null
      : computeEstimate({
          category,
          size: state.sizeValue,
          metal: state.designMetal,
          stone: state.stone,
          budget: state.budget,
        });

  const changeSomething = () => update({ estimateStep: 'form' });

  return result ? (
    <EstimateRangeCard
      result={result}
      onSend={() => onSend(result)}
      onChangeSomething={changeSomething}
    />
  ) : (
    <EstimateFailedCard onSend={() => onSend(null)} onRetry={changeSomething} />
  );
}