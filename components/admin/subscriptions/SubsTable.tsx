'use client';

import { focusRing } from '../tokens';
import HoverTip from './HoverTip';
import SubsPill from './SubsPill';
import {
  cycleLabel,
  fmtInt,
  sortDirectionName,
  statusLabel,
  statusTone,
  type SortKey,
  type SortState,
  type SubView,
} from './data';

const head = 'text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-sec)]';

function SortHeader({
  label,
  k,
  sort,
  onSort,
  right,
  width,
}: {
  label: string;
  k: SortKey;
  sort: SortState;
  onSort: (key: SortKey) => void;
  right?: boolean;
  width?: string;
}) {
  const active = sort.key === k;
  const icon = active
    ? sort.dir === 'asc'
      ? 'ri-arrow-up-line'
      : 'ri-arrow-down-line'
    : 'ri-arrow-up-down-line';

  return (
    <th
      scope="col"
      aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
      className={`px-4 py-3 ${width ?? ''}`}
    >
      <button
        type="button"
        onClick={() => onSort(k)}
        className={`flex w-full items-center gap-1.5 ${right ? 'justify-end' : ''} ${head} rounded-[6px] transition-colors duration-150 hover:text-[var(--text)] ${focusRing}`}
      >
        <span className="whitespace-nowrap">{label}</span>
        <span
          className={`w-4 h-4 flex items-center justify-center shrink-0 ${
            active ? 'text-[var(--accent)]' : 'text-[var(--muted-text)]'
          }`}
        >
          <i className={`${icon} text-[14px]`} aria-hidden="true" />
        </span>
      </button>
    </th>
  );
}

function Bar({
  share,
  fill,
  align = 'left',
}: {
  share: number;
  fill: string;
  align?: 'left' | 'right';
}) {
  return (
    <span
      aria-hidden="true"
      className={`mt-1.5 block h-1.5 w-[110px] overflow-hidden rounded-full bg-[var(--muted)] ${
        align === 'right' ? 'ml-auto' : ''
      }`}
    >
      <span
        className={`block h-full rounded-full ${fill}`}
        style={{ width: `${Math.min(100, Math.max(2, share))}%` }}
      />
    </span>
  );
}

function PeriodCell({ row }: { row: SubView }) {
  if (row.onTrial && row.daysLeft !== null) {
    return (
      <>
        <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">
          {row.daysLeft} {row.daysLeft === 1 ? 'day' : 'days'} left in trial
        </p>
        <Bar share={row.elapsedShare ?? 0} fill="bg-[var(--accent)]" />
        <p className="mt-1.5 text-[13px] text-[var(--text-sec)]">
          {cycleLabel(row.cycle)} · billing starts {row.nextBillingOn}
        </p>
      </>
    );
  }
  if (row.daysLeft === null || row.elapsedShare === null) {
    return (
      <>
        <p className="text-[13px] text-[var(--text-sec)]">No period yet</p>
        <p className="mt-1 text-[13px] text-[var(--muted-text)]">
          {cycleLabel(row.cycle)} · starts when a plan is chosen.
        </p>
      </>
    );
  }
  return (
    <>
      <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">
        {row.daysLeft} {row.daysLeft === 1 ? 'day' : 'days'} left
      </p>
      <Bar share={row.elapsedShare} fill="bg-[var(--muted-text)]" />
      <p className="mt-1.5 text-[13px] tabular-nums text-[var(--text-sec)]">
        {cycleLabel(row.cycle)} · {row.elapsedShare}% elapsed
      </p>
      <p
        className={`mt-1 text-[13px] tabular-nums ${
          row.status === 'cancelling'
            ? 'font-medium text-[var(--alert-strong)]'
            : 'text-[var(--muted-text)]'
        }`}
      >
        {row.nextBillingLabel} {row.nextBillingOn}
      </p>
    </>
  );
}

function UsageCell({ row }: { row: SubView }) {
  if (row.used === null || row.usedShare === null || row.includedLeft === null) {
    return (
      <>
        <p className="text-[13px] text-[var(--text-sec)]">No usage yet</p>
        <p className="mt-1 text-[13px] text-[var(--muted-text)]">Set when a plan is chosen.</p>
      </>
    );
  }
  if (row.onTopUp) {
    const share = Math.round((row.topUpUsed / row.topUpTotal) * 100);
    return (
      <>
        <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">
          {fmtInt(row.topUpUsed)}/{fmtInt(row.topUpTotal)}
        </p>
        <Bar share={share} fill="bg-[var(--accent)]" align="right" />
        <p className="mt-1.5 text-[13px] tabular-nums text-[var(--text-sec)]">
          {fmtInt(row.topUp)} left
        </p>
        <p className="mt-1 text-[12px] text-[var(--muted-text)]">Included usage used up</p>
      </>
    );
  }
  return (
    <>
      <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">
        {fmtInt(row.used)} of {fmtInt(row.allowance)}
      </p>
      <Bar share={row.usedShare} fill="bg-[var(--accent)]" align="right" />
      <p
        className={`mt-1.5 text-[13px] tabular-nums ${
          row.includedLeft <= 0 ? 'font-medium text-[var(--alert-strong)]' : 'text-[var(--text-sec)]'
        }`}
      >
        {row.includedLeft <= 0 ? 'No included renders left' : `${fmtInt(row.includedLeft)} left`}
      </p>
    </>
  );
}

