'use client';

import EventsTable from './EventsTable';
import type { ProviderEvent } from './data';

export default function SignatureFailures({ events }: { events: ProviderEvent[] }) {
  return (
    <section
      aria-label="Signature failures"
      className="rounded-[12px] border border-[var(--alert)] bg-[var(--amber-bg)] p-5"
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--alert-strong)]">
          <i className="ri-shield-cross-line text-[16px]" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-[13px] font-semibold text-[var(--text)]">
            {events.length} signature {events.length === 1 ? 'failure' : 'failures'}
          </h3>
          <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--text-sec)]">
            A rotated signing secret, or something sending events that should not be. Both need a look.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <EventsTable events={events} showNote />
      </div>
    </section>
  );
}