'use client';

import Link from 'next/link';
import { focusRing } from '../tokens';

export default function RecordsAccessNotice() {
  return (
    <p role="note" className="mt-3 flex items-center gap-2 text-[12px] font-medium text-[var(--text-sec)]">
      <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-lock-2-line text-[14px]" aria-hidden="true" />
      </span>
      Opening a record is written to{' '}
      <Link
        href="/admin/activity"
        className={`rounded-sm font-semibold text-[var(--accent-text)] underline-offset-2 hover:underline ${focusRing}`}
      >
        Activity
      </Link>
      .
    </p>
  );
}