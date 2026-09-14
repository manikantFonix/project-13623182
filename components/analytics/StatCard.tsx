'use client';

export default function StatCard({
  icon,
  value,
  label,
  hint,
}: {
  icon: string;
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5 min-h-[176px] flex flex-col">
      <div className="w-10 h-10 rounded-[12px] bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
        <i className={`${icon} text-[20px]`} />
      </div>
      <div className="mt-3 text-[26px] font-semibold tabular-nums leading-none text-[var(--text)]">
        {value}
      </div>
      <div className="mt-1 text-[13px] text-[var(--text-sec)]">{label}</div>
      {hint && <div className="mt-1 text-[12px] text-[var(--text-sec)] leading-relaxed">{hint}</div>}
    </div>
  );
}