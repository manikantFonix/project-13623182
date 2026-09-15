'use client';

import { focusRing } from '../tokens';
import SetStatusPill from './SetStatusPill';
import {
  categoryComplete,
  categoryEditedCount,
  categoryMissingCount,
  categoryPromptCount,
  type Category,
} from './data';

export default function CategoryRail({
  categories,
  selectedId,
  onSelect,
}: {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label="Jewellery categories">
      <ul className="flex flex-col">
        {categories.map((category) => {
          const selected = category.id === selectedId;
          const complete = categoryComplete(category);
          return (
            <li key={category.id} className="border-b border-[var(--border)] last:border-b-0">
              <button
                type="button"
                aria-current={selected ? 'true' : undefined}
                onClick={() => onSelect(category.id)}
                className={`w-full text-left px-4 py-3 flex items-start justify-between gap-3 transition-colors duration-150 ${focusRing} ${
                  selected ? 'bg-[var(--accent)]' : 'hover:bg-[var(--muted)]'
                }`}
              >
                <span className="min-w-0">
                  <span
                    className={`block text-[13px] font-semibold ${
                      selected ? 'text-[var(--on-accent)]' : 'text-[var(--text)]'
                    }`}
                  >
                    {category.name}
                  </span>
                  <span
                    className={`mt-0.5 block text-[12px] tabular-nums ${
                      selected ? 'text-[var(--on-accent-soft)]' : 'text-[var(--text-sec)]'
                    }`}
                  >
                    {categoryPromptCount(category)} prompts · {categoryEditedCount(category)} edited
                  </span>
                </span>
                <span className="shrink-0 pt-0.5">
                  {complete ? (
                    <span
                      className={`inline-flex items-center h-5 px-2 rounded-full border text-[11px] font-medium whitespace-nowrap ${
                        selected
                          ? 'border-[var(--on-accent-faint)] text-[var(--on-accent-soft)]'
                          : 'border-[var(--border)] bg-[var(--muted)] text-[var(--text-sec)]'
                      }`}
                    >
                      Complete
                    </span>
                  ) : (
                    <span
                      className={`inline-flex items-center h-5 px-2 rounded-full border text-[11px] font-semibold whitespace-nowrap ${
                        selected
                          ? 'border-[var(--on-accent-faint)] text-[var(--on-accent)]'
                          : 'border-[var(--alert)] bg-[var(--amber-bg)] text-[var(--alert-strong)]'
                      }`}
                    >
                      Missing {categoryMissingCount(category)}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}