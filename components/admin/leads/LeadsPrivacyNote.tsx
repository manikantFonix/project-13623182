'use client';

export default function LeadsPrivacyNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
        <i className="ri-lock-2-line text-[15px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        <p className="font-semibold text-[var(--text)]">
          There is no route to a consumer's details, and that is by design.
        </p>
        <p className="mt-1">
          Only the retailer who received it can read it. This screen reports volume and outcome only.
        </p>
      </div>
    </div>
  );
}