'use client';

import { useState } from 'react';
import { focusRing } from '../tokens';
import { ENDPOINT_URL } from './data';

export default function EndpointCard() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(ENDPOINT_URL).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      },
      () => setCopied(false)
    );
  };

  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <h3 className="text-[13px] font-semibold text-[var(--text)]">Endpoint URL</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
        The address events are sent to. Paste it into the provider.
      </p>

      <div className="mt-3 flex items-center gap-2">
        <code className="flex-1 min-w-0 h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-4 flex items-center font-mono text-[13px] tabular-nums text-[var(--text)] overflow-x-auto whitespace-nowrap select-all">
          {ENDPOINT_URL}
        </code>
        <button
          type="button"
          onClick={copy}
          className={`shrink-0 h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
        >
          <span className="w-4 h-4 flex items-center justify-center text-[var(--text-sec)]">
            <i className={copied ? 'ri-check-line text-[16px]' : 'ri-file-copy-line text-[16px]'} aria-hidden="true" />
          </span>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div aria-live="polite" className="sr-only">
        {copied ? 'Endpoint URL copied to the clipboard.' : ''}
      </div>
    </div>
  );
}