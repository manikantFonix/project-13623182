'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { useWidgetState } from './store';
import { widgetRing } from './data';
import EstimateFormStep from './EstimateFormStep';
import EstimateCalculating from './EstimateCalculating';
import EstimateResultStep from './EstimateResultStep';
import type { EstimateResult } from './types';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function EstimateModal({
  open,
  returnFocusRef,
  onSendToJeweler,
}: {
  open: boolean;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onSendToJeweler: (estimate: EstimateResult | null) => void;
}) {
  const [state, update] = useWidgetState();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    update({
      estimateOpen: false,
      estimateStep: 'form',
      estimateRunning: false,
    });
    requestAnimationFrame(() => returnFocusRef.current?.focus());
  };

  const sendToJeweler = (estimate: EstimateResult | null) => {
    update({
      estimateOpen: false,
      estimateStep: 'form',
      estimateRunning: false,
    });
    onSendToJeweler(estimate);
  };

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((n) => n.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open || state.estimateStep !== 'calculating') return;
    if (!state.estimateRunning) return;
    const t = setTimeout(
      () => update({ estimateStep: 'result', estimateRunning: false }),
      900
    );
    return () => clearTimeout(t);
  }, [open, state.estimateStep, state.estimateRunning, update]);

  if (!open) return null;

  const step = state.estimateStep;

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
      <div
        aria-hidden="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Price estimate"
        className="w-sheet relative w-full sm:max-w-[480px] max-h-[90vh] sm:max-h-[calc(100vh-48px)] overflow-y-auto rounded-t-[16px] sm:rounded-[16px] border border-[var(--w-border)]"
        style={{
          backgroundColor: 'var(--w-surface)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex justify-end px-4 pt-4">
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150 ${widgetRing}`}
            style={{
              backgroundColor: 'var(--w-border)',
              color: 'var(--w-text-sec)',
            }}
          >
            <i className="ri-close-line text-[16px] w-4 h-4 flex items-center justify-center" />
          </button>
        </div>

        <p aria-live="polite" className="sr-only">
          {step === 'result' ? 'Estimate ready.' : ''}
        </p>

        <div className="px-6 pb-6 pt-1">
          {step === 'form' && <EstimateFormStep />}
          {step === 'calculating' && <EstimateCalculating />}
          {step === 'result' && <EstimateResultStep onSend={sendToJeweler} />}
        </div>
      </div>

      <style>{`.w-spin.anim-spin{animation:w-spin 800ms linear infinite;}@keyframes w-spin{to{transform:rotate(360deg);}}@media (prefers-reduced-motion: no-preference){.w-sheet{animation:w-rise 220ms ease-out;}}@media (prefers-reduced-motion: no-preference) and (min-width:640px){.w-sheet{animation:w-pop 180ms ease-out;}}@keyframes w-rise{from{transform:translateY(14px);opacity:.65;}to{transform:none;opacity:1;}}@keyframes w-pop{from{transform:scale(.985);opacity:.65;}to{transform:none;opacity:1;}}@media (prefers-reduced-motion: reduce){.w-spin.anim-spin{animation:none;}}`}</style>
    </div>
  );
}