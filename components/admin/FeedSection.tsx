'use client';

import FeedItem from './FeedItem';
import type { FeedEvent } from './data';

export default function FeedSection({ feed }: { feed: FeedEvent[] }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-1.5">
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
  );
}