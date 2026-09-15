'use client';

import { useRef } from 'react';
import PlansDialog from './PlansDialog';
import { focusRing } from '../tokens';
import { fmtInt } from './data';

export default function ArchiveDialog({
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
  const none = subscribers === 0;

  const points = [
    none
      ? 'No retailers are on this plan, so nobody is affected.'
      : `${fmtInt(subscribers)} ${
          subscribers === 1 ? 'retailer stays' : 'retailers stay'
        } on this plan, at the same price and allowance, indefinitely.`,
    'Archiving only stops new retailers being put on it.',
    'Nothing is deleted. The plan and its history are kept.',
    'An archived plan can be restored at any time.',
  ];

  return (
    <PlansDialog labelledBy="archive-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="archive-title" className="text-[18px] font-semibold text-[var(--text)]">
        Archive {name}?
      </h2>
      <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
        {none
          ? 'No retailers are on this plan. Archiving only stops new ones being added.'
          : `${fmtInt(subscribers)} retailers stay on this plan. Archiving only stops new ones being added.`}
      </p>

      <ul className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] p-4 flex flex-col gap-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5">
            <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
              <i className="ri-information-line text-[15px]" aria-hidden="true" />
            </span>
            <span className="text-[13px] leading-relaxed text-[var(--text-sec)]">{point}</span>
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="sr-only">
        {submitting ? 'Archiving this plan' : ''}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-50 ${focusRing}`}
        >
          Keep it available
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium text-[var(--alert)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--alert)]/10 disabled:opacity-50 disabled:cursor-default ${focusRing}`}
        >
          Archive plan
        </button>
      </div>
    </PlansDialog>
  );
}