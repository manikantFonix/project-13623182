'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import FilterBar, { type Filters, emptyFilters } from './FilterBar';
import ProductTable, { type Product } from './ProductTable';
import ProductGrid from './ProductGrid';
import AddProductDialog from './AddProductDialog';

export type WorkspaceState = 'default' | 'loading' | 'empty' | 'filtered' | 'error';

const products: Product[] = [
  {
    id: '1',
    category: 'Ring',
    description: 'Solitaire, six-prong setting',
    renderStatus: 'complete',
    price: 1240,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20with%20a%20six-prong%20setting%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=11&orientation=squarish',
  },
  {
    id: '2',
    category: 'Ring',
    description: 'Halo cluster, round centre stone',
    renderStatus: 'complete',
    price: 2180,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20halo%20cluster%20ring%20with%20a%20round%20centre%20diamond%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=12&orientation=squarish',
  },
  {
    id: '3',
    category: 'Pendant',
    description: 'Teardrop with pavé bail',
    renderStatus: 'complete',
    price: null,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20teardrop%20pendant%20with%20a%20pav%C3%A9%20bail%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=13&orientation=squarish',
  },
  {
    id: '4',
    category: 'Necklace',
    description: 'Fine chain with solitaire drop',
    renderStatus: 'generating',
    price: null,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20fine%20gold%20chain%20necklace%20with%20a%20solitaire%20diamond%20drop%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=14&orientation=squarish',
  },
  {
    id: '5',
    category: 'Earring',
    description: 'Stud pair, four-prong',
    renderStatus: 'flagged',
    price: 760,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20gold%20stud%20earrings%20with%20four-prong%20settings%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=15&orientation=squarish',
  },
  {
    id: '6',
    category: 'Bracelet',
    description: 'Tennis, channel set',
    renderStatus: 'complete',
    price: 3950,
    active: false,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20tennis%20bracelet%20with%20channel-set%20diamonds%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=16&orientation=squarish',
  },
  {
    id: '7',
    category: 'Ring',
    description: 'Eternity band, full',
    renderStatus: 'complete',
    price: 1890,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20full%20eternity%20band%20ring%20with%20diamonds%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=17&orientation=squarish',
  },
  {
    id: '8',
    category: 'Brooch',
    description: 'Floral spray, mixed stones',
    renderStatus: 'complete',
    price: null,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20floral%20spray%20brooch%20with%20mixed%20coloured%20stones%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=18&orientation=squarish',
  },
];

const states: WorkspaceState[] = ['default', 'loading', 'empty', 'filtered', 'error'];
const stateLabel: Record<string, string> = {
  default: 'Default',
  loading: 'Loading',
  empty: 'Empty',
  filtered: 'No match',
  error: 'Error',
};

const loadingRow = (
  <div className="grid grid-cols-[56px_1fr_120px_120px_160px_40px] items-center gap-4 px-4 py-3 border-b border-[#DDE3E6] last:border-b-0">
    <div className="w-14 h-14 rounded-full bg-[#E8ECEE]" />
    <div className="space-y-2">
      <div className="h-3.5 w-1/3 rounded-full bg-[#E8ECEE]" />
      <div className="h-3 w-2/3 rounded-full bg-[#E8ECEE]" />
    </div>
    <div className="h-3 w-12 rounded-full bg-[#E8ECEE]" />
    <div className="ml-auto h-3 w-14 rounded-full bg-[#E8ECEE]" />
    <div className="h-3 w-16 rounded-full bg-[#E8ECEE]" />
  </div>
);

