'use client';

import { focusRing } from '../tokens';
import type { Estimate } from './data';

const head =
  'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

function Row({ estimate, onRecompute }: { estimate: Estimate; onRecompute: (reference: string) => void }) {
  return (
    <tr className="border-b border-[var(--muted)] last:border-b-0">
      <th scope="row" className="pl-5 pr-4 py-4 text-left align-middle font-normal">
        <span className="font-mono text-[13px] tabular-nums text-[var(--text)]">
          {estimate.reference}
        </span>
      </th>

      <td className="px-4 py-4 align-middle min-w-[190px]">
        <span className="block text-[13px] font-semibold text-[var(--text)]">{estimate.retailer}</span>
      </td>

      <td className="px-4 py-4 align-middle min-w-[200px]">
        <span className="block text-[13px] text-[var(--text-sec)]">{estimate.piece}</span>
      </td>

      <td className="px-4 py-4 align-middle text-right whitespace-nowrap">
        <span className="block text-[13px] font-semibold tabular-nums text-[var(--text)]">
          {estimate.shownRange}
        </span>
        <span className="mt-1 block text-[12px] text-[var(--text-sec)]">shown to the consumer</span>
      </td>

      <td className="px-4 py-4 align-middle text-right whitespace-nowrap">
        <span className="block text-[12px] tabular-nums text-[var(--text-sec)]">{estimate.date}</span>
      </td>

      <td className="pl-4 pr-5 py-4 align-middle text-right whitespace-nowrap">
        <button
          type="button"
          onClick={() => onRecompute(estimate.reference)}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
        >
          Recompute
        </button>
      </td>
    </tr>
  );
}

export default function EstimateTable({
  estimates,
  onRecompute,
}: {
  estimates: Estimate[];
  onRecompute: (reference: string) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[1040px]">
        <caption className="sr-only">
          Recent estimates, newest first. Each row can be recomputed against what the calculation
          produces now.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Estimate
            </th>
            <th scope="col" className={`${head} text-left`}>Retailer</th>
            <th scope="col" className={`${head} text-left`}>Piece</th>
            <th scope="col" className={`${head} text-right`}>Range shown</th>
            <th scope="col" className={`${head} text-right`}>Generated</th>
            <th scope="col" className="pl-4 pr-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {estimates.map((estimate) => (
            <Row key={estimate.id} estimate={estimate} onRecompute={onRecompute} />
          ))}
        </tbody>
      </table>
    </div>
  );
}