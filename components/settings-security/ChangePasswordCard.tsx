'use client';

import { useState } from 'react';
import PasswordInput from './PasswordInput';
import CardError from './CardError';
import { focusRingVar } from '../settings/theme/tokens';
import type { SecurityPreview } from './data';

type Status = 'idle' | 'updating' | 'updated' | 'failed';

const seedFor = (preview: SecurityPreview) => {
  switch (preview) {
    case 'partial':
      return { current: 'luxebrand', next: 'workbench', confirm: 'workbench' };
    case 'mismatch':
      return { current: 'luxebrand', next: 'workbench1', confirm: 'workbench2' };
    case 'short':
      return { current: 'luxebrand', next: 'abcde', confirm: 'abcde' };
    case 'wrongCurrent':
      return { current: 'wrongcurrent', next: 'workbench1', confirm: 'workbench1' };
    default:
      return { current: '', next: '', confirm: '' };
  }
};

export default function ChangePasswordCard({
  preview,
  onPasswordUpdated,
  announce,
  error,
}: {
  preview: SecurityPreview;
  onPasswordUpdated: () => void;
  announce: (t: string) => void;
  error: boolean;
}) {
  const seed = seedFor(preview);
  const [current, setCurrent] = useState(seed.current);
  const [next, setNext] = useState(seed.next);
  const [confirm, setConfirm] = useState(seed.confirm);
  const [status, setStatus] = useState<Status>(
    preview === 'updating' ? 'updating' : preview === 'updated' ? 'updated' : preview === 'updateFailed' ? 'failed' : 'idle'
  );
  const [wrongCurrent, setWrongCurrent] = useState(preview === 'wrongCurrent');
  const [failedMsg, setFailedMsg] = useState(preview === 'updateFailed');

  const disabledReason = (() => {
    if (!current) return 'Enter your current password to continue.';
    if (next.length < 8) return 'Enter a new password of at least 8 characters.';
    if (next !== confirm) return "The two new passwords don't match.";
    return '';
  })();
  const disabled = disabledReason !== '' || status === 'updating';

  const submit = () => {
    setWrongCurrent(false);
    setFailedMsg(false);
    if (preview === 'wrongCurrent') {
      setWrongCurrent(true);
      return;
    }
    if (preview === 'updateFailed') {
      setFailedMsg(true);
      return;
    }
    setStatus('updating');
    window.setTimeout(() => {
      setStatus('updated');
      setCurrent('');
      setNext('');
      setConfirm('');
      onPasswordUpdated();
      announce('Password updated. Other devices have been signed out.');
    }, 700);
  };

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[12px] bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
          <i className="ri-lock-line text-[20px] w-5 h-5 flex items-center justify-center" />
        </div>
        <div>
          <h3 className="text-[15px] font-medium text-[var(--text)]">Change password</h3>
          <p className="text-[13px] text-[var(--text-sec)]">Use a password you don't use anywhere else.</p>
        </div>
      </div>

      {error ? (
        <CardError />
      ) : (
        <>
          <div className="mt-5 space-y-5">
            <PasswordInput
              id="sec-current"
              label="Current password"
              value={current}
              onChange={setCurrent}
              autoComplete="current-password"
              error={wrongCurrent ? "That current password isn't right." : undefined}
            />
            <PasswordInput
              id="sec-new"
              label="New password"
              value={next}
              onChange={setNext}
              autoComplete="new-password"
              hint="At least 8 characters."
            />
            <PasswordInput
              id="sec-confirm"
              label="Confirm new password"
              value={confirm}
              onChange={setConfirm}
              autoComplete="new-password"
            />
          </div>

          <div className="mt-5 bg-[var(--muted)] rounded-[12px] p-3">
            <p className="text-[13px] text-[var(--text-sec)]">
              Changing your password signs you out everywhere else. You'll need to sign in again on your other devices.
            </p>
          </div>

          {failedMsg && (
            <p className="mt-3 text-[13px] text-[var(--alert)]" aria-live="polite">
              We couldn't update your password. Nothing has changed — try again.
            </p>
          )}

          <div className="mt-5 flex flex-col items-end gap-2">
            <button
              type="button"
              disabled={disabled}
              onClick={submit}
              className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none ${focusRingVar}`}
            >
              {status === 'updating' && (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[var(--on-accent)] border-t-transparent animate-spin" />
              )}
              {status === 'updating' ? 'Updating…' : 'Update password'}
            </button>
            {disabled && !(status === 'updating') && disabledReason && (
              <p className="text-[13px] text-[var(--text-sec)]">{disabledReason}</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}