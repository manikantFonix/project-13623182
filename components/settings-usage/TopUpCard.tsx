'use client';

import { useState } from 'react';
import CardHeader from './CardHeader';
import { focusRing, type Purchase, type TopUpPack } from './data';

interface Props {
  packs: TopUpPack[];
  purchases: Purchase[];
  emptyHistory: boolean;
}

export default function TopUpCard({ packs, purchases, emptyHistory }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      id="top-up"
      className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6"
    >
      <CardHeader
        icon="ri-add-circle-line"
        title="Buy more renders"
        description="Top-ups are used after your included allowance runs out."
      />

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {packs.map((p) => {
          const isSelected = selected === p.size;
          return (
            <button
              key={p.size}
              onClick={() => setSelected(isSelected ? null : p.size)}
              className={`flex flex-col items-center text-center bg-[var(--surface)] rounded-[12px] p-5 transition-all duration-150 cursor-pointer ${focusRing} ${
                isSelected
                  ? 'border border-transparent ring-2 ring-[var(--accent)]'
                  : 'border border-[var(--border)] hover:border-[var(--border-strong)]'
              }`}
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-[12px] bg-[var(--muted)]">
                <i className="ri-add-circle-line text-[20px] text-[var(--text-sec)]" />
              </span>
              <p className="mt-3 text-[26px] font-semibold text-[var(--text)] tabular-nums leading-none">
                {p.size}
              </p>
              <p className="mt-1 text-[13px] text-[var(--text-sec)]">renders</p>
              <p className="mt-2 text-[15px] font-medium text-[var(--text)] tabular-nums">
                ${p.price}
              </p>
              <span className="mt-2 inline-flex items-center h-5 px-2 rounded-full bg-[var(--muted)] text-[11px] font-medium text-[var(--text-sec)] tabular-nums whitespace-nowrap">
                ${p.pricePerCredit.toFixed(2)} per render
              </span>
              <p className="mt-3 text-[11px] text-[var(--text-sec)]">
                Expires with your subscription.
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <button
          disabled={selected === null}
          onClick={() => {}}
          className={`h-10 px-5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${focusRing} ${
            selected === null
              ? 'bg-[var(--muted)] text-[var(--muted-text)] cursor-not-allowed'
              : 'text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent-hover)] cursor-pointer'
          }`}
        >
          Continue to payment
        </button>
        <p className="mt-2 text-[13px] text-[var(--text-sec)]">
          {selected === null
            ? 'Choose a pack to continue.'
            : `${selected} renders selected.`}
        </p>
        <p className="mt-2 text-[12px] text-[var(--text-sec)]">
          Top-up renders are used after your included allowance, oldest pack
          first. They expire if your subscription ends.
        </p>
      </div>

      <div className="my-6 h-px bg-[var(--border)]" />

      <p className="text-[13px] font-medium text-[var(--text-sec)]">
        Purchase history
      </p>
      {emptyHistory ? (
        <p className="mt-3 text-[13px] text-[var(--text-sec)]">
          You haven't bought any top-up packs yet.
        </p>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-[1fr_140px_150px_120px] items-center gap-4 px-2 h-9 border-b border-[var(--border)]">
            <span className="text-[13px] font-medium text-[var(--text-sec)]">
              Purchased
            </span>
            <span className="text-[13px] font-medium text-[var(--text-sec)]">
              Pack
            </span>
            <span className="text-[13px] font-medium text-[var(--text-sec)]">
              Remaining
            </span>
            <span className="text-[13px] font-medium text-[var(--text-sec)] text-right">
              Paid
            </span>
          </div>
          {purchases.map((p) => (
            <div
              key={`${p.date}-${p.pack}`}
              className="grid grid-cols-[1fr_140px_150px_120px] items-center gap-4 px-2 py-3 border-b border-[var(--border)] last:border-b-0"
            >
              <p className="text-[13px] text-[var(--text-sec)]">{p.date}</p>
              <p className="text-[13px] text-[var(--text)]">{p.pack} renders</p>
              <p className="text-[13px] text-[var(--text)] tabular-nums">
                {p.remaining} of {p.pack}
              </p>
              <p className="text-[13px] text-[var(--text)] tabular-nums text-right">
                ${p.paid}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}