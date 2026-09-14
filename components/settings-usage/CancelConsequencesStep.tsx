'use client';

import CancelTile from './CancelTile';
import CancelActions from './CancelActions';
import { cancelConsequences, cancelContext } from './cancelFlowData';

interface Props {
  onContinue: () => void;
  onKeep: () => void;
}

export default function CancelConsequencesStep({ onContinue, onKeep }: Props) {
  return (
    <div aria-live="polite">
      <CancelTile icon="ri-alert-line" variant="alert" />
      <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
        Here's what cancelling does
      </h2>
      <p className="mt-2 text-[13px] text-[var(--text)]">
        Your plan runs until {cancelContext.accessUntil}. On that date:
      </p>

      <ul className="mt-3 border border-[var(--border)] rounded-[12px] p-4 space-y-3">
        {cancelConsequences.map((c) => (
          <li key={c.text} className="flex items-start gap-3">
            <span className="w-5 h-5 flex items-center justify-center text-[var(--alert)] shrink-0">
              <i className={`${c.icon} text-[20px]`} />
            </span>
            <span className="text-[13px] text-[var(--text)]">{c.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 bg-[var(--muted)] rounded-[12px] p-3">
        <p className="text-[13px] text-[var(--text-sec)]">
          Nothing is deleted. Your catalogs, products, renders, customers and leads all stay exactly as they are, for as long as your account exists. If you come back, everything is where you left it — catalogs just stay unpublished until you publish them again yourself.
        </p>
      </div>

      <CancelActions continueLabel="Continue" onContinue={onContinue} onKeep={onKeep} />
    </div>
  );
}