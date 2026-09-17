'use client';

import ActivityEntryRow from './ActivityEntryRow';
import type { ActivityEntry } from './data';

export default function ActivityFeed({ entries }: { entries: ActivityEntry[] }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-1.5">
      <ul className="divide-y divide-[var(--muted)]">
        {entries.map((entry) => (
          <ActivityEntryRow key={entry.id} entry={entry} />
        ))}
      </ul>
    </div>
  );
}