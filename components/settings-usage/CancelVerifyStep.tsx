'use client';

import CancelTile from './CancelTile';
import CancelActions from './CancelActions';
import { cancelContext } from './cancelFlowData';

interface Props {
  onSend: () => void;
  onKeep: () => void;
}

export default function CancelVerifyStep({ onSend, onKeep }: Props) {
  return (
    <div aria-live="polite">
      <CancelTile icon="ri-lock-line" variant="muted" />
      <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
        Let's check it's you
      </h2>
      <p className="mt-2 text-[13px] text-[var(--text)]">
        We'll send a code to {cancelContext.email} — the address you sign in with.
      </p>
      <p className="mt-1.5 text-[13px] text-[var(--text-sec)]">
        Cancelling takes your published catalogs offline, so we check before going any further.
      </p>
      <CancelActions continueLabel="Send me a code" onContinue={onSend} onKeep={onKeep} />
    </div>
  );
}