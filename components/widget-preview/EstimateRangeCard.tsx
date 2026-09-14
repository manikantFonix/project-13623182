'use client';

import { formatUsd } from './estimate';
import { widgetRing } from './data';
import type { EstimateResult } from './types';

function Line({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
        {label}
      </span>
      <span
        className="text-[13px] tabular-nums"
        style={{ color: 'var(--w-text)' }}
      >
        {formatUsd(value)}
      </span>
    </div>
  );
}

export default function EstimateRangeCard({
  result,
  onSend,
  onChangeSomething,
}: {
  result: EstimateResult;
  onSend: () => void;
  onChangeSomething: () => void;
}) {
  return (
    <div
      aria-live="polite"
      className="rounded-[12px] border border-[var(--w-border)] p-6"
      style={{ backgroundColor: 'var(--w-surface)' }}
    >
      <div className="space-y-3">
        <Line label="Metal" value={result.metal} />
        <div className="h-px" style={{ backgroundColor: 'var(--w-border)' }} />
        <Line label="Stones" value={result.stones} />
        <div className="h-px" style={{ backgroundColor: 'var(--w-border)' }} />
        <Line label="Labor" value={result.labor} />
      </div>

      <div
        className="my-4 h-px"
        style={{ backgroundColor: 'var(--w-border)' }}
      />

      <p className="text-[12px]" style={{ color: 'var(--w-text-sec)' }}>
        Estimated total
      </p>
      <p
        className="mt-1 text-[26px] font-semibold tabular-nums"
        style={{ color: 'var(--w-text)' }}
      >
        {formatUsd(result.low)} {'\u2013'} {formatUsd(result.high)}
      </p>
      <p className="mt-2 text-[12px]" style={{ color: 'var(--w-text-sec)' }}>
        An estimate, not a quote. The jeweler will confirm the price.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onSend}
          className={`h-11 w-full sm:flex-1 px-5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 cursor-pointer ${widgetRing}`}
          style={{
            backgroundColor: 'var(--w-primary)',
            color: 'var(--w-primary-text)',
          }}
        >
          Send this to the jeweler
        </button>
        <button
          type="button"
          onClick={onChangeSomething}
          className={`h-11 w-full sm:flex-1 px-5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 cursor-pointer border ${widgetRing}`}
          style={{
            backgroundColor: 'var(--w-surface)',
            borderColor: 'var(--w-border)',
            color: 'var(--w-text)',
          }}
        >
          Change something
        </button>
      </div>
    </div>
  );
}