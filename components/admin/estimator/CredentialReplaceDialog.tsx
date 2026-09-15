'use client';

import { useRef, useState } from 'react';
import EstimatorDialog from './EstimatorDialog';
import { focusRing } from '../tokens';
import { fmtDate, maskKey, type PriceApi } from './data';

const labelClass = 'block text-[12px] font-semibold text-[var(--text)]';
const fieldClass = `mt-1.5 w-full h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 font-mono text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`;

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="text-[12px] text-[var(--text-sec)]">{term}</dt>
      <dd className="text-[13px] tabular-nums text-[var(--text)] text-right">{value}</dd>
    </div>
  );
}

export default function CredentialReplaceDialog({
  api,
  initialStep,
  seedValue,
  submitting,
  failed,
  onCancel,
  onConfirm,
}: {
  api: PriceApi;
  initialStep: 'enter' | 'confirm';
  seedValue: string;
  submitting: boolean;
  failed: boolean;
  onCancel: () => void;
  onConfirm: (tail: string) => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);
  const [step, setStep] = useState<'enter' | 'confirm'>(initialStep);
  const [value, setValue] = useState(seedValue);

  const trimmed = value.trim();
  const newTail = trimmed.length >= 4 ? trimmed.slice(-4) : '';

  if (step === 'enter') {
    return (
      <EstimatorDialog labelledBy="cred-title" onClose={onCancel} initialFocus={safeRef}>
        <h2 id="cred-title" className="text-[18px] font-semibold text-[var(--text)]">
          {api.keySet ? `Replace the ${api.label.toLowerCase()} key` : `Enter the ${api.label.toLowerCase()} key`}
        </h2>
        <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">{api.purpose}</p>

        <div className="mt-5">
          <label htmlFor="cred-value" className={labelClass}>
            New key (paste it here, it will not be shown again)
          </label>
          <input
            id="cred-value"
            type="password"
            autoComplete="off"
            spellCheck={false}
            value={value}
            disabled={submitting}
            onChange={(event) => setValue(event.target.value)}
            placeholder="api_..."
            className={fieldClass}
          />
          <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
            Only the last four characters are kept for identification.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            ref={safeRef}
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-50 ${focusRing}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setStep('confirm')}
            disabled={trimmed.length < 8}
            className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-default ${focusRing}`}
          >
            Continue
          </button>
        </div>
      </EstimatorDialog>
    );
  }

  return (
    <EstimatorDialog labelledBy="cred-confirm-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="cred-confirm-title" className="text-[18px] font-semibold text-[var(--text)]">
        Replace the {api.label.toLowerCase()} key?
      </h2>
      <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text-sec)]">
        Live prices stop being read until the new key is valid.
      </p>

      <dl className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-2">
        <Fact term="Key" value={api.keyLabel} />
        <Fact term="Currently" value={api.keySet ? maskKey(api) : 'Not set'} />
        {api.keySet && <Fact term="Entered" value={`${fmtDate(api.keyEnteredAt ?? '')} · ${api.keyEnteredBy}`} />}
        <Fact term="New tail" value={newTail ? `••••${newTail}` : '—'} />
      </dl>

      {failed && (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--alert-strong)]"
        >
          The key could not be saved. The existing key is unchanged and still in use.
        </p>
      )}

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Saving the key' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 ${focusRing}`}
        >
          {api.keySet ? 'Keep current key' : 'Cancel'}
        </button>
        <button
          type="button"
          onClick={() => onConfirm(newTail)}
          disabled={submitting || !newTail}
          className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium text-[var(--alert)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--alert)]/10 disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[var(--surface)] ${focusRing}`}
        >
          {submitting ? 'Saving' : 'Replace key'}
        </button>
      </div>
    </EstimatorDialog>
  );
}