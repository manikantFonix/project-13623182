'use client';

export default function EstimateNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <p className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        This audits a figure; it never corrects one. A mismatch means either the platform
        configuration or that retailer&rsquo;s own bench rate changed since it ran, and the audit
        trail under Settings records the platform side.
      </p>
    </div>
  );
}