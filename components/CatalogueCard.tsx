'use client';

import Link from 'next/link';

export interface Catalogue {
  id: string;
  name: string;
  productCount: number;
  status: 'Live' | 'Not published';
  image: string;
}

interface Props {
  catalogue: Catalogue;
}

export default function CatalogueCard({ catalogue }: Props) {
  const live = catalogue.status === 'Live';
  return (
    <Link
      href={`/catalogue/${catalogue.id}`}
      className="group bg-white border border-[#DDE3E6] rounded-[12px] overflow-hidden block text-left transition-colors duration-150 hover:border-[#C3CCD1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F6F7]">
        <img
          src={catalogue.image}
          alt={catalogue.name}
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-2 right-2 inline-flex items-center h-6 px-2 rounded-full text-xs font-medium ${
            live ? 'text-[#3D6B54]' : 'text-[#5C6870]'
          } bg-white`}
        >
          {catalogue.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[#131A1F]">
          {catalogue.name}
        </h3>
        <p className="mt-1 text-[13px] text-[#5C6870] tabular-nums">
          {catalogue.productCount} products
        </p>
      </div>
    </Link>
  );
}