'use client';

import CancelTile from './CancelTile';
import CancelActions from './CancelActions';
import { cancelContext } from './cancelFlowData';

interface Props {
  error: boolean;
  submitting: boolean;
  onCancel: () => void;
  onKeep: () => void;
}

export default function CancelConfirmStep({ error, submitting, onCancel, onKeep }: Props) {
  return (
    <div aria-live="polite">
      <CancelTile icon="ri-alert-line" variant="alert" />
      <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
        Cancel your subscription?
      </h2>
      <p className="mt-2 text-[13px] text-[var(--text)]">
        Your plan stays active until {cancelContext.accessUntil}. After that, your catalogs go offline and your renders expire.
      </p>
      <p className="mt-1.5 text-[13px] text-[var(--text-sec)]">
        You can start a new plan whenever you like — everything will still be here.
      </p>

      {error && (
        <p className="mt-4 text-[13px] text-[var(--alert)]">
          We couldn't cancel that. Nothing has changed — try again.
        </p>
      )}

      <CancelActions
        continueLabel="Cancel subscription"
        onContinue={onCancel}
        onKeep={onKeep}
        submitting={submitting}
      />
    </div>
  );
}