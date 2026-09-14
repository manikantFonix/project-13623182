'use client';

import { useState } from 'react';
import {
  EMBED_KEY,
  focusRing,
  SNIPPET,
  STATUS_LABEL,
  type WidgetState,
} from './data';
import RotateKeyDialog from './RotateKeyDialog';

export default function SnippetCard({ state }: { state: WidgetState }) {
  const [copied, setCopied] = useState(state === 'snippetCopied');
  const [rotateOpen, setRotateOpen] = useState(state === 'rotateConfirm');
  const [rotating, setRotating] = useState(state === 'rotating');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const confirmRotate = () => {
    setRotateOpen(false);
    setRotating(true);
    window.setTimeout(() => setRotating(false), 1600);
  };

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <h3 className="text-[15px] font-medium text-[var(--text)]">Your snippet</h3>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        Paste this into your website where you want the widget to appear.
      </p>

      <div className="mt-4 border border-[var(--border)] rounded-[12px] bg-[var(--muted)] p-4">
        <div className="flex items-start justify-between gap-4">
          <code
            tabIndex={0}
            className="block flex-1 font-mono text-[12px] leading-relaxed text-[var(--text)] break-all whitespace-pre-wrap select-text"
          >
            {SNIPPET}
          </code>
          <button
            type="button"
            onClick={copy}
            className={`h-9 px-4 shrink-0 text-[13px] font-medium bg-[var(--surface)] border border-[var(--border)] rounded-full transition-colors duration-150 whitespace-nowrap ${focusRing} ${
              copied
                ? 'text-[var(--success)]'
                : 'text-[var(--text)] hover:bg-[var(--muted)]'
            }`}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <span aria-live="polite" className="sr-only">
          {copied ? 'Snippet copied to clipboard.' : ''}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[12px] text-[var(--text-sec)]">Key</span>
          <span className="text-[13px] text-[var(--text)] tabular-nums">
            {EMBED_KEY}
          </span>
        </div>
        <p className="mt-1 text-[12px] text-[var(--text-sec)]">{STATUS_LABEL.keyNote}</p>
      </div>

      <div className="mt-5 pt-5 border-t border-[var(--border)]">
        <button
          type="button"
          onClick={() => setRotateOpen(true)}
          disabled={rotating}
          className={`h-9 px-4 text-[13px] font-medium text-[var(--alert)] hover:text-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap disabled:text-[var(--border-strong)] disabled:hover:text-[var(--border-strong)] ${focusRing}`}
        >
          {rotating ? 'Rotating key…' : 'Rotate key'}
        </button>
      </div>

      <RotateKeyDialog
        open={rotateOpen}
        onClose={() => setRotateOpen(false)}
        onConfirm={confirmRotate}
      />
    </section>
  );
}