export default function CatalogueWorkspace() {
  const [state, setState] = useState<WorkspaceState>('default');
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [data, setData] = useState<Product[]>(products);
  const [addOpen, setAddOpen] = useState(false);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const catalogueId = 'bridal-2026';

  const filtered = useMemo(() => {
    return data.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.status === 'Active' && !p.active) return false;
      if (filters.status === 'Inactive' && p.active) return false;
      if (filters.priceOnRequest && p.price !== null) return false;
      const min = filters.min === '' ? -Infinity : Number(filters.min);
      const max = filters.max === '' ? Infinity : Number(filters.max);
      if (p.price !== null && (p.price < min || p.price > max)) return false;
      return true;
    });
  }, [data, filters]);

  const filtersApplied =
    filters !== emptyFilters &&
    (filters.category !== null ||
      filters.status !== null ||
      filters.min !== '' ||
      filters.max !== '' ||
      filters.priceOnRequest);

  const showNoMatch = state === 'default' && filtersApplied && filtered.length === 0;

  const handleToggle = (id: string, active: boolean) => {
    setData((d) => d.map((p) => (p.id === id ? { ...p, active } : p)));
  };

  const applyState = (s: WorkspaceState) => setState(s);

  return (
    <main className="min-h-screen bg-[#EFF2F3] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="text-[13px] text-[#5C6870]">
          <Link href="/" className="hover:text-[#131A1F] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]">
            Catalogues
          </Link>
          <span className="mx-1">/</span>
          <span className="text-[#131A1F]">Bridal 2026</span>
        </nav>

        <div className="mt-4 flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#131A1F]">
              Bridal 2026
            </h1>
            <p className="mt-1 text-[13px] text-[#5C6870] tabular-nums">
              8 products · Live
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/catalogue/${catalogueId}/settings`}
              className="h-9 px-4 text-sm font-medium text-[#131A1F] bg-white border border-[#DDE3E6] rounded-full hover:bg-[#EFF2F3] transition-colors duration-150 whitespace-nowrap flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
            >
              Catalogue settings
            </Link>
            <button className="h-9 px-4 text-sm font-medium text-[#131A1F] bg-white border border-[#DDE3E6] rounded-full hover:bg-[#EFF2F3] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]">
              Render status
            </button>
            <button
              onClick={() => setAddOpen(true)}
              className="h-9 px-4 text-sm font-medium text-white bg-[#16323F] border border-[#16323F] rounded-full hover:bg-[#1F4353] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
            >
              Add product
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <FilterBar filters={filters} onChange={setFilters} />
          <div className="inline-flex border border-[#DDE3E6] rounded-full overflow-hidden bg-white">
            <button
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
              onClick={() => setView('grid')}
              className={`w-9 h-9 flex items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
                view === 'grid'
                  ? 'bg-[#16323F] text-white'
                  : 'text-[#5C6870] hover:bg-[#EFF2F3]'
              }`}
            >
              <i className="ri-layout-grid-line text-[18px]" />
            </button>
            <button
              aria-label="List view"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
              className={`w-9 h-9 flex items-center justify-center border-l border-[#DDE3E6] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
                view === 'list'
                  ? 'bg-[#16323F] text-white'
                  : 'text-[#5C6870] hover:bg-[#EFF2F3]'
              }`}
            >
              <i className="ri-list-check-2 text-[18px]" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          {state === 'loading' && (
            <div className="bg-white border border-[#DDE3E6] rounded-[12px] overflow-hidden">
              <div className="grid grid-cols-[56px_1fr_120px_120px_160px_40px] items-center gap-4 px-4 h-11 border-b border-[#DDE3E6]">
                <span />
                <span className="text-[13px] font-medium text-[#5C6870]">Product</span>
                <span className="text-[13px] font-medium text-[#5C6870]">Renders</span>
                <span className="text-right text-[13px] font-medium text-[#5C6870]">Price</span>
                <span className="text-[13px] font-medium text-[#5C6870]">Status</span>
                <span />
              </div>
              {loadingRow}
              {loadingRow}
              {loadingRow}
              {loadingRow}
              {loadingRow}
              {loadingRow}
            </div>
          )}

          {state === 'empty' && (
            <div className="flex flex-col items-center justify-center text-center min-h-[320px]">
              <p className="text-sm text-[#131A1F] max-w-[380px]">
                This catalogue is empty. Add your first product with three
                photographs — front, back and side.
              </p>
              <button
                onClick={() => setAddOpen(true)}
                className="mt-4 h-9 px-4 text-sm font-medium text-white bg-[#16323F] border border-[#16323F] rounded-full hover:bg-[#1F4353] transition-colors duration-150 whitespace-nowrap"
              >
                Add product
              </button>
            </div>
          )}

          {state === 'filtered' && (
            <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <p className="text-sm text-[#131A1F]">
                No products match these filters.
              </p>
              <button
                onClick={() => setFilters(emptyFilters)}
                className="h-9 px-4 text-sm font-medium text-[#131A1F] bg-white border border-[#DDE3E6] rounded-full hover:bg-[#EFF2F3] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
              >
                Clear filters
              </button>
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <p className="text-sm text-[#131A1F]">
                We couldn't load these products.
              </p>
              <button
                onClick={() => setState('default')}
                className="h-9 px-4 text-sm font-medium text-[#131A1F] bg-white border border-[#DDE3E6] rounded-full hover:bg-[#EFF2F3] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
              >
                Try again
              </button>
            </div>
          )}

          {showNoMatch ? (
            <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <p className="text-sm text-[#131A1F]">
                No products match these filters.
              </p>
              <button
                onClick={() => setFilters(emptyFilters)}
                className="h-9 px-4 text-sm font-medium text-[#131A1F] bg-white border border-[#DDE3E6] rounded-full hover:bg-[#EFF2F3] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            state === 'default' &&
              (view === 'grid' ? (
                <ProductGrid products={filtered} onToggle={handleToggle} />
              ) : (
                <ProductTable products={filtered} onToggle={handleToggle} />
              ))
          )}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-1 bg-white border border-[#DDE3E6] rounded-full p-1 shadow-[0_8px_20px_-10px_rgba(19,26,31,0.25)]">
        <span className="px-2 text-[13px] font-medium text-[#5C6870]">
          Preview state
        </span>
        {states.map((s) => (
          <button
            key={s}
            onClick={() => applyState(s)}
            className={`h-7 px-2 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
              state === s
                ? 'bg-[#16323F] text-white'
                : 'text-[#5C6870] hover:bg-[#EFF2F3]'
            }`}
          >
            {stateLabel[s]}
          </button>
        ))}
      </div>
      <AddProductDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </main>
  );
}