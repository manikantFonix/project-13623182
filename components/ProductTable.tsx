'use client';

import { useState } from 'react';
import Link from 'next/link';
import Dropdown from './Dropdown';

export interface Product {
  id: string;
  category: string;
  description: string;
  renderStatus: 'complete' | 'generating' | 'flagged';
  price: number | null;
  active: boolean;
  image: string;
}

interface Props {
  products: Product[];
  onToggle: (id: string, active: boolean) => void;
}

const makeMenu = (id: string) => [
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

function RenderChip({ status }: { status: Product['renderStatus'] }) {
  if (status === 'complete')
    return (
      <span className="inline-flex items-center text-[13px] font-medium text-[#3D6B54]">
        12 of 12
      </span>
    );
  if (status === 'generating')
    return (
      <span className="inline-flex items-center text-[13px] font-medium text-[#5C6870]">
        Generating
      </span>
    );
  return (
    <button className="inline-flex items-center text-[13px] font-medium text-[#A8552A] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]">
      3 flagged
    </button>
  );
}

function Toggle({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
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

export default function ProductTable({ products, onToggle }: Props) {
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
    <div className="bg-white border border-[#DDE3E6] rounded-[12px] overflow-hidden">
      <div className="grid grid-cols-[56px_1fr_120px_120px_160px_40px] items-center gap-4 px-4 h-11 border-b border-[#DDE3E6]">
        <span />
        <span className="text-[13px] font-medium text-[#5C6870]">Product</span>
        <span className="text-[13px] font-medium text-[#5C6870]">Renders</span>
        <span className="text-right text-[13px] font-medium text-[#5C6870]">
          Price
        </span>
        <span className="text-[13px] font-medium text-[#5C6870]">Status</span>
        <span />
      </div>

      {products.map((p) => (
        <div
          key={p.id}
          className="grid grid-cols-[56px_1fr_120px_120px_160px_40px] items-center gap-4 px-4 py-3 border-b border-[#DDE3E6] last:border-b-0"
        >
          <img
            src={p.image}
            alt={p.category}
            className="w-14 h-14 rounded-[12px] object-cover bg-[#F4F6F7]"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#131A1F]">{p.category}</p>
            <p className="text-[13px] text-[#5C6870] truncate">
              {p.description}
            </p>
          </div>
          <RenderChip status={p.renderStatus} />
          <div className="text-right">
            {p.price !== null ? (
              <span className="text-sm text-[#131A1F] tabular-nums">
                ${p.price.toLocaleString('en-US')}
              </span>
            ) : (
              <span className="text-[13px] text-[#5C6870] italic">
                Price on request
              </span>
            )}
          </div>
          <div>
            <Toggle
              active={p.active}
              onToggle={() => handleToggle(p.id, p.active)}
            />
            {confirm === p.id && (
              <p className="mt-1 text-[13px] text-[#3D6B54]">
                Hidden from your catalogue.
              </p>
            )}
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
            {makeMenu(p.id)}
          </Dropdown>
        </div>
      ))}
    </div>
  );
}