'use client';

import { focusRingVar } from '../settings/theme/tokens';
import type { PlanTier } from './changePlanData';

interface Props {
  tier: PlanTier;
  rank: number;
  currentRank: number | null;
  mode: 'request' | 'choose';
  onRequest: (tier: PlanTier) => void;
}

export default function PlanOptionCard({ tier, rank, currentRank, mode, onRequest }: Props) {
  const isCurrent = currentRank !== null && rank === currentRank;
  const isAbove = currentRank === null || rank > currentRank;

  return (
    <section
      role="group"
      aria-label={`${tier.name} plan`}
      className={`flex flex-col h-full bg-[var(--surface)] rounded-[12px] p-6 ${
        isCurrent ? 'border-2 border-[var(--accent)]' : 'border border-[var(--border)]'
      }`}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-[18px] font-semibold text-[var(--text)]">{tier.name}</h3>
        {tier.popular && (
          <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[12px] font-medium whitespace-nowrap">
            Most popular
          </span>
        )}
      </div>

      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[30px] font-semibold text-[var(--text)] tabular-nums">
          ${tier.price}
        </span>
        <span className="text-[13px] text-[var(--text-sec)]">/ month</span>
      </p>

      <div className="mt-4 space-y-2">
        {tier.facts.map((f) => (
          <div key={f.text} className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center text-[var(--text-sec)] shrink-0">
              <i className={`${f.icon} text-[16px]`} />
            </span>
            <span className="text-[13px] text-[var(--text)]">{f.text}</span>
          </div>
        ))}
      </div>

      <div className="my-5 h-px bg-[var(--border)]" />

      <ul className="space-y-3 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="w-4 h-4 mt-0.5 flex items-center justify-center text-[var(--success)] shrink-0">
              <i className="ri-check-line text-[16px]" />
            </span>
            <span className="text-[13px] text-[var(--text)]">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {isCurrent ? (
          <button
            type="button"
            aria-disabled="true"
            tabIndex={-1}
            className="w-full h-9 rounded-full bg-[var(--muted)] text-[var(--text-sec)] text-[13px] font-medium cursor-default"
          >
            Your current plan
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onRequest(tier)}
            className={`w-full h-9 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none cursor-pointer ${focusRingVar} ${
              isAbove
                ? 'bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]'
                : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--border-strong)]'
            }`}
          >
            {mode === 'choose' ? `Choose ${tier.name}` : 'Request this plan'}
          </button>
        )}
      </div>
    </section>
  );
}