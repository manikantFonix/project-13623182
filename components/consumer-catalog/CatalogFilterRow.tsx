'use client';

import { useEffect, useRef, useState } from 'react';
import type { Filters, Facets } from './FilterChips';
import CatalogFilterMenu from './CatalogFilterMenu';

export default function CatalogFilterRow({
  showClear,
  onClear,
  facets,
  filters,
  onChange,
  brandColor,
}: {
  showClear: boolean;
  onClear: () => void;
  facets: Facets;
  filters: Filters;
  onChange: (f: Filters) => void;
  brandColor: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const activeCount = [
    filters.category,
    filters.metal,
    filters.priceMin,
    filters.priceMax,
  ].filter((v) => v != null).length;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-5 md:px-6 pt-4 md:pt-6 flex items-center justify-between gap-3">
      <div>
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Deselect all pieces"
            className="h-10 px-4 inline-flex items-center gap-2 rounded-full bg-white border border-[#DCE3F0] text-[13px] font-medium text-[#16233E] hover:border-[#C6D0E6] transition-colors duration-150 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            <i className="ri-close-line text-[16px] w-4 h-4 inline-flex items-center justify-center" />
            Deselect all
          </button>
        )}
      </div>

      <div ref={wrapRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          style={activeCount > 0 ? { borderColor: brandColor, color: brandColor } : undefined}
          className="h-10 px-4 inline-flex items-center gap-2 rounded-full bg-white border border-[#DCE3F0] text-[13px] font-medium text-[#16233E] hover:border-[#C6D0E6] transition-colors duration-150 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        >
          Filters
          {activeCount > 0 && (
            <span
              className="w-5 h-5 rounded-full text-white text-[11px] inline-flex items-center justify-center tabular-nums"
              style={{ backgroundColor: brandColor }}
            >
              {activeCount}
            </span>
          )}
          <i className="ri-add-line text-[16px] w-4 h-4 inline-flex items-center justify-center" />
        </button>

        {open && (
          <div className="absolute top-[calc(100%+10px)] right-0 z-40 w-[300px]">
            <CatalogFilterMenu
              facets={facets}
              filters={filters}
              onChange={onChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}