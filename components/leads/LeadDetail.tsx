'use client';

import { useState } from 'react';
import Link from 'next/link';
import { metalSwatch, type Lead, type CatalogItem } from './data';
import WidgetViews from './WidgetViews';
import EstimateBlock from './EstimateBlock';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]';

function ItemCard({ item }: { item: CatalogItem }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] overflow-hidden">
      <div className="flex gap-5 p-4">
        <img
          src={item.image}
          alt={item.category}
          className="w-[120px] h-[120px] rounded-[12px] object-cover bg-[var(--muted)] shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-[var(--text)]">
            {item.category}
          </p>
          <p className="mt-1 text-[13px] text-[var(--text-sec)] leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex divide-x divide-[var(--border)] border-t border-[var(--border)] bg-[var(--muted)]">
        <div className="flex-1 min-w-0 px-4 py-3">
          <p className="text-[12px] text-[var(--text-sec)]">Metal color</p>
          <div className="mt-1 text-[13px] text-[var(--text)] inline-flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-[4px]"
              style={{ backgroundColor: metalSwatch[item.metal] }}
            />
            {item.metal}
          </div>
        </div>
        <div className="flex-1 min-w-0 px-4 py-3">
          <p className="text-[12px] text-[var(--text-sec)]">Quantity</p>
          <p className="mt-1 text-[13px] text-[var(--text)] tabular-nums">
            {item.quantity}
          </p>
        </div>
        <div className="flex-1 min-w-0 px-4 py-3">
          <p className="text-[12px] text-[var(--text-sec)]">Price</p>
          {item.price !== null ? (
            <p className="mt-1 text-[13px] text-[var(--text)] tabular-nums">
              ${item.price.toLocaleString('en-US')}
            </p>
          ) : (
            <p className="mt-1 text-[13px] text-[var(--text-sec)]">Price on request</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LeadDetail({ lead }: { lead: Lead }) {
  const [status, setStatus] = useState<Lead['status']>(lead.status);
  const [saveError, setSaveError] = useState(false);

  const decidedOn =
    status === 'accepted' || status === 'rejected' ? lead.decidedOn : undefined;

  return (
    <main className="min-h-screen bg-[var(--canvas)] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="text-[13px] text-[var(--text-sec)]">
          <Link
            href="/leads"
            prefetch={false}
            className={`hover:text-[var(--text)] transition-colors duration-150 ${focusRing}`}
          >
            Leads
          </Link>
          <span className="mx-1">/</span>
          <span className="text-[var(--text)]">{lead.name}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="order-2 lg:order-none flex flex-col gap-5">
            {lead.message && (
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
                <p className="text-[13px] font-medium text-[var(--text-sec)]">
                  Their message
                </p>
                <p className="mt-2 text-[15px] text-[var(--text)] whitespace-pre-line">
                  {lead.message}
                </p>
              </div>
            )}

            {lead.source === 'widget' ? (
              <div>
                <h2 className="text-[20px] font-semibold text-[var(--text)]">
                  What they're asking about
                </h2>
                <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-4">
                  <p className="text-[13px] font-medium text-[var(--text-sec)]">
                    The design they generated
                  </p>
                  {lead.description && (
                    <>
                      <p className="mt-3 text-[12px] text-[var(--text-sec)]">
                        What they described
                      </p>
                      <p className="mt-1 text-[13px] text-[var(--text)] whitespace-pre-line">
                        {lead.description}
                      </p>
                    </>
                  )}
                  <WidgetViews lead={lead} />
                  <p className="mt-3 text-[13px] text-[var(--text)] tabular-nums">
                    Quantity: {lead.quantity}
                  </p>
                  {lead.estimate && <EstimateBlock lead={lead} />}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-[20px] font-semibold text-[var(--text)]">
                  What they're asking about
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {lead.items?.map((item, i) => (
                    <ItemCard key={i} item={item} />
                  ))}
                </div>
              </div>
            )}

            {saveError && (
              <div className="border-l-2 border-[var(--alert)] p-3">
                <p className="text-[13px] text-[var(--alert)]">
                  We couldn't save that. Nothing has changed — try again.
                </p>
              </div>
            )}

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
              {status === 'new' ? (
                <>
                  <p className="text-[13px] font-medium text-[var(--text-sec)]">
                    Mark this inquiry
                  </p>
                  <p className="mt-1 text-[13px] text-[var(--text-sec)] max-w-[420px]">
                    This is for your records only. It doesn't message the
                    customer — call or message them yourself.
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSaveError(false);
                        setStatus('accepted');
                      }}
                      className={`h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        setSaveError(false);
                        setStatus('rejected');
                      }}
                      className={`h-9 px-4 text-[13px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] rounded-full hover:text-[var(--alert-strong)] hover:border-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
                    >
                      Reject
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-[13px] text-[var(--text)]">
                  <span
                    className={
                      status === 'accepted'
                        ? 'font-medium text-[var(--success)]'
                        : 'font-medium text-[var(--text-sec)]'
                    }
                  >
                    {status === 'accepted' ? 'Accepted' : 'Rejected'}
                  </span>{' '}
                  on {decidedOn}
                </p>
              )}
            </div>
          </div>

          <aside className="order-1 lg:order-none lg:sticky lg:top-8 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
            <p className="text-[18px] font-medium text-[var(--text)]">{lead.name}</p>

            <p className="mt-4 text-[12px] text-[var(--text-sec)]">Phone</p>
            <a
              href={`tel:${lead.phone}`}
              className={`block text-[20px] font-semibold text-[var(--text)] tabular-nums transition-colors duration-150 hover:text-[var(--accent-text)] ${focusRing}`}
            >
              {lead.phone}
            </a>
            <a
              href={`tel:${lead.phone}`}
              className={`mt-3 h-9 w-full inline-flex items-center justify-center text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
            >
              Call {lead.phone}
            </a>

            <p className="mt-4 text-[12px] text-[var(--text-sec)]">Email</p>
            <a
              href={`mailto:${lead.email}`}
              className={`block text-[13px] text-[var(--text)] hover:text-[var(--accent-text)] transition-colors duration-150 whitespace-pre-line ${focusRing}`}
            >
              {lead.email}
            </a>

            {lead.address && (
              <>
                <p className="mt-4 text-[12px] text-[var(--text-sec)]">Address</p>
                <p className="text-[13px] text-[var(--text)] whitespace-pre-line">
                  {lead.address}
                </p>
              </>
            )}

            <div className="my-4 h-px bg-[var(--border)]" />

            <p className="text-[12px] text-[var(--text-sec)]">Received</p>
            <p className="mt-0.5 text-[13px] text-[var(--text)]">
              {lead.receivedFull}
            </p>

            <p className="mt-4 text-[12px] text-[var(--text-sec)]">From</p>
            <p className="mt-0.5 text-[13px] text-[var(--text)]">
              {lead.source === 'catalog' ? lead.catalogName : 'Widget'}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}