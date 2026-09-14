'use client';

import { useEffect, useRef } from 'react';
import CancelTile from './CancelTile';
import { focusRingVar } from '../settings/theme/tokens';
import { cancelContext } from './cancelFlowData';

const items = [
  {
    icon: 'ri-time-line',
    title: `Active until ${cancelContext.accessUntil}`,
    sub: 'Everything works as normal until then.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Nothing is deleted',
    sub: 'Your designs, catalogs, customers and leads stay on your account.',
  },
  {
    icon: 'ri-mail-send-line',
    title: 'Confirmation email sent',
    sub: 'Check your inbox for the details.',
  },
];

export default function CancelOutcomeStep({ onClose }: { onClose: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btnRef.current?.focus();
  }, []);

  return (
    <div aria-live="polite">
      <CancelTile icon="ri-check-line" variant="success" />
      <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
        Your subscription is cancelled
      </h2>
      <p className="mt-2 text-[13px] text-[var(--text)]">
        You've got full access until {cancelContext.accessUntil}.
      </p>

      <ul className="mt-4 border border-[var(--border)] rounded-[12px] p-4 space-y-4">
        {items.map((it) => (
          <li key={it.title} className="flex items-start gap-3">
            <span className="w-5 h-5 flex items-center justify-center text-[var(--text-sec)] shrink-0">
              <i className={`${it.icon} text-[20px]`} />
            </span>
            <span>
              <span className="block text-[13px] text-[var(--text)]">{it.title}</span>
              <span className="mt-0.5 block text-[13px] text-[var(--text-sec)]">{it.sub}</span>
            </span>
          </li>
        ))}
      </ul>

      <button
        ref={btnRef}
        type="button"
        onClick={onClose}
        className={`mt-6 w-full h-9 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium hover:bg-[var(--accent-hover)] transition-colors duration-150 motion-reduce:transition-none whitespace-nowrap cursor-pointer ${focusRingVar}`}
      >
        Back to settings
      </button>
    </div>
  );
}