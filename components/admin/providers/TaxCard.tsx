'use client';

import { TAX_FACTS } from './data';

export default function TaxCard() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="flex items-center gap-2 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
        <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
          <i className="ri-information-line text-[16px]" aria-hidden="true" />
        </span>
        Tax is calculated by the provider, not here.
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-x-10 gap-y-0">
        {TAX_FACTS.map((fact) => (
          <div
            key={fact.term}
            className="flex items-baseline justify-between gap-4 py-3 border-b border-[var(--muted)]"
          >
            <dt className="text-[12px] text-[var(--text-sec)]">{fact.term}</dt>
            <dd className="text-[13px] tabular-nums text-[var(--text)] text-right">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}