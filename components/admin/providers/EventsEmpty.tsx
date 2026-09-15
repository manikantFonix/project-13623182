'use client';

export default function EventsEmpty() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-6 py-8 flex items-start gap-3">
      <span className="mt-0.5 w-5 h-5 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-inbox-line text-[20px]" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-[13px] font-semibold text-[var(--text)]">No events received yet</h3>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
          Ordinary on a new configuration. Events appear here as the provider sends them.
        </p>
      </div>
    </div>
  );
}