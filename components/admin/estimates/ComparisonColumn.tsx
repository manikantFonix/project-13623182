'use client';

import { money } from './data';

export interface ComparisonLine {
  label: string;
  value: number;
  note?: string;
}

export default function ComparisonColumn({
  title,
  sub,
  range,
  rangeNote,
  lines,
}: {
  title: string;
  sub: string;
  range: string;
  rangeNote?: string;
  lines: ComparisonLine[];
}) {
  return (
    <section
      aria-label={title}
      className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <h3 className="text-[13px] font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">{sub}</p>

      <p className="mt-4 text-[26px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[var(--text)]">
        {range}
      </p>
      {rangeNote && (
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-sec)]">{rangeNote}</p>
      )}

      <dl className="mt-4 border-t border-[var(--muted)] pt-2">
        {lines.map((line) => (
          <div
            key={line.label}
            className="flex items-start justify-between gap-6 border-b border-[var(--muted)] py-2.5 last:border-b-0"
          >
            <dt className="text-[12px] leading-relaxed text-[var(--text-sec)]">
              <span className="block">{line.label}</span>
              {line.note && <span className="block text-[var(--text-sec)]">{line.note}</span>}
            </dt>
            <dd className="text-[13px] tabular-nums text-[var(--text)] whitespace-nowrap">
              {money(line.value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}