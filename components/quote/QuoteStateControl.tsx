'use client';

import { useRouter } from 'next/navigation';
import { QUOTE_STATES, type QuoteState } from './data';

export default function QuoteStateControl({
  value,
  jobPath,
}: {
  value: QuoteState;
  jobPath: string;
}) {
  const router = useRouter();

  const go = (id: QuoteState) => {
    if (id === 'form') {
      router.push(`${jobPath}/submit`);
    } else {
      router.push(`${jobPath}?state=${id}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[80] max-w-[calc(100vw-32px)] flex flex-wrap gap-1 p-1 bg-white border border-[#DCE3F0] rounded-full">
      {QUOTE_STATES.map((s) => {
        const active = s.id === value;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => go(s.id)}
            aria-pressed={active}
            className={`h-7 px-3 rounded-full text-[12px] font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233E] focus-visible:ring-offset-1 ${
              active ? 'bg-[#16233E] text-white' : 'text-[#5D6C8A] hover:bg-[#F3F6FC]'
            }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}