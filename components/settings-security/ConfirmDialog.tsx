'use client';

import { useRef } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { focusRingVar } from '../settings/theme/tokens';

interface Props {
  open: boolean;
  title: string;
  body: string;
  secBody?: string;
  cancelLabel: string;
  confirmLabel: string;
  busyLabel?: string;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  width?: number;
}

export default function ConfirmDialog({
  open,
  title,
  body,
  secBody,
  cancelLabel,
  confirmLabel,
  busyLabel,
  busy,
  onCancel,
  onConfirm,
  width = 440,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  useDialogFocus(open, ref, cancelRef);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        style={{ width }}
        className="relative max-w-full bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6"
      >
        <h3 className="text-[18px] font-semibold text-[var(--text)]">{title}</h3>
        <p className="mt-2 text-[13px] text-[var(--text)]">{body}</p>
        {secBody && <p className="mt-2 text-[13px] text-[var(--text-sec)]">{secBody}</p>}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            ref={cancelRef}
            disabled={busy}
            onClick={onCancel}
            className={`h-9 px-4 rounded-full text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none ${focusRingVar}`}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onConfirm}
            className={`h-9 px-4 rounded-full bg-[var(--surface)] border border-[var(--alert)] text-[var(--alert)] hover:text-[var(--alert-strong)] hover:border-[var(--alert-strong)] text-[13px] font-medium inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none ${focusRingVar}`}
          >
            {busy && (
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[var(--alert)] border-t-transparent animate-spin" />
            )}
            {busy ? busyLabel ?? confirmLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}