'use client';

import CancelTile from './CancelTile';
import CancelActions from './CancelActions';
import { focusRingVar } from '../settings/theme/tokens';
import type { PlanTier } from './changePlanData';

interface Props {
  tier: PlanTier;
  onPickTier: (tier: PlanTier) => void;
  onContinue: () => void;
  onKeep: () => void;
}

export default function CancelSmallerPlanStep({ tier, onPickTier, onContinue, onKeep }: Props) {
  const renders = tier.facts[0]?.text.replace(' a month', '') ?? '';
  const seats = tier.facts[1]?.text ?? '';
  return (
    <div aria-live="polite">
      <CancelTile icon="ri-arrow-down-line" variant="muted" />
      <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
        Would a smaller plan work?
      </h2>
      <p className="mt-2 text-[13px] text-[var(--text)]">
        If it's about volume or cost, you can move down instead of stopping. Your catalogs stay published either way.
      </p>

      <button
        type="button"
        onClick={() => onPickTier(tier)}
        className={`mt-4 w-full flex items-center justify-between gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-4 text-left hover:border-[var(--border-strong)] transition-colors duration-150 motion-reduce:transition-none cursor-pointer ${focusRingVar}`}
      >
        <span>
          <span className="block text-[15px] font-medium text-[var(--text)]">{tier.name}</span>
          <span className="mt-0.5 block text-[13px] text-[var(--text-sec)] tabular-nums">
            ${tier.price} a month · {renders} · {seats}
          </span>
        </span>
        <span className="w-5 h-5 flex items-center justify-center text-[var(--text-sec)] shrink-0">
          <i className="ri-arrow-right-s-line text-[20px]" />
        </span>
      </button>

      <CancelActions continueLabel="No thanks, continue" onContinue={onContinue} onKeep={onKeep} />
    </div>
  );
}