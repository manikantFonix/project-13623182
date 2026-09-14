'use client';

import { useEffect, useRef, useState } from 'react';
import { METAL_LIST } from '../../lib/metals';
import RequestFieldLabel from './RequestFieldLabel';
import { widgetRing } from './data';
import type { WidgetMetal } from './types';

function Swatch({ hex }: { hex: string }) {
  return (
    <span
      aria-hidden
      className="block w-5 h-5 shrink-0 rounded-full border"
      style={{ backgroundColor: hex, borderColor: 'var(--w-border)' }}
    />
  );
}

export default function RequestMetal({
  value,
  onChange,
}: {
  value: WidgetMetal;
  onChange: (m: WidgetMetal) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const selected = METAL_LIST.find((m) => m.id === value) ?? METAL_LIST[0];

  return (
    <div ref={wrapRef} className="relative">
      <RequestFieldLabel htmlFor="request-metal" label="Metal" />
      <button
        ref={btnRef}
        id="request-metal"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`mt-2 w-full h-11 px-3.5 rounded-[12px] border flex items-center gap-2.5 text-left cursor-pointer border-[var(--w-border)] focus:border-[var(--w-primary)] ${widgetRing}`}
        style={{ backgroundColor: 'var(--w-surface)', color: 'var(--w-text)' }}
      >
        <Swatch hex={selected.hex} />
        <span className="flex-1 text-[13px]">{selected.name}</span>
        <i
          className={`ri-arrow-down-s-line text-[16px] w-4 h-4 flex items-center justify-center transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
          style={{ color: 'var(--w-text-sec)' }}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Metal"
          className="absolute z-30 left-0 right-0 mt-2 p-1.5 rounded-[12px] border shadow-lg"
          style={{
            backgroundColor: 'var(--w-surface)',
            borderColor: 'var(--w-border)',
          }}
        >
          {METAL_LIST.map((m) => {
            const isSelected = m.id === value;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(m.id as WidgetMetal);
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                  className={`w-full h-10 px-2.5 rounded-[8px] flex items-center gap-2.5 text-left cursor-pointer ${widgetRing}`}
                  style={{
                    backgroundColor: isSelected
                      ? 'var(--w-border)'
                      : 'transparent',
                    color: 'var(--w-text)',
                  }}
                >
                  <Swatch hex={m.hex} />
                  <span className="flex-1 text-[13px]">{m.name}</span>
                  {isSelected && (
                    <i
                      className="ri-check-line text-[16px] w-4 h-4 flex items-center justify-center"
                      style={{ color: 'var(--w-primary)' }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}