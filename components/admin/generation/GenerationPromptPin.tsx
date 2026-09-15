'use client';

import { CURRENT_VERSION, PINNED_VERSION, PROMPT_SET } from './data';

export default function GenerationPromptPin() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
        <i className="ri-pushpin-2-line text-[15px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)]">
        <p className="font-semibold text-[var(--text)]">
          Prompts below are the version pinned to this product, not today's.
        </p>
        <p className="mt-1">
          This generation used version {PINNED_VERSION} of the {PROMPT_SET} set; the set reads version{' '}
          {CURRENT_VERSION} today. The current text is never substituted.
        </p>
        <p className="mt-1">
          Each step carries its exact prompt, model and settings.
        </p>
      </div>
    </div>
  );
}