import QuoteCard from '../QuoteCard';
import type { QuoteView } from '../data';

export default function FormPieceCard({ view }: { view: QuoteView }) {
  return (
    <QuoteCard>
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-[12px] bg-[#E4E9F4] overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={view.hero}
            alt={`${view.piece} — Front view`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[18px] font-semibold text-[#16233E]">{view.piece}</p>
          <p className="mt-1 text-[13px] text-[#5D6C8A] tabular-nums">{view.reference}</p>
          <p className="mt-1 text-[13px] text-[#16233E]">{view.brand.brandName}</p>
          <p className="mt-1 text-[12px] text-[#5D6C8A]">
            Sent <span className="tabular-nums">{view.sentOn}</span>
          </p>
        </div>
      </div>
    </QuoteCard>
  );
}