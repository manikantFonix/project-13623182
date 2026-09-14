'use client';

import { useRef } from 'react';
import { focusRingVar } from '../settings/theme/tokens';

interface Props {
  value: string;
  onChange: (v: string) => void;
  invalid: boolean;
}

export default function CancelCodeInput({ value, onChange, invalid }: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? '');

  const setAt = (i: number, ch: string) => {
    const arr = digits.slice();
    arr[i] = ch;
    onChange(arr.join('').slice(0, 6));
  };

  const handleChange = (i: number, raw: string) => {
    const ch = raw.replace(/\D/g, '').slice(-1);
    setAt(i, ch);
    if (ch && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      e.preventDefault();
      const arr = digits.slice();
      arr[i - 1] = '';
      onChange(arr.join(''));
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
    e.preventDefault();
    onChange(text);
    refs.current[Math.min(text.length, 5)]?.focus();
  };

  return (
    <div role="group" aria-label="Verification code" className="flex gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? 'cancel-code-error' : undefined}
          className={`w-12 h-12 rounded-[12px] border bg-[var(--surface)] text-center text-[20px] font-medium text-[var(--text)] tabular-nums ${invalid ? 'border-[var(--alert)]' : 'border-[var(--border)]'} ${focusRingVar}`}
        />
      ))}
    </div>
  );
}