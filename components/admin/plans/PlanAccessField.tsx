'use client';

import { ACCESS_LABELS, ACCESS_ORDER, type AccessKey } from './data';
import { focusRing } from '../tokens';

export default function PlanAccessField({
  access,
  onChange,
  disabled,
}: {
  access: AccessKey[];
  onChange: (next: AccessKey[]) => void;
  disabled?: boolean;
}) {
  const toggle = (key: AccessKey) =>
    onChange(
      access.includes(key) ? access.filter((item) => item !== key) : [...access, key]
    );

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
      {ACCESS_ORDER.map((key) => {
        const checked = access.includes(key);
        return (
          <label
            key={key}
            className={`flex items-center gap-2.5 h-9 px-3 rounded-[10px] border transition-colors duration-150 ${
              checked
                ? 'border-[var(--accent)] bg-[var(--muted)]'
                : 'border-[var(--border)] bg-[var(--surface)]'
            } ${disabled ? 'opacity-60' : 'cursor-pointer'}`}
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={() => toggle(key)}
              className={`w-4 h-4 shrink-0 rounded-[4px] accent-[var(--accent)] cursor-pointer ${focusRing}`}
            />
            <span className="text-[13px] text-[var(--text)] whitespace-nowrap">
              {ACCESS_LABELS[key]}
            </span>
          </label>
        );
      })}
    </div>
  );
}