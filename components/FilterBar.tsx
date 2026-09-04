'use client';

import { useState } from 'react';
import Dropdown from './Dropdown';

export interface Filters {
  category: string | null;
  status: string | null;
  min: string;
  max: string;
  priceOnRequest: boolean;
}

export const emptyFilters: Filters = {
  category: null,
  status: null,
  min: '',
  max: '',
  priceOnRequest: false,
};

const CATEGORIES = [
  'Ring',
  'Necklace',
  'Pendant',
  'Earring',
  'Bracelet',
  'Body jewelry',
  'Brooch',
  'Grillz',
  'Watch',
  'Bail',
  'Clasp',
  'Buckle',
  'Cufflink',
];

const STATUSES = ['Active', 'Inactive'];

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export default function FilterBar({ filters, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  const applied =
    filters.category !== null ||
    filters.status !== null ||
    filters.min !== '' ||
    filters.max !== '' ||
    filters.priceOnRequest;

  const trigger = (active: boolean, label: string) => (
    <button
      onClick={() => setOpen((o) => (o === label ? null : label))}
      className={`h-9 px-3 text-sm font-medium border rounded-full flex items-center gap-2 transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
        active
          ? 'border-[#16323F] text-[#16323F] bg-white'
          : 'border-[#DDE3E6] text-[#5C6870] bg-white hover:border-[#C3CCD1]'
      }`}
    >
      {label}
      <span
        className={`w-4 h-4 flex items-center justify-center text-[16px] ${
          open === label ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
        }`}
      />
    </button>
  );

  return (
    <div className="flex items-center gap-2">
      <Dropdown
        open={open === 'Category'}
        onToggle={(o) => setOpen(o ? 'Category' : null)}
        trigger={trigger(filters.category !== null, 'Category')}
        panelClass="w-[220px] max-h-72 overflow-auto"
      >
        <button
          onClick={() => {
            onChange({ ...filters, category: null });
            setOpen(null);
          }}
          className="w-full text-left px-3 h-9 text-sm text-[#5C6870] hover:bg-[#EFF2F3] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
        >
          All categories
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => {
              onChange({ ...filters, category: c });
              setOpen(null);
            }}
            className="w-full text-left px-3 h-9 text-sm text-[#131A1F] hover:bg-[#EFF2F3] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          >
            {c}
          </button>
        ))}
      </Dropdown>

      <Dropdown
        open={open === 'Status'}
        onToggle={(o) => setOpen(o ? 'Status' : null)}
        trigger={trigger(filters.status !== null, 'Status')}
        panelClass="w-[180px]"
      >
        <button
          onClick={() => {
            onChange({ ...filters, status: null });
            setOpen(null);
          }}
          className="w-full text-left px-3 h-9 text-sm text-[#5C6870] hover:bg-[#EFF2F3] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
        >
          Any status
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => {
              onChange({ ...filters, status: s });
              setOpen(null);
            }}
            className="w-full text-left px-3 h-9 text-sm text-[#131A1F] hover:bg-[#EFF2F3] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          >
            {s}
          </button>
        ))}
      </Dropdown>

      <Dropdown
        open={open === 'Price'}
        onToggle={(o) => setOpen(o ? 'Price' : null)}
        trigger={trigger(
          filters.min !== '' || filters.max !== '' || filters.priceOnRequest,
          'Price'
        )}
        panelClass="w-[220px] p-3"
      >
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.min}
            placeholder="Min"
            onChange={(e) => onChange({ ...filters, min: e.target.value })}
            className="w-full h-9 px-3 text-sm border border-[#DDE3E6] rounded-[12px] text-[#131A1F] outline-none focus:border-[#16323F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          />
          <input
            type="number"
            value={filters.max}
            placeholder="Max"
            onChange={(e) => onChange({ ...filters, max: e.target.value })}
            className="w-full h-9 px-3 text-sm border border-[#DDE3E6] rounded-[12px] text-[#131A1F] outline-none focus:border-[#16323F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          />
        </div>
        <button
          onClick={() => onChange({ ...filters, priceOnRequest: !filters.priceOnRequest })}
          className="mt-2 flex items-center gap-2 text-sm text-[#131A1F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
        >
          <span
            className={`w-4 h-4 flex items-center justify-center border rounded-[6px] text-white ${
              filters.priceOnRequest ? 'bg-[#16323F] border-[#16323F]' : 'border-[#DDE3E6]'
            }`}
          >
            {filters.priceOnRequest && <i className="ri-check-line text-[12px]" />}
          </span>
          Price on request
        </button>
      </Dropdown>

      {applied && (
        <button
          onClick={() => onChange(emptyFilters)}
          className="ml-1 h-9 px-2 text-sm font-medium text-[#5C6870] hover:text-[#131A1F] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}