function TopUpCell({ row }: { row: SubView }) {
  if (row.status === 'awaiting') {
    return (
      <>
        <p className="text-[13px] text-[var(--text-sec)]">No pack</p>
        <p className="mt-1 text-[13px] tabular-nums text-[var(--muted-text)]">Nothing bought yet.</p>
      </>
    );
  }
  if (row.topUp <= 0) {
    return (
      <>
        <p className="text-[13px] tabular-nums text-[var(--text-sec)]">None</p>
        <p className="mt-1 text-[13px] text-[var(--muted-text)]">No packs bought.</p>
      </>
    );
  }
  return (
    <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">{fmtInt(row.topUp)}</p>
  );
}

export default function SubsTable({
  rows,
  sort,
  onSort,
  onView,
}: {
  rows: SubView[];
  sort: SortState;
  onSort: (key: SortKey) => void;
  onView: (row: SubView) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[1040px] border-collapse">
        <caption className="sr-only">
          Every retailer with their plan, status, billing cycle, period and next billing date, the
          included usage balance and top-up balance, plus a view action for full subscription details
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
            <SortHeader label="Retailer" k="name" sort={sort} onSort={onSort} width="min-w-[230px]" />
            <SortHeader label="Plan" k="plan" sort={sort} onSort={onSort} width="min-w-[110px]" />
            <th scope="col" className={`px-4 py-3 text-left ${head}`}>
              Status
            </th>
            <SortHeader
              label="Period & billing"
              k="period"
              sort={sort}
              onSort={onSort}
              width="min-w-[220px]"
            />
            <th scope="col" className={`px-4 py-3 text-right ${head}`}>
              <span className="inline-flex items-center justify-end gap-1.5">
                <span className="whitespace-nowrap">Usage</span>
                <HoverTip side="bottom" content="Included renders used this period, spent before any top-up pack.">
                  <button
                    type="button"
                    aria-label="How the included usage works"
                    className={`w-4 h-4 flex items-center justify-center rounded-full text-[var(--muted-text)] transition-colors duration-150 hover:text-[var(--text)] ${focusRing}`}
                  >
                    <i className="ri-information-line text-[14px]" aria-hidden="true" />
                  </button>
                </HoverTip>
              </span>
            </th>
            <th scope="col" className={`px-4 py-3 text-right ${head}`}>
              <span className="inline-flex items-center justify-end gap-1.5">
                <span className="whitespace-nowrap">Top-up balance</span>
                <HoverTip side="bottom" content="Renders left in bought packs, spent oldest first.">
                  <button
                    type="button"
                    aria-label="How the top-up balance is spent"
                    className={`w-4 h-4 flex items-center justify-center rounded-full text-[var(--muted-text)] transition-colors duration-150 hover:text-[var(--text)] ${focusRing}`}
                  >
                    <i className="ri-information-line text-[14px]" aria-hidden="true" />
                  </button>
                </HoverTip>
              </span>
            </th>
            <th scope="col" className={`px-4 py-3 text-right ${head}`}>
              <span className="whitespace-nowrap">Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[var(--muted)] last:border-b-0 align-top">
              <th scope="row" className="px-4 py-4 text-left font-normal">
                <p className="text-[13px] font-semibold text-[var(--text)]">{row.name}</p>
                <p className="mt-0.5 text-[13px] text-[var(--text-sec)] break-all">{row.email}</p>
                {row.atZero && (
                  <span className="mt-1.5 inline-block">
                    <SubsPill tone="alert">At zero renders</SubsPill>
                  </span>
                )}
                {!row.atZero && row.burningFast && (
                  <span className="mt-1.5 inline-block">
                    <SubsPill tone="alert">Burning fast</SubsPill>
                  </span>
                )}
              </th>
              <td className="px-4 py-4">
                <p className="text-[13px] text-[var(--text)] whitespace-nowrap">{row.planName}</p>
              </td>
              <td className="px-4 py-4">
                <SubsPill tone={statusTone[row.status]}>{statusLabel[row.status]}</SubsPill>
                {row.status === 'cancelling' && (
                  <p className="mt-1.5 text-[13px] text-[var(--alert-strong)]">
                    Access continues to the end.
                  </p>
                )}
                {row.onTrial && (
                  <p className="mt-1.5 text-[13px] text-[var(--muted-text)]">
                    Converts to {row.planName} when the trial ends.
                  </p>
                )}
              </td>
              <td className="px-4 py-4">
                <PeriodCell row={row} />
              </td>
              <td className="px-4 py-4 text-right">
                <UsageCell row={row} />
              </td>
              <td className="px-4 py-4 text-right">
                <TopUpCell row={row} />
              </td>
              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onView(row)}
                  aria-label={`View subscription details for ${row.name}`}
                  className={`h-8 pl-2.5 pr-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] inline-flex items-center gap-1.5 text-[13px] font-medium whitespace-nowrap text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-eye-line text-[15px]" aria-hidden="true" />
                  </span>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sr-only">Sort order: {sortDirectionName(sort)}</p>
    </div>
  );
}