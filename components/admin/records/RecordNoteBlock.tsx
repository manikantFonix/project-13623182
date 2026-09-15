'use client';

export default function RecordNoteBlock({ note }: { note: string }) {
  return (
    <section className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 flex items-center justify-center text-[var(--muted-text)]">
          <i className="ri-sticky-note-line text-[16px]" aria-hidden="true" />
        </span>
        <h2 className="text-[13px] font-semibold text-[var(--text)]">Retailer's note</h2>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-[var(--text)]">{note}</p>
    </section>
  );
}