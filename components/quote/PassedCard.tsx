import QuoteCard from './QuoteCard';
import type { QuoteView } from './data';

export default function PassedCard({ view }: { view: QuoteView }) {
  return (
    <QuoteCard>
      <p className="text-[13px] text-[#16233E]">
        You told them you can&apos;t take this on.
      </p>
      {view.passedOn && (
        <p className="mt-1 text-[12px] text-[#5D6C8A] tabular-nums">{view.passedOn}</p>
      )}
    </QuoteCard>
  );
}