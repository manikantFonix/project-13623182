'use client';

import RequestFieldLabel from './RequestFieldLabel';
import { widgetRing } from './data';

export default function RequestArea({
  id,
  label,
  value,
  onChange,
  optional,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <RequestFieldLabel htmlFor={id} label={label} optional={optional} />
      <textarea
        id={id}
        name={id.replace('request-', '')}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={500}
        className={`mt-2 w-full px-3.5 py-2.5 rounded-[12px] border text-[13px] outline-none resize-none border-[var(--w-border)] focus:border-[var(--w-primary)] ${widgetRing}`}
        style={{ backgroundColor: 'var(--w-surface)', color: 'var(--w-text)' }}
      />
    </div>
  );
}