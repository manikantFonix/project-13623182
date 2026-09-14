'use client';

import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import ViewImage from './ViewImage';
import { VIEW_LABEL, VIEW_ORDER } from './pipeline';
import { widgetRing } from './data';
import type { WidgetMetal, WidgetView } from './types';

interface Props {
  active: WidgetView;
  onChange: (v: WidgetView) => void;
  categoryLabel: string;
  metal: WidgetMetal;
}

export default function AngleThumbs({
  active,
  onChange,
  categoryLabel,
  metal,
}: Props) {
  const others = VIEW_ORDER.filter((v) => v !== active);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleKey = (e: KeyboardEvent, index: number) => {
    const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const next = (index + dir + others.length) % others.length;
    const v = others[next];
    onChange(v);
    refs.current[v]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Angles"
      className="flex flex-col gap-3 shrink-0 w-full sm:w-[18%] sm:min-w-[170px] sm:max-w-[250px]"
    >
      {others.map((v, i) => (
        <button
          key={v}
          ref={(el) => {
            refs.current[v] = el;
          }}
          type="button"
          role="tab"
          aria-selected={false}
          onClick={() => onChange(v)}
          onKeyDown={(e) => handleKey(e, i)}
          aria-label={VIEW_LABEL[v]}
          title={`Show ${VIEW_LABEL[v]} view`}
          className={`relative text-left flex-1 flex flex-col transition-opacity duration-150 hover:opacity-100 cursor-pointer ${widgetRing}`}
        >
          <div
            className="flex-1 aspect-square rounded-[8px] overflow-hidden border"
            style={{
              backgroundColor: 'var(--w-surface)',
              borderColor: 'var(--w-border)',
            }}
          >
            <ViewImage
              metal={metal}
              view={v}
              alt={`${categoryLabel} design, ${VIEW_LABEL[v]} view`}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="absolute left-2 bottom-2 text-[11px] font-medium px-1.5 py-0.5 rounded-[6px] whitespace-nowrap backdrop-blur"
            style={{
              color: 'var(--w-text)',
              backgroundColor: 'color-mix(in srgb, var(--w-surface) 75%, transparent)',
            }}
          >
            {VIEW_LABEL[v]}
          </span>
        </button>
      ))}
    </div>
  );
}