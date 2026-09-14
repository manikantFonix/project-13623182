'use client';

import { widgetRing } from './data';
import type { EstimateStone as Stone } from './types';

const OPTIONS: { id: Stone; label: string }[] = [
  { id: 'natural', label: 'Natural' },
  { id: 'lab-grown', label: 'Lab-grown' },
];

export default function EstimateStone({
  value,
  onChange,
}: {
  value: Stone | null;
  onChange: (v: Stone) => void;
}) {
  return (
    <div>
      <p className="text-[13px] font-medium" style={{ color: 'var(--w-text)' }}>
        Stone type
      </p>
      <div
        role="radiogroup"
        aria-label="Stone type"
        className="mt-2 flex gap-1 p-1 rounded-full border border-[var(--w-border)]"
        style={{ backgroundColor: 'var(--w-surface)' }}
      >
        {OPTIONS.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.id)}
              className={`flex-1 h-11 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer ${widgetRing}`}
              style={{
                backgroundColor: active ? 'var(--w-primary)' : 'transparent',
                color: active ? 'var(--w-primary-text)' : 'var(--w-text-sec)',
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}