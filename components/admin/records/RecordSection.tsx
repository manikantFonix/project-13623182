'use client';

import type { ReactNode } from 'react';

export default function RecordSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="text-[13px] font-semibold text-[var(--text)]">{title}</h2>
      <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--text-sec)]">{description}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}