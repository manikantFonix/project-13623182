'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { widgetRing } from './data';

export const US_RING_SIZES = [
  '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5',
  '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13',
];

export default function EstimateRingSizeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`estimate-size-opt-${active}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const openList = () => {
    const idx = US_RING_SIZES.indexOf(value);
    setActive(idx >= 0 ? idx : 0);
    setOpen(true);
  };

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, US_RING_SIZES.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(US_RING_SIZES[active]);
    }
  };

  return (
    <div ref={ref} className="relative">
      <span
        id="estimate-size-label"
        className="block text-[13px] font-medium"
        style={{ color: 'var(--w-text)' }}
      >
        US ring size
      </span>
      <button
        ref={btnRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="estimate-size-listbox"
        aria-labelledby="estimate-size-label"
        aria-activedescendant={open ? `estimate-size-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`mt-2 w-full h-11 px-3.5 flex items-center justify-between gap-2 rounded-[12px] border border-[var(--w-border)] text-[13px] cursor-pointer ${widgetRing}`}
        style={{
          backgroundColor: 'var(--w-surface)',
          color: value ? 'var(--w-text)' : 'var(--w-text-sec)',
        }}
      >
        <span className="tabular-nums">
          {value ? `US ${value}` : 'Choose your size'}
        </span>
        <i
          className={`ri-arrow-down-s-line text-[16px] w-4 h-4 flex items-center justify-center transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
          style={{ color: 'var(--w-text-sec)' }}
        />
      </button>

      {open && (
        <ul
          id="estimate-size-listbox"
          role="listbox"
          aria-labelledby="estimate-size-label"
          className="absolute z-30 mt-1 w-full max-h-[220px] overflow-y-auto rounded-[12px] border border-[var(--w-border)] p-1"
          style={{ backgroundColor: 'var(--w-surface)' }}
        >
          {US_RING_SIZES.map((s, i) => {
            const selected = value === s;
            const isActive = i === active;
            return (
              <li
                key={s}
                id={`estimate-size-opt-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(s)}
                className="h-9 px-3 flex items-center justify-between rounded-[8px] text-[13px] tabular-nums cursor-pointer"
                style={{
                  backgroundColor: isActive ? 'var(--w-border)' : 'transparent',
                  color: isActive ? 'var(--w-text)' : 'var(--w-text-sec)',
                }}
              >
                <span>US {s}</span>
                {selected && (
                  <i
                    className="ri-check-line text-[16px] w-4 h-4 flex items-center justify-center"
                    style={{ color: 'var(--w-primary)' }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}