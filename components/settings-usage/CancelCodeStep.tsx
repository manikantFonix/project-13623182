'use client';

import { useState } from 'react';
import CancelTile from './CancelTile';
import CancelActions from './CancelActions';
import CancelCodeInput from './CancelCodeInput';
import { focusRingVar } from '../settings/theme/tokens';
import { cancelContext, type CodeError } from './cancelFlowData';

interface Props {
  initialError: CodeError;
  onContinue: () => void;
  onKeep: () => void;
}

export default function CancelCodeStep({ initialError, onContinue, onKeep }: Props) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<CodeError>(initialError);
  const complete = code.length === 6;

  return (
    <div aria-live="polite">
      <CancelTile icon="ri-lock-line" variant="muted" />
      <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
        Let's check it's you
      </h2>

      <div className="mt-4">
        <CancelCodeInput
          value={code}
          onChange={(v) => {
            setCode(v);
            setError(null);
          }}
          invalid={!!error}
        />
      </div>

      {error && (
        <p id="cancel-code-error" className="mt-2 text-[13px] text-[var(--alert)]">
          {error === 'expired'
            ? 'That code has expired.'
            : "That code isn't right. Check it and try again."}
        </p>
      )}

      <p className="mt-2 text-[13px] text-[var(--text-sec)]">
        We've sent a code to {cancelContext.email}.
      </p>
      <button
        type="button"
        onClick={() => {
          setCode('');
          setError(null);
        }}
        className={`mt-2 text-[13px] font-medium text-[var(--accent-text)] transition-colors duration-150 motion-reduce:transition-none whitespace-nowrap cursor-pointer ${focusRingVar}`}
      >
        Send a new code
      </button>

      {!complete && <p className="mt-3 text-[13px] text-[var(--text-sec)]">Enter the 6-digit code to continue.</p>}

      <CancelActions
        continueLabel="Continue"
        continueDisabled={!complete}
        onContinue={onContinue}
        onKeep={onKeep}
      />
    </div>
  );
}