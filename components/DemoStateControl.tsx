'use client';

import type { DemoState } from './CataloguePage';

interface Props {
  state: DemoState;
  onChange: (state: DemoState) => void;
}

const states: DemoState[] = ['default', 'loading', 'empty', 'error'];

export default function DemoStateControl({ state, onChange }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-1 bg-white border border-[#DDE3E6] rounded-full p-1 shadow-[0_8px_20px_-10px_rgba(19,26,31,0.25)]">
      <span className="px-2 text-[13px] font-medium text-[#5C6870]">
        Preview state
      </span>
      {states.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`h-7 px-2 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
            state === s
              ? 'bg-[#16323F] text-white'
              : 'text-[#5C6870] hover:bg-[#EFF2F3]'
          }`}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}