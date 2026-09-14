'use client';

import { useEffect, useRef } from 'react';
import { CUSTOMER_FOCUS_RING, type KindConfig, type RecordItem } from './data';
import { useDialogFocus } from '../../lib/useDialogFocus';

interface Props {
  open: boolean;
  config: KindConfig;
  record: RecordItem;
  onClose: () => void;
  onConfirmPermanent: () => void;
  onMakeInactive: () => void;
}

export default function RecordDeleteDialog({
  open,
  config,
  record,
  onClose,
  onConfirmPermanent,
  onMakeInactive,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const count = record.requestIds.length;
  const referenced = count > 0;

  const closeBtn = (label: string) => (
    <button
      type="button"
      onClick={onClose}
      className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] hover:text-[var(--text-sec)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
    >
      {label}
    </button>
  );

  let title: string;
  let body: React.ReactNode;
  let footer: React.ReactNode;

  if (!referenced) {
    title = `Delete ${record.name}?`;
    body = (
      <p className="text-[13px] text-[var(--text)]">
        This record is removed for good. No request uses it, so nothing else changes.
      </p>
    );
    footer = (
      <>
        {closeBtn('Cancel')}
        <button
          type="button"
          onClick={onConfirmPermanent}
          className={`h-9 px-4 text-[13px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] rounded-full hover:bg-[var(--alert-strong)] hover:text-[var(--on-accent)] hover:border-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
        >
          Delete permanently
        </button>
      </>
    );
  } else if (config.kind === 'manufacturer') {
    title = 'This manufacturer can\u2019t be deleted.';
    body = (
      <>
        <p className="text-[13px] text-[var(--text)]">{count} requests reference this manufacturer.</p>
        <p className="mt-2 text-[13px] text-[var(--text-sec)]">
          You can make them inactive instead. They won't be offered when you route a
          new request, and anything already with them carries on as normal.
        </p>
      </>
    );
    footer = (
      <>
        {closeBtn('Cancel')}
        <button
          type="button"
          onClick={onMakeInactive}
          className={`h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
        >
          Make inactive
        </button>
      </>
    );
  } else {
    title = 'This customer can\u2019t be deleted.';
    body = (
      <p className="text-[13px] text-[var(--text)]">
        {count} {count === 1 ? 'request' : 'requests'} are on this customer's record.
        Deleting them would leave a history you can't read.
      </p>
    );
    footer = (
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(22,35,62,0.4)]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div ref={cardRef} className="w-[460px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-7">
        <h2 className="text-[18px] font-semibold text-[var(--text)]">{title}</h2>
        <div className="mt-3">{body}</div>
        <div className="mt-6 flex items-center justify-end gap-2">{footer}</div>
      </div>
    </div>
  );
}