'use client';

export default function PlansNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)] flex flex-col gap-2">
        <p>A plan is archived, never deleted. Archiving only stops new retailers being added.</p>
        <p>Top-up packs expire when a subscription ends.</p>
        <p>Feature gating is shown here, not editable. A retailer is moved between plans on their own record.</p>
      </div>
    </div>
  );
}