'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Dropdown from './Dropdown';
import SelectCheckbox from './ui/SelectCheckbox';

export interface Product {
  id: string;
  category: string;
  description: string;
  renderStatus: 'complete' | 'generating' | 'flagged' | 'pending';
  price: number | null;
  active: boolean;
  image: string;
  angleWarning?: boolean;
}

interface Props {
  products: Product[];
  onToggle: (id: string, active: boolean) => void;
  selectMode?: boolean;
  selectedIds?: Set<string>;
  onSelect?: (id: string) => void;
  onSelectAll?: () => void;
  allSelected?: boolean;
}

const makeMenu = (id: string) => [
  <Link
    key="edit"
    href={`/catalog/bridal-2026/product/${id}`}
    className="block w-full text-left px-3 h-9 text-[13px] text-[var(--text)] hover:bg-[var(--canvas)] rounded-[8px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
  >
    Edit
  </Link>,
  <button
    key="del"
    onClick={() => {}}
    className="w-full text-left px-3 h-9 text-[13px] text-[var(--alert)] hover:bg-[var(--canvas)] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
  >
    Delete
  </button>,
];

function RenderChip({ status }: { status: Product['renderStatus'] }) {
  if (status === 'complete')
    return (
      <span className="inline-flex items-center text-[13px] font-medium text-[var(--success)]">
        12 of 12
      </span>
    );
  if (status === 'generating')
    return (
      <span className="inline-flex items-center text-[13px] font-medium text-[var(--text-sec)]">
        Generating
      </span>
    );
  if (status === 'pending')
    return (
      <span className="inline-flex items-center text-[13px] font-medium text-[var(--text-sec)]">
        Not started
      </span>
    );
  return (
    <button className="inline-flex items-center text-[13px] font-medium text-[var(--alert)] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]">
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
      className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
      aria-pressed={active}
    >
      <span
        className={`relative inline-flex items-center w-9 h-5 rounded-full transition-colors duration-150 ${
          active ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
        }`}
      >
        <span
          className={`absolute w-4 h-4 rounded-full bg-[var(--knob)] transition-all duration-150 ${
            active ? 'left-[18px]' : 'left-[2px]'
          }`}
        />
      </span>
      <span className="text-[13px] font-medium text-[var(--text)]">
        {active ? 'Active' : 'Inactive'}
      </span>
    </button>
  );
}

export default function ProductTable({
  products,
  onToggle,
  selectMode,
  selectedIds,
  onSelect,
  onSelectAll,
  allSelected,
}: Props) {
  const [menuId, setMenuId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const confirmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (confirmTimer.current) clearTimeout(confirmTimer.current);
    };
  }, []);

  const handleToggle = (id: string, active: boolean) => {
    onToggle(id, active);
    if (!active) {
      setConfirm(id);
      if (confirmTimer.current) clearTimeout(confirmTimer.current);
      confirmTimer.current = setTimeout(() => setConfirm(null), 2600);
    }
  };

  if (products.length === 0) return null;

  const cols = selectMode
    ? 'grid-cols-[40px_56px_1fr_120px_120px_160px_40px]'
    : 'grid-cols-[56px_1fr_120px_120px_160px_40px]';

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] overflow-hidden">
      <div
        className={`grid ${cols} items-center gap-4 px-4 h-11 border-b border-[var(--border)]`}
      >
        {selectMode && (
          <SelectCheckbox
            checked={!!allSelected}
            onChange={() => onSelectAll?.()}
            label="Select all products"
          />
        )}
        <span />
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Product</span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Renders</span>
        <span className="text-right text-[13px] font-medium text-[var(--text-sec)]">
          Price
        </span>
        <span className="text-[13px] font-medium text-[var(--text-sec)]">Status</span>
        <span />
      </div>

      {products.map((p) => (
        <div
          key={p.id}
          className={`grid ${cols} items-center gap-4 px-4 py-3 border-b border-[var(--border)] last:border-b-0 ${
            selectMode && selectedIds?.has(p.id)
              ? 'bg-[var(--canvas)]'
              : ''
          }`}
        >
          {selectMode && (
            <SelectCheckbox
              checked={!!selectedIds?.has(p.id)}
              onChange={() => onSelect?.(p.id)}
              label={`Select ${p.category}`}
            />
          )}
          <img
            src={p.image}
            alt={p.category}
            className="w-14 h-14 rounded-[12px] object-cover bg-[var(--muted)]"
          />
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[var(--text)]">{p.category}</p>
            <p className="text-[13px] text-[var(--text-sec)] truncate">
              {p.description}
            </p>
            {p.angleWarning && (
              <p className="mt-1 text-[13px] text-[var(--alert)]">
                Saved, but we couldn't tell these angles apart. Retake the photographs to start generating.
              </p>
            )}
          </div>
          <RenderChip status={p.renderStatus} />
          <div className="text-right">
            {p.price !== null ? (
              <span className="text-[13px] text-[var(--text)] tabular-nums">
                ${p.price.toLocaleString('en-US')}
              </span>
            ) : (
              <span className="text-[13px] text-[var(--text-sec)] italic">
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
              <p className="mt-1 text-[13px] text-[var(--success)]">
                Hidden from your catalog.
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
                className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-sec)] hover:bg-[var(--canvas)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
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