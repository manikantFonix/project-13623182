import type { RetailerBranding } from './data';

export default function ConsumerHeader({
  brand,
  showLogo = true,
}: {
  brand: RetailerBranding;
  showLogo?: boolean;
}) {
  const contact = brand.phone
    ? {
        href: `tel:${brand.phone.replace(/[^+0-9]/g, '')}`,
        label: 'Call',
        icon: 'ri-phone-line',
        aria: `Call ${brand.brandName} at ${brand.phone}`,
      }
    : brand.email
      ? {
          href: `mailto:${brand.email}`,
          label: 'Contact',
          icon: 'ri-mail-line',
          aria: `Email ${brand.brandName}`,
        }
      : null;

  return (
    <header className="bg-white border-b border-[#DCE3F0]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-5 md:px-6 h-16 flex items-center justify-between gap-4">
        {showLogo && brand.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={brand.brandName}
            className="max-h-[40px] md:max-h-[48px] w-auto object-contain"
          />
        ) : (
          <span className="text-[18px] font-semibold text-[#16233E]">
            {brand.brandName}
          </span>
        )}

        {contact && (
          <a
            href={contact.href}
            aria-label={contact.aria}
            style={{ backgroundColor: brand.primaryColor }}
            className="shrink-0 h-9 px-4 rounded-full text-white text-[13px] font-medium whitespace-nowrap inline-flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
          >
            <i
              className={`${contact.icon} text-[16px] w-4 h-4 inline-flex items-center justify-center`}
            />
            {contact.label}
          </a>
        )}
      </div>
    </header>
  );
}