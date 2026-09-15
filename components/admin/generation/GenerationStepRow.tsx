'use client';

import StepStatusPill from './StepStatusPill';
import RenderCostChip from './RenderCostChip';
import { focusRing } from '../tokens';
import { operationLabels, statusLabels, type LogStep } from './data';

export default function GenerationStepRow({
  step,
  position,
  onOpen,
}: {
  step: LogStep;
  position: number;
  onOpen: (id: string) => void;
}) {
  const label = step.score ? `${statusLabels[step.status]} ${step.score}` : statusLabels[step.status];

  return (
    <li className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-[var(--muted)] flex items-center justify-center text-[12px] font-medium tabular-nums text-[var(--text-sec)]">
          {position}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-[13px] font-semibold text-[var(--text)]">{step.view}</span>
            <span className="text-[13px] text-[var(--text-sec)]">· {operationLabels[step.operation]}</span>
            <StepStatusPill status={step.status} label={label} />
            <span className="ml-auto flex items-center gap-3">
              <RenderCostChip costsRender={step.costsRender} />
              <span className="text-[12px] tabular-nums text-[var(--muted-text)]">{step.time}</span>
            </span>
          </div>

          <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--text-sec)]">{step.summary}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--muted)] pt-3.5">
        <span className="flex items-center gap-2 text-[12px]">
          {step.artefact ? (
            <>
              <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
                <i className="ri-image-line text-[15px]" aria-hidden="true" />
              </span>
              <span className="font-mono text-[12px] text-[var(--text)]">{step.artefact}</span>
            </>
          ) : (
            <>
              <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
                <i className="ri-subtract-line text-[15px]" aria-hidden="true" />
              </span>
              <span className="text-[var(--text-sec)]">No image produced</span>
            </>
          )}
        </span>

        <button
          type="button"
          onClick={() => onOpen(step.id)}
          className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
        >
          View prompt and images
        </button>
      </div>
    </li>
  );
}