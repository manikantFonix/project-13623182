'use client';

import { useState } from 'react';
import WidgetAttachments from './WidgetAttachments';
import { widgetRing } from './data';
import { useWidgetState } from './store';

interface Props {
  categoryLabel: string;
  description: string;
}

export default function WidgetDesignPrompt({ categoryLabel, description }: Props) {
  const [state] = useWidgetState();
  const [open, setOpen] = useState(true);
  const attachments = state.attachments;

  return (
    <div
      className="rounded-[12px] border overflow-hidden"
      style={{
        backgroundColor: 'var(--w-surface)',
        borderColor: 'var(--w-border)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`w-full px-4 py-3 flex items-center justify-between gap-3 text-left cursor-pointer ${widgetRing}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-9 h-9 shrink-0 rounded-[12px] flex items-center justify-center"
            style={{ backgroundColor: 'var(--w-border)' }}
          >
            <i
              className="ri-magic-line text-[18px] w-5 h-5 flex items-center justify-center"
              style={{ color: 'var(--w-text-sec)' }}
            />
          </span>
          <div className="min-w-0">
            <p
              className="text-[13px] font-semibold"
              style={{ color: 'var(--w-text)' }}
            >
              Design prompt
            </p>
            <p
              className="truncate text-[12px]"
              style={{ color: 'var(--w-text-sec)' }}
            >
              The brief this design was drawn from
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="h-6 px-2.5 rounded-full flex items-center text-[11px] font-medium whitespace-nowrap"
            style={{
              backgroundColor: 'var(--w-border)',
              color: 'var(--w-text-sec)',
            }}
          >
            {categoryLabel}
          </span>
          <i
            className={`ri-arrow-down-s-line text-[16px] w-4 h-4 flex items-center justify-center transition-transform duration-150 ${
              open ? 'rotate-180' : ''
            }`}
            style={{ color: 'var(--w-text-sec)' }}
          />
        </div>
      </button>

      {open && (
        <div
          className="px-4 pb-4 border-t"
          style={{ borderColor: 'var(--w-border)' }}
        >
          <p
            className="pt-3 text-[13px] leading-relaxed whitespace-pre-line"
            style={{ color: 'var(--w-text)' }}
          >
            {description}
          </p>

          {attachments.length > 0 && (
            <div className="mt-4">
              <p className="text-[12px]" style={{ color: 'var(--w-text-sec)' }}>
                Their photos
              </p>
              <div className="mt-2">
                <WidgetAttachments attachments={attachments} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}