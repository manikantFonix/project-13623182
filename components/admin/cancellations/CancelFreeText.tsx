'use client';

import { cardBase } from '../tokens';
import type { CancelRow } from './data';

export default function CancelFreeText({ entries }: { entries: CancelRow[] }) {
  return (
    <div className={`${cardBase} divide-y divide-[var(--muted)]`}>
      {entries.map((entry) => (
        <figure key={entry.id} className="px-5 py-4">
          <span className="w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
            <i className="ri-double-quotes-l text-[16px]" aria-hidden="true" />
          </span>
          <blockquote className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">
            {entry.reasonText}
          </blockquote>
          <figcaption className="mt-2 text-[12px] text-[var(--muted-text)]">
            <span className="font-medium text-[var(--text-sec)]">{entry.name}</span>
            <span className="mx-1.5">·</span>
            <span className="tabular-nums">{entry.cancelledOn}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}