'use client';

import { useRef, useState } from 'react';
import InvoicesDialog from './InvoicesDialog';
import { focusRing } from '../tokens';
import {
  KIND_LABELS,
  STATUS_LABELS,
  fmtDate,
  fmtInt,
  fmtMoney,
  remainingRefundable,
  type Invoice,
} from './data';

const labelClass = 'block text-[12px] font-semibold text-[var(--text)]';
const fieldClass = `mt-1.5 w-full rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-3 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`;

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <dt className="text-[12px] text-[var(--text-sec)]">{term}</dt>
      <dd className="text-[13px] tabular-nums text-[var(--text)]">{value}</dd>
    </div>
  );
}

export default function RefundDialog({
  invoice,
  submitting,
  failed,
  defaultReason,
  onCancel,
  onConfirm,
}: {
  invoice: Invoice;
  submitting: boolean;
  failed: boolean;
  defaultReason?: string;
  onCancel: () => void;
  onConfirm: (values: { amount: number; reason: string }) => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);
  const max = remainingRefundable(invoice);
  const [mode, setMode] = useState<'full' | 'partial'>('full');
  const [amount, setAmount] = useState(String(max));
  const [reason, setReason] = useState(defaultReason ?? '');

  const parsed = Number(amount);
  const amountValid = mode === 'full' || (Number.isFinite(parsed) && parsed > 0 && parsed <= max);
  const reasonValid = reason.trim().length > 0;
  const refundAmount = mode === 'full' ? max : amountValid ? parsed : 0;

  const blockReason = !reasonValid
    ? 'Add a reason to record against this refund.'
    : !amountValid
      ? 'Enter an amount between $0.01 and the refundable maximum.'
      : '';

  return (
    <InvoicesDialog labelledBy="refund-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="refund-title" className="text-[18px] font-semibold text-[var(--text)]">
        Refund {invoice.reference}?
      </h2>
      <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
        Through the payment provider. A reason is recorded with the refund.
      </p>

      <dl className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-2">
        <Fact term="Retailer" value={invoice.retailer} />
        <Fact term="For" value={`${invoice.description} · ${KIND_LABELS[invoice.kind]}`} />
        <Fact term="Invoice total" value={fmtMoney(invoice.amount)} />
        <Fact term="Issued" value={fmtDate(invoice.date)} />
        <Fact term="Status" value={STATUS_LABELS[invoice.status]} />
        {max < invoice.amount && <Fact term="Still refundable" value={fmtMoney(max)} />}
      </dl>

      <div
        className={`mt-4 rounded-[12px] border px-4 py-3.5 ${
          invoice.kind === 'topup'
            ? 'border-[var(--alert)] bg-[var(--amber-bg)]'
            : 'border-[var(--border)] bg-[var(--surface)]'
        }`}
      >
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--alert-strong)]">
            <i className="ri-information-line text-[16px]" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold text-[var(--text)]">
              Renders already spent are not returned. Their balance does not change.
            </p>
            <p className="text-[12px] leading-relaxed text-[var(--text-sec)]">
              {invoice.kind === 'topup'
                ? `This top-up covered ${fmtInt(invoice.renders.total)} renders. ${fmtInt(
                    invoice.renders.consumed
                  )} have already been used and stay with the retailer.`
                : `${fmtInt(invoice.renders.consumed)} renders from this invoice have already been used and stay with the retailer.`}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <span className={labelClass}>Refund amount</span>
        <div className="mt-1.5 flex gap-1 p-1 rounded-full bg-[var(--muted)]">
          {([
            { value: 'full', label: 'Full amount' },
            { value: 'partial', label: 'Partial amount' },
          ] as const).map((option) => {
            const active = mode === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                disabled={submitting}
                onClick={() => {
                  setMode(option.value);
                  setAmount(option.value === 'full' ? String(max) : '');
                }}
                className={`flex-1 h-7 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                  active
                    ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                    : 'text-[var(--text-sec)] hover:text-[var(--text)]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {mode === 'partial' && (
        <div className="mt-4">
          <label htmlFor="refund-amount" className={labelClass}>
            Amount to refund (USD, maximum {fmtMoney(max)})
          </label>
          <input
            id="refund-amount"
            type="number"
            min="0.01"
            max={max}
            step="0.01"
            value={amount}
            disabled={submitting}
            aria-describedby="refund-amount-hint"
            onChange={(event) => setAmount(event.target.value)}
            className={`${fieldClass} h-9 tabular-nums`}
          />
          <p id="refund-amount-hint" className="mt-1.5 text-[12px] text-[var(--text-sec)]">
            {amountValid
              ? `${fmtMoney(parsed)} of ${fmtMoney(max)} refundable.`
              : `Enter an amount up to ${fmtMoney(max)}.`}
          </p>
        </div>
      )}

      <div className="mt-4">
        <label htmlFor="refund-reason" className={labelClass}>
          Reason (required, recorded with the refund)
        </label>
        <textarea
          id="refund-reason"
          rows={3}
          maxLength={500}
          value={reason}
          disabled={submitting}
          onChange={(event) => setReason(event.target.value)}
          placeholder="e.g. Duplicate charge on a settled billing period."
          className={`${fieldClass} py-2 leading-relaxed resize-none`}
        />
        <p className="mt-1.5 text-[12px] text-[var(--text-sec)] tabular-nums">
          {reason.length} of 500 characters
        </p>
      </div>

      {failed && (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--alert-strong)]"
        >
          The provider declined the refund. The invoice is unchanged. Nothing was refunded.
        </p>
      )}

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Submitting the refund' : ''}
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-center justify-end gap-3">
          <button
            ref={safeRef}
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 ${focusRing}`}
          >
            Keep invoice as is
          </button>
          <button
            type="button"
            onClick={() =>
              onConfirm({ amount: refundAmount, reason: reason.trim() })
            }
            disabled={!reasonValid || !amountValid || submitting}
            aria-disabled={!reasonValid || !amountValid || submitting}
            title={blockReason || undefined}
            className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium text-[var(--alert)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--alert)]/10 disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[var(--surface)] ${focusRing}`}
          >
            {submitting
              ? 'Issuing refund'
              : `Refund ${fmtMoney(refundAmount)}`}
          </button>
        </div>
        <p className="text-right text-[12px] text-[var(--text-sec)]">
          {submitting
            ? 'Sending the refund to the provider.'
            : blockReason || 'The refund returns money only.'}
        </p>
      </div>
    </InvoicesDialog>
  );
}