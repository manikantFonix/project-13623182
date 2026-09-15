'use client';

export default function RenderCostChip({ costsRender }: { costsRender: boolean }) {
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[12px] font-medium whitespace-nowrap ${
        costsRender
          ? 'border-[var(--border-strong)] bg-[var(--muted)] text-[var(--text)]'
          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted-text)]'
      }`}
    >
      <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
        <i
          className={`${costsRender ? 'ri-image-add-line' : 'ri-subtract-line'} text-[13px]`}
          aria-hidden="true"
        />
      </span>
      {costsRender ? 'Costs a render' : 'No render cost'}
    </span>
  );
}