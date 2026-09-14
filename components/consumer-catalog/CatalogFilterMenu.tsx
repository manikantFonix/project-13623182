'use client';

import { METAL_LABEL, metalHex } from './data';
import { emptyFilters, type Filters, type Facets } from './FilterChips';

export default function CatalogFilterMenu({
  facets,
  filters,
  onChange,
}: {
  facets: Facets;
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const row =
    'w-full text-left px-3 h-9 rounded-[8px] text-[13px] hover:bg-[#F3F6FC] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]';
  const labelCls =
    'text-[11px] font-medium uppercase tracking-[0.14em] text-[#5D6C8A]';
  const inputCls =
    'mt-2 w-full h-9 px-3 text-[13px] bg-white border border-[#DCE3F0] rounded-full text-[#16233E] outline-none placeholder-[#5D6C8A] tabular-nums focus:border-[var(--brand)]';

  return (
    <div className="p-4 bg-white border border-[#DCE3F0] rounded-[12px] space-y-5">
      {facets.categories.length > 1 && (
        <div>
          <span className={labelCls}>Category</span>
          <div className="mt-2 space-y-0.5">
            <button
              onClick={() => onChange({ ...filters, category: null })}
              className={`${row} ${
                filters.category === null ? 'font-medium text-[#16233E]' : 'text-[#5D6C8A]'
              }`}
            >
              All categories
            </button>
            {facets.categories.map((c) => (
              <button
                key={c.value}
                onClick={() => onChange({ ...filters, category: c.value })}
                className={`${row} flex items-center justify-between ${
                  filters.category === c.value ? 'font-medium text-[#16233E]' : 'text-[#5D6C8A]'
                }`}
              >
                {c.value}
                <span className="tabular-nums text-[#5D6C8A]">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {facets.metals.length > 1 && (
        <div>
          <span className={labelCls}>Metal</span>
          <div className="mt-2 space-y-0.5">
            {facets.metals.map((m) => (
              <button
                key={m}
                onClick={() =>
                  onChange({ ...filters, metal: filters.metal === m ? null : m })
                }
                className={`${row} flex items-center gap-2 ${
                  filters.metal === m ? 'font-medium text-[#16233E]' : 'text-[#5D6C8A]'
                }`}
              >
                <span
                  aria-hidden
                  className="w-4 h-4 rounded-full border border-[#DCE3F0]"
                  style={{ backgroundColor: metalHex(m) }}
                />
                {METAL_LABEL[m]}
              </button>
            ))}
          </div>
        </div>
      )}

      {facets.price && (
        <div>
          <span className={labelCls}>Price</span>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              value={filters.priceMin ?? ''}
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceMin: e.target.value === '' ? null : Number(e.target.value),
                })
              }
              placeholder={String(facets.price.min)}
              className={inputCls}
            />
            <span className="text-[#5D6C8A]">–</span>
            <input
              type="number"
              value={filters.priceMax ?? ''}
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceMax: e.target.value === '' ? null : Number(e.target.value),
                })
              }
              placeholder={String(facets.price.max)}
              className={inputCls}
            />
          </div>
        </div>
      )}

      <button
        onClick={() => onChange(emptyFilters)}
        className="w-full h-9 rounded-full border border-[#DCE3F0] text-[13px] font-medium text-[#16233E] hover:border-[#C6D0E6] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
      >
        Clear all
      </button>
    </div>
  );
}