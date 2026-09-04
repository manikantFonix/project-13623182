'use client';

import { useEffect, useRef, useState } from 'react';

export interface DesignItem {
  id: string;
  title: string;
  meta: string;
  time: string;
  status: 'Approved' | 'Sent to customer' | 'In production' | 'Draft';
  image: string;
}

const DESIGNS: DesignItem[] = [
  {
    id: '1',
    title: 'Custom engagement ring',
    meta: 'Sarah Mitchell · REQ-123',
    time: '2 hours ago',
    status: 'Approved',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20custom%20solitaire%20engagement%20ring%20with%20a%20round%20brilliant%20diamond%20in%20a%20six%20prong%20setting%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewellery%20shot%2C%20portrait%20composition&width=600&height=800&seq=31&orientation=portrait',
  },
  {
    id: '2',
    title: 'Drop earrings, filigree',
    meta: 'Priya Nair · REQ-118',
    time: '5 hours ago',
    status: 'Sent to customer',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20an%20ornate%20gold%20drop%20earring%20with%20intricate%20filigree%20detail%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewellery%20shot%2C%20portrait%20composition&width=600&height=800&seq=32&orientation=portrait',
  },
  {
    id: '3',
    title: 'Halo ring, oval centre',
    meta: 'Sarah Mitchell · REQ-115',
    time: 'Yesterday',
    status: 'In production',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20halo%20ring%20with%20an%20oval%20diamond%20centre%20framed%20by%20a%20circle%20of%20small%20stones%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewellery%20shot%2C%20portrait%20composition&width=600&height=800&seq=33&orientation=portrait',
  },
  {
    id: '4',
    title: 'Anniversary band',
    meta: 'Marcus Webb · REQ-109',
    time: '2 days ago',
    status: 'Draft',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20polished%20gold%20band%20ring%20with%20a%20row%20of%20small%20diamonds%20set%20along%20the%20top%20surface%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewellery%20shot%2C%20portrait%20composition&width=600&height=800&seq=34&orientation=portrait',
  },
  {
    id: '5',
    title: 'Emerald tennis bracelet',
    meta: 'Priya Nair · REQ-141',
    time: '3 hours ago',
    status: 'In production',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20delicate%20tennis%20bracelet%20set%20with%20a%20line%20of%20round%20emeralds%20and%20small%20diamonds%20on%20white%20gold%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewellery%20shot%2C%20portrait%20composition&width=600&height=800&seq=35&orientation=portrait',
  },
  {
    id: '6',
    title: 'Pearl drop necklace',
    meta: 'Amara Khan · REQ-138',
    time: '6 hours ago',
    status: 'Approved',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20an%20elegant%20pearl%20pendant%20necklace%20with%20a%20single%20large%20pearl%20drop%20on%20a%20fine%20chain%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewellery%20shot%2C%20portrait%20composition&width=600&height=800&seq=36&orientation=portrait',
  },
  {
    id: '7',
    title: 'Sapphire cluster studs',
    meta: 'Marcus Webb · REQ-132',
    time: 'Yesterday',
    status: 'Sent to customer',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20pair%20of%20stud%20earrings%20with%20a%20cluster%20of%20round%20blue%20sapphires%20set%20in%20white%20gold%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewellery%20shot%2C%20portrait%20composition&width=600&height=800&seq=37&orientation=portrait',
  },
  {
    id: '8',
    title: 'Twist bangle, rose gold',
    meta: 'Amara Khan · REQ-127',
    time: '3 days ago',
    status: 'Draft',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20rose%20gold%20bangle%20bracelet%20with%20a%20twisted%20rope%20texture%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewellery%20shot%2C%20portrait%20composition&width=600&height=800&seq=38&orientation=portrait',
  },
];

const statusPill: Record<DesignItem['status'], string> = {
  Approved: 'text-[#3D6B54]',
  'Sent to customer': 'text-[#5C6870]',
  'In production': 'text-[#3D6B54]',
  Draft: 'text-[#5C6870]',
};

const chipClass: Record<DesignItem['status'], string> = {
  Approved: 'bg-[#E8F1EC]',
  'Sent to customer': 'bg-white',
  'In production': 'bg-[#E8F1EC]',
  Draft: 'bg-[#EFF2F3]',
};

export type LibraryState = 'ready' | 'empty' | 'loading' | 'error';

interface Props {
  state: LibraryState;
  onRetry: () => void;
}

