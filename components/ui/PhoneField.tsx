'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { COUNTRIES, composePhone, parsePhone } from '../../lib/phone';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  inputAriaLabel?: string;
  wrapClassName?: string;
  buttonClassName?: string;
  inputClassName?: string;
  listClassName?: string;
  optionClassName?: string;
  optionActiveClassName?: string;
  focusRing?: string;
  listAlign?: 'left' | 'right';
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export default function PhoneField({
  value,
  onChange,
  placeholder = '555 0100',
  id,
  name,
  inputAriaLabel,
  wrapClassName = 'flex items-center gap-2',
  buttonClassName = 'h-10 px-2.5 shrink-0 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] flex items-center gap-1 cursor-pointer',
  inputClassName = 'h-10 flex-1 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none',
  listClassName = 'absolute z-20 mt-1 w-[240px] max-h-[220px] overflow-y-auto bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-1',
  optionClassName = 'text-[var(--text)] hover:bg-[var(--muted)]',
  optionActiveClassName = 'bg-[var(--canvas)] text-[var(--text)]',
  focusRing = '',
  listAlign = 'left',
  ariaInvalid,
  ariaDescribedBy,
  inputRef,
}: Props) {
  const initial = parsePhone(value);
  const [dial, setDial] = useState(initial.dial);
  const [national, setNational] = useState(initial.national);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = parsePhone(value);
    if ((value ?? '').trim() !== '') {
      setDial(p.dial);
      setNational(p.national);
    } else {
      setNational('');
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const emit = (d: string, n: string) =>
    onChange(n.trim() ? composePhone(d, n) : '');

  return (
    <div ref={ref} className={`relative ${wrapClassName}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Country code"
        className={`${buttonClassName} ${focusRing}`}
      >
        <span className="tabular-nums">{dial}</span>
        <i
          className={`ri-arrow-down-s-line text-[15px] w-4 h-4 flex items-center justify-center transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <input
        ref={inputRef}
        id={id}
        type="tel"
        inputMode="tel"
        value={national}
        placeholder={placeholder}
        aria-label={inputAriaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        onChange={(e) => {
          setNational(e.target.value);
          emit(dial, e.target.value);
        }}
        className={inputClassName}
      />
      {name && (
        <input
          type="hidden"
          name={name}
          value={national.trim() ? composePhone(dial, national) : ''}
          readOnly
        />
      )}
      {open && (
        <div
          role="listbox"
          className={`${listClassName} ${listAlign === 'right' ? 'right-0' : 'left-0'}`}
        >
          {COUNTRIES.map((c) => (
            <button
              key={c.name}
              type="button"
              role="option"
              aria-selected={c.dial === dial}
              onClick={() => {
                setDial(c.dial);
                setOpen(false);
                emit(c.dial, national);
              }}
              className={`w-full flex items-center justify-between gap-3 h-8 px-2.5 text-[13px] rounded-[8px] whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                c.dial === dial ? optionActiveClassName : optionClassName
              }`}
            >
              <span>{c.name}</span>
              <span className="tabular-nums opacity-70">{c.dial}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}