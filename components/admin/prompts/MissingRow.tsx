'use client';

import RoleTag from './RoleTag';
import type { MissingPrompt } from './data';

export default function MissingRow({ missing }: { missing: MissingPrompt }) {
  return (
    <div className="px-4 py-3 flex items-start justify-between gap-4 rounded-[8px] border border-[var(--alert)] bg-[var(--amber-bg)]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold text-[var(--text)]">{missing.label}</span>
          <RoleTag role={missing.role} />
          <span className="inline-flex items-center h-5 px-2 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[11px] font-semibold text-[var(--alert-strong)] whitespace-nowrap">
            Missing
          </span>
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
          Not present. This category fails generation with PROMPT_MISSING until it is written.
        </p>
        <p className="mt-1 font-mono text-[12px] text-[var(--muted-text)] break-all">
          {missing.systemKey}
        </p>
      </div>
    </div>
  );
}