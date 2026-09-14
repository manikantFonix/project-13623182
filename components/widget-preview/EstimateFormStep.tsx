'use client';

import EstimateSizeField from './EstimateSizeField';
import EstimateStone from './EstimateStone';
import EstimateBudget from './EstimateBudget';
import RequestMetal from './RequestMetal';
import { categoryLabel, widgetRing } from './data';
import { useWidgetState } from './store';

export default function EstimateFormStep() {
  const [state, update] = useWidgetState();
  const category = state.category ?? 'ring';
  const label = categoryLabel(category);

  const sizeOk = state.sizeValue.trim() !== '' && Number(state.sizeValue) > 0;
  const reason = !sizeOk
    ? 'Add the size.'
    : !state.stone
      ? 'Choose the stone type.'
      : state.budget === null
        ? 'Set a budget.'
        : null;
  const canSubmit = reason === null;

  const submit = () => {
    if (!canSubmit) return;
    update({ estimateStep: 'calculating', estimateRunning: true });
  };

  return (
    <div>
      <h2
        className="text-[18px] font-semibold"
        style={{ color: 'var(--w-text)' }}
      >
        {"What's it worth?"}
      </h2>
      <p className="mt-1 text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
        {"A few quick answers and we'll give you a range."}
      </p>

      <p className="mt-4 text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
        {`For your ${label.toLowerCase()}.`}
      </p>

      <div className="mt-6 space-y-5">
        <RequestMetal
          value={state.designMetal}
          onChange={(v) => update({ designMetal: v })}
        />
        <EstimateSizeField
          category={category}
          value={state.sizeValue}
          onChange={(v) => update({ sizeValue: v })}
        />
        <EstimateStone
          value={state.stone}
          onChange={(v) => update({ stone: v })}
        />
        <EstimateBudget
          value={state.budget}
          onChange={(v) => update({ budget: v })}
        />
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          className={`h-11 w-full text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 ${widgetRing} ${
            canSubmit ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          style={{
            backgroundColor: canSubmit ? 'var(--w-primary)' : 'var(--w-border)',
            color: canSubmit ? 'var(--w-primary-text)' : 'var(--w-text-sec)',
          }}
        >
          Get my estimate
        </button>
        {!canSubmit && (
          <p
            className="mt-2 text-[13px] text-right"
            style={{ color: 'var(--w-text-sec)' }}
          >
            {reason}
          </p>
        )}
      </div>
    </div>
  );
}