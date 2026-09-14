'use client';

import { useState, type KeyboardEvent } from 'react';
import type { Metal, ViewName } from './data';

const VIEWS: { id: ViewName; label: string }[] = [
  { id: 'front', label: 'Front' },
  { id: 'side', label: 'Side' },
  { id: 'back', label: 'Back' },
  { id: 'worn', label: 'Worn' },
];

const RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

export default function Gallery({
  metal,
  images,
  category,
}: {
  metal: Metal;
  images: Partial<Record<ViewName, string>>;
  category: string;
}) {
  const [failed, setFailed] = useState<Partial<Record<ViewName, boolean>>>({});
  const [active, setActive] = useState(0);

  const available = VIEWS.filter((v) => images[v.id] && !failed[v.id]);
  const markFailed = (id: ViewName) => setFailed((f) => ({ ...f, [id]: true }));

  if (available.length === 0) {
    return (
      <div
        className="w-full aspect-square lg:h-full lg:w-auto lg:aspect-square lg:max-w-full rounded-[12px] bg-[#E4E9F4]"
        aria-hidden
      />
    );
  }

  const current = Math.min(active, available.length - 1);
  const view = available[current];

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(available.length - 1, current + 1));
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(0, current - 1));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-3 lg:h-full min-h-0">
      <div className="flex-1 min-w-0 min-h-0 flex items-center justify-center">
        <div className="w-full aspect-square lg:h-full lg:w-auto lg:aspect-square lg:max-w-full rounded-[12px] overflow-hidden bg-white border border-[#DCE3F0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[view.id]}
            alt={`${category} ${view.label.toLowerCase()} view`}
            onError={() => markFailed(view.id)}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {view.label} view
      </p>

      <div
        role="group"
        aria-label={`${category} views`}
        tabIndex={0}
        onKeyDown={onKey}
        className={`flex flex-row lg:flex-col gap-3 shrink-0 overflow-x-auto lg:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${RING}`}
      >
        {available.map((v, i) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${v.label} view`}
            aria-current={i === current}
            className={`w-[88px] h-[88px] aspect-square rounded-[8px] overflow-hidden bg-white shrink-0 cursor-pointer transition-colors duration-150 ${RING} ${
              i === current
                ? 'border-2 border-[var(--brand)]'
                : 'border border-[#DCE3F0]'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[v.id]}
              alt={`${category} ${v.label.toLowerCase()} view`}
              onError={() => markFailed(v.id)}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}