'use client';

export default function LeadsNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <p className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        Deciding a lead never messages the consumer; it is a note the retailer keeps. A high
        undecided count is a jeweler not picking up the phone.
      </p>
    </div>
  );
}