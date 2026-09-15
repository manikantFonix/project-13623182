'use client';

import { focusRing } from '../tokens';
import RoleTag from './RoleTag';
import PromptEditedPill from './PromptEditedPill';
import type { Prompt } from './data';

export default function PromptRow({
  prompt,
  onOpen,
}: {
  prompt: Prompt;
  onOpen: (systemKey: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(prompt.systemKey)}
      className={`w-full text-left px-4 py-3 flex items-start justify-between gap-4 rounded-[8px] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
    >
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold text-[var(--text)]">{prompt.label}</span>
          <RoleTag role={prompt.role} />
          <PromptEditedPill edited={prompt.edited} compact />
        </span>
        <span className="mt-1 block font-mono text-[12px] text-[var(--muted-text)] break-all">
          {prompt.systemKey}
        </span>
      </span>
      <span className="shrink-0 pt-0.5 h-9 px-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[12px] font-medium text-[var(--text)] flex items-center whitespace-nowrap">
        View
      </span>
    </button>
  );
}