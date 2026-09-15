'use client';

import { useRef } from 'react';
import WidgetsDialog from './WidgetsDialog';
import { focusRing } from '../tokens';

export default function ReinstateDialog({
  origin,
  onCancel,
  onConfirm,
}: {
  origin: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);

  return (
    <WidgetsDialog labelledBy="reinstate-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="reinstate-title" className="text-[18px] font-semibold text-[var(--text)]">
        Reinstate the widget on {origin}?
      </h2>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-sec)]">
        The widget starts loading on their site again immediately. Theme and permitted origins are
        untouched.
      </p>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
        >
          Leave it suspended
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
        >
          Reinstate installation
        </button>
      </div>
    </WidgetsDialog>
  );
}