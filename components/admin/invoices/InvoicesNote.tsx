'use client';

export default function InvoicesNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)] flex flex-col gap-2">
        <p>Every invoice can be opened in full or downloaded as a record.</p>
        <p>A failed payment is handled by the billing provider and the subscription lifecycle, not from here.</p>
      </div>
    </div>
  );
}