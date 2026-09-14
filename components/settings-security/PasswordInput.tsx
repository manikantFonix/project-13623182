'use client';

import { useState } from 'react';
import { focusRingVar } from '../settings/theme/tokens';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
  error?: string;
  hint?: string;
}

export default function PasswordInput({ id, label, value, onChange, autoComplete, error, hint }: Props) {
  const [show, setShow] = useState(false);
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const border = error
    ? 'border-[var(--alert)] focus:border-[var(--alert)]'
    : 'border-[var(--border)] focus:border-[var(--accent)]';

  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-[var(--text)]">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-11 px-3 pr-11 rounded-[12px] border bg-[var(--surface)] text-[13px] text-[var(--text)] outline-none transition-colors duration-150 ${border}`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          title={show ? 'Hide password' : 'Show password'}
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 ${focusRingVar}`}
        >
          <i className={`${show ? 'ri-eye-off-line' : 'ri-eye-line'} text-[20px] w-5 h-5 flex items-center justify-center`} />
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} aria-live="polite" className="mt-1.5 text-[13px] text-[var(--alert)]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[12px] text-[var(--text-sec)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}