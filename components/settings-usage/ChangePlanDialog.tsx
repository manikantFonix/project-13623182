'use client';

import { useEffect, useRef, useState } from 'react';
import { focusRingVar } from '../settings/theme/tokens';
import { usePlanDialogFocus } from './usePlanDialogFocus';
import {
  planRanks,
  planTierById,
  planTiers,
  type ChangePlanView,
  type PlanId,
  type PlanTier,
} from './changePlanData';
import PlanOptionCard from './PlanOptionCard';
import PlanChangeResult from './PlanChangeResult';

interface Props {
  open: boolean;
  onClose: () => void;
  variant: 'change' | 'first';
  currentPlanId: PlanId | null;
  initialView: ChangePlanView;
  initialError: boolean;
  narrow: boolean;
}

export default function ChangePlanDialog({
  open,
  onClose,
  variant,
  currentPlanId,
  initialView,
  initialError,
  narrow,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ChangePlanView>(initialView);
  const [error, setError] = useState(initialError);
  const [requestedId, setRequestedId] = useState<PlanId>(currentPlanId ?? 'catalog');

  usePlanDialogFocus(open, containerRef);

  useEffect(() => {
    if (open) {
      setView(initialView);
      setError(initialError);
      setRequestedId(currentPlanId ?? 'catalog');
    }
  }, [open, initialView, initialError, currentPlanId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const first = variant === 'first';
  const currentRank = currentPlanId ? planRanks[currentPlanId] : null;
  const currentName = currentPlanId ? planTierById[currentPlanId].name : undefined;

  const request = (tier: PlanTier) => {
    setRequestedId(tier.id);
    setError(false);
    setView('sent');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-[rgba(22,35,62,0.4)]" onClick={onClose} />
      <div className="relative min-h-full flex items-center justify-center p-6">
        <div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={variant === 'first' ? 'Choose your plan' : 'Change your plan'}
          className={`relative w-full ${narrow ? 'max-w-[560px]' : 'max-w-[1040px]'} bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-8`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`absolute top-6 right-6 w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 motion-reduce:transition-none cursor-pointer ${focusRingVar}`}
          >
            <i className="ri-close-line text-[16px] w-4 h-4 flex items-center justify-center" />
          </button>

          {view === 'sent' ? (
            <PlanChangeResult
              variant={variant}
              requestedName={planTierById[requestedId].name}
              currentName={currentName}
              onClose={onClose}
            />
          ) : (
            <>
              <h2 className="pr-12 text-[22px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                {first ? 'Choose your plan' : 'Change your plan'}
              </h2>
              <p className="mt-1.5 max-w-[760px] text-[13px] text-[var(--text-sec)]">
                Every plan includes the full design workflow. What changes is how many renders you get, how many people can use the account, and where your customers can reach you.
              </p>

              {error && (
                <p className="mt-4 text-[13px] text-[var(--alert)]">
                  We couldn't send that. Nothing has changed — try again.
                </p>
              )}

              <div
                className={`mt-6 grid gap-5 ${narrow ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}
              >
                {planTiers.map((tier, rank) => (
                  <PlanOptionCard
                    key={tier.id}
                    tier={tier}
                    rank={rank}
                    currentRank={currentRank}
                    mode={first ? 'choose' : 'request'}
                    onRequest={request}
                  />
                ))}
              </div>

              <p className="mt-5 text-center text-[12px] text-[var(--text-sec)]">
                {first
                  ? "Plans are set up by our team — we'll confirm the details and the timing with you."
                  : "Plan changes are handled by our team — we'll confirm the details and the timing with you."}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}