'use client';

export default function ActivitySingleAdminNote() {
  return (
    <p className="flex items-center gap-2 text-[12px] font-medium text-[var(--text-sec)]">
      <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-user-settings-line text-[14px]" aria-hidden="true" />
      </span>
      The console is operated from a single administrator account, so entries do not name one.
    </p>
  );
}