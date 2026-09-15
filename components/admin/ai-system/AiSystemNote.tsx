'use client';

export default function AiSystemNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)] flex flex-col gap-2">
        <p>Changes apply to the next generation. Running jobs continue on the version they started with.</p>
        <p>
          Changing a provider or model does not alter the renders already produced. The Ageing Request
          Threshold is read by the Bottlenecks screen.
        </p>
        <p>These settings are platform-wide. There are no per-retailer overrides.</p>
      </div>
    </div>
  );
}