'use client';

import RetailerSection from './RetailerSection';
import { fmt } from '../data';
import type { RetailerDetail } from './data';

const panelHead =
  'flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--muted)] px-4 py-2.5';
const panelTitle = 'text-[12px] font-semibold text-[var(--text)]';
const panelMeta = 'text-[11px] font-medium tabular-nums text-[var(--muted-text)] whitespace-nowrap';
const th = 'px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';
const td = 'px-4 py-3 align-middle text-[13px]';
const rowHover = 'transition-colors duration-150 hover:bg-[var(--muted)]';

function Figure({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="bg-[var(--surface)] px-4 py-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
        {label}
      </p>
      <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[var(--text)]">
        {value}
      </p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text-sec)]">{note}</p>
    </div>
  );
}

export default function ConsumptionSection({
  consumption,
}: {
  consumption: RetailerDetail['consumption'];
}) {
  if (!consumption) {
    return (
      <RetailerSection title="Consumption history" description="Renders used, by cause, over time.">
        <p className="rounded-[10px] border border-[var(--border)] bg-[var(--muted)] px-4 py-6 text-[13px] leading-relaxed text-[var(--text-sec)]">
          No consumption yet. Renders appear once this account starts generating.
        </p>
      </RetailerSection>
    );
  }

  const { current, causes, previous } = consumption;
  const causeTotal = causes.reduce((sum, c) => sum + c.value, 0);
  const periodTotal = causeTotal + current.repairs;
  const share = (value: number): number =>
    periodTotal > 0 ? Math.round((value / periodTotal) * 100) : 0;
  const prev = previous[0];

  return (
    <RetailerSection title="Consumption history" description="Renders used, by cause, over time.">
      <div className="grid gap-px overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
        <Figure
          label="Used this period"
          value={fmt(current.used)}
          note={`of ${fmt(current.allowance)} included`}
        />
        <Figure
          label="Repairs"
          value={fmt(current.repairs)}
          note="Counted on their own, not in a cause"
        />
        <Figure
          label="Previous period"
          value={prev ? fmt(prev.used) : '—'}
          note={prev ? `${prev.label} · ${fmt(prev.repairs)} repairs` : 'No earlier period yet'}
        />
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[10px] border border-[var(--border)]">
          <div className={panelHead}>
            <h3 className={panelTitle}>Renders by cause</h3>
            <span className={panelMeta}>{current.range}</span>
          </div>
          <table className="w-full">
            <caption className="sr-only">Renders this period, by cause.</caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className={`${th} text-left`}>
                  Cause
                </th>
                <th scope="col" className={`${th} text-left`}>
                  Share of period
                </th>
                <th scope="col" className={`${th} text-right`}>
                  Renders
                </th>
              </tr>
            </thead>
            <tbody>
              {causes.map((c) => (
                <tr key={c.id} className={`h-12 border-b border-[var(--muted)] ${rowHover}`}>
                  <th
                    scope="row"
                    className={`${td} text-left font-normal text-[var(--text-sec)]`}
                  >
                    {c.label}
                  </th>
                  <td className={td}>
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="block h-1.5 w-[88px] overflow-hidden rounded-full bg-[var(--muted)]"
                      >
                        <span
                          className="block h-full rounded-full bg-[var(--accent)]"
                          style={{ width: `${Math.max(3, share(c.value))}%` }}
                        />
                      </span>
                      <span className="text-[12px] tabular-nums text-[var(--muted-text)]">
                        {share(c.value)}%
                      </span>
                    </span>
                  </td>
                  <td
                    className={`${td} text-right font-medium tabular-nums text-[var(--text)] whitespace-nowrap`}
                  >
                    {fmt(c.value)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="h-11 border-t border-[var(--border-strong)]">
                <th scope="row" className={`${td} text-left font-normal text-[var(--text-sec)]`}>
                  Repair passes
                </th>
                <td className={`${td} text-[12px] tabular-nums text-[var(--muted-text)]`}>
                  {share(current.repairs)}%
                </td>
                <td
                  className={`${td} text-right font-medium tabular-nums text-[var(--text)] whitespace-nowrap`}
                >
                  {fmt(current.repairs)}
                </td>
              </tr>
              <tr className="h-11 border-t border-[var(--muted)]">
                <th scope="row" className={`${td} text-left font-semibold text-[var(--text)]`}>
                  Total
                </th>
                <td className={`${td} text-[12px] font-semibold tabular-nums text-[var(--text-sec)]`}>
                  100%
                </td>
                <td
                  className={`${td} text-right font-semibold tabular-nums text-[var(--text)] whitespace-nowrap`}
                >
                  {fmt(periodTotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="overflow-hidden rounded-[10px] border border-[var(--border)]">
          <div className={panelHead}>
            <h3 className={panelTitle}>Previous periods</h3>
            <span className={panelMeta}>
              {previous.length} before {current.label}
            </span>
          </div>
          <table className="w-full">
            <caption className="sr-only">Previous periods, renders and repairs.</caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className={`${th} text-left`}>
                  Period
                </th>
                <th scope="col" className={`${th} text-right`}>
                  Renders
                </th>
                <th scope="col" className={`${th} text-right`}>
                  Repairs
                </th>
              </tr>
            </thead>
            <tbody>
              {previous.map((p) => (
                <tr
                  key={p.label}
                  className={`h-14 border-b border-[var(--muted)] last:border-b-0 ${rowHover}`}
                >
                  <th scope="row" className={`${td} text-left font-normal`}>
                    <span className="block text-[13px] text-[var(--text)]">{p.label}</span>
                    <span className="mt-0.5 block text-[12px] tabular-nums text-[var(--muted-text)]">
                      {p.range}
                    </span>
                  </th>
                  <td
                    className={`${td} text-right font-medium tabular-nums text-[var(--text)] whitespace-nowrap`}
                  >
                    {fmt(p.used)}
                  </td>
                  <td className={`${td} text-right tabular-nums text-[var(--text-sec)] whitespace-nowrap`}>
                    {fmt(p.repairs)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted-text)]">
        Repairs are counted on their own and never folded into a period total.
      </p>
    </RetailerSection>
  );
}