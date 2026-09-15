'use client';

import { focusRing } from '../tokens';
import { fmtStamp, type Prompt } from './data';

export default function VersionList({
  prompt,
  onOpenVersion,
}: {
  prompt: Prompt;
  onOpenVersion: (version: number) => void;
}) {
  const latest = prompt.versions.reduce((max, item) => Math.max(max, item.version), 0);

  return (
    <ol aria-label={`Version history for ${prompt.systemKey}`} className="mt-4 flex flex-col">
      {prompt.versions
        .slice()
        .sort((a, b) => b.version - a.version)
        .map((item) => (
          <li
            key={item.version}
            className="flex items-start justify-between gap-4 py-3 border-b border-[var(--border)] last:border-b-0"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-semibold tabular-nums text-[var(--text)]">
                  Version {item.version}
                </span>
                {item.version === latest && (
                  <span className="inline-flex items-center h-5 px-2 rounded-full border border-[var(--border-strong)] bg-[var(--muted)] text-[11px] font-medium text-[var(--text-sec)] whitespace-nowrap">
                    Current
                  </span>
                )}
                <span className="inline-flex items-center h-5 px-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[11px] font-medium text-[var(--text-sec)] whitespace-nowrap">
                  {item.referencedByRenders ? 'Referenced by renders' : 'No renders yet'}
                </span>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
                {item.changeNote}
              </p>
              <p className="mt-0.5 text-[12px] tabular-nums text-[var(--muted-text)]">
                {fmtStamp(item.savedAt)} · {item.savedBy}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenVersion(item.version)}
              className={`shrink-0 h-9 px-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[12px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
            >
              View
            </button>
          </li>
        ))}
    </ol>
  );
}