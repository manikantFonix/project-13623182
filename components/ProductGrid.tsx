'use client';

import { useState } from 'react';
import Link from 'next/link';
import Dropdown from './Dropdown';
import type { Product } from './ProductTable';

interface Props {
  products: Product[];
  onToggle: (id: string, active: boolean) => void;
}

const STATUS: Record<Product['renderStatus'], { label: string; cls: string }> = {
  complete: { label: '12 of 12', cls: 'text-[#3D6B54]' },
  generating: { label: 'Generating', cls: 'text-[#5C6870]' },
  flagged: { label: '3 flagged', cls: 'text-[#A8552A]' },
};

const menu = (id: string) => [
  <Link
    key="edit"
    href={`/catalogue/bridal-2026/product/${id}`}
    className="block w-full text-left px-3 h-9 text-sm text-[#131A1F] hover:bg-[#EFF2F3] rounded-[8px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
  >
    Edit
  </Link>,
  <button
    key="del"
    onClick={() => {}}
    className="w-full text-left px-3 h-9 text-sm text-[#A8552A] hover:bg-[#EFF2F3] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
  >
    Delete
  </button>,
];

function StatusToggle({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
      aria-pressed={active}
    >
      <span
        className={`relative inline-flex items-center w-9 h-5 rounded-full transition-colors duration-150 ${
          active ? 'bg-[#16323F]' : 'bg-[#C7CBCC]'
        }`}
      >
        <span
          className={`absolute w-4 h-4 rounded-full bg-white transition-all duration-150 ${
            active ? 'left-[18px]' : 'left-[2px]'
          }`}
        />
      </span>
      <span className="text-[13px] font-medium text-[#131A1F]">
        {active ? 'Active' : 'Inactive'}
      </span>
    </button>
  );
}

export default function ProductGrid({ products, onToggle }: Props) {
  const [menuId, setMenuId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);

  const handleToggle = (id: string, active: boolean) => {
    onToggle(id, active);
    if (!active) {
      setConfirm(id);
      setTimeout(() => setConfirm(null), 2600);
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((p) => {
        const st = STATUS[p.renderStatus];
        return (
          <article
            key={p.id}
            className="bg-white border border-[#DDE3E6] rounded-[12px] overflow-hidden flex flex-col"
          >
            <Link
              href={`/catalogue/bridal-2026/product/${p.id}`}
              className="relative block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#F4F6F7]">
                <img
                  src={p.image}
                  alt={p.category}
                  className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-[1.03]"
                />
              </div>
              <span
                className={`absolute top-2 left-2 inline-flex items-center h-6 px-2 rounded-full text-[13px] font-medium ${st.cls} bg-white`}
              >
                {st.label}
              </span>
            </Link>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#131A1F]">{p.category}</p>
                  <p className="mt-0.5 text-[13px] text-[#5C6870] truncate">
                    {p.description}
                  </p>
                </div>
                <Dropdown
                  open={menuId === p.id}
                  onToggle={(o) => setMenuId(o ? p.id : null)}
                  align="right"
                  panelClass="w-[120px]"
                  trigger={
                    <button
                      onClick={() => setMenuId(menuId === p.id ? null : p.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-[#5C6870] hover:bg-[#EFF2F3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
                    >
                      <i className="ri-more-2-fill text-[18px]" />
                    </button>
                  }
                >
                  {menu(p.id)}
                </Dropdown>
              </div>
              <div className="mt-3 pt-3 border-t border-[#DDE3E6] flex items-center justify-between">
                {p.price !== null ? (
                  <span className="text-sm text-[#131A1F] tabular-nums">
                    ${p.price.toLocaleString('en-US')}
                  </span>
                ) : (
                  <span className="text-[13px] text-[#5C6870] italic">
                    Price on request
                  </span>
                )}
                <StatusToggle
                  active={p.active}
                  onToggle={() => handleToggle(p.id, p.active)}
                />
              </div>
              {confirm === p.id && (
                <p className="mt-2 text-[13px] text-[#3D6B54]">
                  Hidden from your catalogue.
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}