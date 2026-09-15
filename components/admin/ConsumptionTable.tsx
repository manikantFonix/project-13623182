'use client';

import type { ConsumptionCause } from './data';
import { fmt } from './data';

function shareOf(value: number, total: number): number {
  if (total <= 0) return 0;
  return (value / total) * 100;
}

function pct(value: number, total: number): string {
  if (total <= 0) return '0%';
  return `${shareOf(value, total).toFixed(1)}%`;
}

export default function ConsumptionTable({
  causes,
  total,
}: {
  causes: ConsumptionCause[];
  total: number;
}) {
  const otherTotal = causes.reduce((sum, c) => sum + c.value, 0);
  const repairValue = Math.max(total - otherTotal, 0);

  return (
    <div>
      <table className="w-full">
        <caption className="sr-only">
          Renders spent by cause, sorted by volume. Repairs are shown separately.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pb-2 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Cause
            </th>
            <th scope="col" className="pb-2 pl-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Renders
            </th>
            <th scope="col" className="pb-2 pl-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Share
            </th>
          </tr>
        </thead>
        <tbody>
          {causes.map((c) => {
            const share = shareOf(c.value, total);
            return (
              <tr key={c.id} className="border-b border-[var(--muted)]">
                <th scope="row" className="py-3 pr-4 text-left align-top font-normal">
                  <span className="block text-[13px] font-medium text-[var(--text)]">{c.label}</span>
                  <span className="mt-0.5 block text-[12px] leading-relaxed text-[var(--text-sec)]">
                    {c.note}
                  </span>
                  <span className="mt-2 block h-1.5 rounded-full bg-[var(--muted)]" aria-hidden="true">
                    <span
                      className="block h-full rounded-full bg-[var(--accent)]"
                      style={{ width: share <= 0 ? '0%' : `${Math.max(share, 1.5)}%` }}
                    />
                  </span>
                </th>
                <td className="py-3 pl-4 text-right align-top text-[13px] font-medium tabular-nums text-[var(--text)] whitespace-nowrap">
                  {fmt(c.value)}
                </td>
                <td className="py-3 pl-4 text-right align-top text-[13px] tabular-nums text-[var(--text-sec)] whitespace-nowrap">
                  {pct(c.value, total)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t border-[var(--border-strong)]">
            <th scope="row" className="pt-3 pr-4 text-left text-[13px] font-semibold text-[var(--text)]">
              All other causes
            </th>
            <td className="pt-3 pl-4 text-right text-[13px] font-semibold tabular-nums text-[var(--text)] whitespace-nowrap">
              {fmt(otherTotal)}
            </td>
            <td className="pt-3 pl-4 text-right text-[13px] font-semibold tabular-nums text-[var(--text)] whitespace-nowrap">
              {pct(otherTotal, total)}
            </td>
          </tr>
        </tfoot>
      </table>
      <p className="mt-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
        The rest is automatic repairs, shown separately. Together the two halves come to {fmt(total)}.
      </p>
    </div>
  );
}