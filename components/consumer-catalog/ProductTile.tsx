'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelection } from './SelectionProvider';
import type { ConsumerProduct } from './data';

const RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]';

export default function ProductTile({
  product,
  token,
}: {
  product: ConsumerProduct;
  token: string;
}) {
  const [err, setErr] = useState(false);
  const { selected, toggle, setMetal } = useSelection();
  const router = useRouter();
  const front = product.images[product.metals[0]]?.front;
  const inSelection = selected.includes(product.id);
  const hasSelection = selected.length > 0;

  const priceText =
    product.price !== null && product.price > 0
      ? `$${product.price.toLocaleString('en-US')}`
      : null;

  const addLabel = priceText
    ? `${inSelection ? 'Remove' : 'Add'} ${product.category}, ${priceText} ${
        inSelection ? 'from' : 'to'
      } your selection`
    : `${inSelection ? 'Remove' : 'Add'} ${product.category} ${
        inSelection ? 'from' : 'to'
      } your selection`;

  const requestLabel = hasSelection
    ? `Request order, ${product.category} — unavailable while you have pieces selected. Use Request these to send them together.`
    : `Request order, ${product.category}${priceText ? `, ${priceText}` : ''}`;

  function onRequest() {
    if (hasSelection) return;
    if (!inSelection) toggle(product.id);
    router.push(`/c/${token}/request`);
  }

  return (
    <article className="relative flex flex-col bg-white border border-[#DCE3F0] rounded-[12px] hover:border-[#C6D0E6] transition-colors duration-150">
      <Link
        href={`/c/${token}/${product.id}`}
        aria-label={`View ${product.category}${priceText ? `, ${priceText}` : ''}`}
        className={`block rounded-t-[12px] ${RING}`}
      >
        <div className="aspect-square bg-white rounded-t-[12px] overflow-hidden">
          {front && !err ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={front}
              alt={`${product.category} front view`}
              onError={() => setErr(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white" />
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => {
          if (!inSelection) setMetal(product.id, product.metals[0]);
          toggle(product.id);
        }}
        aria-pressed={inSelection}
        aria-label={addLabel}
        title={addLabel}
        className={`absolute top-[4px] right-[4px] w-11 h-11 p-[6px] flex items-center justify-center cursor-pointer ${RING}`}
      >
        <span
          className={`w-8 h-8 rounded-full inline-flex items-center justify-center border transition-colors duration-150 ${
            inSelection
              ? 'bg-[var(--brand)] border-[var(--brand)] text-white'
              : 'bg-white/90 border-[#DCE3F0] text-[#16233E]'
          }`}
        >
          <i
            className={
              inSelection
                ? 'ri-check-line text-[16px] w-4 h-4 inline-flex items-center justify-center'
                : 'ri-add-line text-[16px] w-4 h-4 inline-flex items-center justify-center'
            }
          />
        </span>
      </button>

      <div className="border-t border-[#DCE3F0] p-[14px] flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Link
              href={`/c/${token}/${product.id}`}
              className={`block rounded-[6px] ${RING}`}
            >
              <p className="text-[13px] font-medium text-[#16233E]">
                {product.category}
              </p>
            </Link>
            {product.description && (
              <p className="mt-1 text-[13px] leading-[1.5] text-[#5D6C8A] line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          {priceText ? (
            <p className="shrink-0 text-[18px] font-semibold text-[#16233E] tabular-nums leading-none mt-0.5">
              {priceText}
            </p>
          ) : (
            <p className="shrink-0 text-[13px] text-[#5D6C8A] leading-none mt-0.5">
              Price on request
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onRequest}
          disabled={hasSelection}
          aria-disabled={hasSelection}
          aria-label={requestLabel}
          style={hasSelection ? undefined : { backgroundColor: 'var(--brand)' }}
          className={`mt-auto w-full h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap inline-flex items-center justify-center transition-colors duration-150 ${RING} ${
            hasSelection
              ? 'bg-[#F3F6FC] text-[#5D6C8A] cursor-not-allowed'
              : 'text-white hover:opacity-90 cursor-pointer'
          }`}
        >
          Request order
        </button>
      </div>
    </article>
  );
}