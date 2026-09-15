'use client';

import { useRef } from 'react';
import EstimatorDialog from './EstimatorDialog';
import { focusRing } from '../tokens';

export interface EstimatorChange {
  term: string;
  from: string;
  to: string;
}

function Fact({ change }: { change: EstimatorChange }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="text-[12px] text-[var(--text-sec)]">{change.term}</dt>
      <dd className="text-[13px] tabular-nums text-[var(--text)] text-right">
        {change.from} &rarr; <span className="font-semibold">{change.to}</span>
      </dd>
    </div>
  );
}

export default function SaveConfirmDialog({
  changes,
  submitting,
  failed,
  onCancel,
  onConfirm,
}: {
  changes: EstimatorChange[];
  submitting: boolean;
  failed: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);

  return (
    <EstimatorDialog labelledBy="save-confirm-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="save-confirm-title" className="text-[18px] font-semibold text-[var(--text)]">
        Save these changes to the estimator?
      </h2>
      <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text-sec)]">
        They move every future estimate on the platform. Estimates already produced are not altered.
      </p>

      <dl className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-2">
        {changes.map((change) => (
          <Fact key={change.term} change={change} />
        ))}
      </dl>

      {failed && (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--alert-strong)]"
        >
          The changes could not be saved. The estimator is unchanged and estimates are still produced as
          before.
        </p>
      )}

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Saving the estimator changes' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 ${focusRing}`}
        >
          Keep current values
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium text-[var(--alert)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--alert)]/10 disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[var(--surface)] ${focusRing}`}
        >
          {submitting ? 'Saving' : 'Save changes'}
        </button>
      </div>
    </EstimatorDialog>
  );
}