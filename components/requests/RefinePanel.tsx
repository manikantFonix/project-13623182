'use client';

import { useRef, useState } from 'react';

interface Props {
  hasAllAngles: boolean;
  onClose: () => void;
  onRefine: (text: string) => void;
}

const PURPLE_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]';

const STYLE_TAGS = ['Minimal', 'Vintage', 'Modern', 'Luxury', 'Art Deco', 'Organic'];
const DESIGN_FOCUS = ['Shape', 'Stone', 'Detailing', 'Metal Finish', 'Size'];

export default function RefinePanel({ hasAllAngles, onClose, onRefine }: Props) {
  const [text, setText] = useState('');
  const [styleTags, setStyleTags] = useState<Set<string>>(new Set());
  const [focusTags, setFocusTags] = useState<Set<string>>(new Set());
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState(0);

  const empty = text.trim() === '';
  const count = text.length;

  const toggleTag = (setter: React.Dispatch<React.SetStateAction<Set<string>>>, tag: string) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = e.target.files?.length ?? 0;
    setImages((p) => Math.min(2, p + n));
    e.target.value = '';
  };

  const Pill = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`h-8 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap inline-flex items-center gap-1.5 shrink-0 ${PURPLE_RING} ${
        selected
          ? 'bg-[#6D28D9] border-[#6D28D9] text-white'
          : 'bg-[var(--muted)] border-transparent text-[var(--text)] hover:bg-[var(--canvas)]'
      }`}
    >
      {selected && (
        <i className="ri-check-line text-[14px] w-4 h-4 inline-flex items-center justify-center shrink-0" />
      )}
      {label}
    </button>
  );

  return (
    <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[14px] overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 shrink-0 rounded-[10px] bg-[#EFE9FE] flex items-center justify-center">
            <i className="ri-sparkling-2-line text-[19px] w-5 h-5 inline-flex items-center justify-center text-[#6D28D9]" />
          </span>
          <h2 className="text-[17px] font-semibold text-[var(--text)]">Refine Design</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close refine panel"
          className={`w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--text)] hover:bg-[var(--canvas)] transition-colors duration-150 ${PURPLE_RING}`}
        >
          <i className="ri-close-line text-[18px] w-5 h-5 inline-flex items-center justify-center shrink-0" />
        </button>
      </div>

      <div className="px-6 pt-4 pb-6">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[var(--text-sec)]">
          Modify your prompt <span className="text-[#6D28D9]">*</span>
          <span className="normal-case font-normal tracking-normal text-[var(--text-sec)]">
            {' '}
            (or attach reference images)
          </span>
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
          rows={5}
          placeholder="Describe the changes you'd like (max 2,000 characters). You can paste up to 2 images here."
          className={`mt-3 w-full px-4 py-3.5 text-[13px] leading-relaxed text-[var(--text)] placeholder-[var(--text-sec)] bg-[var(--muted)] border border-[var(--border)] rounded-[12px] outline-none resize-none ${PURPLE_RING}`}
        />

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className={`h-9 px-4 text-[13px] font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap transition-colors duration-150 bg-[#EFE9FE] text-[#5B21B6] hover:bg-[#E2D7FC] ${PURPLE_RING}`}
          >
            <i className="ri-attachment-line text-[16px] w-4 h-4 inline-flex items-center justify-center shrink-0" />
            Attach image
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp,image/heic,image/heif"
            multiple
            onChange={onFiles}
            className="hidden"
            tabIndex={-1}
            aria-hidden
          />
          {images > 0 && (
            <span className="text-[12px] text-[var(--text-sec)]">
              {images} of 2 attached
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between gap-4 text-[12px] text-[var(--text-sec)]">
          <span>Accepted: PNG, JPEG, GIF, WEBP, HEIC, HEIF (Max 10MB)</span>
          <span className="tabular-nums shrink-0">
            <span className="text-[var(--text-sec)]">{count}</span> / 2000 characters
          </span>
        </div>

        <p className="mt-3 text-[12px] text-[var(--text-sec)]">
          {hasAllAngles
            ? 'Uses at least 12 renders. Your previous draft is kept.'
            : 'Uses at least 3 renders. Your previous draft is kept.'}
        </p>

        <p className="mt-5 text-[12px] font-semibold uppercase tracking-wide text-[var(--text-sec)]">
          Style tags
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {STYLE_TAGS.map((t) => (
            <Pill
              key={t}
              label={t}
              selected={styleTags.has(t)}
              onClick={() => toggleTag(setStyleTags, t)}
            />
          ))}
        </div>

        <p className="mt-5 text-[12px] font-semibold uppercase tracking-wide text-[var(--text-sec)]">
          Design focus
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {DESIGN_FOCUS.map((t) => (
            <Pill
              key={t}
              label={t}
              selected={focusTags.has(t)}
              onClick={() => toggleTag(setFocusTags, t)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-6 py-4 flex items-center justify-between gap-4 bg-[var(--surface)]">
        <button
          type="button"
          onClick={onClose}
          className={`text-[14px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap ${PURPLE_RING}`}
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={empty}
          onClick={() => onRefine(text.trim())}
          className={`h-10 px-5 text-[14px] font-medium rounded-full inline-flex items-center gap-2 whitespace-nowrap transition-colors duration-150 ${PURPLE_RING} ${
            empty
              ? 'bg-[#E4DFF7] text-[#B4A6E4] cursor-not-allowed'
              : 'bg-[#7C5CFA] text-white hover:bg-[#6D28D9]'
          }`}
        >
          <i className="ri-sparkling-2-line text-[17px] w-4 h-4 inline-flex items-center justify-center shrink-0" />
          Regenerate Design
        </button>
      </div>
    </div>
  );
}