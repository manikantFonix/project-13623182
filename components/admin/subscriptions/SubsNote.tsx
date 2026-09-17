'use client';

export default function SubsNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <p className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        Retailers on a free trial use the same allowance but are not billed until the trial ends.
        Included allowance is spent before any top-up pack, oldest pack first. Bottlenecks names the
        retailers already at zero; this list shows the ones heading there.
      </p>
    </div>
  );
}