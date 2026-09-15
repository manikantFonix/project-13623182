'use client';

import { useRef } from 'react';
import AiSystemDialog from './AiSystemDialog';
import { focusRing } from '../tokens';

export default function DiscardDialog({
  onCancel,
  onDiscard,
}: {
  onCancel: () => void;
  onDiscard: () => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);

  return (
    <AiSystemDialog labelledBy="discard-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="discard-title" className="text-[18px] font-semibold text-[var(--text)]">
        Discard your unsaved changes?
      </h2>
      <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text-sec)]">
        The settings below have not been saved. Leaving now returns them to their current values.
      </p>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
        >
          Keep editing
        </button>
        <button
          type="button"
          onClick={onDiscard}
          className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium text-[var(--alert)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--alert)]/10 ${focusRing}`}
        >
          Discard changes
        </button>
      </div>
    </AiSystemDialog>
  );
}