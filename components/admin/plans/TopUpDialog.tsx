'use client';

import { useRef, useState } from 'react';
import PlansDialog from './PlansDialog';
import { focusRing } from '../tokens';
import { fmtMoney, perRender, type TopUp } from './data';

export default function TopUpDialog({
  pack,
  submitting,
  failed,
  onCancel,
  onConfirm,
}: {
  pack: TopUp;
  submitting: boolean;
  failed: boolean;
  onCancel: () => void;
  onConfirm: (price: number) => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);
  const [price, setPrice] = useState(String(pack.price));
  const parsed = Number(price);
  const valid = Number.isFinite(parsed) && parsed > 0;
  const next = valid ? perRender({ ...pack, price: parsed }) : perRender(pack);

  return (
    <PlansDialog labelledBy="topup-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="topup-title" className="text-[18px] font-semibold text-[var(--text)]">
        Edit the {pack.size}-render price
      </h2>
      <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
        The pack size is fixed and cannot be changed here.
      </p>

      <div className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-3">
        <dl className="flex items-center justify-between text-[12px] text-[var(--text-sec)]">
          <dt>Pack size</dt>
          <dd className="tabular-nums text-[var(--text)]">{pack.size} renders</dd>
        </dl>
      </div>

      <div className="mt-5">
        <label htmlFor="topup-price" className="block text-[12px] font-semibold text-[var(--text)]">
          Price (USD, per pack)
        </label>
        <input
          id="topup-price"
          type="number"
          min="0.01"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          disabled={submitting}
          className={`mt-1.5 w-full h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-[13px] tabular-nums text-[var(--text)] transition-colors duration-150 ${focusRing}`}
        />
        <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
          {valid ? `That is ${next} per render.` : 'Enter a price above zero.'}
        </p>
      </div>

      {failed && (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--alert-strong)]"
        >
          The price could not be saved. Nothing changed. Try again.
        </p>
      )}

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-50 ${focusRing}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(parsed)}
          disabled={!valid || submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-default ${focusRing}`}
        >
          {submitting ? 'Saving' : `Save ${fmtMoney(valid ? parsed : pack.price)}`}
        </button>
      </div>
    </PlansDialog>
  );
}