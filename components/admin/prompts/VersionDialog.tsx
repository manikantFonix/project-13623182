'use client';

import { useRef, useState } from 'react';
import PromptsDialog from './PromptsDialog';
import { focusRing } from '../tokens';
import { fmtStamp, phaseLabel, type Prompt, type PromptVersion } from './data';

export default function VersionDialog({
  prompt,
  version,
  categoryName,
  onClose,
  onRollback,
}: {
  prompt: Prompt;
  version: PromptVersion;
  categoryName: string;
  onClose: () => void;
  onRollback: () => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState('');

  const copyText = (text: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(
      () => setCopied('Version text copied.'),
      () => setCopied('The version text could not be copied.')
    );
  };

  return (
    <PromptsDialog labelledBy="version-dialog-title" onClose={onClose} initialFocus={safeRef} size="lg">
      <h2 id="version-dialog-title" className="text-[18px] font-semibold text-[var(--text)]">
        Version {version.version} of {prompt.label}
      </h2>
      <p className="mt-1 text-[12px] text-[var(--text-sec)]">
        {categoryName} · {phaseLabel(prompt.phase)} · {prompt.groupLabel}
      </p>

      <dl className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-2">
        <div className="flex items-baseline justify-between gap-4 py-1.5">
          <dt className="text-[12px] text-[var(--text-sec)]">Saved</dt>
          <dd className="text-[13px] tabular-nums text-[var(--text)]">{fmtStamp(version.savedAt)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-1.5">
          <dt className="text-[12px] text-[var(--text-sec)]">Saved by</dt>
          <dd className="text-[13px] text-[var(--text)]">{version.savedBy}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-1.5">
          <dt className="text-[12px] text-[var(--text-sec)]">Referenced by renders</dt>
          <dd className="text-[13px] text-[var(--text)]">
            {version.referencedByRenders ? 'Yes' : 'No'}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-1.5">
          <dt className="text-[12px] text-[var(--text-sec)]">What changed</dt>
          <dd className="text-[13px] text-[var(--text)] text-right">{version.changeNote}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <span className="block text-[12px] font-semibold text-[var(--text)]">Version text</span>
        <pre className="mt-1.5 max-h-[260px] overflow-y-auto whitespace-pre-wrap break-words rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-3 py-2 font-mono text-[13px] leading-relaxed text-[var(--text)]">
          {version.text}
        </pre>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => copyText(version.text)}
            className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
          >
            <span className="inline-flex items-center gap-1.5">
              <i className="ri-file-copy-line text-[15px]" aria-hidden="true" />
              Copy text
            </span>
          </button>
          <span aria-live="polite" className="text-[12px] text-[var(--text-sec)]">
            {copied}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onClose}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
        >
          Close
        </button>
        <button
          type="button"
          onClick={onRollback}
          className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium text-[var(--alert)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--alert)]/10 ${focusRing}`}
        >
          Roll back to this version
        </button>
      </div>
    </PromptsDialog>
  );
}