'use client';

import ViewImage from './ViewImage';
import { categoryLabel } from './data';
import type { WidgetMetal } from './types';

export default function RequestPiece({
  category,
  description,
  metal,
}: {
  category: string;
  description: string;
  metal: WidgetMetal;
}) {
  const label = categoryLabel(category);

  return (
    <div className="flex items-start gap-3">
      <div
        className="w-[72px] h-[72px] shrink-0 rounded-[12px] overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: 'var(--w-border)' }}
      >
        <div className="w-[80%] h-[80%]">
          <ViewImage
            metal={metal}
            view="front"
            alt={`${label} design`}
            contain
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-[13px] font-medium" style={{ color: 'var(--w-text)' }}>
          {label}
        </p>
        <p
          className="mt-1 text-[12px] line-clamp-2"
          style={{ color: 'var(--w-text-sec)' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}