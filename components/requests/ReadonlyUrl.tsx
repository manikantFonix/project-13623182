'use client';

import { useState } from 'react';
import { FOCUS_RING } from './data';

interface Props {
  link: string;
  stateLabel: string;
  stateCls: string;
  onSendNew?: () => void;
}

export default function ReadonlyUrl({ link, stateLabel, stateCls, onSendNew }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      /* no-op */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mid = Math.floor(link.length / 2);
  const view = `${link.slice(0, mid)}…${link.slice(mid + 8)}`;

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-10 px-3 bg-[var(--muted)] border border-[var(--border)] rounded-[12px] flex items-center">
          <span className="text-[13px] text-[var(--text)] truncate" title={link}>
            {view}
          </span>
        </div>
        <button
          onClick={copy}
          aria-live="polite"
          className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
            copied
              ? 'border-[var(--border)] text-[var(--success)] bg-[var(--success-bg)]'
              : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text)] hover:bg-[var(--canvas)]'
          }`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <p className={`text-[13px] font-medium ${stateCls}`}>{stateLabel}</p>
        {onSendNew && (
          <button
            onClick={onSendNew}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Send a new link
          </button>
        )}
      </div>
    </div>
  );
}