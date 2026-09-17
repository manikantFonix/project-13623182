'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cardBase } from '../tokens';
import { NO_REASON_LABEL, fmtInt, type ReasonCount } from './data';

interface ChartDatum {
  label: string;
  count: number;
  share: number;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ChartDatum }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const datum = payload[0].payload;
  return (
    <div
      className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
      style={{ boxShadow: 'none' }}
    >
      <p className="text-[12px] font-medium text-[var(--text)]">{datum.label}</p>
      <p className="mt-0.5 text-[12px] tabular-nums text-[var(--text-sec)]">
        {fmtInt(datum.count)} cancellations · {datum.share}% of reasons given
      </p>
    </div>
  );
}

export default function CancelReasonChart({
  reasons,
  noReason,
  gaveReason,
}: {
  reasons: ReasonCount[];
  noReason: number;
  gaveReason: number;
}) {
  const chartData: ChartDatum[] = reasons.map((reason) => ({
    label: reason.label,
    count: reason.count,
    share: reason.share,
  }));
  const top = reasons[0];
  const height = chartData.length * 46 + 28;
  const noReasonShare = gaveReason + noReason === 0 ? 0 : Math.round((noReason / (gaveReason + noReason)) * 100);
  const widest = Math.max(1, ...chartData.map((datum) => datum.count), noReason);

  return (
    <div className={`${cardBase} p-5`}>
      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 56, bottom: 4, left: 0 }}
            barCategoryGap={14}
          >
            <CartesianGrid horizontal={false} stroke="var(--border)" />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 11, fill: 'var(--text-sec)', fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={196}
              tick={{ fontSize: 11, fill: 'var(--text-sec)', fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: 'var(--muted)' }}
              wrapperStyle={{ boxShadow: 'none', outline: 'none' }}
            />
            <Bar
              dataKey="count"
              barSize={18}
              radius={[0, 6, 6, 0]}
              isAnimationActive={false}
              background={{ fill: 'var(--muted)', radius: 6 }}
              label={{ position: 'right', fill: 'var(--text)', fontSize: 12, fontWeight: 600 }}
            >
              {chartData.map((datum) => (
                <Cell key={datum.label} fill="#152E56" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 rounded-[12px] border border-dashed border-[var(--border-strong)] bg-[var(--muted)] px-4 py-3.5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[13px] font-medium text-[var(--text-sec)]">{NO_REASON_LABEL}</p>
          <p className="text-[13px] font-semibold tabular-nums text-[var(--text)]">
            {fmtInt(noReason)}
            <span className="ml-2 font-normal text-[var(--muted-text)]">{noReasonShare}% of all</span>
          </p>
        </div>
        <span
          aria-hidden="true"
          className="mt-2 block h-2 w-full overflow-hidden rounded-full bg-[var(--border)]"
        >
          <span
            className="block h-full rounded-full bg-[var(--muted-text)]"
            style={{ width: `${Math.max(2, Math.round((noReason / widest) * 100))}%` }}
          />
        </span>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-text)]">
          Not a reason — these retailers left without answering.
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-sec)]">
        {top && top.count > 0
          ? `${top.label} leads, at ${fmtInt(top.count)} of ${fmtInt(gaveReason)} reasons given.`
          : 'No reasons were given in this period.'}
      </p>

      <p className="sr-only">
        Horizontal bar chart of the five cancellation reasons, sorted by count. Every figure is
        listed here as text:{' '}
        {reasons.map((reason) => `${reason.label}, ${reason.count}, ${reason.share} percent`).join('; ')}
        . {NO_REASON_LABEL}, {noReason}, is shown separately from the five reasons.
      </p>
    </div>
  );
}