'use client';

import Link from 'next/link';

export interface Catalog {
  id: string;
  name: string;
  productCount: number;
  status: 'Live' | 'Not published';
  image: string;
}

interface Props {
  catalog: Catalog;
}

export default function CatalogCard({ catalog }: Props) {
  const live = catalog.status === 'Live';
  return (
    <Link
      href={`/catalog/${catalog.id}?name=${encodeURIComponent(catalog.name)}`}
      className="group bg-[var(--surface)] border border-[var(--border)] rounded-[12px] overflow-hidden block text-left transition-colors duration-150 hover:border-[var(--border-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--muted)]">
        <img
          src={catalog.image}
          alt={catalog.name}
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-2 right-2 inline-flex items-center h-6 px-2 rounded-full text-xs font-medium ${
            live ? 'text-[var(--success)]' : 'text-[var(--text-sec)]'
          } bg-[var(--surface)]`}
        >
          {catalog.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[var(--text)]">
          {catalog.name}
        </h3>
        <p className="mt-1 text-[13px] text-[var(--text-sec)] tabular-nums">
          {catalog.productCount} products
        </p>
      </div>
    </Link>
  );
}