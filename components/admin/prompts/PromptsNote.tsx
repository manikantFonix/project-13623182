'use client';

export default function PromptsNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)] flex flex-col gap-2">
        <p>Every save creates a new version. Nothing is overwritten and no version is deleted.</p>
        <p>
          A version referenced by a render is kept, so the generation log can show the exact prompt
          a product was made with months later.
        </p>
        <p>A category missing any prompt in its set fails generation. Nothing is substituted.</p>
      </div>
    </div>
  );
}