'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { focusRingVar, varsFor } from '../settings/theme/tokens';
import { useTheme } from '../settings/theme/ThemeProvider';
import {
  markAllRead,
  markRead,
  reloadNotifications,
  useNotifications,
} from './store';
import { PAGE_SIZE } from './data';
import NotificationList from './NotificationList';

interface Props {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function NotificationsPanel({ open, onClose, triggerRef }: Props) {
  const router = useRouter();
  const { dark } = useTheme();
  const { items, status } = useNotifications();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => {
      const h = headingRef.current;
      if (h) {
        h.setAttribute('tabindex', '-1');
        h.focus();
      }
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onMouse = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
        triggerRef.current?.focus();
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onMouse);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onMouse);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open, onClose, triggerRef]);

  useEffect(() => {
    if (open) setLimit(PAGE_SIZE);
  }, [open]);

  const visible = items.slice(0, limit);

  const rows = () =>
    Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[data-notif]') ?? []
    );

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) {
      setLimit((l) => Math.min(l + PAGE_SIZE, items.length));
    }
  };

  const onListKey = (e: React.KeyboardEvent, index: number) => {
    const all = rows();
    if (all.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      all[(index + 1) % all.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      all[(index - 1 + all.length) % all.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      all[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      all[all.length - 1]?.focus();
    }
  };

  const onTabFromList = (e: React.KeyboardEvent) => {
    const all = rows();
    if (all.length === 0) return;
    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === all[0]) {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
      }
      return;
    }
    if (active === all[all.length - 1]) {
      onClose();
    }
  };

  const activate = (id: string, href: string) => {
    markRead(id);
    onClose();
    router.push(href);
  };

  const announce = (text: string) => {
    const live = liveRef.current;
    if (!live) return;
    live.textContent = '';
    window.setTimeout(() => {
      if (live) live.textContent = text;
    }, 0);
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div
      ref={panelRef}
      role="region"
      aria-label="Notifications"
      style={varsFor(dark)}
      className="fixed left-[124px] bottom-[64px] z-[100] w-[380px] max-h-[560px] flex flex-col bg-[var(--surface)] border border-[var(--border)] rounded-[12px] overflow-hidden transition-colors duration-150"
    >
      <div aria-live="polite" ref={liveRef} className="sr-only" />

      <div className="h-14 shrink-0 px-4 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-[15px] font-medium text-[var(--text)] focus:outline-none"
        >
          Notifications
        </h2>
        {unread > 0 ? (
          <button
            type="button"
            onClick={() => {
              markAllRead();
              announce('All notifications marked as read.');
            }}
            className={`h-9 px-2 -mr-2 text-[13px] font-medium text-[var(--accent-text)] hover:opacity-80 transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
          >
            Mark all as read
          </button>
        ) : (
          <span className="w-10" />
        )}
      </div>

      <div
        className="flex-1 min-h-0 overflow-y-auto"
        ref={listRef}
        onScroll={onScroll}
        onKeyDown={onTabFromList}
      >
        {status === 'loading' && (
          <div className="px-4 py-3 space-y-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 py-4">
                <div className="w-8 h-8 rounded-[10px] bg-[var(--muted)] shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 w-3/4 rounded-full bg-[var(--muted)]" />
                  <div className="h-3 w-1/3 rounded-full bg-[var(--muted)]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="min-h-[200px] flex flex-col items-center justify-center text-center px-6 gap-3">
            <p className="text-[13px] text-[var(--text)]">
              We couldn't load your notifications.
            </p>
            <button
              type="button"
              onClick={reloadNotifications}
              className={`h-9 px-4 text-[13px] font-medium text-[var(--accent-text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--muted)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
            >
              Try again
            </button>
          </div>
        )}

        {status === 'ready' && items.length === 0 && (
          <div className="min-h-[200px] flex flex-col items-center justify-center text-center px-6">
            <div className="w-10 h-10 rounded-[12px] bg-[var(--muted)] flex items-center justify-center">
              <i className="ri-notification-3-line text-[20px] text-[var(--text-sec)] w-5 h-5 inline-flex items-center justify-center" />
            </div>
            <p className="mt-4 text-[13px] text-[var(--text)]">Nothing new.</p>
            <p className="mt-1 text-[12px] text-[var(--text-sec)] max-w-[240px]">
              You'll see everything here, even if an email or text doesn't
              arrive.
            </p>
          </div>
        )}

        {status === 'ready' && items.length > 0 && (
          <NotificationList
            items={visible}
            onKey={onListKey}
            onActivate={activate}
          />
        )}
      </div>
    </div>,
    document.body
  );
}