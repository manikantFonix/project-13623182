'use client';

import type { RefObject } from 'react';
import RequestFieldLabel from './RequestFieldLabel';
import { widgetRing } from './data';
import PhoneField from '../ui/PhoneField';

export default function RequestField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  autoComplete,
  optional,
  help,
  error,
  inputRef,
}: {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  optional?: boolean;
  help?: string;
  error?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}) {
  const describedBy = error
    ? `${id}-error`
    : help
      ? `${id}-help`
      : undefined;

  if (type === 'tel') {
    return (
      <div>
        <RequestFieldLabel htmlFor={id} label={label} optional={optional} />
        <PhoneField
          id={id}
          name={id.replace('request-', '')}
          value={value}
          onChange={onChange}
          placeholder="555 0134"
          inputAriaLabel={label}
          inputRef={inputRef}
          ariaInvalid={!!error}
          ariaDescribedBy={describedBy}
          wrapClassName="mt-2 flex items-center gap-2"
          buttonClassName="h-11 px-3 shrink-0 text-[13px] rounded-[12px] border flex items-center gap-1 cursor-pointer bg-[var(--w-surface)] border-[var(--w-border)] text-[var(--w-text)]"
          inputClassName="flex-1 h-11 px-3.5 rounded-[12px] border text-[13px] outline-none bg-[var(--w-surface)] border-[var(--w-border)] text-[var(--w-text)] focus:border-[var(--w-primary)]"
          listClassName="absolute z-20 mt-1 w-[260px] max-h-[240px] overflow-y-auto rounded-[12px] p-1 border bg-[var(--w-surface)] border-[var(--w-border)]"
          optionClassName="text-[var(--w-text)] hover:bg-[var(--w-border)]"
          optionActiveClassName="bg-[var(--w-border)] text-[var(--w-text)]"
          focusRing={widgetRing}
        />
        {error ? (
          <p
            id={`${id}-error`}
            aria-live="polite"
            className="mt-1.5 text-[12px]"
            style={{ color: 'var(--w-primary)' }}
          >
            {error}
          </p>
        ) : help ? (
          <p
            id={`${id}-help`}
            className="mt-1.5 text-[12px]"
            style={{ color: 'var(--w-text-sec)' }}
          >
            {help}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <RequestFieldLabel htmlFor={id} label={label} optional={optional} />
      <input
        ref={inputRef}
        id={id}
        name={id.replace('request-', '')}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`mt-2 w-full h-11 px-3.5 rounded-[12px] border text-[13px] outline-none border-[var(--w-border)] focus:border-[var(--w-primary)] ${widgetRing}`}
        style={{ backgroundColor: 'var(--w-surface)', color: 'var(--w-text)' }}
      />
      {error ? (
        <p
          id={`${id}-error`}
          aria-live="polite"
          className="mt-1.5 text-[12px]"
          style={{ color: 'var(--w-primary)' }}
        >
          {error}
        </p>
      ) : help ? (
        <p
          id={`${id}-help`}
          className="mt-1.5 text-[12px]"
          style={{ color: 'var(--w-text-sec)' }}
        >
          {help}
        </p>
      ) : null}
    </div>
  );
}