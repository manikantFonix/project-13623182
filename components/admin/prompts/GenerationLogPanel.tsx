'use client';

import { useEffect, useRef } from 'react';
import { focusRing } from '../tokens';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function GenerationLogPanel({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();
    return () => {
      restoreRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null || n === document.activeElement
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Generation log"
        ref={panelRef}
        tabIndex={-1}
        className="relative ml-auto flex flex-col w-full max-w-[960px] h-full bg-[var(--canvas)] overflow-hidden focus:outline-none border-l border-[var(--border)]"
      >
        <div className="flex items-center justify-between px-7 h-14 border-b border-[var(--border)] bg-[var(--surface)] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 flex items-center justify-center text-[var(--text-sec)]">
              <i className="ri-history-line text-[18px]" aria-hidden="true" />
            </span>
            <span className="text-[15px] font-semibold text-[var(--text)]">Generation log</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close generation log"
            className={`w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text-sec)] hover:bg-[var(--muted)] transition-colors duration-150 ${focusRing}`}
          >
            <i className="ri-close-line text-[18px]" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}