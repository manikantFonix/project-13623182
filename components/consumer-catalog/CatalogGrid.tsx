'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  catalogFacets,
  servableProducts,
  type CatalogData,
  type ConsumerProduct,
} from './data';
import { emptyFilters, type Filters } from './FilterChips';
import CatalogHero from './CatalogHero';
import CatalogHead from './CatalogHead';
import CatalogFilterRow from './CatalogFilterRow';
import ProductTile from './ProductTile';
import { useSelection } from './SelectionProvider';

const PAGE_SIZE = 60;

const brokenProduct: ConsumerProduct = {
  id: 'broken-preview',
  category: 'Ring',
  price: 1240,
  active: true,
  renderStatus: 'passed',
  metals: ['yellow'],
  images: { yellow: { front: '' } },
};

function SkeletonTile() {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px]">
      <div className="aspect-square bg-[#E4E9F4] rounded-t-[12px] animate-pulse" />
      <div className="border-t border-[#DCE3F0] p-[14px]">
        <div className="h-3 w-16 bg-[#E4E9F4] rounded-full animate-pulse" />
        <div className="mt-1.5 h-3 w-12 bg-[#E4E9F4] rounded-full animate-pulse" />
        <div className="mt-3 h-9 w-full bg-[#EDF1FA] rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export default function CatalogGrid({
  catalog,
  scenario,
  brandColor,
}: {
  catalog: CatalogData;
  scenario: string;
  brandColor: string;
}) {
  const base = useMemo(() => servableProducts(catalog), [catalog]);
  const facets = useMemo(() => catalogFacets(base), [base]);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [coverFailed, setCoverFailed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { selected, clear } = useSelection();

  const activeFilters: Filters =
    scenario === 'filtered'
      ? { ...filters, category: facets.categories[0]?.value ?? null }
      : filters;

  const filtered = useMemo(() => {
    return base.filter((p) => {
      if (activeFilters.category && p.category !== activeFilters.category)
        return false;
      if (activeFilters.metal && !p.metals.includes(activeFilters.metal))
        return false;
      if (
        activeFilters.priceMin != null &&
        (p.price ?? 0) < activeFilters.priceMin
      )
        return false;
      if (
        activeFilters.priceMax != null &&
        (p.price ?? Infinity) > activeFilters.priceMax
      )
        return false;
      return true;
    });
  }, [base, activeFilters]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [
    activeFilters.category,
    activeFilters.metal,
    activeFilters.priceMin,
    activeFilters.priceMax,
  ]);

  const loading = scenario === 'loading';
  const catalogEmpty = scenario === 'empty' || base.length === 0;
  const noMatch =
    !loading &&
    !catalogEmpty &&
    (scenario === 'nomatch' || filtered.length === 0);

  function gridList(): ConsumerProduct[] {
    if (loading) return [];
    if (scenario === 'broken') return [brokenProduct, ...filtered];
    return filtered;
  }

  const list = gridList();
  const shown = list.slice(0, visible);
  const hasMore = !loading && shown.length < list.length;
  const count = scenario === 'empty' ? 0 : base.length;

  useEffect(() => {
    setCoverFailed(false);
  }, [scenario]);

  const heroCover = coverFailed
    ? null
    : scenario === 'coverbroken'
      ? 'https://invalid.invalid/cover.jpg'
      : scenario === 'nocover'
        ? null
        : catalog.cover;

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible((v) => v + PAGE_SIZE);
        }
      },
      { rootMargin: '240px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, shown.length]);

  return (
    <div className="pb-32">
      {heroCover ? (
        <CatalogHero
          name={catalog.name}
          count={count}
          cover={heroCover}
          onError={() => setCoverFailed(true)}
        />
      ) : (
        <CatalogHead name={catalog.name} count={count} />
      )}

      <CatalogFilterRow
        showClear={selected.length > 0}
        onClear={clear}
        facets={facets}
        filters={activeFilters}
        onChange={setFilters}
        brandColor={brandColor}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-5 md:px-6 pt-6 md:pt-8">
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonTile key={i} />
            ))}
          </div>
        )}

        {catalogEmpty && (
          <div className="min-h-[320px] flex items-center justify-center">
            <p className="text-[13px] text-[#16233E]">
              There's nothing in this catalog yet.
            </p>
          </div>
        )}

        {noMatch && (
          <div className="min-h-[320px] flex flex-col items-center justify-center text-center gap-4">
            <p className="text-[13px] text-[#16233E]">
              No pieces match what you've chosen.
            </p>
            <button
              onClick={() => setFilters(emptyFilters)}
              className="h-9 px-4 text-[13px] font-medium rounded-full bg-white border border-[#DCE3F0] text-[#16233E] hover:border-[#C6D0E6] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            >
              Clear filters
            </button>
          </div>
        )}

        {!loading && !catalogEmpty && !noMatch && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
            {shown.map((p) => (
              <ProductTile key={p.id} product={p} token={catalog.token} />
            ))}
            {hasMore && <div ref={sentinelRef} className="col-span-full h-1" />}
          </div>
        )}
      </div>
    </div>
  );
}