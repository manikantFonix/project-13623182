'use client';

import type { ProviderMode } from './data';

export default function ProviderModePill({ mode }: { mode: ProviderMode }) {
  const live = mode === 'live';
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium whitespace-nowrap ${
        live ? 'bg-[var(--success-bg)] text-[var(--success)]' : 'bg-[var(--amber-bg)] text-[var(--alert-strong)]'
      }`}
    >
      <span className="w-4 h-4 flex items-center justify-center">
        <i className={live ? 'ri-live-line text-[14px]' : 'ri-flask-line text-[14px]'} aria-hidden="true" />
      </span>
      {live ? 'Live keys' : 'Test keys'}
    </span>
  );
}