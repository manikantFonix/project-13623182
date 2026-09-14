'use client';

import type { WidgetAttachment } from './types';

interface Props {
  attachments: WidgetAttachment[];
  onRemove?: (id: string) => void;
}

export default function WidgetAttachments({ attachments, onRemove }: Props) {
  if (attachments.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {attachments.map((a) => (
        <li key={a.id} className="relative w-14 h-14">
          <img
            src={a.url}
            alt={a.name}
            className="w-14 h-14 rounded-[12px] object-cover border"
            style={{ borderColor: 'var(--w-border)' }}
          />
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(a.id)}
              aria-label={`Remove ${a.name}`}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer border"
              style={{
                backgroundColor: 'var(--w-surface)',
                borderColor: 'var(--w-border)',
                color: 'var(--w-text)',
              }}
            >
              <i className="ri-close-line text-[13px]" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}