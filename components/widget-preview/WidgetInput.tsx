'use client';

import { useEffect, useRef, useState } from 'react';
import { widgetRing } from './data';
import { useWidgetState } from './store';
import WidgetAttachments from './WidgetAttachments';
import WidgetAllowanceNotice from './WidgetAllowanceNotice';
import type { WidgetAttachment, WidgetContact } from './types';

interface Props {
  value: string;
  onChange: (v: string) => void;
  readOnly?: boolean;
  canGenerate: boolean;
  disabledReason?: string | null;
  onGenerate: () => void;
  allowanceExhausted?: boolean;
  contact?: WidgetContact;
}

const MAX_FILES = 4;
const MAX_BYTES = 5 * 1024 * 1024;

export default function WidgetInput({
  value,
  onChange,
  readOnly = false,
  canGenerate,
  disabledReason = null,
  onGenerate,
  allowanceExhausted,
  contact,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, update] = useWidgetState();
  const [error, setError] = useState<string | null>(null);

  const attachments = state.attachments;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(140, Math.max(44, el.scrollHeight))}px`;
  }, [value]);

  const addFiles = (files: File[]) => {
    if (files.length === 0) return;
    const room = MAX_FILES - attachments.length;
    if (room <= 0) {
      setError(`You can attach up to ${MAX_FILES} photos.`);
      return;
    }
    const oversized = files.some((f) => f.size > MAX_BYTES);
    const images = files.filter((f) => f.type.startsWith('image/'));
    if (images.length === 0) {
      setError('Only image files can be attached.');
      return;
    }
    const next: WidgetAttachment[] = images
      .slice(0, room)
      .map((f, i) => ({
        id: `${Date.now()}-${i}-${f.name}`,
        name: f.name,
        url: URL.createObjectURL(f),
      }));
    update({ attachments: [...attachments, ...next] });
    setError(
      oversized
        ? 'Photos over 5 MB were skipped.'
        : files.length > room
          ? `You can attach up to ${MAX_FILES} photos.`
          : null
    );
  };

  const removeFile = (id: string) => {
    const found = attachments.find((a) => a.id === id);
    if (found) URL.revokeObjectURL(found.url);
    update({ attachments: attachments.filter((a) => a.id !== id) });
    setError(null);
  };

  const locked = readOnly || !!allowanceExhausted;
  const disabled = !canGenerate;

  return (
    <div>
      <div
        className="rounded-[28px] border border-[var(--w-border)] focus-within:ring-2 focus-within:ring-[var(--w-primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--w-surface)]"
        style={{ backgroundColor: 'var(--w-surface)' }}
      >
        <div className="px-4 pt-3.5">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={locked}
            disabled={locked}
            aria-label="Describe the piece"
            placeholder="Describe the piece — the stone, the metal, the setting."
            rows={1}
            className="w-full text-[15px] leading-relaxed bg-transparent outline-none resize-none border-0 placeholder:text-[var(--w-text-sec)] disabled:cursor-not-allowed"
            style={{ color: 'var(--w-text)', minHeight: 44, maxHeight: 140 }}
          />
          {attachments.length > 0 && (
            <div className="mt-3">
              <WidgetAttachments
                attachments={attachments}
                onRemove={locked ? undefined : removeFile}
              />
            </div>
          )}
        </div>
        {allowanceExhausted ? (
          <div className="px-3 pb-3 pt-1">
            <WidgetAllowanceNotice
              phone={contact?.phone ?? null}
              email={contact?.email ?? null}
            />
          </div>
        ) : (
          <div className="px-3 pb-3 flex items-center justify-between gap-2">
            {!readOnly ? (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={attachments.length >= MAX_FILES}
                aria-label="Attach a photo"
                title="Attach a photo"
                className={`h-10 w-10 shrink-0 rounded-full border flex items-center justify-center transition-colors duration-150 ${widgetRing} ${
                  attachments.length >= MAX_FILES
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer hover:border-[var(--w-primary)]'
                }`}
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'var(--w-border)',
                  color: 'var(--w-text-sec)',
                }}
              >
                <i className="ri-attachment-2 text-[18px]" />
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={onGenerate}
              disabled={disabled}
              className={`h-10 px-5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 ${widgetRing} ${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              style={{
                backgroundColor: disabled ? 'var(--w-border)' : 'var(--w-primary)',
                color: disabled ? 'var(--w-text-sec)' : 'var(--w-primary-text)',
              }}
            >
              See it made
            </button>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
          onChange={(e) => {
            addFiles(Array.from(e.target.files ?? []));
            e.target.value = '';
          }}
        />
      </div>
      {error && (
        <p
          aria-live="polite"
          className="mt-2 text-[13px] text-right"
          style={{ color: 'var(--w-text-sec)' }}
        >
          {error}
        </p>
      )}
      {!error && !allowanceExhausted && disabled && disabledReason && (
        <p
          className="mt-2 text-[13px] text-right"
          style={{ color: 'var(--w-text-sec)' }}
        >
          {disabledReason}
        </p>
      )}
    </div>
  );
}