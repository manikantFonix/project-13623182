'use client';

import SelectField from './SelectField';
import ApiKeyField from './ApiKeyField';
import { focusRing } from '../tokens';
import type { PriceApi } from './data';

export default function PriceApiCard({
  api,
  disabled,
  onChange,
  onReplaceKey,
}: {
  api: PriceApi;
  disabled?: boolean;
  onChange: (next: { provider: string; pollHours: number }) => void;
  onReplaceKey: () => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <h3 className="text-[13px] font-semibold text-[var(--text)]">{api.label}</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">{api.purpose}</p>

      <div className="mt-4 grid grid-cols-2 gap-5 max-w-[620px]">
        <div>
          <label htmlFor={`${api.id}-provider`} className="block text-[12px] font-semibold text-[var(--text)]">
            Provider
          </label>
          <div className="mt-1.5">
            <SelectField
              id={`${api.id}-provider`}
              label={`${api.label} provider`}
              value={api.provider}
              options={api.providers}
              disabled={disabled}
              onChange={(provider) => onChange({ provider, pollHours: api.pollHours })}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${api.id}-poll`} className="block text-[12px] font-semibold text-[var(--text)]">
            Poll interval
          </label>
          <div className="mt-1.5 flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease poll interval"
              disabled={disabled || api.pollHours <= 1}
              onClick={() => onChange({ provider: api.provider, pollHours: Math.max(1, api.pollHours - 1) })}
              className={`w-9 h-9 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] flex items-center justify-center text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-40 disabled:hover:bg-[var(--surface)] ${focusRing}`}
            >
              <i className="ri-subtract-line text-[16px]" aria-hidden="true" />
            </button>
            <input
              id={`${api.id}-poll`}
              type="number"
              inputMode="numeric"
              min={1}
              max={168}
              value={api.pollHours}
              disabled={disabled}
              onChange={(event) => {
                const parsed = Number(event.target.value);
                if (!Number.isFinite(parsed)) return;
                onChange({ provider: api.provider, pollHours: Math.min(168, Math.max(1, parsed)) });
              }}
              className={`w-[72px] h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-center text-[13px] tabular-nums text-[var(--text)] transition-colors duration-150 ${focusRing}`}
            />
            <span className="text-[13px] text-[var(--text-sec)] whitespace-nowrap">hours</span>
            <button
              type="button"
              aria-label="Increase poll interval"
              disabled={disabled || api.pollHours >= 168}
              onClick={() => onChange({ provider: api.provider, pollHours: Math.min(168, api.pollHours + 1) })}
              className={`w-9 h-9 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] flex items-center justify-center text-[var(--text)] transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-40 disabled:hover:bg-[var(--surface)] ${focusRing}`}
            >
              <i className="ri-add-line text-[16px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <ApiKeyField api={api} onReplace={onReplaceKey} />
      </div>
    </div>
  );
}