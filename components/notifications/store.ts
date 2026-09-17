'use client';

import { useEffect, useState } from 'react';
import { buildNotifications, type NotificationItem } from './data';

export type PanelStatus = 'loading' | 'ready' | 'error';

interface NotificationsState {
  items: NotificationItem[];
  status: PanelStatus;
}

let state: NotificationsState = {
  items: [],
  status: 'loading',
};
const listeners = new Set<() => void>();

let loaded = false;
let loadToken = 0;

function emit() {
  state = { ...state, items: [...state.items] };
  listeners.forEach((fn) => fn());
}

function load() {
  loadToken += 1;
  const token = loadToken;
  setStatus('loading');
  setTimeout(() => {
    if (token !== loadToken) return;
    state = { items: buildNotifications(), status: 'ready' };
    emit();
  }, 500);
}

function setStatus(status: PanelStatus) {
  state = { ...state, status };
  emit();
}

export function reloadNotifications() {
  loaded = false;
  load();
}

export function markRead(id: string) {
  state = {
    ...state,
    items: state.items.map((n) => (n.id === id ? { ...n, read: true } : n)),
  };
  emit();
}

export function markAllRead() {
  state = {
    ...state,
    items: state.items.map((n) => ({ ...n, read: true })),
  };
  emit();
}

export function unreadCount() {
  return state.items.filter((n) => !n.read).length;
}

export function getNotifications() {
  return state.items;
}

export function getStatus() {
  return state.status;
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useNotifications() {
  const [snapshot, setSnapshot] = useState<NotificationsState>(() =>
    loaded ? state : { items: [], status: 'loading' }
  );

  useEffect(() => {
    if (!loaded) {
      loaded = true;
      load();
    }
    const update = () => setSnapshot({ items: [...state.items], status: state.status });
    update();
    const unsub = subscribe(update);
    return () => {
      unsub();
    };
  }, []);

  return snapshot;
}