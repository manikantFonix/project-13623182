'use client';

export default function RecordsAccessNotice() {
  return (
    <p role="note" className="mt-3 flex items-center gap-2 text-[12px] font-medium text-[var(--text-sec)]">
      <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-lock-2-line text-[14px]" aria-hidden="true" />
      </span>
      Opening a record is logged.
    </p>
  );
}