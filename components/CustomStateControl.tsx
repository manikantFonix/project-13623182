'use client';

import type { LibraryState } from './DesignLibrary';

export type CustomState =
  | 'default'
  | 'type-selected'
  | 'ready'
  | 'more-expanded'
  | 'attachment'
  | 'generating'
  | 'library-empty'
  | 'library-loading'
  | 'library-error';

const states: CustomState[] = [
  'default',
  'type-selected',
  'ready',
  'more-expanded',
  'attachment',
  'generating',
  'library-empty',
  'library-loading',
  'library-error',
];

const label = (s: CustomState) =>
  s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

interface Props {
  state: CustomState;
  onChange: (s: CustomState) => void;
}

export default function CustomStateControl({ state, onChange }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-wrap items-center gap-1 bg-white border border-[#DDE3E6] rounded-full p-1 max-w-[560px] shadow-[0_8px_20px_-10px_rgba(19,26,31,0.25)]">
      <span className="px-3 text-[13px] font-medium text-[#5C6870]">Preview state</span>
      {states.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`h-7 px-2.5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
            state === s
              ? 'bg-[#16323F] text-white'
              : 'text-[#5C6870] hover:text-[#131A1F] hover:bg-[#F4F6F7]'
          }`}
        >
          {label(s)}
        </button>
      ))}
    </div>
  );
}

export type { LibraryState };