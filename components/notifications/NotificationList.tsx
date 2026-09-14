'use client';

import { focusRingVar } from '../settings/theme/tokens';
import type { NotificationItem } from './data';

interface Props {
  items: NotificationItem[];
  onKey: (e: React.KeyboardEvent, index: number) => void;
  onActivate: (id: string, href: string) => void;
}

const ICON_CLASS: Record<string, string> = {
  'ri-user-follow-line': 'ri-user-follow-line',
  'ri-price-tag-3-line': 'ri-price-tag-3-line',
  'ri-inbox-line': 'ri-inbox-line',
  'ri-image-line': 'ri-image-line',
  'ri-error-warning-line': 'ri-error-warning-line',
  'ri-battery-low-line': 'ri-battery-low-line',
  'ri-bank-card-line': 'ri-bank-card-line',
};

export default function NotificationList({
  items,
  onKey,
  onActivate,
}: Props) {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => {
        const unread = !item.read;
        return (
          <button
            key={item.id}
            type="button"
            data-notif
            tabIndex={0}
            onClick={() => onActivate(item.id, item.href)}
            onKeyDown={(e) => onKey(e, index)}
            className={`flex items-start gap-3 text-left px-4 py-4 border-b border-[var(--border)] transition-colors duration-150 ${focusRingVar} ${
              unread
                ? 'bg-[var(--muted)] border-l-[3px] border-l-[var(--accent)] hover:bg-[var(--muted)]'
                : 'bg-[var(--surface)] hover:bg-[var(--muted)]'
            }`}
          >
            <span className="w-8 h-8 shrink-0 rounded-[10px] bg-[var(--muted)] flex items-center justify-center">
              <i
                className={`${ICON_CLASS[item.icon]} text-[16px] text-[var(--text-sec)] w-4 h-4 inline-flex items-center justify-center`}
              />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[13px] leading-snug text-[var(--text)]">
                {item.message}
              </span>
              <span className="mt-1 flex items-center gap-2 text-[12px] text-[var(--text-sec)]">
                <span className="tabular-nums">{item.time}</span>
                {unread && (
                  <span className="text-[11px] font-medium text-[var(--accent-text)]">
                    New
                  </span>
                )}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}