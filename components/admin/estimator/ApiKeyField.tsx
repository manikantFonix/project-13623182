'use client';

import { focusRing } from '../tokens';
import { fmtDate, maskKey, type PriceApi } from './data';

export default function ApiKeyField({
  api,
  onReplace,
}: {
  api: PriceApi;
  onReplace: () => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h4 className="text-[13px] font-semibold text-[var(--text)]">{api.keyLabel}</h4>
          {api.keySet ? (
            <span className="h-6 px-2 rounded-full bg-[var(--success-bg)] text-[11px] font-medium text-[var(--success)] inline-flex items-center whitespace-nowrap">
              Set
            </span>
          ) : (
            <span className="h-6 px-2 rounded-full bg-[var(--amber-bg)] text-[11px] font-medium text-[var(--alert-strong)] inline-flex items-center whitespace-nowrap">
              Not set
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onReplace}
          className={`shrink-0 h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
        >
          {api.keySet ? 'Replace key' : 'Enter key'}
        </button>
      </div>

      {api.keySet ? (
        <>
          <p className="mt-2 font-mono text-[13px] tabular-nums text-[var(--text)]">{maskKey(api)}</p>
          <p className="mt-1 text-[12px] tabular-nums text-[var(--muted-text)]">
            Entered {fmtDate(api.keyEnteredAt ?? '')} · {api.keyEnteredBy}
          </p>
        </>
      ) : (
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-text)]">
          No key has been entered yet. This key is needed before live prices can be read.
        </p>
      )}
    </div>
  );
}