'use client';

import GenerationFigure from './GenerationFigure';
import {
  CURRENT_VERSION,
  PINNED_VERSION,
  PROMPT_SET,
  RENDER_COUNT,
  REPAIR_PASSES,
  STEPS_TOTAL,
} from './data';

export default function GenerationSummary() {
  return (
    <section aria-label="What this generation came to" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <GenerationFigure
        label="Steps"
        value={String(STEPS_TOTAL)}
        caption="in this generation, in order below"
      />
      <GenerationFigure
        label="Images made"
        value={String(RENDER_COUNT)}
        caption={`${RENDER_COUNT} steps produced an image and were billed`}
      />
      <GenerationFigure
        label="Repair passes"
        value={String(REPAIR_PASSES)}
        caption="same as the retailer's Repair passes"
      />
      <GenerationFigure
        label="Prompt pinned"
        value={`${PROMPT_SET} v${PINNED_VERSION}`}
        caption={`the set reads version ${CURRENT_VERSION} today`}
      />
    </section>
  );
}