'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { focusRing } from '../tokens';

export default function RecomputeDialog({
  labelledBy,
  onClose,
  initialFocus,
  children,
}: {
  labelledBy: string;
  onClose: () => void;
  initialFocus?: RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const fallbackRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = initialFocus ?? fallbackRef;

  useEffect(() => {
    const panel = panelRef.current;
    const returnTo = document.activeElement as HTMLElement | null;
    const focusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? []
      ).filter((item) => !item.hasAttribute('disabled'));

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      returnTo?.focus?.();
    };
  }, [closeRef, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
      <button
        type="button"
        aria-label="Close the recompute result"
        onClick={onClose}
        className="fixed inset-0 bg-[var(--text)]/25 cursor-pointer"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative my-8 w-full max-w-[900px] rounded-[12px] border border-[var(--border)] bg-[var(--surface)]"
      >
        {children}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute right-4 top-4 h-9 w-9 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-sec)] flex items-center justify-center transition-colors duration-150 hover:bg-[var(--muted)] focus:outline-none ${focusRing}`}
        >
          <i className="ri-close-line text-[18px]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}