'use client';

import { useRef, useState } from 'react';
import PromptsDialog from './PromptsDialog';
import PromptEditor from './PromptEditor';
import VersionList from './VersionList';
import RoleTag from './RoleTag';
import PromptEditedPill from './PromptEditedPill';
import { focusRing } from '../tokens';
import { phaseLabel, type Prompt } from './data';

export type PromptTab = 'text' | 'history';

const secondaryButton = `h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-50 ${focusRing}`;
const primaryButton = `h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-default ${focusRing}`;

export default function PromptDialog({
  prompt,
  categoryName,
  mode,
  tab,
  draft,
  submitting,
  failed,
  onTab,
  onDraftChange,
  onEdit,
  onClose,
  onSave,
  onOpenVersion,
}: {
  prompt: Prompt;
  categoryName: string;
  mode: 'view' | 'edit';
  tab: PromptTab;
  draft: string;
  submitting: boolean;
  failed: boolean;
  onTab: (tab: PromptTab) => void;
  onDraftChange: (value: string) => void;
  onEdit: () => void;
  onClose: () => void;
  onSave: () => void;
  onOpenVersion: (version: number) => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState('');

  const copyText = (text: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(
      () => setCopied('Prompt text copied.'),
      () => setCopied('The prompt text could not be copied.')
    );
  };

  const meta = `${categoryName} · ${phaseLabel(prompt.phase)} · ${prompt.groupLabel}`;

  return (
    <PromptsDialog labelledBy="prompt-dialog-title" onClose={onClose} initialFocus={safeRef} size="lg">
      <div className="flex flex-wrap items-center gap-2">
        <RoleTag role={prompt.role} />
        <PromptEditedPill edited={prompt.edited} />
      </div>
      <h2 id="prompt-dialog-title" className="mt-3 text-[18px] font-semibold text-[var(--text)]">
        {prompt.label}
      </h2>
      <p className="mt-1 text-[12px] text-[var(--text-sec)]">{meta}</p>
      <p className="mt-1 font-mono text-[12px] text-[var(--muted-text)] break-all">
        {prompt.systemKey}
      </p>

      <div className="mt-5 flex gap-1 p-1 rounded-full bg-[var(--muted)]" role="tablist" aria-label="Prompt detail">
        {([
          { value: 'text', label: 'Prompt text' },
          { value: 'history', label: `Version history (${prompt.versions.length})` },
        ] as { value: PromptTab; label: string }[]).map((option) => {
          const active = tab === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={submitting}
              onClick={() => onTab(option.value)}
              className={`flex-1 h-7 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                active
                  ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                  : 'text-[var(--text-sec)] hover:text-[var(--text)]'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {tab === 'history' ? (
        <VersionList prompt={prompt} onOpenVersion={onOpenVersion} />
      ) : mode === 'edit' ? (
        <PromptEditor
          label={`Prompt text — ${categoryName}, ${phaseLabel(prompt.phase)}, ${prompt.groupLabel}, ${prompt.label}`}
          draft={draft}
          onDraftChange={onDraftChange}
          submitting={submitting}
          failed={failed}
        />
      ) : (
        <div className="mt-5">
          <span className="block text-[12px] font-semibold text-[var(--text)]">Prompt text</span>
          <pre className="mt-1.5 max-h-[300px] overflow-y-auto whitespace-pre-wrap break-words rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-3 py-2 font-mono text-[13px] leading-relaxed text-[var(--text)]">
            {prompt.text}
          </pre>
          <div className="mt-3 flex items-center gap-3">
            <button type="button" onClick={() => copyText(prompt.text)} className={secondaryButton}>
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-file-copy-line text-[15px]" aria-hidden="true" />
                Copy text
              </span>
            </button>
            <span aria-live="polite" className="text-[12px] text-[var(--text-sec)]">
              {copied}
            </span>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
            Takes effect on the next generation. Running jobs keep their pinned version.
          </p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-end gap-3">
        {mode === 'edit' && tab === 'text' ? (
          <>
            <button ref={safeRef} type="button" onClick={onClose} disabled={submitting} className={secondaryButton}>
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={submitting || draft.trim().length === 0 || draft === prompt.text}
              className={primaryButton}
            >
              {submitting ? 'Saving' : 'Save as a new version'}
            </button>
          </>
        ) : (
          <>
            <button ref={safeRef} type="button" onClick={onClose} className={primaryButton}>
              Close
            </button>
            {tab === 'text' && (
              <button type="button" onClick={onEdit} className={secondaryButton}>
                Edit prompt
              </button>
            )}
          </>
        )}
      </div>
    </PromptsDialog>
  );
}