'use client';

import { useRef, useState } from 'react';
import RetailerDialog from './RetailerDialog';
import { focusRing } from '../tokens';

export default function CreateRetailerDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [issued, setIssued] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  const valid = name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const submit = () => {
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIssued(true);
    }, 800);
  };

  if (issued) {
    return (
      <RetailerDialog labelledBy="create-retailer-title" onClose={onClose}>
        <span className="w-9 h-9 rounded-full bg-[var(--success-bg)] flex items-center justify-center text-[var(--success)]">
          <i className="ri-mail-check-line text-[20px]" aria-hidden="true" />
        </span>
        <h2 id="create-retailer-title" className="mt-4 text-[18px] font-semibold text-[var(--text)]">
          Credential issued
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-sec)]">
          Sent to {email.trim()}. They set their own password from the email.
        </p>
        <div className="mt-6 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
          >
            Done
          </button>
        </div>
      </RetailerDialog>
    );
  }

  return (
    <RetailerDialog labelledBy="create-retailer-title" onClose={onClose} initialFocus={firstRef}>
      <h2 id="create-retailer-title" className="text-[18px] font-semibold text-[var(--text)]">
        Create a retailer account
      </h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-sec)]">
        A sign-in credential is emailed to them. They choose their own password.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <div>
          <label htmlFor="create-name" className="block text-[12px] font-semibold text-[var(--text)]">
            Business name
          </label>
          <input
            id="create-name"
            ref={firstRef}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={submitting}
            placeholder="Aurora & Co"
            className={`mt-2 h-9 w-full rounded-full border border-[var(--border)] bg-[var(--muted)] px-4 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
          />
        </div>
        <div>
          <label htmlFor="create-email" className="block text-[12px] font-semibold text-[var(--text)]">
            Email
          </label>
          <input
            id="create-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={submitting}
            placeholder="studio@example.com"
            className={`mt-2 h-9 w-full rounded-full border border-[var(--border)] bg-[var(--muted)] px-4 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
          />
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Issuing the credential' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-default ${focusRing}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={!valid || submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-default ${focusRing}`}
        >
          {submitting ? 'Creating…' : 'Create account'}
        </button>
      </div>
    </RetailerDialog>
  );
}