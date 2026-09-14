import type { ApprovalBrand } from './data';
import { FOCUS_BRAND } from './data';

export default function ContactBlock({ brand }: { brand: ApprovalBrand }) {
  const link = `inline-flex items-center min-h-[44px] md:min-h-0 text-[15px] md:text-[13px] text-[var(--brand)] hover:underline transition-colors duration-150 motion-reduce:transition-none rounded-[6px] ${FOCUS_BRAND}`;

  return (
    <div>
      <p className="text-[13px] font-medium text-[#16233E]">{brand.brandName}</p>
      {brand.phone && (
        <p className="mt-1">
          <a href={`tel:${brand.phone}`} className={`${link} tabular-nums`}>
            {brand.phone}
          </a>
        </p>
      )}
      {brand.email && (
        <p className="mt-0.5">
          <a href={`mailto:${brand.email}`} className={link}>
            {brand.email}
          </a>
        </p>
      )}
    </div>
  );
}