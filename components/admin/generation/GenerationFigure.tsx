'use client';

export default function GenerationFigure({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="h-full rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col">
      <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">
        {label}
      </p>
      <p className="mt-3 text-[28px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[var(--text)]">
        {value}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-sec)]">{caption}</p>
    </div>
  );
}