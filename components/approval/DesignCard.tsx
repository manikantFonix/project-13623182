'use client';

import { useState } from 'react';
import Card from './Card';
import ApprovalLightbox from './ApprovalLightbox';
import { FOCUS_BRAND, type ApprovalView } from './data';

export default function DesignCard({ view }: { view: ApprovalView }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const all = [{ key: 'front', label: 'Front', src: view.hero }, ...view.views];

  return (
    <Card>
      <h2 className="text-[15px] font-medium text-[#16233E]">Your design</h2>

      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <button
          type="button"
          onClick={() => setOpenIdx(0)}
          className={`md:flex-1 aspect-square rounded-[12px] overflow-hidden bg-[#E4E9F4] border border-[#DCE3F0] cursor-pointer transition-colors duration-150 motion-reduce:transition-none hover:border-[#C6D0E6] ${FOCUS_BRAND}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={view.hero}
            alt={`${view.title} — Front`}
            className="w-full h-full object-cover"
          />
        </button>

        <div className="flex gap-3 md:flex-col md:w-[104px]">
          {view.views.map((v, i) => (
            <div key={v.key} className="flex-1 md:flex-none">
              <button
                type="button"
                onClick={() => setOpenIdx(i + 1)}
                className={`w-full aspect-square rounded-[12px] overflow-hidden bg-[#E4E9F4] border border-[#DCE3F0] cursor-pointer transition-colors duration-150 motion-reduce:transition-none hover:border-[#C6D0E6] ${FOCUS_BRAND}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.src}
                  alt={`${view.title} — ${v.label}`}
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
        <ApprovalLightbox
          label={all[openIdx].label}
          src={all[openIdx].src}
          pieceName={view.title}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </Card>
  );
}