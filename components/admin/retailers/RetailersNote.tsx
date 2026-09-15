'use client';

export default function RetailersNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <p className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        An account is disabled, never deleted. Enabling restores access but republishes nothing.
      </p>
    </div>
  );
}