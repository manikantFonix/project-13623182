'use client';

import { focusRing } from '../tokens';

export default function RecordActiveToggle({
  active,
  name,
  onChange,
  size = 'md',
}: {
  active: boolean;
  name: string;
  onChange: () => void;
  size?: 'sm' | 'md';
}) {
  const sm = size === 'sm';
  const track = sm ? 'h-5 w-9' : 'h-6 w-11';
  const knob = sm ? 'h-3.5 w-3.5' : 'h-[18px] w-[18px]';
  const on = sm ? 'translate-x-[18px]' : 'translate-x-[22px]';
  const off = 'translate-x-[3px]';

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={active ? `Mark ${name} as inactive` : `Mark ${name} as active`}
        onClick={onChange}
        className={`relative inline-flex shrink-0 items-center rounded-full border transition-colors duration-150 ${track} ${focusRing} ${
          active
            ? 'border-[var(--accent)] bg-[var(--accent)]'
            : 'border-[var(--border-strong)] bg-[var(--surface)]'
        }`}
      >
        <span
          className={`block rounded-full transition-transform duration-150 ${knob} ${active ? on : off} ${
            active ? 'bg-[var(--on-accent)]' : 'bg-[var(--muted-text)]'
          }`}
        />
      </button>
      <span
        className={`text-[12px] font-medium whitespace-nowrap ${
          active ? 'text-[var(--text)]' : 'text-[var(--text-sec)]'
        }`}
      >
        {active ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
}