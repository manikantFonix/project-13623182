'use client';

import BaseDayRow from './BaseDayRow';
import type { EstimatorCategory, Multipliers } from './data';

export default function BaseDaysTable({
  categories,
  multipliers,
  disabled,
  onChange,
}: {
  categories: EstimatorCategory[];
  multipliers: Multipliers;
  disabled?: boolean;
  onChange: (id: string, baseDays: number) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <caption className="sr-only">
            Base days per category and the day count each produces at every complexity level.
          </caption>
          <thead>
            <tr className="bg-[var(--muted)]">
              <th scope="col" className="px-4 py-3 text-left text-[12px] font-semibold text-[var(--text-sec)]">
                Category
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[12px] font-semibold text-[var(--text-sec)]">
                Base days
              </th>
              <th scope="col" className="px-4 py-3 text-right text-[12px] font-semibold text-[var(--text-sec)]">
                Simple
                <span className="block text-[11px] font-medium tabular-nums text-[var(--muted-text)]">
                  &times; 1.0
                </span>
              </th>
              <th scope="col" className="px-4 py-3 text-right text-[12px] font-semibold text-[var(--text-sec)]">
                Moderate
                <span className="block text-[11px] font-medium tabular-nums text-[var(--muted-text)]">
                  &times; {multipliers.mid.toFixed(2)}
                </span>
              </th>
              <th scope="col" className="px-4 py-3 text-right text-[12px] font-semibold text-[var(--text-sec)]">
                Complex
                <span className="block text-[11px] font-medium tabular-nums text-[var(--muted-text)]">
                  &times; {multipliers.high.toFixed(2)}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <BaseDayRow
                key={category.id}
                category={category}
                multipliers={multipliers}
                disabled={disabled}
                onChange={(baseDays) => onChange(category.id, baseDays)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}