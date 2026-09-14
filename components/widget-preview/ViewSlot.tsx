'use client';

import type { ViewStatus } from './types';

interface Props {
  name: string;
  status: ViewStatus;
  image: string;
  alt: string;
}

export default function ViewSlot({ name, status, image, alt }: Props) {
  const caption =
    status === 'failed'
      ? "This one didn't come out."
      : status === 'skipped'
        ? 'Not attempted.'
        : name;

  return (
    <div className="flex flex-col">
      <div
        className="relative w-full aspect-square rounded-[12px] overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor:
            status === 'failed' ? 'var(--w-surface)' : 'var(--w-border)',
          border:
            status === 'failed'
              ? '1px solid var(--w-primary)'
              : '1px solid transparent',
        }}
      >
        {status === 'done' && (
          <img src={image} alt={alt} className="w-full h-full object-cover" />
        )}
        {status === 'active' && (
          <div
            aria-hidden
            className="absolute left-0 right-0 h-[4px]"
            style={{ bottom: '33%', backgroundColor: 'var(--w-border)' }}
          >
            <div
              className="h-full w-[30%] animate-[w-indeterminate_1.4s_ease-in-out_infinite] motion-reduce:animate-none"
              style={{ backgroundColor: 'var(--w-primary)' }}
            />
          </div>
        )}
      </div>
      <span
        className="mt-2 text-[12px] leading-none"
        style={{
          color:
            status === 'failed' ? 'var(--w-text)' : 'var(--w-text-sec)',
        }}
      >
        {caption}
      </span>
    </div>
  );
}