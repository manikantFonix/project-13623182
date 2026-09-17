'use client';

import { useEffect, useRef, useState } from 'react';
import RetailerDialog from './RetailerDialog';
import { focusRing } from '../tokens';

export default function DisableDialog({
  name,
  catalogCount,
  widgetOrigin,
  submitting,
  onCancel,
  onConfirm,
}: {
  name: string;
  catalogCount: number;
  widgetOrigin: string | null;
  submitting: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState('');
  const safeRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trimmed = reason.trim();
  const blocked = trimmed.length === 0;
  const hintId = 'disable-reason-status';

  useEffect(() => {
    if (submitting) titleRef.current?.focus();
  }, [submitting]);

  return (
    <RetailerDialog labelledBy="disable-title" onClose={onCancel} initialFocus={safeRef}>
      <h2
        id="disable-title"
        ref={titleRef}
        tabIndex={-1}
        className="text-[18px] font-semibold text-[var(--text)] focus:outline-none"
      >
        Mark {name} as inactive?
      </h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-sec)]">
        Everything they have published goes offline in front of their own customers.
      </p>

      <ul className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] p-4 flex flex-col gap-2.5">
        <li className="flex items-start gap-2.5">
          <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
            <i className="ri-link-unlink text-[15px]" aria-hidden="true" />
          </span>
          <span className="text-[13px] leading-relaxed text-[var(--text-sec)]">
            {catalogCount === 0
              ? 'No published catalogs to take offline.'
              : `${catalogCount} published catalogs go offline. Share links stop working.`}
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
            <i className="ri-layout-right-2-line text-[15px]" aria-hidden="true" />
          </span>
          <span className="text-[13px] leading-relaxed text-[var(--text-sec)]">
            {widgetOrigin
              ? `A widget is live on ${widgetOrigin}. It stops generating.`
              : 'No widget is installed on their site.'}
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
            <i className="ri-archive-2-line text-[15px]" aria-hidden="true" />
          </span>
          <span className="text-[13px] leading-relaxed text-[var(--text-sec)]">
            Nothing is deleted. Designs, products, customers and leads all stay.
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
            <i className="ri-record-circle-line text-[15px]" aria-hidden="true" />
          </span>
          <span className="text-[13px] leading-relaxed text-[var(--text-sec)]">
            A reason is required and is recorded against your administrator account.
          </span>
        </li>
      </ul>

      <div className="mt-5">
        <label htmlFor="disable-reason" className="block text-[12px] font-semibold text-[var(--text)]">
          Reason <span className="font-medium text-[var(--text-sec)]">(required)</span>
        </label>
        <textarea
          id="disable-reason"
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
            ? 'Marking as inactive is unavailable until a reason is given.'
            : 'Recorded against your administrator account.'}
        </p>
      </div>

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Marking this account as inactive' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-default ${focusRing}`}
        >
          Keep account running
        </button>
        <button
          type="button"
          onClick={() => onConfirm(trimmed)}
          disabled={blocked || submitting}
          aria-label={blocked ? 'Mark as inactive — add a reason first' : 'Mark as inactive'}
          aria-describedby={blocked ? hintId : undefined}
          className={`h-9 px-4 rounded-full border bg-[var(--surface)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
            blocked || submitting
              ? 'border-[var(--border-strong)] text-[var(--muted-text)] cursor-default'
              : 'border-[var(--alert)] text-[var(--alert)] hover:bg-[var(--alert)]/10'
          }`}
        >
          Mark as inactive
        </button>
      </div>
    </RetailerDialog>
  );
}