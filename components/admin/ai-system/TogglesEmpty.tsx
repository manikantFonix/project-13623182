'use client';

export default function TogglesEmpty() {
  return (
    <div className="rounded-[12px] border border-dashed border-[var(--border-strong)] bg-[var(--muted)] px-6 py-8 text-center">
      <span className="inline-flex w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] items-center justify-center text-[var(--text-sec)]">
        <i className="ri-toggle-line text-[18px]" aria-hidden="true" />
      </span>
      <h3 className="mt-3 text-[13px] font-semibold text-[var(--text)]">No feature toggles yet</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
        Platform-wide switches will appear here when there are any. Nothing is listed for now.
      </p>
    </div>
  );
}