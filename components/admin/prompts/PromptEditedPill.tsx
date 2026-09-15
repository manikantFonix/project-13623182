'use client';

export default function PromptEditedPill({
  edited,
  compact = false,
}: {
  edited: boolean;
  compact?: boolean;
}) {
  if (!edited) return null;
  return (
    <span className="inline-flex items-center h-5 px-2 rounded-full border border-[var(--border-strong)] bg-[var(--muted)] text-[11px] font-medium text-[var(--text-sec)] whitespace-nowrap">
      {compact ? 'Edited' : 'Edited from default'}
    </span>
  );
}