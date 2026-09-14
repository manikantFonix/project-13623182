'use client';

const tiles = [
  { id: 'pendant', label: 'Pendant', icon: 'ri-vip-diamond-line' },
  { id: 'ring', label: 'Ring', icon: 'ri-circle-line' },
  { id: 'bracelet', label: 'Bracelet', icon: 'ri-link-m' },
  { id: 'necklace', label: 'Necklace', icon: 'ri-radio-button-line' },
  { id: 'earring', label: 'Earring', icon: 'ri-drop-line' },
  { id: 'body-jewelry', label: 'Body jewelry', icon: 'ri-heart-line' },
  { id: 'brooch', label: 'Brooch', icon: 'ri-medal-line' },
];

const libraryThumbs = [
  'https://readdy.ai/api/search-image?query=close%20up%20jewelry%20product%20photo%20of%20a%20gold%20pendant%20necklace%20on%20a%20soft%20neutral%20background%2C%20studio%20lighting%2C%20clean%20minimal&width=120&height=120&seq=81&orientation=squarish',
  'https://readdy.ai/api/search-image?query=close%20up%20jewelry%20product%20photo%20of%20a%20rose%20gold%20ring%20on%20a%20soft%20neutral%20background%2C%20studio%20lighting%2C%20clean%20minimal&width=120&height=120&seq=82&orientation=squarish',
  'https://readdy.ai/api/search-image?query=close%20up%20jewelry%20product%20photo%20of%20a%20silver%20bracelet%20on%20a%20soft%20neutral%20background%2C%20studio%20lighting%2C%20clean%20minimal&width=120&height=120&seq=83&orientation=squarish',
];

export default function ConsumerPreview() {
  return (
    <div aria-hidden="true" className="border border-[var(--border)] rounded-[16px] bg-[var(--surface)] p-4">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-[var(--text)]">Design a piece</span>
        <span className="text-[11px] text-[var(--text-sec)]">Craftsman</span>
      </div>

      <div className="mt-3 text-center">
        <p className="text-[13px] font-semibold text-[var(--text)]">Jewelry type</p>
        <div className="mt-2.5 flex flex-wrap justify-center gap-2.5">
          {tiles.map((t) => (
            <div key={t.id} className="w-[58px] flex flex-col items-center">
              <div className="w-12 h-12 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
                <i className={`${t.icon} text-[19px] text-[var(--accent-text)]`} />
              </div>
              <span className="mt-1.5 text-[10px] leading-none text-center font-medium text-[var(--text-sec)]">
                {t.label}
              </span>
            </div>
          ))}
          <div className="w-[58px] flex flex-col items-center">
            <div className="w-12 h-12 rounded-[14px] border border-dashed border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
              <i className="ri-add-line text-[19px] text-[var(--text-sec)]" />
            </div>
            <span className="mt-1.5 text-[10px] leading-none text-center font-medium text-[var(--text-sec)]">
              More
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <div className="px-3 py-2 border-b border-[var(--border)]">
          <span className="text-[12px] font-medium text-[var(--text)]">Describe your design</span>
        </div>
        <div className="px-3 py-2.5 flex items-center gap-2">
          <div className="w-7 h-7 shrink-0 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-sec)]">
            <i className="ri-attachment-2 text-[16px]" />
          </div>
          <span className="flex-1 text-[12px] text-[var(--text-sec)]">
            Describe the piece — the stone, the metal, the setting…
          </span>
          <div className="shrink-0 flex items-center gap-1.5">
            <div className="w-7 h-7 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-sec)]">
              <i className="ri-camera-line text-[15px]" />
            </div>
            <div className="w-7 h-7 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-sec)]">
              <i className="ri-mic-line text-[15px]" />
            </div>
            <div className="h-8 px-3.5 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <span className="text-[12px] font-medium text-[var(--on-accent)] whitespace-nowrap">
                Generate render
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[11px] text-[var(--text-sec)]">Ideas</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {libraryThumbs.map((src, i) => (
            <div key={i} className="h-14 rounded-[10px] overflow-hidden bg-[var(--muted)]">
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}