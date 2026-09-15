'use client';

export default function CatalogsEmptyState() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-6 py-14 flex flex-col items-center text-center">
      <span className="w-9 h-9 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
        <i className="ri-stack-line text-[20px]" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-[15px] font-semibold text-[var(--text)]">No catalogs yet</h3>
      <p className="mt-2 max-w-[460px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        Catalogs appear as retailers create them, published or not. Nothing to set up.
      </p>
    </div>
  );
}