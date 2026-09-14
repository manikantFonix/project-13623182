'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelection } from './SelectionProvider';
import { resolveCatalog, type ConsumerProduct, type Metal } from './data';
import Gallery from './Gallery';
import MetalSwitcher from './MetalSwitcher';
import ProductActions from './ProductActions';
import QuantityStepper from './request/QuantityStepper';

export function WithdrawnView({ token }: { token: string }) {
  return (
    <div className="lg:h-[calc(100vh-64px)] flex items-center justify-center px-6 pb-32 lg:pb-0">
      <div className="text-center flex flex-col items-center gap-5">
        <p className="text-[15px] text-[#16233E]">
          That piece isn't available any more.
        </p>
        <Link
          href={`/c/${token}`}
          className="h-11 px-6 text-[13px] font-medium rounded-full text-white inline-flex items-center justify-center whitespace-nowrap transition-opacity duration-150 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          style={{ backgroundColor: 'var(--brand)' }}
        >
          Back to the catalog
        </Link>
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-[3fr_2fr] gap-6 lg:gap-12 items-start lg:items-center min-h-0 lg:h-full">
      <div className="flex flex-col lg:flex-row-reverse gap-3 min-h-0 lg:h-full">
        <div className="flex-1 min-w-0 min-h-0 flex items-center justify-center">
          <div className="w-full aspect-square lg:h-full lg:w-auto lg:aspect-square lg:max-w-full rounded-[12px] bg-[#E4E9F4] animate-pulse motion-reduce:animate-none" />
        </div>
        <div className="flex flex-row lg:flex-col gap-3 shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[88px] h-[88px] aspect-square rounded-[8px] bg-[#E4E9F4] animate-pulse motion-reduce:animate-none shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="w-full lg:max-w-[420px] lg:self-center space-y-4">
        <div className="h-4 w-32 bg-[#E4E9F4] rounded-full animate-pulse motion-reduce:animate-none" />
        <div className="h-9 w-40 bg-[#E4E9F4] rounded-full animate-pulse motion-reduce:animate-none" />
        <div className="h-6 w-24 bg-[#E4E9F4] rounded-full animate-pulse motion-reduce:animate-none" />
        <div className="h-3 w-full bg-[#E4E9F4] rounded-full animate-pulse motion-reduce:animate-none" />
        <div className="h-3 w-2/3 bg-[#E4E9F4] rounded-full animate-pulse motion-reduce:animate-none" />
        <div className="h-11 sm:h-9 w-full bg-[#E4E9F4] rounded-full animate-pulse motion-reduce:animate-none" />
      </div>
    </div>
  );
}

export default function ProductDetailView({
  product,
  token,
  withdrawn = false,
  loading = false,
}: {
  product: ConsumerProduct;
  token: string;
  withdrawn?: boolean;
  loading?: boolean;
}) {
  const [metal, setMetal] = useState<Metal>(product.metals[0]);
  const [qty, setQty] = useState(1);
  const { selected, setMetal: rememberMetal, quantityFor, setQuantity } = useSelection();
  const inSelection = selected.includes(product.id);

  useEffect(() => {
    if (inSelection) rememberMetal(product.id, metal);
  }, [inSelection, metal, product.id, rememberMetal]);

  useEffect(() => {
    setQty(quantityFor(product.id));
  }, [quantityFor, product.id]);

  if (withdrawn) return <WithdrawnView token={token} />;

  const images = product.images[metal] || {};
  const hasPrice = product.price !== null && product.price > 0;
  const catalogName = resolveCatalog(token)?.name ?? 'Catalog';

  return (
    <div className="bg-[#EDF1FA] lg:h-[calc(100vh-64px)] lg:overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8 lg:px-10 lg:h-full flex flex-col">
        <nav
          aria-label="Breadcrumb"
          className="pt-6 lg:pt-8 flex items-center gap-2 text-[13px] shrink-0"
        >
          <Link
            href={`/c/${token}`}
            className="inline-flex items-center gap-1 font-medium text-[#5D6C8A] hover:text-[var(--brand)] rounded-[6px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            <i className="ri-arrow-left-s-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" aria-hidden />
            {catalogName}
          </Link>
          <span aria-hidden className="text-[#5D6C8A]">/</span>
          <span className="font-medium text-[#16233E]">{product.category}</span>
        </nav>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-6 lg:gap-12 pt-4 lg:pt-6 pb-32 lg:pb-[120px] lg:flex-1 min-h-0">
          {loading ? (
            <div className="lg:col-span-2 lg:h-full min-h-0">
              <DetailSkeleton />
            </div>
          ) : (
            <>
              <Gallery
                metal={metal}
                images={images}
                category={product.category}
              />

              <div className="w-full lg:max-w-[420px] flex flex-col lg:h-full">
                <h1 className="text-[32px] lg:text-[34px] font-semibold text-[#16233E] tracking-[-0.02em] leading-[1.15]">
                  {product.category}
                </h1>

                {hasPrice ? (
                  <p className="mt-2 text-[22px] font-bold text-[var(--brand)] tabular-nums tracking-[-0.01em]">
                    ${product.price?.toLocaleString('en-US')}
                  </p>
                ) : (
                  <p className="mt-1.5 text-[15px] text-[#5D6C8A]">
                    Price on request
                  </p>
                )}

                {product.description && (
                  <p className="mt-4 max-w-[420px] text-[13px] leading-[1.6] text-[#16233E]">
                    {product.description}
                  </p>
                )}

                <div className="mt-6 border-t border-[#DCE3F0]" />

                <div className="mt-6 flex flex-col gap-5">
                  {product.metals.length > 1 && (
                    <MetalSwitcher
                      metals={product.metals}
                      value={metal}
                      onChange={setMetal}
                      brandColor="var(--brand)"
                    />
                  )}

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-medium tracking-[0.08em] text-[#5D6C8A]">
                      QTY
                    </span>
                    <QuantityStepper
                      value={qty}
                      onChange={(n) => {
                        setQty(n);
                        setQuantity(product.id, n);
                      }}
                      label={product.category}
                    />
                  </div>
                </div>

                <div className="mt-auto pt-10">
                  <ProductActions token={token} productId={product.id} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}