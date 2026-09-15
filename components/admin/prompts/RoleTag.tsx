'use client';

import { ROLE_LABELS, type Role } from './data';

export default function RoleTag({ role }: { role: Role }) {
  return (
    <span className="inline-flex items-center h-5 px-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[11px] font-medium text-[var(--text-sec)] whitespace-nowrap">
      {ROLE_LABELS[role]}
    </span>
  );
}