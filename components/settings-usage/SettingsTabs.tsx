'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { focusRing } from './data';

const tabs = [
  { label: 'Brand', href: '/settings/brand' },
  { label: 'Notifications', href: '/settings/notifications' },
  { label: 'Widget', href: '/settings/widget' },
  { label: 'Appearance', href: '/settings/appearance' },
  { label: 'Usage and plan', href: '/settings/usage' },
];

export default function SettingsTabs() {
  const pathname = usePathname();

  return (
    <nav className="mt-4 flex items-center gap-6">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return active ? (
          <span
            key={t.label}
            className="h-9 flex items-center text-[13px] font-medium text-[var(--text)] border-b-2 border-[var(--accent)]"
          >
            {t.label}
          </span>
        ) : (
          <Link
            key={t.label}
            href={t.href}
            prefetch={false}
            className={`h-9 flex items-center text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}