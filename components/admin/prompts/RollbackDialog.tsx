'use client';

import { useRef } from 'react';
import PromptsDialog from './PromptsDialog';
import { focusRing } from '../tokens';
import { fmtStamp, type Prompt, type PromptVersion } from './data';

export default function RollbackDialog({
  prompt,
  version,
  submitting,
  failed,
  onCancel,
  onConfirm,
}: {
  prompt: Prompt;
  version: PromptVersion;
  submitting: boolean;
  failed: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);

  return (
    <PromptsDialog labelledBy="rollback-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="rollback-title" className="text-[18px] font-semibold text-[var(--text)]">
        Roll back {prompt.label} to version {version.version}?
      </h2>
      <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text-sec)]">
        Saved {fmtStamp(version.savedAt)} by {version.savedBy}. It takes effect on the next
        generation, and running jobs keep their pinned version.
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-sec)]">
        A new version is created from this text. Version {version.version} is not restored in place
        and the history stays complete.
      </p>

      <dl className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-2">
        <div className="flex items-baseline justify-between gap-4 py-1.5">
          <dt className="text-[12px] text-[var(--text-sec)]">Prompt</dt>
          <dd className="font-mono text-[12px] text-[var(--text)] break-all">{prompt.systemKey}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-1.5">
          <dt className="text-[12px] text-[var(--text-sec)]">Rolling back to</dt>
          <dd className="text-[13px] tabular-nums text-[var(--text)]">Version {version.version}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-1.5">
          <dt className="text-[12px] text-[var(--text-sec)]">Current version</dt>
          <dd className="text-[13px] tabular-nums text-[var(--text)]">
            Version {prompt.versions.reduce((max, item) => Math.max(max, item.version), 0)}
          </dd>
        </div>
      </dl>

      {failed && (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--alert-strong)]"
        >
          The rollback failed. The prompt is unchanged and still generating on its current version.
        </p>
      )}

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Saving the rollback' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 ${focusRing}`}
        >
          Keep current version
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium text-[var(--alert)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--alert)]/10 disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[var(--surface)] ${focusRing}`}
        >
          {submitting ? 'Rolling back' : `Roll back to version ${version.version}`}
        </button>
      </div>
    </PromptsDialog>
  );
}