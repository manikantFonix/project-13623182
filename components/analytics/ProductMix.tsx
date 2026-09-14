'use client';

import ErrorBlock from './ErrorBlock';
import { SkeletonStat } from './SkeletonStat';
import type { ProductSlice, SectionMode } from './data';

const donutColors = ['#152E56', '#3F5474', '#697993', '#939FB1', '#B9C0CC', '#DADEE4'];
const R = 80;
const SW = 24;
const CX = 100;
const CY = 100;
const C = 2 * Math.PI * R;

export function Donut({ slices, total }: { slices: ProductSlice[]; total: number }) {
  let acc = 0;
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#E4E9F4" strokeWidth={SW} />
      {total > 0 &&
        slices.map((s, i) => {
          const frac = s.count / total;
          const dash = frac * C;
          const off = -acc * C;
          acc += frac;
          const color = donutColors[i % donutColors.length];
          return (
            <circle
              key={s.label}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={color}
              strokeWidth={SW}
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={off}
              transform={`rotate(-90 ${CX} ${CY})`}
            />
          );
        })}
    </svg>
  );
}

function listRow(s: ProductSlice, i: number, total: number) {
  const color = donutColors[i % donutColors.length];
  const pct = total > 0 ? Math.round((s.count / total) * 100) : 0;
  return (
    <div key={s.label} className="bg-[var(--muted)] rounded-[12px] p-3">
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
        <span className="text-[13px] text-[var(--text)] truncate">{s.label}</span>
      </div>
      <div className="mt-1.5 text-[12px] text-[var(--text-sec)] tabular-nums">{pct}%</div>
      <div className="mt-2 h-1 rounded-full bg-[var(--border)]">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function ProductMix({
  mode,
  productMix,
}: {
  mode: SectionMode;
  productMix: ProductSlice[];
}) {
  const total = productMix.reduce((s, x) => s + x.count, 0);
  if (mode === 'loading') {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
        <div className="h-4 w-28 rounded-full bg-[var(--muted)]" />
        <div className="mt-2 h-3 w-40 rounded-full bg-[var(--muted)]" />
        <div className="mt-6 grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 rounded-[12px] bg-[var(--muted)]" />
          ))}
        </div>
      </div>
    );
  }
  if (mode === 'error') {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
        <ErrorBlock />
      </div>
    );
  }
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <h3 className="text-[15px] font-medium text-[var(--text)]">Product mix</h3>
      <p className="mt-0.5 text-[12px] text-[var(--text-sec)]">Which categories you make</p>
      {total === 0 ? (
        <p className="mt-5 text-[13px] text-[var(--text-sec)]">No pieces in this period.</p>
      ) : (
        <div className="mt-5 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Donut slices={productMix} total={total} />
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {productMix.map((s, i) => listRow(s, i, total))}
          </div>
        </div>
      )}
    </div>
  );
}