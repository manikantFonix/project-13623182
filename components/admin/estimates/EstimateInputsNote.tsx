'use client';

export default function EstimateInputsNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
        <i className="ri-archive-stack-line text-[15px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        <p className="font-semibold text-[var(--text)]">
          A recompute compares a figure; it never moves it.
        </p>
        <p className="mt-1">
          Every estimate keeps its own inputs as values, so a recompute runs exactly what the original
          ran.
        </p>
        <p className="mt-1">
          A difference means the calculation changed, not the data. Nothing is written; the stored
          range stays as it was.
        </p>
      </div>
    </div>
  );
}