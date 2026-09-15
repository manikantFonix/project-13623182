'use client';

import type { ReactNode } from 'react';

export default function SettingCard({
  title,
  description,
  headingId,
  children,
  aside,
  foot,
}: {
  title: string;
  description: string;
  headingId: string;
  children: ReactNode;
  aside?: ReactNode;
  foot?: ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 id={headingId} className="text-[13px] font-semibold text-[var(--text)]">
            {title}
          </h3>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">{description}</p>
        </div>
        <div className="shrink-0">{children}</div>
      </div>
      {aside}
      {foot && (
        <div className="mt-3 pt-3 border-t border-[var(--border)] text-[12px] leading-relaxed text-[var(--muted-text)]">
          {foot}
        </div>
      )}
    </div>
  );
}