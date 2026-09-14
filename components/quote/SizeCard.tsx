import QuoteCard from './QuoteCard';
import { SpecGroup, SpecRow } from './SpecList';
import { FOCUS, type QuoteView } from './data';
import { getDetailSheetSpecs } from '../requests/detailSheet';

export default function SizeCard({ view }: { view: QuoteView }) {
  const sheet = getDetailSheetSpecs();
  const instructions = sheet.specialInstructions.trim();
  const attachment = sheet.attachment;

  return (
    <QuoteCard>
      <h2 className="text-[15px] font-medium text-[#16233E]">Size and instructions</h2>

      <div className="mt-4">
        <SpecGroup>
          <dl>
            <SpecRow label="Dimensions" value={view.dimensions} />
            <SpecRow label="Ring size" value={view.ringSize} />
            <SpecRow label="Custom note" value={view.customNote} />
          </dl>
        </SpecGroup>
      </div>

      {instructions && (
        <div className="mt-4 border-t border-[#DCE3F0] pt-4">
          <p className="text-[12px] font-medium text-[#5D6C8A]">Special instructions</p>
          <p className="mt-1.5 text-[13px] leading-[20px] text-[#16233E] whitespace-pre-line">
            {instructions}
          </p>
        </div>
      )}

      {attachment && (
        <div className="mt-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-[10px] bg-[#F3F6FC] flex items-center justify-center text-[#5D6C8A] shrink-0">
            <i className="ri-file-image-line text-[16px] w-4 h-4 flex items-center justify-center" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] text-[#16233E] truncate">{attachment.name}</p>
            <p className="text-[12px] text-[#5D6C8A]">{attachment.meta}</p>
          </div>
          <a
            href={attachment.url}
            download
            aria-label={`Download ${attachment.name}`}
            className={`w-8 h-8 rounded-full bg-white border border-[#DCE3F0] inline-flex items-center justify-center text-[#16233E] hover:bg-[#F3F6FC] cursor-pointer transition-colors duration-150 motion-reduce:transition-none shrink-0 ${FOCUS}`}
          >
            <i className="ri-download-2-line text-[16px] w-4 h-4 flex items-center justify-center" />
          </a>
        </div>
      )}
    </QuoteCard>
  );
}