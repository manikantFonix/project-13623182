'use client';

import { useRef, useState } from 'react';
import PlansDialog from './PlansDialog';
import { focusRing } from '../tokens';
import { fmtInt, fmtMoney, perRender, type TopUp } from './data';

const fieldClass = `w-full h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-[13px] tabular-nums text-[var(--text)] transition-colors duration-150 ${focusRing}`;

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
  onConfirm: (size: number, price: number) => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);
  const [size, setSize] = useState(String(pack.size));
  const [price, setPrice] = useState(String(pack.price));

  const sizeValue = Number(size);
  const priceValue = Number(price);
  const sizeValid = Number.isFinite(sizeValue) && Number.isInteger(sizeValue) && sizeValue > 0;
  const priceValid = Number.isFinite(priceValue) && priceValue > 0;
  const valid = sizeValid && priceValid;
  const next = valid
    ? perRender({ ...pack, size: sizeValue, price: priceValue })
    : perRender(pack);

  return (
    <PlansDialog labelledBy="topup-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="topup-title" className="text-[18px] font-semibold text-[var(--text)]">
        Edit the {fmtInt(pack.size)}-render pack
      </h2>
      <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
        Change the renders in the pack and the price charged for it.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <div>
          <label htmlFor="topup-size" className="block text-[12px] font-semibold text-[var(--text)]">
            Pack size (renders)
          </label>
          <input
            id="topup-size"
            type="number"
            min="1"
            step="1"
            value={size}
            onChange={(event) => setSize(event.target.value)}
            disabled={submitting}
            className={`mt-1.5 ${fieldClass}`}
          />
          <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
            {sizeValid ? `${fmtInt(sizeValue)} renders in this pack.` : 'Enter a whole number of renders above zero.'}
          </p>
        </div>

        <div>
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
            className={`mt-1.5 ${fieldClass}`}
          />
          <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
            {valid ? `That is ${next} per render.` : 'Enter a price above zero.'}
          </p>
        </div>
      </div>

      {failed && (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--alert-strong)]"
        >
          The pack could not be saved. Nothing changed. Try again.
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
          onClick={() => onConfirm(sizeValue, priceValue)}
          disabled={!valid || submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-default ${focusRing}`}
        >
          {submitting ? 'Saving' : 'Save pack'}
        </button>
      </div>
    </PlansDialog>
  );
}