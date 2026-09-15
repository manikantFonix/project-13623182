'use client';

import { focusRing } from '../tokens';
import { dayCount, fmtDays, type EstimatorCategory, type Multipliers } from './data';

export default function BaseDayRow({
  category,
  multipliers,
  disabled,
  onChange,
}: {
  category: EstimatorCategory;
  multipliers: Multipliers;
  disabled?: boolean;
  onChange: (baseDays: number) => void;
}) {
  return (
    <tr className="border-t border-[var(--border)]">
      <th scope="row" className="px-4 py-2.5 text-left text-[13px] font-medium text-[var(--text)] whitespace-nowrap">
        {category.label}
      </th>
      <td className="px-4 py-2.5">
        <label htmlFor={`base-${category.id}`} className="sr-only">
          {category.label} base days
        </label>
        <input
          id={`base-${category.id}`}
          type="number"
          inputMode="decimal"
          min={0.1}
          step={0.1}
          value={category.baseDays}
          disabled={disabled}
          onChange={(event) => {
            const parsed = Number(event.target.value);
            if (!Number.isFinite(parsed)) return;
            onChange(Math.max(0.1, parsed));
          }}
          className={`w-[92px] h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-[13px] tabular-nums text-[var(--text)] transition-colors duration-150 ${focusRing}`}
        />
      </td>
      <td className="px-4 py-2.5 text-right text-[13px] tabular-nums text-[var(--text-sec)]">
        {fmtDays(dayCount(category.baseDays, 1))}
      </td>
      <td className="px-4 py-2.5 text-right text-[13px] tabular-nums text-[var(--text-sec)]">
        {fmtDays(dayCount(category.baseDays, multipliers.mid))}
      </td>
      <td className="px-4 py-2.5 text-right text-[13px] tabular-nums font-medium text-[var(--text)]">
        {fmtDays(dayCount(category.baseDays, multipliers.high))}
      </td>
    </tr>
  );
}