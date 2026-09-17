'use client';

import { toneMeta, type ActivityEntry } from './data';

export default function ActivityEntryRow({ entry }: { entry: ActivityEntry }) {
  const meta = toneMeta[entry.tone];

  return (
    <li className="flex items-start gap-3 py-3.5">
      <span
        className="mt-0.5 w-5 h-5 flex items-center justify-center shrink-0"
        style={{ color: meta.color }}
      >
        <i className={`${meta.icon} text-[16px]`} aria-hidden="true" />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.06em]"
            style={{ color: meta.color }}
          >
            {meta.label}
          </span>
          <time
            dateTime={`${entry.date}T${entry.time}`}
            className="shrink-0 text-[12px] tabular-nums text-[var(--muted-text)] whitespace-nowrap"
          >
            {entry.relative}
          </time>
        </div>

        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          <span className="text-[var(--muted-text)]">{entry.kind} · </span>
          <span className="font-semibold text-[var(--text)]">{entry.subject}</span>{' '}
          {entry.summary}
        </p>

        {entry.change && (
          <p className="mt-1 text-[13px] tabular-nums text-[var(--text-sec)]">
            {entry.change.label}{' '}
            {entry.change.from && (
              <span className="text-[var(--muted-text)]">{entry.change.from} → </span>
            )}
            <span className="font-medium text-[var(--text)]">{entry.change.to}</span>
          </p>
        )}

        {entry.reason && (
          <p className="mt-1.5 border-l-2 border-[var(--border-strong)] pl-2.5 text-[13px] leading-relaxed text-[var(--text)] select-all">
            {entry.reason}
          </p>
        )}
      </div>
    </li>
  );
}