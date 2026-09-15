'use client';

import { useRef } from 'react';
import AiSystemDialog from './AiSystemDialog';
import { focusRing } from '../tokens';
import { NOMINAL_TOKENS, mismatchMultiple, worstCaseTokens } from './data';

function Fact({ term, value, strong }: { term: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="text-[12px] text-[var(--text-sec)]">{term}</dt>
      <dd
        className={`tabular-nums text-right ${
          strong ? 'text-[15px] font-semibold text-[var(--text)]' : 'text-[13px] text-[var(--text)]'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

export default function RetryConfirmDialog({
  from,
  to,
  submitting,
  failed,
  onCancel,
  onConfirm,
}: {
  from: number;
  to: number;
  submitting: boolean;
  failed: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);
  const tokens = worstCaseTokens(to);
  const multiple = mismatchMultiple(to);

  return (
    <AiSystemDialog labelledBy="retry-confirm-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="retry-confirm-title" className="text-[18px] font-semibold text-[var(--text)]">
        Set the Retry Limit to {to}?
      </h2>
      <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text-sec)]">
        It takes effect on the next generation. Running jobs keep the version they started with.
      </p>

      <dl className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-2">
        <Fact term="Retry Limit" value={`${from} \u2192 ${to}`} />
        <Fact term="Worst case per product" value={`${tokens} tokens`} strong />
        <Fact term="Against nominal" value={`${multiple}\u00D7 the ${NOMINAL_TOKENS}-token nominal`} />
      </dl>

      <p className="mt-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
        A product that generates cleanly still costs {NOMINAL_TOKENS} tokens. The worst case applies
        only when every view needs repairing.
      </p>

      {failed && (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--alert-strong)]"
        >
          The Retry Limit could not be saved. It remains at {from} and generation is unchanged.
        </p>
      )}

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Saving the Retry Limit' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 ${focusRing}`}
        >
          Keep {from}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium text-[var(--alert)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--alert)]/10 disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[var(--surface)] ${focusRing}`}
        >
          {submitting ? 'Saving' : `Set to ${to}`}
        </button>
      </div>
    </AiSystemDialog>
  );
}