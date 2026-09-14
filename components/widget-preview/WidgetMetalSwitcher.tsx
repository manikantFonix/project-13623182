'use client';

import { METAL_LIST } from '../../lib/metals';
import { widgetRing } from './data';
import type { WidgetMetal } from './types';

interface Props {
  value: WidgetMetal;
  onChange: (m: WidgetMetal) => void;
}

export default function WidgetMetalSwitcher({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Metal">
      {METAL_LIST.map((m) => {
        const selected = m.id === value;
        return (
          <button
            key={m.id}
            type="button"
            aria-label={m.name}
            title={m.name}
            aria-pressed={selected}
            onClick={() => onChange(m.id as WidgetMetal)}
            className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-[box-shadow] duration-150 ${widgetRing} ${
              selected
                ? 'ring-2 ring-[var(--w-primary)] ring-offset-2 ring-offset-[var(--w-border)]'
                : 'hover:ring-2 hover:ring-[var(--w-text-sec)]'
            }`}
          >
            <span
              aria-hidden
              className="block w-[30px] h-[30px] rounded-full border border-[var(--w-border)]"
              style={{ backgroundColor: m.hex }}
            />
          </button>
        );
      })}
    </div>
  );
}