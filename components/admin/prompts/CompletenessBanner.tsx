'use client';

import {
  categoryComplete,
  setMissing,
  type Category,
} from './data';

export default function CompletenessBanner({ categories }: { categories: Category[] }) {
  const incomplete = categories.filter((category) => !categoryComplete(category));
  if (incomplete.length === 0) return null;

  return (
    <div
      role="status"
      className="rounded-[12px] border border-[var(--alert)] bg-[var(--amber-bg)] px-5 py-4 flex items-start gap-3"
    >
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--alert-strong)]">
        <i className="ri-error-warning-line text-[18px]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h2 className="text-[13px] font-semibold text-[var(--text)]">
          {incomplete.length === 1
            ? 'One category has an incomplete set'
            : `${incomplete.length} categories have an incomplete set`}
        </h2>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
          An incomplete set fails generation for that category and nothing is substituted.
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {incomplete.map((category) => (
            <li key={category.id} className="text-[12px] leading-relaxed text-[var(--text)]">
              <span className="font-semibold">{category.name}</span>
              <span className="text-[var(--text-sec)]">
                {' — '}
                {category.sets.flatMap((set) =>
                  setMissing(set).map(
                    (missing) => `${set.label} is missing ${missing.groupLabel} · ${missing.label}`
                  )
                ).join('; ')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}