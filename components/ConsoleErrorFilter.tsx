'use client';

import { useEffect } from 'react';

const MARKER = '__readdy_console_patched';
const SUPPRESS = ["hasn't mounted yet", 'has not mounted yet'];

let baseError: typeof console.error | null = null;
let reentered = false;

function patchConsoleError() {
  if (typeof window === 'undefined') return;
  if (process.env.NODE_ENV !== 'development') return;
  const current = console.error as typeof console.error &
    Record<string, unknown>;
  if (current && current[MARKER]) return;
  if (!baseError) {
    baseError = (console.error as typeof console.error).bind(console);
  }
  const base = baseError;
  const patched = ((...args: unknown[]) => {
    if (reentered) return;
    let text = '';
    try {
      text = args.map((a) => String(a)).join(' ');
    } catch {
      text = '';
    }
    if (SUPPRESS.some((s) => text.includes(s))) return;
    reentered = true;
    try {
      base(...args);
    } finally {
      reentered = false;
    }
  }) as typeof console.error;
  (patched as unknown as Record<string, unknown>)[MARKER] = true;
  console.error = patched;
}

patchConsoleError();

export function ConsoleErrorFilter() {
  useEffect(() => {
    patchConsoleError();
    const t1 = window.setTimeout(patchConsoleError, 0);
    const t2 = window.setTimeout(patchConsoleError, 400);
    const t3 = window.setTimeout(patchConsoleError, 1500);
    const id = window.setInterval(patchConsoleError, 1000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearInterval(id);
    };
  }, []);
  return null;
}