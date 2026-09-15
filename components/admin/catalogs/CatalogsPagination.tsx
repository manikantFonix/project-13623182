'use client';

import { focusRing } from '../tokens';

function pageList(current: number, total: number): number[] {
  const max = 5;
  if (total <= max) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  let start = Math.max(1, current - 2);
  const end = Math.min(total, start + max - 1);
  start = Math.max(1, end - max + 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

const stepClass = `h-9 min-w-[36px] px-3 rounded-full flex items-center justify-center text-[13px] font-medium tabular-nums whitespace-nowrap cursor-pointer transition-colors duration-150 ${focusRing}`;

export default function CatalogsPagination({
  page,
  pageSize,
  totalItems,
  onPage,
}: {
  page: number;
  pageSize: number;
  totalItems: number;
  onPage: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, totalItems);

  return (
    <nav aria-label="Catalog list pages" className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-[12px] tabular-nums text-[var(--text-sec)]">
        Showing {first}–{last} of {totalItems}
      </p>

      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            onClick={() => onPage(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            className={`${stepClass} border border-[var(--border)] text-[var(--text-sec)] hover:bg-[var(--muted)] hover:text-[var(--text)] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[var(--text-sec)]`}
          >
            <i className="ri-arrow-left-s-line text-[16px]" aria-hidden="true" />
          </button>
        </li>

        {pageList(page, totalPages).map((number) => {
          const active = number === page;
          return (
            <li key={number}>
              <button
                type="button"
                onClick={() => onPage(number)}
                aria-current={active ? 'page' : undefined}
                className={`${stepClass} border ${
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]'
                    : 'border-[var(--border)] text-[var(--text-sec)] hover:bg-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {number}
                {active && <span className="sr-only"> (current page)</span>}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            onClick={() => onPage(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            className={`${stepClass} border border-[var(--border)] text-[var(--text-sec)] hover:bg-[var(--muted)] hover:text-[var(--text)] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[var(--text-sec)]`}
          >
            <i className="ri-arrow-right-s-line text-[16px]" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  );
}