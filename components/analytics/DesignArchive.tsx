'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ArchiveTable from './ArchiveTable';
import ErrorBlock from './ErrorBlock';
import { SkeletonTable } from './SkeletonStat';
import { focusRing, type DesignRow, type SectionMode } from './data';

const PAGE_SIZE = 50;

export default function DesignArchive({
  mode,
  rows,
  empty,
  noMatch,
}: {
  mode: SectionMode;
  rows: DesignRow[];
  empty: boolean;
  noMatch: boolean;
}) {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinel = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (d) =>
        d.number.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        (d.customer ?? '').toLowerCase().includes(q)
    );
  }, [rows, query]);

  const showNoMatch = noMatch || (query.trim() !== '' && filtered.length === 0);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query]);

  useEffect(() => {
    if (mode !== 'ready') return;
    const node = sentinel.current;
    if (!node) return;
    if (filtered.length <= visible) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible((v) => v + PAGE_SIZE);
      },
      { rootMargin: '400px 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [filtered.length, visible, mode]);

  const clearSearch = () => setQuery('');

  return (
    <section>
      <h2 className="text-[20px] font-semibold text-[var(--text)]">Design archive</h2>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        Every design you've made and what happened to it. Everything, not just this period.
      </p>

      {mode === 'loading' ? (
        <div className="mt-4">
          <SkeletonTable rows={5} />
        </div>
      ) : mode === 'error' ? (
        <div className="mt-4">
          <ErrorBlock />
        </div>
      ) : empty ? (
        <p className="mt-4 text-[13px] text-[var(--text-sec)]">No designs yet.</p>
      ) : (
        <>
          <div className="mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by design number, customer or description"
              aria-label="Search the design archive"
              className={`h-9 w-[280px] px-3 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] transition-colors duration-150`}
            />
          </div>

          {showNoMatch ? (
            <div className="mt-4 flex items-center gap-3">
              <p className="text-[13px] text-[var(--text-sec)]">No designs match that.</p>
              <button
                type="button"
                onClick={clearSearch}
                className={`h-9 px-3 text-[13px] font-medium text-[var(--accent-text)] hover:bg-[var(--muted)] rounded-full transition-colors duration-150 whitespace-nowrap ${focusRing}`}
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              <div className="mt-4">
                <ArchiveTable rows={filtered.slice(0, visible)} />
              </div>
              {filtered.length > visible && (
                <div ref={sentinel} aria-hidden="true" className="h-px" />
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}