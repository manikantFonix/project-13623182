import Card from './Card';
import ContactCard from './ContactCard';
import StatusPill from './StatusPill';
import type { ApprovalBrand } from './data';

export default function CancelledState({ brand }: { brand: ApprovalBrand }) {
  const hasContact = Boolean(brand.phone || brand.email);

  return (
    <main className="max-w-[720px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-4">
      <Card>
        <div className="flex items-start gap-4">
          <span className="w-11 h-11 rounded-[12px] border border-[#DCE3F0] bg-[#F3F6FC] flex items-center justify-center text-[#5D6C8A] shrink-0">
            <i className="ri-close-circle-line text-[20px] w-5 h-5 flex items-center justify-center" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-[22px] md:text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#16233E]">
                This design isn&apos;t active any more
              </h1>
              <StatusPill label="Cancelled" tone="muted" />
            </div>
            <p className="mt-2 text-[13px] text-[#5D6C8A]">
              Get in touch with your jeweler if you were expecting to see something here.
            </p>
          </div>
        </div>
      </Card>

      {hasContact && <ContactCard brand={brand} />}
    </main>
  );
}