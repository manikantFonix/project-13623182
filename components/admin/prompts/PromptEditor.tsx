'use client';

import { focusRing } from '../tokens';

export default function PromptEditor({
  label,
  draft,
  onDraftChange,
  submitting,
  failed,
}: {
  label: string;
  draft: string;
  onDraftChange: (value: string) => void;
  submitting: boolean;
  failed: boolean;
}) {
  return (
    <div className="mt-5">
      <label htmlFor="prompt-text" className="block text-[12px] font-semibold text-[var(--text)]">
        {label}
      </label>
      <textarea
        id="prompt-text"
        rows={10}
        value={draft}
        disabled={submitting}
        spellCheck={false}
        onChange={(event) => onDraftChange(event.target.value)}
        className={`mt-1.5 w-full max-h-[320px] rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-3 py-2 font-mono text-[13px] leading-relaxed text-[var(--text)] resize-y transition-colors duration-150 ${focusRing}`}
      />
      <p aria-live="polite" className="mt-1.5 text-[12px] tabular-nums text-[var(--text-sec)]">
        {draft.length} characters
      </p>

      <p className="mt-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
        Takes effect on the next generation. Running jobs keep their pinned version.
      </p>

      {failed && (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--alert-strong)]"
        >
          The save failed. The prompt is unchanged and still generating on its current version.
        </p>
      )}
    </div>
  );
}