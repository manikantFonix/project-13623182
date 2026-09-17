'use client';

import { focusRing } from '../tokens';
import PlanToggle from './PlanToggle';
import { fmtInt, fmtMoney, perRender, type TopUp } from './data';

const head = 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

export default function TopUpsTable({
  packs,
  onEdit,
  onToggle,
}: {
  packs: TopUp[];
  onEdit: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[760px]">
        <caption className="sr-only">
          Top-up packs. Three packs; size and price are both editable.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Pack
            </th>
            <th scope="col" className={`${head} text-right`}>Price</th>
            <th scope="col" className={`${head} text-right`}>Price per render</th>
            <th scope="col" className={`${head} text-right`}>Bought this period</th>
            <th scope="col" className={`${head} text-left`}>Availability</th>
            <th scope="col" className="pl-4 pr-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {packs.map((pack) => (
            <tr key={pack.id} className="border-b border-[var(--muted)] last:border-b-0">
              <th scope="row" className="pl-5 pr-4 py-4 text-left align-top font-normal">
                <span className="block text-[13px] font-semibold tabular-nums text-[var(--text)]">
                  {fmtInt(pack.size)} renders
                </span>
              </th>
              <td className="px-4 py-4 align-top text-right text-[13px] font-medium tabular-nums whitespace-nowrap text-[var(--text)]">
                {fmtMoney(pack.price)}
              </td>
              <td className="px-4 py-4 align-top text-right text-[13px] tabular-nums whitespace-nowrap text-[var(--text-sec)]">
                {perRender(pack)}
              </td>
              <td className="px-4 py-4 align-top text-right text-[13px] tabular-nums whitespace-nowrap text-[var(--text)]">
                {fmtInt(pack.bought)}
              </td>
              <td className="px-4 py-4 align-top whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <PlanToggle
                    checked={pack.enabled}
                    onChange={() => onToggle(pack.id)}
                    label={pack.enabled ? 'Disable this pack' : 'Enable this pack'}
                  />
                  <span className={`text-[12px] font-medium ${pack.enabled ? 'text-[var(--text-sec)]' : 'text-[var(--alert-strong)]'}`}>
                    {pack.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </td>
              <td className="pl-4 pr-5 py-4 align-top text-right whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => onEdit(pack.id)}
                  className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}