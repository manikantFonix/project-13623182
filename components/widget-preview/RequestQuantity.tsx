'use client';

import type { ChangeEvent } from 'react';
import { widgetRing } from './data';

export default function RequestQuantity({
  value,
  onChange,
  pieceLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  pieceLabel: string;
}) {
  const step = (delta: number) => {
    const n = parseInt(value, 10);
    const base = Number.isFinite(n) && n >= 1 ? n : 1;
    onChange(String(Math.max(1, base + delta)));
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace(/[^0-9]/g, ''));
  };

  const snap = () => {
    const n = parseInt(value, 10);
    if (!Number.isFinite(n) || n < 1) onChange('1');
  };

  return (
    <div>
      <p className="text-[13px] font-medium" style={{ color: 'var(--w-text)' }}>
        Quantity
      </p>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={`Decrease quantity of ${pieceLabel.toLowerCase()}`}
          className={`w-step-hit relative w-8 h-11 rounded-[12px] border border-[var(--w-border)] flex items-center justify-center cursor-pointer ${widgetRing}`}
          style={{ backgroundColor: 'var(--w-surface)', color: 'var(--w-text)' }}
        >
          <i className="ri-subtract-line text-[16px] w-4 h-4 flex items-center justify-center" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          name="quantity"
          value={value}
          onChange={onInput}
          onBlur={snap}
          aria-label={`Quantity of ${pieceLabel.toLowerCase()}`}
          className={`w-14 h-11 text-center rounded-[12px] border border-[var(--w-border)] text-[13px] tabular-nums outline-none ${widgetRing}`}
          style={{ backgroundColor: 'var(--w-surface)', color: 'var(--w-text)' }}
        />
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={`Increase quantity of ${pieceLabel.toLowerCase()}`}
          className={`w-step-hit relative w-8 h-11 rounded-[12px] border border-[var(--w-border)] flex items-center justify-center cursor-pointer ${widgetRing}`}
          style={{ backgroundColor: 'var(--w-surface)', color: 'var(--w-text)' }}
        >
          <i className="ri-add-line text-[16px] w-4 h-4 flex items-center justify-center" />
        </button>
      </div>
    </div>
  );
}