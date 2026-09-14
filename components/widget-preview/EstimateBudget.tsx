'use client';

import type { CSSProperties } from 'react';

const MIN = 200;
const MAX = 20000;
const STEP = 100;
const START = 2500;

export default function EstimateBudget({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  const current = value ?? START;
  const pct = ((current - MIN) / (MAX - MIN)) * 100;

  return (
    <div>
      <p className="text-[13px] font-medium" style={{ color: 'var(--w-text)' }}>
        Budget
      </p>
      <p
        aria-live="polite"
        className="mt-1 text-[18px] font-medium tabular-nums"
        style={{ color: 'var(--w-text)' }}
      >
        ${current.toLocaleString('en-US')}
      </p>
      <input
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Budget in US dollars"
        aria-valuetext={`$${current.toLocaleString('en-US')}`}
        className="w-range w-full mt-1"
        style={{ '--w-range-pct': `${pct}%` } as CSSProperties}
      />
      <p className="text-[12px]" style={{ color: 'var(--w-text-sec)' }}>
        This helps us pick the stone quality and size to price against.
      </p>
      <style>{`.w-range{-webkit-appearance:none;appearance:none;height:44px;background:transparent;cursor:pointer;}.w-range::-webkit-slider-runnable-track{height:6px;border-radius:999px;background:linear-gradient(to right,var(--w-primary) 0 var(--w-range-pct),var(--w-border) var(--w-range-pct) 100%);}.w-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:22px;height:22px;margin-top:-8px;border-radius:999px;background:var(--w-primary);border:2px solid var(--w-surface);}.w-range::-moz-range-track{height:6px;border-radius:999px;background:var(--w-border);}.w-range::-moz-range-progress{height:6px;border-radius:999px;background:var(--w-primary);}.w-range::-moz-range-thumb{width:22px;height:22px;border:2px solid var(--w-surface);border-radius:999px;background:var(--w-primary);}.w-range:focus-visible{outline:none;}.w-range:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 2px var(--w-surface),0 0 0 4px var(--w-primary);}.w-range:focus-visible::-moz-range-thumb{box-shadow:0 0 0 2px var(--w-surface),0 0 0 4px var(--w-primary);}`}</style>
    </div>
  );
}