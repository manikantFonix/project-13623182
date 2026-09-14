'use client';

import { METAL_LABEL, metalHex, type Metal } from '../data';

export default function PieceMetalPicker({
  metals,
  value,
  onChange,
  label,
}: {
  metals: Metal[];
  value: Metal;
  onChange: (m: Metal) => void;
  label: string;
}) {
  if (metals.length <= 1) {
    const only = metals[0] ?? value;
    return (
      <div className="flex items-center gap-2 h-11 lg:h-8">
        <span
          aria-hidden
          className="w-6 h-6 rounded-full border border-[#DCE3F0] shrink-0"
          style={{ backgroundColor: metalHex(only) }}
        />
        <span className="text-[13px] text-[#16233E]">{METAL_LABEL[only]}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center" role="group" aria-label={`Metal color for ${label}`}>
        {metals.map((m) => {
          const active = value === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => onChange(m)}
              aria-pressed={active}
              aria-label={METAL_LABEL[m]}
              title={METAL_LABEL[m]}
              className="w-11 h-11 lg:w-8 lg:h-8 inline-flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
            >
              <span
                aria-hidden
                className="w-6 h-6 rounded-full border transition-colors duration-150"
                style={{
                  backgroundColor: metalHex(m),
                  borderColor: active ? 'var(--brand)' : '#DCE3F0',
                  boxShadow: active
                    ? '0 0 0 2px #FFFFFF, 0 0 0 4px var(--brand)'
                    : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
      <span className="hidden md:inline text-[13px] text-[#16233E]">{METAL_LABEL[value]}</span>
    </div>
  );
}