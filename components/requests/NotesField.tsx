'use client';

import { FOCUS_RING } from './data';

interface Props {
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  rows?: number;
  placeholder?: string;
}

export default function NotesField({
  value,
  onChange,
  maxLength,
  rows = 5,
  placeholder,
}: Props) {
  return (
    <div>
      <label className="block">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          rows={rows}
          placeholder={placeholder}
          className={`w-full px-3 py-2 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--text-sec)] resize-none ${FOCUS_RING}`}
        />
      </label>
      {maxLength !== undefined && (
        <div className="mt-2 flex items-center justify-end">
          <span className="text-[11px] text-[var(--text-sec)] tabular-nums">
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}