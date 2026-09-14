import QuoteCard from './QuoteCard';
import QuoteStatusPill from './QuoteStatusPill';
import type { QuoteView } from './data';

export default function JobSummaryCard({ view }: { view: QuoteView }) {
  return (
    <QuoteCard>
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-[22px] md:text-[28px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#16233E]">
          {view.piece}
        </h1>
        <QuoteStatusPill label={view.statusLabel} tone="muted" />
      </div>

      <div className="mt-4 border-t border-[#DCE3F0] pt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <p className="text-[13px] text-[#5D6C8A] tabular-nums">{view.reference}</p>
        <span className="hidden md:block w-px h-3 bg-[#DCE3F0]" aria-hidden="true" />
        <p className="text-[13px] font-medium text-[#16233E]">{view.brand.brandName}</p>
        <span className="hidden md:block w-px h-3 bg-[#DCE3F0]" aria-hidden="true" />
        <p className="text-[12px] text-[#5D6C8A]">
          Sent <span className="tabular-nums">{view.sentOn}</span>
        </p>
      </div>
    </QuoteCard>
  );
}