import type { ApprovalBrand } from './data';

export default function ApprovalHeader({ brand }: { brand: ApprovalBrand }) {
  return (
    <header className="bg-white border-b border-[#DCE3F0]">
      <div className="max-w-[720px] mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center">
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
      </div>
    </header>
  );
}