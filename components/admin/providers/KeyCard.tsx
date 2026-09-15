'use client';

import KeyStatusPill from './KeyStatusPill';
import { focusRing } from '../tokens';
import { fmtDate, maskKey, type ProviderKey } from './data';

export default function KeyCard({
  item,
  onAction,
}: {
  item: ProviderKey;
  onAction: () => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5 flex items-start justify-between gap-6">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-semibold text-[var(--text)]">{item.label}</h3>
          <KeyStatusPill set={item.set} />
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">{item.purpose}</p>

        {item.set ? (
          <>
            <p className="mt-3 font-mono text-[13px] tabular-nums text-[var(--text)]">
              {maskKey(item)}
            </p>
            <p className="mt-1 text-[12px] tabular-nums text-[var(--muted-text)]">
              Entered {fmtDate(item.enteredAt ?? '')} · {item.enteredBy}
            </p>
          </>
        ) : (
          <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted-text)]">
            No key has been entered yet. This key is needed before the provider can be used.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onAction}
        className={`shrink-0 h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
      >
        {item.set ? 'Replace key' : 'Enter key'}
      </button>
    </div>
  );
}