'use client';

export default function EstimatorNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)] flex flex-col gap-2">
        <p>Changing any of these never alters an existing estimate. Estimates keep the figures they were shown.</p>
        <p>Changes apply to estimates produced after the save. These settings are platform-wide.</p>
      </div>
    </div>
  );
}