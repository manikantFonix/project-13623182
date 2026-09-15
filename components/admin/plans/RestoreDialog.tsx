'use client';

import { useRef } from 'react';
import PlansDialog from './PlansDialog';
import { focusRing } from '../tokens';

export default function RestoreDialog({
  name,
  subscribers,
  submitting,
  onCancel,
  onConfirm,
}: {
  name: string;
  subscribers: number;
  submitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);

  return (
    <PlansDialog labelledBy="restore-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="restore-title" className="text-[18px] font-semibold text-[var(--text)]">
        Restore {name}?
      </h2>
      <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
        {name} becomes available to new retailers again. The {subscribers} already on it are
        unaffected.
      </p>

      <p className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-[13px] leading-relaxed text-[var(--text-sec)]">
        Restoring does not move anyone between plans. It only returns {name} to the selectable list.
      </p>

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Restoring this plan' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-50 ${focusRing}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-default ${focusRing}`}
        >
          {submitting ? 'Restoring' : 'Restore plan'}
        </button>
      </div>
    </PlansDialog>
  );
}