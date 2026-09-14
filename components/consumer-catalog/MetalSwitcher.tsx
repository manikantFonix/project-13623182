'use client';

import { METAL_LABEL, metalHex, type Metal } from './data';

export default function MetalSwitcher({
  metals,
  value,
  onChange,
  brandColor,
}: {
  metals: Metal[];
  value: Metal;
  onChange: (m: Metal) => void;
  brandColor: string;
}) {
  if (metals.length <= 1) return null;
  return (
    <div className="flex items-start gap-4" role="group" aria-label="Metal">
      {metals.map((m) => {
        const active = value === m;
        return (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m)}
            aria-pressed={active}
            className="flex flex-col items-center gap-1.5 min-w-[44px] cursor-pointer rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            <span
              aria-hidden
              className="block w-9 h-9 rounded-full border border-[#DCE3F0] transition-colors duration-150"
              style={{
                backgroundColor: metalHex(m),
                boxShadow: active
                  ? `0 0 0 2px #FFFFFF, 0 0 0 4px ${brandColor}`
                  : undefined,
              }}
            />
            <span
              className={
                active
                  ? 'text-[12px] font-medium text-[#16233E]'
                  : 'text-[12px] text-[#5D6C8A]'
              }
            >
              {METAL_LABEL[m]}
            </span>
          </button>
        );
      })}
    </div>
  );
}