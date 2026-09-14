'use client';

import { useEffect, useRef, useState } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';
import { todayPlusDays } from './promisedDate';
import type { MfrQuote } from './ManufacturerTab';

interface Props {
  open: boolean;
  manufacturerName: string;
  quote?: MfrQuote;
  otherCount: number;
  onConfirm: (date: string) => void;
  onClose: () => void;
}

export default function ApproveQuoteDialog({
  open,
  manufacturerName,
  quote,
  otherCount,
  onConfirm,
  onClose,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [date, setDate] = useState('');

  useDialogFocus(open, cardRef, cancelRef);

  useEffect(() => {
    if (!open) return;
    setDate(todayPlusDays(quote?.deliveryDays ?? 0));
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, quote?.deliveryDays]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="approve-mfr-title"
        className="relative w-full max-w-[480px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-7"
      >
        <h2 id="approve-mfr-title" className="text-[18px] font-semibold text-[var(--text)]">
          Approve {manufacturerName}&#39;s quote?
        </h2>
        <p className="mt-2 text-[13px] text-[var(--text)]">
          {quote
            ? `${'$' + quote.amount.toLocaleString('en-US')}${
                quote.deliveryDays !== undefined
                  ? `, ${quote.deliveryDays} days`
                  : ''
              }. Production starts with them.`
            : 'Production starts with them.'}
        </p>
        <p className="mt-1 text-[13px] text-[var(--text-sec)]">
          The other {otherCount}{' '}
          {otherCount === 1 ? 'manufacturer is' : 'manufacturers are'} closed out
          and their links stop working. Their quotes stay on the record.
        </p>

        <div className="mt-4">
          <label
            htmlFor="approve-expected"
            className="block text-[13px] font-medium text-[var(--text)]"
          >
            When can the customer expect it?
          </label>
          <input
            id="approve-expected"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full h-10 px-3 text-[13px] tabular-nums text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] focus:outline-none focus:border-[var(--accent)]"
          />
          {quote?.deliveryDays !== undefined && (
            <p className="mt-2 text-[12px] text-[var(--text-sec)]">
              {manufacturerName} quoted {quote.deliveryDays} days. Add whatever
              time you need on top — this is the date your customer sees, so it
              should be one you&#39;re happy to be held to.
            </p>
          )}
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              ref={cancelRef}
              onClick={onClose}
              className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] hover:text-[var(--accent-text)] transition-colors duration-150 whitespace-nowrap cursor-pointer ${FOCUS_RING}`}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!date}
              onClick={() => onConfirm(date)}
              className={`h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${FOCUS_RING}`}
            >
              Approve quote
            </button>
          </div>
          {!date && (
            <p className="mt-2 text-[13px] text-[var(--text-sec)] text-right">
              Set an expected date to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}