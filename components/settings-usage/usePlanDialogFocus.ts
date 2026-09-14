'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled]), [href]';

export function usePlanDialogFocus(
  open: boolean,
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => {
      containerRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;
      const els = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (!container.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      prevFocus.current?.focus?.();
    };
  }, [open, containerRef]);
}