'use client';

import { useEffect, useRef } from 'react';
import { focusRingVar } from '../settings/theme/tokens';

interface Props {
  variant: 'change' | 'first';
  requestedName: string;
  currentName?: string;
  onClose: () => void;
}

export default function PlanChangeResult({ variant, requestedName, currentName, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div aria-live="polite" className="py-2">
      <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--success-bg)]">
        <i className="ri-check-line text-[24px] text-[var(--success)]" />
      </span>
      <h2 className="mt-4 text-[20px] font-semibold text-[var(--text)]">We'll be in touch</h2>
      <p className="mt-2 text-[13px] text-[var(--text)]">
        {variant === 'first'
          ? `You've chosen ${requestedName}. Someone will contact you to get you set up.`
          : `You've asked to move to ${requestedName}. Someone will contact you to sort it out.`}
      </p>
      <p className="mt-1.5 text-[13px] text-[var(--text-sec)]">
        {variant === 'first'
          ? "Nothing is charged yet, and you'll know the price and the start date before anything begins."
          : `Nothing has changed yet. You stay on ${currentName} until the switch is made, and your renders carry on as normal.`}
      </p>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className={`mt-6 w-full h-9 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium hover:bg-[var(--accent-hover)] transition-colors duration-150 motion-reduce:transition-none whitespace-nowrap cursor-pointer ${focusRingVar}`}
      >
        Close
      </button>
    </div>
  );
}