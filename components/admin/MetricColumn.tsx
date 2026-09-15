'use client';

import MeterBar from './MeterBar';
import type { MetricRow } from './data';
import { fmt } from './data';

export default function MetricColumn({
  title,
  subtitle,
  rows,
  period,
  tone = 'strong',
}: {
  title: string;
  subtitle: string;
  rows: MetricRow[];
  period: string;
  tone?: 'strong' | 'soft';
}) {
  const max = rows.reduce((peak, r) => Math.max(peak, r.value), 0);

  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[13px] font-semibold text-[var(--text)]">{title}</h3>
        <span className="text-[11px] font-medium text-[var(--muted-text)] tabular-nums whitespace-nowrap">
          {period}
        </span>
      </div>
      <p className="mt-0.5 mb-4 text-[12px] leading-relaxed text-[var(--text-sec)]">{subtitle}</p>

      <ul className="space-y-3.5">
        {rows.map((r) => (
          <li key={r.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[13px] text-[var(--text-sec)]">{r.label}</span>
              <span className="text-[13px] font-medium tabular-nums text-[var(--text)]">
                {fmt(r.value)}
              </span>
            </div>
            <div className="mt-1.5">
              <MeterBar value={r.value} max={max} tone={tone} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}