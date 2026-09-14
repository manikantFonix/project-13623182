'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelection } from './SelectionProvider';
import { resolveCatalog } from './data';
import ConsumerHeader from './ConsumerHeader';
import ConsumerFooter from './ConsumerFooter';
import UnavailablePage from './UnavailablePage';
import PreviewControl from './PreviewControl';
import { consumerTokenStyle } from './consumerTokens';

const SCENARIOS = [
  { id: 'default', label: 'Confirmation' },
  { id: 'nocontact', label: 'No contact details' },
];

const secondary =
  'mt-6 h-11 sm:h-9 px-6 rounded-full border border-[#DCE3F0] bg-white text-[13px] font-medium text-[#16233E] inline-flex items-center justify-center whitespace-nowrap transition-colors duration-150 hover:bg-[#F3F6FC] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]';

export default function ConsumerSentRoute({ token }: { token: string }) {
  const catalog = resolveCatalog(token);
  const { clear } = useSelection();
  const [count, setCount] = useState(3);
  const [scenario, setScenario] = useState('default');

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(`consumer-request-sent:${token}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.count === 'number') setCount(parsed.count);
      }
    } catch {
      /* ignore */
    }
  }, [token]);

  if (!catalog || !catalog.available) return <UnavailablePage />;

  const brand = catalog.brand;
  const showContact = scenario !== 'nocontact';
  const phone = showContact ? brand.phone : undefined;
  const email = showContact ? brand.email : undefined;

  return (
    <div
      className="min-h-screen bg-[#EDF1FA] flex flex-col"
      style={consumerTokenStyle(brand.primaryColor)}
    >
      <ConsumerHeader brand={brand} />

      <div className="flex-1 min-h-[60vh] flex items-center justify-center px-4 md:px-6 py-12">
        <div className="w-full max-w-[520px] bg-white border border-[#DCE3F0] rounded-[12px] p-6 md:p-8 text-center">
          <div role="status" aria-live="polite" className="flex flex-col items-center">
            <span className="w-12 h-12 rounded-full bg-[#E8F1EC] flex items-center justify-center">
              <i
                className="ri-check-line text-[24px] text-[#3D6B54] w-6 h-6 inline-flex items-center justify-center"
                aria-hidden
              />
            </span>
            <h1 className="mt-4 text-[22px] font-semibold text-[#16233E]">Request sent</h1>
            <p className="mt-3 text-[13px] text-[#16233E]">
              {brand.brandName} has your request for {count}{' '}
              {count === 1 ? 'piece' : 'pieces'}.
            </p>
            <p className="mt-1 text-[13px] text-[#5D6C8A]">
              We&apos;ve emailed you a copy. They&apos;ll be in touch on the number you
              gave us.
            </p>

            {(phone || email) && (
              <div className="mt-6 space-y-1">
                <p className="text-[13px] font-medium text-[#16233E]">
                  {brand.brandName}
                </p>
                {phone && (
                  <p>
                    <a
                      href={`tel:${phone}`}
                      className="text-[15px] md:text-[13px] text-[var(--brand)] hover:underline underline-offset-2 rounded-[6px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
                    >
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p>
                    <a
                      href={`mailto:${email}`}
                      className="text-[15px] md:text-[13px] text-[var(--brand)] hover:underline underline-offset-2 rounded-[6px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
                    >
                      {email}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          <Link href={`/c/${token}`} onClick={() => clear()} className={secondary}>
            Back to the catalog
          </Link>
        </div>
      </div>

      <ConsumerFooter brand={brand} />

      <PreviewControl
        label="Confirmation states"
        scenarios={SCENARIOS}
        value={scenario}
        onChange={setScenario}
      />
    </div>
  );
}