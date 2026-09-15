'use client';

import PromptRow from './PromptRow';
import MissingRow from './MissingRow';
import type { PromptGroup } from './data';

export default function PromptGroupBlock({
  group,
  onOpen,
}: {
  group: PromptGroup;
  onOpen: (systemKey: string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 px-4 pb-1">
        <h4 className="text-[13px] font-semibold text-[var(--text)]">{group.label}</h4>
        <span className="text-[12px] tabular-nums text-[var(--muted-text)] whitespace-nowrap">
          {group.prompts.length} of {group.prompts.length + group.missing.length}
        </span>
      </div>
      <p className="px-4 pb-2 text-[12px] leading-relaxed text-[var(--text-sec)]">{group.note}</p>
      <div className="flex flex-col gap-1">
        {group.prompts.map((prompt) => (
          <PromptRow key={prompt.systemKey} prompt={prompt} onOpen={onOpen} />
        ))}
        {group.missing.map((missing) => (
          <MissingRow key={missing.systemKey} missing={missing} />
        ))}
      </div>
    </div>
  );
}