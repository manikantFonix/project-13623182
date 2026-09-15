'use client';

export default function CatalogFigure({
  label,
  value,
  caption,
  attention = false,
}: {
  label: string;
  value: string;
  caption: string;
  attention?: boolean;
}) {
  return (
    <div
      className={`h-full rounded-[12px] border p-5 flex flex-col ${
        attention
          ? 'bg-[var(--amber-bg)] border-[var(--border-strong)]'
          : 'bg-[var(--surface)] border-[var(--border)]'
      }`}
    >
      <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">
        {attention && (
          <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--alert-strong)]">
            <i className="ri-alert-line text-[14px]" aria-hidden="true" />
          </span>
        )}
        {label}
      </p>
      <p
        className={`mt-3 text-[28px] font-semibold leading-none tracking-[-0.02em] tabular-nums ${
          attention ? 'text-[var(--alert-strong)]' : 'text-[var(--text)]'
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-sec)]">{caption}</p>
    </div>
  );
}