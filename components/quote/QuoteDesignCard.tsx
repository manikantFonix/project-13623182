'use client';

import { useState } from 'react';
import QuoteCard from './QuoteCard';
import QuoteLightbox from './QuoteLightbox';
import { FOCUS, type QuoteView } from './data';

export default function QuoteDesignCard({ view }: { view: QuoteView }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const all = [{ key: 'front', label: 'Front', src: view.hero }, ...view.views];

  return (
    <QuoteCard>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[15px] font-medium text-[#16233E]">Design</h2>
        <a
          href={view.hero}
          download
          className={`h-11 md:h-9 px-4 rounded-full bg-white border border-[#DCE3F0] text-[13px] font-medium text-[#16233E] whitespace-nowrap inline-flex items-center gap-2 cursor-pointer transition-colors duration-150 motion-reduce:transition-none hover:bg-[#F3F6FC] ${FOCUS}`}
        >
          <i className="ri-download-2-line text-[16px] w-4 h-4 flex items-center justify-center" />
          Download all views
        </a>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <button
          type="button"
          onClick={() => setOpenIdx(0)}
          aria-label={`Open ${view.piece} front view`}
          className={`md:flex-1 aspect-square rounded-[12px] overflow-hidden bg-[#E4E9F4] border border-[#DCE3F0] cursor-pointer transition-colors duration-150 motion-reduce:transition-none hover:border-[#C6D0E6] ${FOCUS}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={view.hero}
            alt={`${view.piece} — Front view`}
            className="w-full h-full object-cover"
          />
        </button>

        <div className="flex gap-3 md:flex-col md:w-[104px]">
          {view.views.map((v, i) => (
            <div key={v.key} className="flex-1 md:flex-none">
              <button
                type="button"
                onClick={() => setOpenIdx(i + 1)}
                aria-label={`Open ${view.piece} ${v.label} view`}
                className={`w-full aspect-square rounded-[12px] overflow-hidden bg-[#E4E9F4] border border-[#DCE3F0] cursor-pointer transition-colors duration-150 motion-reduce:transition-none hover:border-[#C6D0E6] ${FOCUS}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.src}
                  alt={`${view.piece} — ${v.label} view`}
                  className="w-full h-full object-cover"
                />
              </button>
              <p className="mt-1.5 text-[11px] leading-[16px] text-[#5D6C8A] text-center md:text-left">
                {v.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <QuoteLightbox
          label={all[openIdx].label}
          src={all[openIdx].src}
          pieceName={view.piece}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </QuoteCard>
  );
}