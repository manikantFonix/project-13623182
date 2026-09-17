'use client';

export default function CancellationsNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <p className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        A reason on its own is an opinion; the usage beside it is what turns it into a finding. This
        screen is read-only and changes nothing about any subscription.
      </p>
    </div>
  );
}