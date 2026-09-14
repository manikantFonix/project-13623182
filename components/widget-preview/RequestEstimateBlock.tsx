'use client';

import { formatUsd } from './estimate';
import type { EstimateResult } from './types';

export default function RequestEstimateBlock({
  result,
}: {
  result: EstimateResult;
}) {
  return (
    <div
      className="rounded-[12px] p-3"
      style={{ backgroundColor: 'var(--w-border)' }}
    >
      <p className="text-[12px]" style={{ color: 'var(--w-text-sec)' }}>
        Your estimate
      </p>
      <p
        className="mt-1 text-[15px] font-medium tabular-nums"
        style={{ color: 'var(--w-text)' }}
      >
        {formatUsd(result.low)} {'\u2013'} {formatUsd(result.high)}
      </p>
      <p className="mt-1 text-[12px]" style={{ color: 'var(--w-text-sec)' }}>
        An estimate, not a quote.
      </p>
    </div>
  );
}