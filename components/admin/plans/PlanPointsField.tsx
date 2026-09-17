'use client';

import { focusRing } from '../tokens';

const inputClass = `flex-1 h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`;

export default function PlanPointsField({
  points,
  onChange,
  disabled,
}: {
  points: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}) {
  const update = (index: number, value: string) =>
    onChange(points.map((point, i) => (i === index ? value : point)));

  return (
    <div className="flex flex-col gap-2">
      {points.map((point, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="w-4 h-4 shrink-0 flex items-center justify-center text-[var(--accent)]">
            <i className="ri-check-line text-[15px]" aria-hidden="true" />
          </span>
          <input
            type="text"
            value={point}
            disabled={disabled}
            onChange={(event) => update(index, event.target.value)}
            placeholder="e.g. 300 renders a month"
            aria-label={`Feature point ${index + 1}`}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => onChange(points.filter((_, i) => i !== index))}
            disabled={disabled}
            aria-label={`Remove feature point ${index + 1}`}
            className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-[var(--text-sec)] transition-colors duration-150 hover:bg-[var(--muted)] hover:text-[var(--alert-strong)] disabled:opacity-40 ${focusRing}`}
          >
            <i className="ri-close-line text-[16px]" aria-hidden="true" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...points, ''])}
        disabled={disabled}
        className={`self-start h-9 px-4 rounded-full border border-dashed border-[var(--border-strong)] text-[13px] font-medium text-[var(--text-sec)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] hover:text-[var(--text)] disabled:opacity-50 ${focusRing}`}
      >
        <i className="ri-add-line mr-1.5 align-middle text-[15px]" aria-hidden="true" />
        Add feature
      </button>
    </div>
  );
}