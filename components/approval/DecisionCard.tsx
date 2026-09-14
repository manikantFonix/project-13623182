'use client';

import { useState } from 'react';
import Card from './Card';
import ConfirmDialog from './ConfirmDialog';
import { FOCUS_BRAND } from './data';

export default function DecisionCard({
  onDecision,
}: {
  onDecision: (outcome: 'approved' | 'changes') => void;
}) {
  const [dialog, setDialog] = useState<null | 'approve' | 'changes'>(null);

  return (
    <>
      <Card>
        <h2 className="text-[15px] font-medium text-[#16233E]">Does this look right?</h2>
        <p className="mt-1 text-[13px] text-[#5D6C8A]">
          Let your jeweler know what you think of the design.
        </p>

        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <button
            type="button"
            onClick={() => setDialog('approve')}
            className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full bg-[var(--brand)] text-white text-[13px] font-medium whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:opacity-95 transition-colors duration-150 motion-reduce:transition-none ${FOCUS_BRAND}`}
          >
            Approve design
          </button>
          <button
            type="button"
            onClick={() => setDialog('changes')}
            className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full bg-white border border-[#A8552A] text-[#A8552A] text-[13px] font-medium whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:bg-[#A8552A]/5 transition-colors duration-150 motion-reduce:transition-none ${FOCUS_BRAND}`}
          >
            Ask for changes
          </button>
        </div>

        <p className="mt-3 text-[12px] text-[#5D6C8A]">
          Approving lets your jeweler start production.
        </p>
      </Card>

      <ConfirmDialog
        open={dialog === 'approve'}
        title="Approve this design?"
        message="Your jeweler will start production with this version. You can't change your mind here afterwards."
        confirmLabel="Approve design"
        tone="primary"
        onCancel={() => setDialog(null)}
        onConfirm={() => {
          setDialog(null);
          onDecision('approved');
        }}
      />

      <ConfirmDialog
        open={dialog === 'changes'}
        title="Ask for changes?"
        message="Your jeweler will get in touch to talk it through. The design goes back to them to work on."
        confirmLabel="Ask for changes"
        tone="alert"
        onCancel={() => setDialog(null)}
        onConfirm={() => {
          setDialog(null);
          onDecision('changes');
        }}
      />
    </>
  );
}