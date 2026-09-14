'use client';

import { FOCUS_RING } from './data';
import { METAL_HEX } from '../../lib/metals';

export interface Draft {
  id: string;
  label: string;
  image: string;
}

interface Props {
  drafts: Draft[];
  metal: 'yellow' | 'white' | 'rose';
  currentId: string;
  locked: boolean;
  reason: string;
  onSelect: (id: string) => void;
}

export default function DraftHistory({
  drafts,
  metal,
  currentId,
  locked,
  reason,
  onSelect,
}: Props) {
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = drafts.findIndex((d) => d.id === currentId);
    const move = (dir: number) => {
      const next = drafts[(idx + dir + drafts.length) % drafts.length];
      if (!next || locked) return;
      onSelect(next.id);
      e.currentTarget
        .querySelector<HTMLButtonElement>(`[data-d="${next.id}"]`)
        ?.focus();
    };
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      move(-1);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-medium text-[var(--text-sec)]">Draft history</p>
        {locked && (
          <p className="text-[13px] text-[var(--text-sec)]">{reason}</p>
        )}
      </div>
      <div
        className="mt-3 flex gap-3 overflow-x-auto px-1 pt-2 pb-1 [scrollbar-width:none] [-webkit-scrollbar:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Draft history"
        onKeyDown={onKey}
      >
        {drafts.map((d) => {
          const current = d.id === currentId;
          const hex = METAL_HEX[metal];
          return (
            <button
              key={d.id}
              type="button"
              data-d={d.id}
              disabled={locked}
              onClick={() => onSelect(d.id)}
              className={`text-left ${FOCUS_RING} ${
                locked ? 'cursor-default opacity-70' : 'hover:opacity-90'
              } transition-opacity duration-150`}
            >
              <div
                className={`relative w-[88px] h-[88px] rounded-[8px] overflow-hidden bg-[var(--muted)] ${
                  current ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--canvas)]' : ''
                }`}
              >
                <img
                  src={d.image}
                  alt={`Draft ${d.label}`}
                  className="w-full h-full object-cover"
                />
                {metal !== 'yellow' && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: hex,
                      mixBlendMode: 'multiply',
                      opacity: 0.8,
                    }}
                  />
                )}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="text-[11px] text-[var(--text-sec)]">{d.label}</span>
                {current && (
                  <span className="text-[11px] font-medium text-[var(--text)]">
                    Current
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}