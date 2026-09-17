'use client';

import { useRef } from 'react';
import SubsDialog from './SubsDialog';
import SubsPill from './SubsPill';
import { focusRing } from '../tokens';
import { cycleLabel, fmtInt, statusLabel, statusTone, type SubView } from './data';

function Fact({ term, value, alert }: { term: string; value: string; alert?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <dt className="text-[12px] text-[var(--text-sec)]">{term}</dt>
      <dd
        className={`text-right text-[13px] font-medium tabular-nums ${
          alert ? 'text-[var(--alert-strong)]' : 'text-[var(--text)]'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

export default function SubsViewDialog({
  row,
  onClose,
}: {
  row: SubView;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <SubsDialog labelledBy="subs-view-title" onClose={onClose} initialFocus={closeRef}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 id="subs-view-title" className="text-[18px] font-semibold text-[var(--text)]">
            {row.name}
          </h2>
          <p className="mt-1 text-[13px] break-all text-[var(--text-sec)]">{row.email}</p>
        </div>
        <SubsPill tone={statusTone[row.status]}>{statusLabel[row.status]}</SubsPill>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex h-6 items-center rounded-full bg-[var(--muted)] px-2.5 text-[12px] font-medium text-[var(--text-sec)]">
          {row.planName}
        </span>
        <span className="inline-flex h-6 items-center rounded-full bg-[var(--muted)] px-2.5 text-[12px] font-medium text-[var(--text-sec)]">
          {cycleLabel(row.cycle)} billing
        </span>
        {row.atZero && <SubsPill tone="alert">At zero renders</SubsPill>}
        {!row.atZero && row.burningFast && <SubsPill tone="alert">Burning fast</SubsPill>}
      </div>

      <dl className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-2">
        <Fact term="Retailer ID" value={row.id} />
        <Fact term="Plan" value={row.planName} />
        <Fact term="Billing cycle" value={cycleLabel(row.cycle)} />
        <Fact
          term="Days left in period"
          value={
            row.daysLeft === null
              ? 'No period yet'
              : row.status === 'expired'
                ? 'Period ended'
                : `${fmtInt(row.daysLeft)} days`
          }
        />
        <Fact
          term={row.nextBillingLabel || 'Next billing'}
          value={row.nextBillingOn ?? 'Not scheduled'}
        />
        <Fact term="Period ends" value={row.endsOn ?? 'Not scheduled'} />
      </dl>

      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-sec)]">
        Usage
      </p>
      <dl className="mt-2 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
        <Fact
          term="Included usage"
          value={
            row.used === null
              ? 'Not started'
              : `${fmtInt(row.used)} of ${fmtInt(row.allowance)}`
          }
        />
        <Fact
          term="Included renders left"
          value={row.includedLeft === null ? '—' : fmtInt(row.includedLeft)}
          alert={row.includedLeft !== null && row.includedLeft <= 0}
        />
        <Fact
          term="Period elapsed"
          value={row.elapsedShare === null ? '—' : `${row.elapsedShare}%`}
        />
        {row.topUpTotal > 0 && (
          <Fact
            term="Top-up used"
            value={`${fmtInt(row.topUpUsed)} of ${fmtInt(row.topUpTotal)}`}
            alert={row.onTopUp}
          />
        )}
        <Fact term="Top-up balance" value={fmtInt(row.topUp)} />
        <Fact
          term="Renders consumed"
          value={row.consumed === null ? 'No usage yet' : fmtInt(row.consumed)}
        />
      </dl>

      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-sec)]">
        Payment method
      </p>
      <div className="mt-2 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-4">
        {row.paymentLast4 ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]">
                <i className="ri-bank-card-line text-[20px]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">
                  {row.paymentBrand} •••• •••• •••• {row.paymentLast4}
                </p>
                <p className="mt-0.5 text-[12px] text-[var(--text-sec)]">
                  Expires {row.paymentExpiry}
                </p>
              </div>
            </div>
            <span className="inline-flex h-6 items-center rounded-full bg-[var(--success-bg)] px-2.5 text-[12px] font-medium text-[var(--success)]">
              Default
            </span>
          </div>
        ) : (
          <p className="text-[13px] text-[var(--text-sec)]">
            No payment method on file yet. It will be added when a plan is chosen.
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium whitespace-nowrap text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
        >
          Close
        </button>
      </div>
    </SubsDialog>
  );
}