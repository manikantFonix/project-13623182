'use client';

import { useState } from 'react';
import CancelTile from './CancelTile';
import CancelActions from './CancelActions';
import { cancelReasons } from './cancelFlowData';
import { focusRingVar } from '../settings/theme/tokens';

interface Props {
  initialOther: boolean;
  onContinue: () => void;
  onKeep: () => void;
}

export default function CancelReasonStep({ initialOther, onContinue, onKeep }: Props) {
  const [reason, setReason] = useState<string | null>(initialOther ? 'Something else' : null);
  const [note, setNote] = useState('');

  return (
    <div aria-live="polite">
      <CancelTile icon="ri-message-2-line" variant="muted" />
      <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
        Anything you'd like to tell us?
      </h2>
      <p className="mt-2 text-[13px] text-[var(--text-sec)]">
        Optional — it helps us, but you can skip it.
      </p>

      <div role="radiogroup" aria-label="Reason for cancelling" className="mt-4 space-y-2.5">
        {cancelReasons.map((r) => {
          const selected = reason === r;
          return (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setReason(r)}
              className={`w-full flex items-center justify-between gap-3 text-left rounded-[12px] transition-colors duration-150 motion-reduce:transition-none cursor-pointer ${focusRingVar} ${
                selected
                  ? 'border-2 border-[var(--accent)] p-[15px]'
                  : 'border border-[var(--border)] p-4'
              }`}
            >
              <span className="text-[13px] text-[var(--text)]">{r}</span>
              <span
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  selected ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-[var(--border-strong)] text-transparent'
                }`}
              >
                <i className="ri-check-line text-[14px]" />
              </span>
            </button>
          );
        })}
      </div>

      {reason === 'Something else' && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 500))}
          rows={3}
          maxLength={500}
          placeholder="In your own words, if you like."
          className={`mt-3 w-full rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-3 text-[13px] text-[var(--text)] placeholder:text-[var(--text-sec)] resize-none ${focusRingVar}`}
        />
      )}

      <CancelActions continueLabel="Continue" onContinue={onContinue} onKeep={onKeep} />
    </div>
  );
}