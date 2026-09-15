'use client';

import Link from 'next/link';
import { focusRing } from '../tokens';

export default function CatalogsNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <p className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        A product is served only when every render has passed, so anything below 100% is pieces
        missing from a live shop. Per-retailer rates are on{' '}
        <Link
          href="/admin/bottlenecks"
          prefetch={false}
          className={`rounded-sm font-medium text-[var(--text)] underline decoration-1 underline-offset-2 transition-colors duration-150 hover:text-[var(--accent)] ${focusRing}`}
        >
          Bottlenecks
        </Link>
        .
      </p>
    </div>
  );
}