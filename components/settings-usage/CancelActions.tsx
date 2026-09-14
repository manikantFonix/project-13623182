'use client';

import { focusRingVar } from '../settings/theme/tokens';

interface Props {
  continueLabel: string;
  onContinue: () => void;
  continueDisabled?: boolean;
  onKeep: () => void;
  submitting?: boolean;
}

export default function CancelActions({
  continueLabel,
  onContinue,
  continueDisabled,
  onKeep,
  submitting,
}: Props) {
  const disabled = continueDisabled || submitting;
  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className={`h-9 px-4 rounded-full bg-[var(--surface)] border border-[var(--alert)] text-[var(--alert)] text-[13px] font-medium hover:border-[var(--alert-strong)] hover:text-[var(--alert-strong)] transition-colors duration-150 motion-reduce:transition-none whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${focusRingVar}`}
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <i className="ri-loader-4-line text-[16px] animate-spin motion-reduce:animate-none" />
            Cancelling…
          </span>
        ) : (
          continueLabel
        )}
      </button>
      <button
        type="button"
        data-cancel-safe
        onClick={onKeep}
        disabled={submitting}
        className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium hover:bg-[var(--accent-hover)] transition-colors duration-150 motion-reduce:transition-none whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${focusRingVar}`}
      >
        Keep my plan
      </button>
    </div>
  );
}