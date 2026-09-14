import type { QuoteBrand } from './data';

export default function QuoteHeader({ brand, page }: { brand: QuoteBrand; page: string }) {
  return (
    <header className="bg-white border-b border-[#DCE3F0]">
      <div className="h-14 md:h-16 px-4 md:px-6 flex items-center gap-3">
        {brand.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={brand.brandName}
            className="h-8 md:h-10 w-auto object-contain"
          />
        ) : (
          <span className="text-[18px] font-semibold text-[#16233E]">
            {brand.brandName}
          </span>
        )}
        <span className="w-px h-5 bg-[#DCE3F0]" aria-hidden="true" />
        <span className="text-[15px] font-medium text-[#16233E]">{page}</span>
      </div>
    </header>
  );
}