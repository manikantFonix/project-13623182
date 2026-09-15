'use client';

import Link from 'next/link';
import type { BottleneckAccount } from './data';
import { focusRing } from '../tokens';

export default function IndicatorAccount({ account }: { account: BottleneckAccount }) {
  return (
    <li>
      <Link
        href={`/admin/retailers/${account.id}`}
        prefetch={false}
        className={`group flex items-baseline justify-between gap-6 -mx-2 rounded-[8px] px-2 py-2.5 transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
      >
        <span className="text-[13px] font-semibold text-[var(--text)] group-hover:underline underline-offset-2 decoration-1">
          {account.name}
        </span>
        <span className="text-[13px] tabular-nums text-[var(--text-sec)] text-right">
          {account.detail}
        </span>
      </Link>
    </li>
  );
}