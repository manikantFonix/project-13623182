'use client';

import type { FeedEvent, FeedTone } from './data';

const toneMeta: Record<FeedTone, { icon: string; color: string; label: string }> = {
  attention: { icon: 'ri-error-warning-line', color: 'var(--alert-strong)', label: 'Needs attention' },
  good: { icon: 'ri-checkbox-circle-line', color: 'var(--success)', label: 'Went well' },
  info: { icon: 'ri-information-line', color: 'var(--text-sec)', label: 'Just happened' },
};

export default function FeedItem({ event }: { event: FeedEvent }) {
  const meta = toneMeta[event.tone];

  return (
    <div className="flex items-start gap-3 py-3.5">
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
          <span className="shrink-0 text-[12px] tabular-nums text-[var(--muted-text)] whitespace-nowrap">
            {event.time}
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          <span className="font-semibold text-[var(--text)]">{event.retailer}</span>{' '}
          {event.text}
        </p>
      </div>
    </div>
  );
}