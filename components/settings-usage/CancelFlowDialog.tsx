'use client';

import { useEffect, useRef, useState } from 'react';
import { focusRingVar } from '../settings/theme/tokens';
import { useCancelFocus } from './useCancelFocus';
import { cancelFlowPreview, tierBelow, type CancelStep } from './cancelFlowData';
import type { PlanId, PlanTier } from './changePlanData';
import CancelVerifyStep from './CancelVerifyStep';
import CancelCodeStep from './CancelCodeStep';
import CancelConsequencesStep from './CancelConsequencesStep';
import CancelSmallerPlanStep from './CancelSmallerPlanStep';
import CancelReasonStep from './CancelReasonStep';
import CancelConfirmStep from './CancelConfirmStep';
import CancelOutcomeStep from './CancelOutcomeStep';

interface Props {
  open: boolean;
  onClose: () => void;
  onChangePlan: (tier: PlanTier) => void;
  currentPlanId: PlanId;
  forced?: ReturnType<typeof cancelFlowPreview>;
}

export default function CancelFlowDialog({ open, onClose, onChangePlan, currentPlanId, forced }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<CancelStep>('verify');
  const [submitting, setSubmitting] = useState(false);

  const previewKey = forced
    ? `${forced.step}:${forced.submitting}:${forced.error}:${forced.codeError}:${forced.reasonOther}:${forced.currentPlanId}`
    : 'manual';

  useEffect(() => {
    if (!open) return;
    if (forced) {
      setStep(forced.step);
      setSubmitting(forced.submitting);
    } else {
      setStep('verify');
      setSubmitting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, previewKey]);

  useCancelFocus(open, containerRef, `${step}-${submitting}`);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const plan = forced?.currentPlanId ?? currentPlanId;
  const below = tierBelow(plan);
  const reasonOther = forced?.reasonOther ?? false;

  const submit = () => {
    if (submitting) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      if (forced?.error) return;
      setStep('outcome');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="fixed inset-0 bg-[rgba(22,35,62,0.4)]" onClick={onClose} />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Cancel your subscription"
        className="relative w-full sm:w-[520px] bg-[var(--surface)] border border-[var(--border)] rounded-t-[16px] sm:rounded-[12px] p-7 max-h-[92vh] overflow-y-auto pb-[calc(28px_+_env(safe-area-inset-bottom))] sm:pb-7"
      >
        {step !== 'outcome' && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`absolute top-6 right-6 w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 motion-reduce:transition-none cursor-pointer ${focusRingVar}`}
          >
            <i className="ri-close-line text-[16px] w-4 h-4 flex items-center justify-center" />
          </button>
        )}

        {step === 'verify' && <CancelVerifyStep onSend={() => setStep('code')} onKeep={onClose} />}
        {step === 'code' && (
          <CancelCodeStep
            initialError={forced?.codeError ?? null}
            onContinue={() => setStep('consequences')}
            onKeep={onClose}
          />
        )}
        {step === 'consequences' && (
          <CancelConsequencesStep
            onContinue={() => setStep(below ? 'smaller' : 'reason')}
            onKeep={onClose}
          />
        )}
        {step === 'smaller' && below && (
          <CancelSmallerPlanStep
            tier={below}
            onPickTier={(t) => onChangePlan(t)}
            onContinue={() => setStep('reason')}
            onKeep={onClose}
          />
        )}
        {step === 'reason' && (
          <CancelReasonStep
            initialOther={reasonOther}
            onContinue={() => setStep('confirm')}
            onKeep={onClose}
          />
        )}
        {step === 'confirm' && (
          <CancelConfirmStep
            error={forced?.error ?? false}
            submitting={submitting}
            onCancel={submit}
            onKeep={onClose}
          />
        )}
        {step === 'outcome' && <CancelOutcomeStep onClose={onClose} />}
      </div>
    </div>
  );
}