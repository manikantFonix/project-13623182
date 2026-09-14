'use client';

import type { ReactNode } from 'react';

interface Props {
  selectedCount: number;
  onClear: () => void;
  onDone: () => void;
  onGeneratePdf: () => void;
  onDelete: () => void;
}

const ring =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--on-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)]';

export default function ProductSelectionBar({
  selectedCount,
  onClear,
  onDone,
  onGeneratePdf,
  onDelete,
}: Props) {
  const empty = selectedCount === 0;
  return (
    <div className="mt-4 flex items-center justify-between gap-4 bg-[var(--accent)] text-[var(--on-accent)] rounded-[12px] px-4 py-2">
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
          <i className="ri-checkbox-multiple-line text-[16px] w-4 h-4 flex items-center justify-center" />
        </span>
        <span className="text-[13px] font-medium text-[var(--on-accent)] tabular-nums whitespace-nowrap">
          {selectedCount} selected
        </span>
        <button
          onClick={onClear}
          disabled={empty}
          className="px-2 h-8 text-[13px] font-medium text-[var(--on-accent)]/80 hover:text-[var(--on-accent)] hover:bg-white/10 rounded-full transition-colors duration-150 whitespace-nowrap disabled:opacity-50 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--on-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)]"
        >
          Clear
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onGeneratePdf}
          disabled={empty}
          className="h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap flex items-center gap-2 disabled:opacity-40 disabled:hover:bg-[var(--surface)] disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--on-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)]"
        >
          <i className="ri-file-download-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
          Generate PDF
        </button>
        <button
          onClick={onDelete}
          disabled={empty}
          className="h-9 px-4 text-[13px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] rounded-full hover:bg-[var(--canvas)] hover:text-[var(--alert-strong)] hover:border-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap flex items-center gap-2 disabled:opacity-40 disabled:hover:bg-[var(--surface)] disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--on-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)]"
        >
          <i className="ri-delete-bin-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
          Delete
        </button>
        <button
          onClick={onDone}
          className="px-3 h-9 text-[13px] font-medium text-[var(--on-accent)] bg-white/10 border border-white/25 rounded-full hover:bg-white/20 transition-colors duration-150 whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--on-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)]"
        >
          Done
        </button>
      </div>
    </div>
  );
}