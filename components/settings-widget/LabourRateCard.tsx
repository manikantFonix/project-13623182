'use client';

import { useState } from 'react';
import {
  focusRing,
  formatMoney,
  RATE_DEFAULT,
  RATE_EXAMPLE_DAYS,
  RATE_EXAMPLE_PIECE,
  type WidgetState,
} from './data';

function seedRate(state: WidgetState): number | null {
  switch (state) {
    case 'rateSet':
    case 'rateEditing':
    case 'rateUnsaved':
    case 'rateSaving':
    case 'rateSaveFailed':
    case 'rateInvalid':
      return 520;
    default:
      return null;
  }
}

function seedDraft(state: WidgetState, initial: number | null): string {
  if (state === 'rateUnsaved') return '640';
  if (state === 'rateInvalid') return '0';
  return initial !== null ? String(initial) : '';
}

export default function LabourRateCard({ state }: { state: WidgetState }) {
  const initial = seedRate(state);
  const [rate, setRate] = useState<number | null>(initial);
  const [draft, setDraft] = useState(() => seedDraft(state, initial));
  const [saving, setSaving] = useState(state === 'rateSaving');
  const [failed, setFailed] = useState(state === 'rateSaveFailed');
  const [failOnce, setFailOnce] = useState(state === 'rateSaveFailed');
  const [cleared, setCleared] = useState(state === 'rateCleared');
  const [announce, setAnnounce] = useState('');
  const [error, setError] = useState<string | null>(
    state === 'rateInvalid'
      ? 'A day rate must be more than zero. To stop using your own rate, clear it back to the default.'
      : null
  );

  const parsed = draft.trim() === '' ? NaN : Number(draft);
  const valid = Number.isFinite(parsed) && parsed > 0;
  const effective = valid ? parsed : rate ?? RATE_DEFAULT;
  const labour = effective * RATE_EXAMPLE_DAYS;
  const dirty = draft.trim() !== (rate !== null ? String(rate) : '');

  const refuse = () => {
    const message =
      draft.trim() === ''
        ? 'Enter a day rate. To stop using your own rate, clear it back to the default.'
        : 'A day rate must be more than zero. To stop using your own rate, clear it back to the default.';
    setError(message);
    setAnnounce('That rate cannot be saved. ' + message);
  };

  const onSave = () => {
    if (saving) return;
    if (!valid) {
      refuse();
      return;
    }
    setError(null);
    setFailed(false);
    setSaving(true);
    window.setTimeout(() => {
      if (failOnce) {
        setFailOnce(false);
        setSaving(false);
        setFailed(true);
        setAnnounce('The rate could not be saved.');
        return;
      }
      setRate(parsed);
      setDraft(String(parsed));
      setCleared(false);
      setSaving(false);
      setAnnounce(`Saved. New estimates will use ${formatMoney(parsed)} a day.`);
    }, 900);
  };

  const onClear = () => {
    if (saving) return;
    setError(null);
    setFailed(false);
    setRate(null);
    setDraft('');
    setCleared(true);
    setAnnounce(
      `Cleared. New estimates will use the platform default of ${formatMoney(RATE_DEFAULT)} a day.`
    );
  };

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <h3 className="text-[15px] font-medium text-[var(--text)]">Your bench rate</h3>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        What a day of your workshop&rsquo;s time costs.
      </p>

      <p className="mt-4 text-[13px] text-[var(--text)]">
        {rate !== null
          ? `In use: ${formatMoney(rate)} a day.`
          : `Until you set this, estimates use ${formatMoney(RATE_DEFAULT)} a day.`}
      </p>

      <div className="mt-4">
        <label htmlFor="bench-rate" className="text-[13px] font-medium text-[var(--text)]">
          Day rate (USD, per day)
        </label>
        <div className="mt-2 flex items-center gap-2 max-w-[280px]">
          <span className="text-[13px] text-[var(--text-sec)]">$</span>
          <input
            id="bench-rate"
            type="number"
            inputMode="decimal"
            min={0}
            step={10}
            value={draft}
            placeholder={String(RATE_DEFAULT)}
            disabled={saving}
            autoFocus={state === 'rateEditing'}
            aria-invalid={error ? true : undefined}
            aria-describedby="bench-rate-desc"
            onChange={(event) => {
              setDraft(event.target.value);
              setError(null);
              setFailed(false);
              setCleared(false);
            }}
            className={`h-10 w-full min-w-0 rounded-[12px] border bg-[var(--surface)] px-3 text-[13px] tabular-nums text-[var(--text)] placeholder:text-[var(--text-sec)] transition-colors duration-150 disabled:bg-[var(--muted)] disabled:text-[var(--border-strong)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${
              error ? 'border-[var(--alert)]' : 'border-[var(--border)]'
            }`}
          />
        </div>
        <p id="bench-rate-desc" className="mt-2 text-[12px] text-[var(--text-sec)]">
          Include your margin. This is what a day is worth to you, not what you pay.
        </p>
        {error && (
          <p role="alert" className="mt-2 text-[13px] text-[var(--alert)]">
            {error}
          </p>
        )}
      </div>

      <div className="mt-4 rounded-[12px] bg-[var(--muted)] px-4 py-3">
        <p className="text-[13px] text-[var(--text-sec)]">
          A {RATE_EXAMPLE_PIECE} takes about {RATE_EXAMPLE_DAYS} days.
        </p>
        <p className="mt-1 text-[13px] tabular-nums text-[var(--text)]">
          <span className="font-semibold">{formatMoney(labour)}</span> in labour
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {`At ${formatMoney(effective)} a day, a ${RATE_EXAMPLE_PIECE} taking ${RATE_EXAMPLE_DAYS} days comes to ${formatMoney(labour)} in labour.`}
      </p>

      <p className="mt-3 text-[12px] text-[var(--text-sec)]">
        Applies to new estimates. Ones already shown don&rsquo;t change.
      </p>

      {failed && (
        <p className="mt-3 text-[13px] text-[var(--alert)]">
          We couldn&rsquo;t save that. Your rate is unchanged — try again.
        </p>
      )}
      {cleared && !failed && (
        <p className="mt-3 text-[13px] text-[var(--text-sec)]">
          Cleared. Estimates will use the platform default.
        </p>
      )}

      <div className="mt-4 flex items-center justify-end gap-4">
        {rate !== null && (
          <button
            type="button"
            onClick={onClear}
            disabled={saving}
            className={`h-9 px-3 text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap disabled:opacity-50 ${focusRing}`}
          >
            Clear to default
          </button>
        )}
        {(dirty || saving || failed) && (
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className={`h-9 px-5 text-[13px] font-medium bg-[var(--accent)] text-[var(--on-accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${focusRing} ${
              saving ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <i className="ri-loader-4-line text-[16px] animate-spin motion-reduce:animate-none" aria-hidden="true" />
                Saving…
              </span>
            ) : (
              'Save changes'
            )}
          </button>
        )}
      </div>

      <div aria-live="polite" className="sr-only">
        {announce}
      </div>
    </section>
  );
}