'use client';

export default function SetStatusPill({
  complete,
  missingCount,
}: {
  complete: boolean;
  missingCount: number;
}) {
  if (complete) {
    return (
      <span className="inline-flex items-center h-6 px-2.5 rounded-full border border-[var(--border)] bg-[var(--muted)] text-[11px] font-medium text-[var(--text-sec)] whitespace-nowrap">
        Complete
      </span>
    );
  }
  return (
    <span className="inline-flex items-center h-6 px-2.5 rounded-full border border-[var(--alert)] bg-[var(--amber-bg)] text-[11px] font-semibold text-[var(--alert-strong)] whitespace-nowrap">
      Incomplete · {missingCount} missing
    </span>
  );
}