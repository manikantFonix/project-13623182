'use client';

export default function GenerationAccessNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
        <i className="ri-shield-keyhole-line text-[15px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        <p className="font-semibold text-[var(--text)]">
          Administrators only. Any other session is told no such log exists.
        </p>
        <p className="mt-1">
          Deliberate, not a bug: a 403 would confirm the log exists; a 404 tells the requester
          nothing.
        </p>
      </div>
    </div>
  );
}