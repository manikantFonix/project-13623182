'use client';

import Link from 'next/link';
import FeedItem from './FeedItem';
import { focusRing } from './tokens';
import type { FeedEvent } from './data';

export default function FeedSection({ feed }: { feed: FeedEvent[] }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)]">
      <div className="px-5 py-1.5">
        {feed.length === 0 ? (
          <div className="py-8">
            <span className="w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
              <i className="ri-file-list-3-line text-[18px]" aria-hidden="true" />
            </span>
            <p className="mt-3 text-[13px] font-medium text-[var(--text)]">Nothing notable happened</p>
            <p className="mt-1 max-w-[560px] text-[13px] leading-relaxed text-[var(--text-sec)]">
              Notable events across every account appear here, with the account named.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--muted)]">
            {feed.map((event) => (
              <FeedItem key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[var(--muted)] px-5 py-3">
        <Link
          href="/admin/activity"
          className={`rounded-sm text-[13px] font-semibold text-[var(--accent-text)] underline-offset-2 transition-colors duration-150 hover:underline ${focusRing}`}
        >
          See all activity
        </Link>
      </div>
    </div>
  );
}