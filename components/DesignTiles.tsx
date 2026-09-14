'use client';

export const JEWELRY_TYPES = [
  { id: 'pendant', label: 'Pendant', icon: 'ri-vip-diamond-line' },
  { id: 'ring', label: 'Ring', icon: 'ri-circle-line' },
  { id: 'bracelet', label: 'Bracelet', icon: 'ri-link-m' },
  { id: 'necklace', label: 'Necklace', icon: 'ri-radio-button-line' },
  { id: 'earring', label: 'Earring', icon: 'ri-drop-line' },
  { id: 'body-jewelry', label: 'Body jewelry', icon: 'ri-heart-line' },
  { id: 'brooch', label: 'Brooch', icon: 'ri-medal-line' },
];

export const MORE_TYPES = [
  { id: 'grillz', label: 'Grillz', icon: 'ri-emotion-happy-line' },
  { id: 'watch', label: 'Watch', icon: 'ri-timer-line' },
  { id: 'bail', label: 'Bail', icon: 'ri-attachment-line' },
  { id: 'clasp', label: 'Clasp', icon: 'ri-lock-line' },
  { id: 'buckle', label: 'Buckle', icon: 'ri-toggle-line' },
  { id: 'cufflink', label: 'Cufflink', icon: 'ri-record-circle-line' },
];

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
  more: boolean;
  onToggleMore: () => void;
  invalid?: boolean;
  shakeKey?: number;
}

export default function DesignTiles({ selected, onSelect, more, onToggleMore, invalid = false, shakeKey = 0 }: Props) {
  const showError = invalid && !selected;
  const shake = showError
    ? 'animate-[tile-shake_0.4s_ease-in-out] motion-reduce:animate-none'
    : '';
  const tile = (t: { id: string; label: string; icon: string }) => {
    const active = selected === t.id;
    const border = active
      ? 'border-2 border-[var(--accent)] bg-[var(--surface)]'
      : showError
        ? 'border-2 border-[var(--alert)] bg-[var(--alert)]/5'
        : 'border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]';
    return (
      <div
        key={`${t.id}-${showError ? shakeKey : 'steady'}`}
        className="w-[84px] flex flex-col items-center"
      >
        <button
          type="button"
          onClick={() => onSelect(t.id)}
          aria-pressed={active}
          aria-invalid={showError}
          className={`w-16 h-16 rounded-[18px] flex items-center justify-center transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${border} ${shake}`}
        >
          <i
            className={`${t.icon} text-[26px] ${
              active
                ? 'text-[var(--accent-text)]'
                : showError
                  ? 'text-[var(--alert)]'
                  : 'text-[var(--text-sec)]'
            }`}
          />
        </button>
        <span
          className={`mt-2 text-[12px] leading-none text-center font-medium ${
            active
              ? 'text-[var(--text)]'
              : showError
                ? 'text-[var(--alert)]'
                : 'text-[var(--text-sec)]'
          }`}
        >
          {t.label}
        </span>
      </div>
    );
  };

  const moreTile = (
    <div key="more" className="w-[84px] flex flex-col items-center">
      <button
        type="button"
        onClick={onToggleMore}
        aria-expanded={more}
        className="w-16 h-16 rounded-[18px] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] flex items-center justify-center transition-colors duration-150 cursor-pointer hover:border-[var(--text-sec)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
      >
        <i className="ri-add-line text-[26px] text-[var(--text-sec)]" />
      </button>
      <span className="mt-2 text-[12px] leading-none text-center font-medium text-[var(--text-sec)]">
        {more ? 'Less' : 'More'}
      </span>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap justify-center gap-3">
        {JEWELRY_TYPES.map(tile)}
        {moreTile}
      </div>
      {more && (
        <div className="flex flex-wrap justify-center gap-3">
          {MORE_TYPES.map(tile)}
        </div>
      )}
      <style>{`@keyframes tile-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }`}</style>
    </div>
  );
}