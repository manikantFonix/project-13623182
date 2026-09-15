'use client';

export default function SectionHeading({
  title,
  purpose,
  period,
}: {
  title: string;
  purpose?: string;
  period?: string;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--text)]">{title}</h2>
        {period && (
          <span className="text-[12px] font-medium text-[var(--muted-text)] tabular-nums whitespace-nowrap">
            {period}
          </span>
        )}
      </div>
      {purpose && <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--text-sec)]">{purpose}</p>}
    </div>
  );
}