'use client';

import SectionHeading from '../SectionHeading';
import SetStatusPill from './SetStatusPill';
import PromptGroupBlock from './PromptGroupBlock';
import { setEditedCount, setMissing, setPrompts, setComplete, type PromptSet } from './data';

export default function PromptSetSection({
  set,
  onOpen,
}: {
  set: PromptSet;
  onOpen: (systemKey: string) => void;
}) {
  const count = setPrompts(set).length;
  const edited = setEditedCount(set);
  const missing = setMissing(set);
  const complete = setComplete(set);

  return (
    <section aria-label={set.label} className="mt-8">
      <div className="flex items-start justify-between gap-4">
        <SectionHeading title={set.label} purpose={set.note} />
        <div className="mt-0.5 shrink-0">
          <SetStatusPill complete={complete} missingCount={missing.length} />
        </div>
      </div>

      <p className="mb-3 text-[12px] tabular-nums text-[var(--muted-text)]">
        {count} of {set.expected} prompts · {edited} edited from default
      </p>

      <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-2">
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {set.groups.map((group) => (
            <div key={group.id} className="py-3 first:pt-2 last:pb-2">
              <PromptGroupBlock group={group} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>

      {set.phase === 2 && (
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-text)]">
          Phase 2 has no refine group. Catalog products are rebuilt from replaced photographs.
        </p>
      )}
    </section>
  );
}