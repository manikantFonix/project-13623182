'use client';

import { useState } from 'react';
import { FOCUS_RING, statusLabel, type Request } from './data';

const STATUS_ACCENT: Record<string, string> = {
  Draft: 'text-[var(--text-sec)] bg-[var(--canvas)]',
  Ready: 'text-[var(--accent-text)] bg-[var(--muted)]',
  'Sent to Customer': 'text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)]',
  Approved: 'text-[var(--success)] bg-[var(--success-bg)]',
  'Sent to Manufacturer': 'text-[var(--text-sec)] bg-[var(--muted)]',
  Completed: 'text-[var(--text)] bg-[var(--muted)]',
};

const CATEGORY_ICON: Record<string, string> = {
  Ring: 'ri-circle-line',
  Pendant: 'ri-vip-diamond-line',
  Earring: 'ri-drop-line',
  Necklace: 'ri-radio-button-line',
  Bracelet: 'ri-link-m',
};

interface Props {
  req: Request;
}

export default function DesignPrompt({ req }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const status = statusLabel[req.status];
  const icon = CATEGORY_ICON[req.category] ?? 'ri-sparkling-2-line';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(req.description);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="border border-[var(--border)] rounded-[12px] bg-[var(--surface)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`w-full px-4 py-3 flex items-center justify-between text-left gap-3 ${FOCUS_RING}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 shrink-0 rounded-[12px] bg-[var(--muted)] flex items-center justify-center">
            <i className="ri-magic-line text-[18px] w-5 h-5 flex items-center justify-center text-[var(--text-sec)]" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[var(--text)]">
              Design prompt
            </p>
            <p className="truncate text-[12px] text-[var(--text-sec)]">
              The brief this design was drawn from
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`hidden sm:inline-flex h-6 px-2.5 rounded-full text-[11px] font-medium items-center whitespace-nowrap ${STATUS_ACCENT[status]}`}>
            {status}
          </span>
          <span className="inline-flex h-6 px-2.5 rounded-full text-[11px] font-medium items-center whitespace-nowrap bg-[var(--muted)] text-[var(--text-sec)]">
            {req.category}
          </span>
          <i
            className={`ri-arrow-down-s-line text-[16px] w-4 h-4 flex items-center justify-center text-[var(--text-sec)] transition-transform duration-150 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-[var(--border)]">
          <div className="pt-3 flex items-start gap-3">
            <span className="w-8 h-8 shrink-0 rounded-[12px] bg-[var(--muted)] flex items-center justify-center">
              <i className={`${icon} text-[17px] w-5 h-5 flex items-center justify-center text-[var(--text-sec)]`} />
            </span>
            <p className="text-[13px] leading-relaxed text-[var(--text)]">
              {req.description}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[11px] text-[var(--text-sec)]">Created</span>
              <span className="mt-0.5 text-[13px] font-semibold text-[var(--text)]">
                {req.createdFull}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={`h-9 inline-flex items-center gap-1.5 px-3 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
                copied
                  ? 'bg-[var(--success-bg)] border-[var(--border)] text-[var(--success)]'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text)] hover:bg-[var(--canvas)]'
              }`}
            >
              <i
                className={`${
                  copied ? 'ri-check-line' : 'ri-file-copy-line'
                } text-[15px] w-4 h-4 inline-flex items-center justify-center shrink-0`}
              />
              {copied ? 'Copied' : 'Copy prompt'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}