export default function DesignLibrary({ state, onRetry }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState('');
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 1;
    setCanLeft(overflow && el.scrollLeft > 1);
    setCanRight(overflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    updateScroll();
    window.addEventListener('resize', updateScroll);
    return () => window.removeEventListener('resize', updateScroll);
  }, [state, collapsed, query]);

  const scrollBy = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -232 : 232, behavior: 'smooth' });
  };

  const filtered = DESIGNS.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.meta.toLowerCase().includes(query.toLowerCase())
  );

  const placeholderCard = (
    <div className="w-[216px] shrink-0 rounded-[12px] overflow-hidden bg-white border border-[#DDE3E6]">
      <div className="h-[224px] bg-[#E8ECEE]" />
      <div className="p-3.5 space-y-2">
        <div className="h-4 w-2/3 rounded-full bg-[#E8ECEE]" />
        <div className="h-3 w-1/2 rounded-full bg-[#E8ECEE]" />
      </div>
    </div>
  );

  const card = (d: DesignItem) => (
    <article
      key={d.id}
      className="group relative w-[216px] shrink-0 rounded-[12px] overflow-hidden bg-white transition-shadow duration-150 hover:shadow-[0_14px_28px_-12px_rgba(19,26,31,0.28)]"
    >
      <div className="h-[224px] overflow-hidden">
        <img
          src={d.image}
          alt={d.title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
      </div>
      <span
        className={`absolute top-2 right-2 inline-flex items-center h-6 px-2 rounded-full text-[13px] font-medium ${statusPill[d.status]} ${chipClass[d.status]}`}
      >
        {d.status}
      </span>
      <div className="bg-white p-3.5">
        <h3 className="text-[14px] font-medium text-[#131A1F] truncate">{d.title}</h3>
        <p className="mt-1 text-[12px] text-[#5C6870] truncate tabular-nums">{d.meta}</p>
        <p className="mt-0.5 text-[12px] text-[#5C6870] tabular-nums">{d.time}</p>
      </div>
    </article>
  );

  const scrollBtn = (dir: 'left' | 'right') => (
    <button
      type="button"
      aria-label={dir === 'left' ? 'Scroll designs left' : 'Scroll designs right'}
      onClick={() => scrollBy(dir)}
      className="absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#DDE3E6] text-[#131A1F] shadow-[0_6px_16px_-6px_rgba(19,26,31,0.3)] hover:bg-[#F4F6F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
      style={{ [dir === 'left' ? 'left' : 'right']: '-14px' }}
    >
      <i className={`${dir === 'left' ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'} text-[20px]`} />
    </button>
  );

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold text-[#131A1F]">Design library</h2>
          <button
            type="button"
            aria-label={collapsed ? 'Expand design library' : 'Collapse design library'}
            onClick={() => setCollapsed((c) => !c)}
            className="w-7 h-7 flex items-center justify-center rounded-full text-[#5C6870] hover:text-[#131A1F] hover:bg-[#F4F6F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          >
            <i className={`ri-arrow-down-s-line text-[20px] ${collapsed ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
        <div className="relative">
          <i className="ri-search-line text-[20px] text-[#5C6870] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or request"
            className="w-[280px] h-10 pl-11 pr-4 text-sm text-[#131A1F] placeholder-[#5C6870] bg-white border border-[#DDE3E6] rounded-full outline-none focus:border-[#16323F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          />
        </div>
      </div>

      {!collapsed && (
        <div className="mt-4">
          {state === 'loading' && (
            <div className="flex gap-2 overflow-hidden">
              {placeholderCard}
              {placeholderCard}
              {placeholderCard}
              {placeholderCard}
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center justify-center text-center min-h-[280px] space-y-4">
              <p className="text-sm text-[#131A1F]">We couldn't load your designs.</p>
              <button
                type="button"
                onClick={onRetry}
                className="h-10 px-4 text-[13px] font-medium text-[#131A1F] bg-white border border-[#DDE3E6] rounded-full hover:bg-[#F4F6F7] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
              >
                Try again
              </button>
            </div>
          )}

          {state === 'empty' && (
            <div className="flex items-center justify-center text-center min-h-[280px]">
              <p className="text-sm text-[#131A1F] max-w-[360px]">
                Nothing here yet. Describe a piece above and generate your first
                design.
              </p>
            </div>
          )}

          {state === 'ready' && (
            <div className="relative pr-8">
              {filtered.length === 0 ? (
                <div className="flex items-center justify-center min-h-[280px]">
                  <p className="text-sm text-[#5C6870]">No designs match your search.</p>
                </div>
              ) : (
                <>
                  <div
                    ref={scrollerRef}
                    onScroll={updateScroll}
                    className="flex gap-2 overflow-x-auto pb-2 lib-scroll"
                  >
                    {filtered.map(card)}
                  </div>
                  {canLeft && scrollBtn('left')}
                  {canRight && scrollBtn('right')}
                </>
              )}
            </div>
          )}
        </div>
      )}

      <style>{`
        .lib-scroll { scrollbar-width: thin; scrollbar-color: transparent transparent; }
        .lib-scroll::-webkit-scrollbar { height: 6px; }
        .lib-scroll::-webkit-scrollbar-track { background: transparent; }
        .lib-scroll::-webkit-scrollbar-thumb { background: #DDE3E6; border-radius: 9999px; }
        .lib-scroll:hover { scrollbar-color: #DDE3E6 transparent; }
        .lib-scroll::-webkit-scrollbar-thumb:hover { background: #C3CCD1; }
        .lib-scroll::-webkit-scrollbar-thumb { opacity: 0; }
        .lib-scroll:hover::-webkit-scrollbar-thumb { opacity: 1; }
      `}</style>
    </section>
  );
}