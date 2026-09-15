'use client';

import { focusRing } from '../tokens';
import SubsPill from './SubsPill';
import { fmtInt, sortDirectionName, statusLabel, statusTone, type SortKey, type SortState, type SubView } from './data';

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

function Bar({ share, fill }: { share: number; fill: string }) {
  return (
    <span
      aria-hidden="true"
      className="mt-1.5 block h-1.5 w-[110px] overflow-hidden rounded-full bg-[var(--muted)]"
    >
      <span
        className={`block h-full rounded-full ${fill}`}
        style={{ width: `${Math.min(100, Math.max(2, share))}%` }}
      />
    </span>
  );
}

function PeriodCell({ row }: { row: SubView }) {
  if (row.daysLeft === null || row.elapsedShare === null) {
    return (
      <>
        <p className="text-[13px] text-[var(--muted-text)]">No period yet</p>
        <p className="mt-1 text-[12px] text-[var(--muted-text)]">Starts when a plan is chosen.</p>
      </>
    );
  }
  return (
    <>
      <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">
        {row.daysLeft} {row.daysLeft === 1 ? 'day' : 'days'} left
      </p>
      <Bar share={row.elapsedShare} fill="bg-[var(--muted-text)]" />
      <p className="mt-1.5 text-[12px] tabular-nums text-[var(--muted-text)]">
        Ends {row.endsOn} · {row.elapsedShare}% elapsed
      </p>
    </>
  );
}

function AllowanceCell({ row }: { row: SubView }) {
  if (row.used === null || row.usedShare === null || row.includedLeft === null) {
    return (
      <>
        <p className="text-[13px] text-[var(--muted-text)]">No allowance yet</p>
        <p className="mt-1 text-[12px] text-[var(--muted-text)]">Set when a plan is chosen.</p>
      </>
    );
  }
  return (
    <>
      <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">
        {fmtInt(row.used)} of {fmtInt(row.allowance)}
      </p>
      <Bar share={row.usedShare} fill="bg-[var(--accent)]" />
      <p
        className={`mt-1.5 text-[12px] tabular-nums ${
          row.includedLeft <= 0 ? 'font-medium text-[var(--alert-strong)]' : 'text-[var(--muted-text)]'
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
        <p className="text-[13px] text-[var(--muted-text)]">No pack</p>
        <p className="mt-1 text-[12px] tabular-nums text-[var(--muted-text)]">Nothing bought yet.</p>
      </>
    );
  }
  if (row.topUp <= 0) {
    return (
      <>
        <p className="text-[13px] tabular-nums text-[var(--text-sec)]">None</p>
        <p className="mt-1 text-[12px] text-[var(--muted-text)]">No packs bought.</p>
      </>
    );
  }
  return (
    <>
      <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">{fmtInt(row.topUp)}</p>
      <p className="mt-1 text-[12px] text-[var(--muted-text)]">Across packs, oldest spent first.</p>
    </>
  );
}

function ConsumptionCell({ row }: { row: SubView }) {
  if (row.consumed === null) {
    return (
      <>
        <p className="text-[13px] text-[var(--muted-text)]">No usage yet</p>
        <p className="mt-1 text-[12px] text-[var(--muted-text)]">Nothing to measure.</p>
      </>
    );
  }
  return (
    <>
      <p className="text-[13px] font-medium tabular-nums text-[var(--text)]">
        {fmtInt(row.consumed)}
      </p>
      <p className="mt-1 text-[12px] text-[var(--muted-text)]">renders this period</p>
    </>
  );
}

function BurnCell({ row }: { row: SubView }) {
  if (row.burn === null || row.usedShare === null || row.elapsedShare === null) {
    return (
      <>
        <p className="text-[13px] text-[var(--muted-text)]">—</p>
        <p className="mt-1 text-[12px] text-[var(--muted-text)]">No period to compare.</p>
      </>
    );
  }
  const fast = row.burningFast && !row.atZero;
  return (
    <>
      <p
        className={`text-[13px] font-semibold tabular-nums ${
          row.atZero ? 'text-[var(--text)]' : fast ? 'text-[var(--alert-strong)]' : 'text-[var(--text)]'
        }`}
      >
        {row.burn}×
      </p>
      <p className="mt-1 text-[12px] tabular-nums text-[var(--muted-text)]">
        {row.usedShare}% used · {row.elapsedShare}% elapsed
      </p>
    </>
  );
}

export default function SubsTable({
  rows,
  sort,
  onSort,
}: {
  rows: SubView[];
  sort: SortState;
  onSort: (key: SortKey) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[1180px] border-collapse">
        <caption className="sr-only">
          Every retailer with their plan, status, billing period, balances and consumption
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
            <SortHeader label="Retailer" k="name" sort={sort} onSort={onSort} width="min-w-[220px]" />
            <SortHeader label="Plan" k="plan" sort={sort} onSort={onSort} width="min-w-[120px]" />
            <th scope="col" className={`px-4 py-3 text-left ${head}`}>
              Status
            </th>
            <SortHeader
              label="Period remaining"
              k="period"
              sort={sort}
              onSort={onSort}
              width="min-w-[170px]"
            />
            <th scope="col" className={`px-4 py-3 text-left ${head}`}>
              Included allowance
            </th>
            <th scope="col" className={`px-4 py-3 text-right ${head}`}>
              Top-up balance
            </th>
            <SortHeader
              label="Consumption"
              k="consumption"
              sort={sort}
              onSort={onSort}
              right
              width="min-w-[130px]"
            />
            <SortHeader
              label="Burn rate"
              k="burn"
              sort={sort}
              onSort={onSort}
              right
              width="min-w-[170px]"
            />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[var(--muted)] last:border-b-0 align-top"
            >
              <th scope="row" className="px-4 py-4 text-left font-normal">
                <p className="text-[13px] font-semibold text-[var(--text)]">{row.name}</p>
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
                <SubsPill tone={statusTone[row.status]}>
                  {statusLabel[row.status]}
                </SubsPill>
                {row.status === 'cancelling' && (
                  <p className="mt-1.5 text-[12px] text-[var(--muted-text)]">Access continues to the end.</p>
                )}
              </td>
              <td className="px-4 py-4">
                <PeriodCell row={row} />
              </td>
              <td className="px-4 py-4">
                <AllowanceCell row={row} />
              </td>
              <td className="px-4 py-4 text-right">
                <TopUpCell row={row} />
              </td>
              <td className="px-4 py-4 text-right">
                <ConsumptionCell row={row} />
              </td>
              <td className="px-4 py-4 text-right">
                <BurnCell row={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sr-only">Sort order: {sortDirectionName(sort)}</p>
    </div>
  );
}