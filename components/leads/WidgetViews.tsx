'use client';

import { useState } from 'react';
import { METAL_LIST } from '../../lib/metals';
import type { Lead } from './data';

type Angle = 'front' | 'side' | 'back' | 'worn';

const ANGLES: Angle[] = ['front', 'side', 'back', 'worn'];

const ANGLE_LABEL: Record<Angle, string> = {
  front: 'Front',
  side: 'Side',
  back: 'Back',
  worn: 'Worn',
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]';

export default function WidgetViews({ lead }: { lead: Lead }) {
  const [active, setActive] = useState<Angle>('front');
  const metal = lead.metal ?? 'yellow';

  const chosen = METAL_LIST.find((m) => m.id === metal);
  const others = ANGLES.filter((a) => a !== active);

  const set = lead.views;
  const imageFor = (a: Angle) =>
    set?.[metal]?.[a] ?? set?.yellow?.[a] ?? undefined;

  return (
    <div className="mt-3">
      <div className="flex items-stretch gap-3">
        <div className="relative flex-1 rounded-[12px] bg-[var(--muted)] border border-[var(--border)] overflow-hidden flex items-center justify-center">
          {imageFor(active) && (
            <img
              src={imageFor(active)}
              alt={`Generated design, ${ANGLE_LABEL[active]} view`}
              className="w-[62%] h-[62%] object-contain"
            />
          )}

          <span className="absolute bottom-3 left-3 text-[12px] text-[var(--text-sec)]">
            {ANGLE_LABEL[active]}
          </span>
        </div>

        <div
          className="flex flex-col gap-3 w-[18%] min-w-[170px] max-w-[250px]"
          role="tablist"
          aria-label="Angles"
        >
          {others.map((a) => (
            <button
              key={a}
              type="button"
              role="tab"
              aria-selected={false}
              onClick={() => setActive(a)}
              aria-label={ANGLE_LABEL[a]}
              title={`Show ${ANGLE_LABEL[a]} view`}
              className={`relative text-left flex-1 flex flex-col transition-opacity duration-150 hover:opacity-100 ${focusRing}`}
            >
              <div className="flex-1 aspect-square rounded-[8px] overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
                <img
                  src={imageFor(a)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute left-2 bottom-2 text-[11px] font-medium text-[var(--text)] bg-[var(--surface)]/75 backdrop-blur px-1.5 py-0.5 rounded-[6px] whitespace-nowrap">
                {ANGLE_LABEL[a]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className="w-5 h-5 rounded-full shrink-0"
          style={{ backgroundColor: chosen?.hex }}
        />
        <span className="text-[13px] text-[var(--text)]">
          {chosen?.name ?? lead.metal}
        </span>
      </div>
    </div>
  );
}