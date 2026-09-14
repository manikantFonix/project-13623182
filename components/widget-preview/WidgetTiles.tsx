'use client';

import { JEWELRY_TYPES, MORE_TYPES } from '../DesignTiles';

interface Props {
  selected: string | null;
  more: boolean;
  onSelect: (id: string) => void;
  onToggleMore: () => void;
  readOnly?: boolean;
}

const tileRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--w-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--w-surface)]';

export default function WidgetTiles({
  selected,
  more,
  onSelect,
  onToggleMore,
  readOnly,
}: Props) {
  const renderTile = (t: { id: string; label: string; icon: string }) => {
    const active = selected === t.id;
    return (
      <div key={t.id} className="w-[84px] flex flex-col items-center">
        <button
          type="button"
          onClick={readOnly ? undefined : () => onSelect(t.id)}
          disabled={readOnly}
          aria-disabled={readOnly}
          aria-pressed={active}
          className={`w-16 h-16 rounded-[18px] flex items-center justify-center transition-colors duration-150 ${
            readOnly ? 'cursor-default' : 'cursor-pointer'
          } ${tileRing} ${
            active
              ? 'border-2 border-[var(--w-primary)]'
              : `border border-[var(--w-border)] ${
                  readOnly ? '' : 'hover:border-[var(--w-primary)]'
                }`
          }`}
          style={{ backgroundColor: 'var(--w-surface)' }}
        >
          <i
            className={`${t.icon} text-[26px]`}
            style={{ color: active ? 'var(--w-text)' : 'var(--w-text-sec)' }}
          />
        </button>
        <span
          className="mt-2 text-[12px] leading-none text-center font-medium"
          style={{ color: active ? 'var(--w-text)' : 'var(--w-text-sec)' }}
        >
          {t.label}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap justify-center gap-3">
        {JEWELRY_TYPES.map(renderTile)}
        <div className="w-[84px] flex flex-col items-center">
          <button
            type="button"
            onClick={readOnly ? undefined : onToggleMore}
            disabled={readOnly}
            aria-disabled={readOnly}
            aria-expanded={more}
            aria-label={more ? 'Show fewer categories' : 'Show more categories'}
            className={`w-16 h-16 rounded-[18px] border border-dashed border-[var(--w-border)] flex items-center justify-center transition-colors duration-150 ${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:border-[var(--w-primary)]'
            } ${tileRing}`}
            style={{ backgroundColor: 'var(--w-surface)' }}
          >
            <i
              className="ri-add-line text-[26px]"
              style={{ color: 'var(--w-text-sec)' }}
            />
          </button>
          <span
            className="mt-2 text-[12px] leading-none text-center font-medium"
            style={{ color: 'var(--w-text-sec)' }}
          >
            {more ? 'Less' : 'More'}
          </span>
        </div>
      </div>
      {more && (
        <div className="flex flex-wrap justify-center gap-3">
          {MORE_TYPES.map(renderTile)}
        </div>
      )}
    </div>
  );
}