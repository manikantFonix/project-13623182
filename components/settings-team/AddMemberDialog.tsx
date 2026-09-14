'use client';

import { useState } from 'react';
import DialogModal from '../settings-widget/DialogModal';
import { focusRingVar } from '../settings/theme/tokens';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, email: string) => void;
  initialName?: string;
  initialEmail?: string;
  forceError?: boolean;
}

export default function AddMemberDialog({
  open,
  onClose,
  onAdd,
  initialName = '',
  initialEmail = '',
  forceError,
}: Props) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState(forceError ? 'Enter a valid email address.' : null);

  const canSend = name.trim() !== '' && email.trim() !== '';

  const send = () => {
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError(null);
    onAdd(name, email);
  };

  return (
    <DialogModal open={open} onClose={onClose} width={480}>
      <h3 className="text-[20px] font-semibold text-[var(--text)]">
        Add someone to your team
      </h3>
      <div className="mt-4 space-y-3">
        <div>
          <label
            htmlFor="team-name"
            className="block text-[13px] font-medium text-[var(--text)] mb-1"
          >
            Name
          </label>
          <input
            id="team-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`h-10 w-full rounded-[12px] border px-3 text-[13px] text-[var(--text)] placeholder:text-[var(--text-sec)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] ${
              error ? 'border-[var(--alert)]' : 'border-[var(--border)]'
            }`}
          />
        </div>
        <div>
          <label
            htmlFor="team-email"
            className="block text-[13px] font-medium text-[var(--text)] mb-1"
          >
            Email address
          </label>
          <input
            id="team-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            className={`h-10 w-full rounded-[12px] border px-3 text-[13px] text-[var(--text)] placeholder:text-[var(--text-sec)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] ${
              error ? 'border-[var(--alert)]' : 'border-[var(--border)]'
            }`}
          />
          {error && (
            <p className="mt-1 text-[13px] text-[var(--alert)]">{error}</p>
          )}
        </div>
      </div>
      <p className="mt-3 text-[13px] text-[var(--text-sec)]">
        They'll get an email to set up their sign-in. Everyone on the account can
        do everything — there aren't separate permission levels.
      </p>
      <div className="mt-5 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] hover:text-[var(--text-sec)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={send}
          disabled={!canSend}
          className={`h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap disabled:text-[var(--border-strong)] disabled:bg-[var(--muted)] disabled:border-[var(--border)] ${focusRingVar}`}
        >
          Send invite
        </button>
      </div>
      {!canSend && (
        <p className="mt-2 text-[13px] text-[var(--text-sec)] text-right">
          Add a name and an email to continue.
        </p>
      )}
    </DialogModal>
  );
}