'use client';

import { useRef } from 'react';
import RetailerDialog from './RetailerDialog';
import { focusRing } from '../tokens';

export default function EnableDialog({
  name,
  submitting,
  onCancel,
  onConfirm,
}: {
  name: string;
  submitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);

  return (
    <RetailerDialog labelledBy="enable-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="enable-title" className="text-[18px] font-semibold text-[var(--text)]">
        Enable {name}?
      </h2>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-sec)]">
        Access is restored straight away. Catalogs stay unpublished. The retailer republishes them.
      </p>

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Enabling this account' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-default ${focusRing}`}
        >
          Leave disabled
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-default ${focusRing}`}
        >
          Enable account
        </button>
      </div>
    </RetailerDialog>
  );
}