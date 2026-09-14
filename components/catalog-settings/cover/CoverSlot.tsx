'use client';

import { focusRingVar } from '../../settings/theme/tokens';

interface Props {
  url?: string;
  index: number;
  live: boolean;
  uploading?: boolean;
  onUse?: () => void;
  onRemove?: () => void;
  onAdd?: () => void;
}

export default function CoverSlot({
  url,
  index,
  live,
  uploading,
  onUse,
  onRemove,
  onAdd,
}: Props) {
  if (!url && !uploading) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className={`aspect-square w-full rounded-[12px] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] flex flex-col items-center justify-center gap-2 text-[var(--text-sec)] hover:bg-[var(--muted)] transition-colors duration-150 cursor-pointer ${focusRingVar}`}
      >
        <span className="w-5 h-5 flex items-center justify-center">
          <i className="ri-image-add-line text-[20px] w-5 h-5 inline-flex items-center justify-center" />
        </span>
        <span className="text-[12px]">Add</span>
      </button>
    );
  }

  return (
    <div>
      <div
        className={`relative aspect-square w-full rounded-[12px] bg-[var(--muted)] overflow-hidden ${
          live
            ? 'border-2 border-[var(--accent)]'
            : 'border border-[var(--border)]'
        }`}
      >
        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              role="status"
              aria-label="Uploading"
              className="w-5 h-5 border-2 border-[var(--border-strong)] border-t-[var(--accent)] rounded-full animate-spin"
            />
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-contain" />
            {live && (
              <span className="absolute top-2 left-2 h-5 px-2 inline-flex items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[11px] font-medium">
                Live
              </span>
            )}
          </>
        )}
      </div>

      {!uploading && (
        <div className="mt-2 flex items-center gap-4">
          {!live && onUse && (
            <button
              type="button"
              onClick={onUse}
              aria-label={`Use cover image ${index}`}
              className={`text-[13px] font-medium text-[var(--accent-text)] hover:text-[var(--accent)] transition-colors duration-150 cursor-pointer ${focusRingVar}`}
            >
              Use this
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove cover image ${index}`}
              className={`text-[13px] font-medium text-[var(--alert)] hover:text-[var(--alert-strong)] transition-colors duration-150 cursor-pointer ${focusRingVar}`}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}