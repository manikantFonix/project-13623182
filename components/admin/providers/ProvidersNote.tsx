'use client';

export default function ProvidersNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)] flex flex-col gap-2">
        <p>Keys are entered once. Only the last few characters are kept, and the value cannot be read back.</p>
        <p>Every webhook event is logged, including the ones that fail signature verification.</p>
        <p>The platform never holds or disburses money, so there are no payouts to configure.</p>
      </div>
    </div>
  );
}