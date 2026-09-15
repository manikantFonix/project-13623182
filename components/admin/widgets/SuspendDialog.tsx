'use client';

import { useEffect, useRef, useState } from 'react';
import WidgetsDialog from './WidgetsDialog';
import { focusRing } from '../tokens';

const points = [
  {
    icon: 'ri-close-circle-line',
    text: 'The widget disappears from their site immediately, in front of their own customers.',
  },
  {
    icon: 'ri-forbid-2-line',
    text: 'Every request from this origin is refused. Nothing renders for a visitor.',
  },
  {
    icon: 'ri-notification-off-line',
    text: 'The retailer is not told. Their Widget settings page will read “Suspended”.',
  },
  {
    icon: 'ri-arrow-go-back-line',
    text: 'Reinstating is done from this same screen, whenever you decide to.',
  },
];

export default function SuspendDialog({
  origin,
  retailer,
  submitting,
  onCancel,
  onConfirm,
}: {
  origin: string;
  retailer: string;
  submitting: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState('');
  const safeRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trimmed = reason.trim();
  const blocked = trimmed.length === 0;
  const hintId = 'suspend-reason-status';

  useEffect(() => {
    if (submitting) titleRef.current?.focus();
  }, [submitting]);

  return (
    <WidgetsDialog labelledBy="suspend-title" onClose={onCancel} initialFocus={safeRef}>
      <h2
        id="suspend-title"
        ref={titleRef}
        tabIndex={-1}
        className="text-[18px] font-semibold text-[var(--text)] focus:outline-none"
      >
        Suspend the widget on {origin}?
      </h2>
      <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
        The installation for {retailer}. Suspending is not a soft action.
      </p>

      <ul className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] p-4 flex flex-col gap-2.5">
        {points.map((point) => (
          <li key={point.icon} className="flex items-start gap-2.5">
            <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
              <i className={`${point.icon} text-[15px]`} aria-hidden="true" />
            </span>
            <span className="text-[13px] leading-relaxed text-[var(--text-sec)]">{point.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <label htmlFor="suspend-reason" className="block text-[12px] font-semibold text-[var(--text)]">
          Reason <span className="font-medium text-[var(--text-sec)]">(required)</span>
        </label>
        <textarea
          id="suspend-reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          disabled={submitting}
          rows={3}
          maxLength={500}
          aria-describedby={hintId}
          className={`mt-2 w-full rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-3 py-2.5 text-[13px] leading-relaxed text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`}
        />
        <p id={hintId} className="mt-1.5 text-[12px] leading-relaxed text-[var(--text-sec)]">
          {blocked
            ? 'A reason is required. It is recorded against your account.'
            : 'Recorded against your administrator account.'}
        </p>
      </div>

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Suspending this installation' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-default ${focusRing}`}
        >
          Keep it running
        </button>
        <button
          type="button"
          onClick={() => onConfirm(trimmed)}
          disabled={blocked || submitting}
          aria-label={
            blocked
              ? 'Suspend installation — add a reason to enable suspending'
              : 'Suspend installation'
          }
          aria-describedby={blocked ? hintId : undefined}
          className={`h-9 px-4 rounded-full border bg-[var(--surface)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
            blocked || submitting
              ? 'border-[var(--border-strong)] text-[var(--muted-text)] cursor-default'
              : 'border-[var(--alert)] text-[var(--alert)] hover:bg-[var(--alert)]/10'
          }`}
        >
          Suspend installation
        </button>
      </div>
    </WidgetsDialog>
  );
}