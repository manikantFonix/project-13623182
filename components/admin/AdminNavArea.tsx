'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import type { AdminNavAreaDef } from './navData';
import AdminNavRow from './AdminNavRow';
import { focusRingOnDark } from './tokens';

export default function AdminNavArea({ area }: { area: AdminNavAreaDef }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const children = area.children ?? [];
  const childActive = children.some((child) => child.href === pathname);

  if (children.length === 0) {
    return (
      <li>
        <AdminNavRow
          label={area.label}
          icon={area.icon}
          href={area.href}
          active={area.href === pathname}
          variant="area"
        />
      </li>
    );
  }

  const listId = `admin-nav-${area.key}`;

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={`w-full flex items-center gap-2.5 h-9 px-3 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors duration-150 ${focusRingOnDark} ${
          childActive
            ? 'text-[var(--on-accent)]'
            : 'text-[var(--on-accent-soft)] hover:bg-[var(--on-accent)]/10 hover:text-[var(--on-accent)]'
        }`}
      >
        <span className="w-4 h-4 flex items-center justify-center shrink-0">
          <i className={`${area.icon} text-[16px]`} aria-hidden="true" />
        </span>
        <span className="flex-1 text-left truncate">{area.label}</span>
        <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--on-accent-muted)]">
          <i
            className={`${open ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'} text-[16px]`}
            aria-hidden="true"
          />
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          className="mt-0.5 ml-[22px] pl-2 flex flex-col gap-0.5 border-l border-[var(--nav-guide)]"
        >
          {children.map((child) => (
            <li key={child.label}>
              <AdminNavRow
                label={child.label}
                icon={child.icon}
                href={child.href}
                active={child.href === pathname}
                count={child.count}
                countLabel={child.countLabel}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}