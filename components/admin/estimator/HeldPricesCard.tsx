'use client';

import { fmtDateTime, type HeldPrice } from './data';

function StatusText({ status }: { status: HeldPrice['status'] }) {
  if (status === 'beyond') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--alert-strong)] whitespace-nowrap">
        <span className="w-4 h-4 flex items-center justify-center">
          <i className="ri-time-line text-[15px]" aria-hidden="true" />
        </span>
        Beyond window
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--success)] whitespace-nowrap">
      <span className="w-4 h-4 flex items-center justify-center">
        <i className="ri-checkbox-circle-line text-[15px]" aria-hidden="true" />
      </span>
      Within window
    </span>
  );
}

export default function HeldPricesCard({ prices }: { prices: HeldPrice[] }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <div className="px-5 py-4">
        <h3 className="text-[13px] font-semibold text-[var(--text)]">Held price status</h3>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
          The current prices, when each was captured, and whether it is still serving.
        </p>
      </div>

      <div className="border-t border-[var(--border)]">
        <table className="w-full border-collapse">
          <caption className="sr-only">Current held prices and whether each is beyond its window.</caption>
          <thead>
            <tr className="bg-[var(--muted)]">
              <th scope="col" className="px-5 py-2.5 text-left text-[12px] font-semibold text-[var(--text-sec)]">
                Material
              </th>
              <th scope="col" className="px-5 py-2.5 text-right text-[12px] font-semibold text-[var(--text-sec)]">
                Price
              </th>
              <th scope="col" className="px-5 py-2.5 text-left text-[12px] font-semibold text-[var(--text-sec)]">
                Captured
              </th>
              <th scope="col" className="px-5 py-2.5 text-left text-[12px] font-semibold text-[var(--text-sec)]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price) => (
              <tr key={price.id} className="border-t border-[var(--border)]">
                <th scope="row" className="px-5 py-2.5 text-left text-[13px] font-medium text-[var(--text)] whitespace-nowrap">
                  {price.material}
                </th>
                <td className="px-5 py-2.5 text-right text-[13px] tabular-nums text-[var(--text)] whitespace-nowrap">
                  {price.price}
                  <span className="block text-[11px] text-[var(--muted-text)]">{price.unit}</span>
                </td>
                <td className="px-5 py-2.5 text-[13px] tabular-nums text-[var(--text-sec)] whitespace-nowrap">
                  {fmtDateTime(price.capturedAt)}
                </td>
                <td className="px-5 py-2.5">
                  <StatusText status={price.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[var(--border)] px-5 py-3 text-[12px] leading-relaxed text-[var(--muted-text)]">
        A price beyond its window is the condition the Bottlenecks screen reports as price staleness.
      </div>
    </div>
  );
}