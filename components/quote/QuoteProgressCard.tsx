import QuoteCard from './QuoteCard';
import { stagesFor, type QuoteState } from './data';

export default function QuoteProgressCard({ state }: { state: QuoteState }) {
  const stages = stagesFor(state);
  const last = stages.length - 1;

  return (
    <QuoteCard>
      <h2 className="text-[15px] font-medium text-[#16233E]">Progress</h2>

      <ol className="mt-4">
        {stages.map((stage, i) => {
          const filled = stage.reached || stage.current;
          const nameClass = filled ? 'text-[#16233E]' : 'text-[#5D6C8A]';

          return (
            <li key={stage.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    filled ? 'bg-[var(--brand)]' : 'bg-[#E4E9F4]'
                  }`}
                >
                  {stage.reached ? (
                    <i className="ri-check-line text-[12px] text-white w-3 h-3 flex items-center justify-center" />
                  ) : stage.current ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  ) : null}
                </span>
                {i < last && <span className="w-px flex-1 min-h-[24px] bg-[#DCE3F0]" />}
              </div>

              <div
                className={`flex-1 flex items-start justify-between gap-3 ${
                  i < last ? 'pb-5' : ''
                }`}
              >
                <div>
                  <p className={`text-[13px] ${nameClass}`}>{stage.label}</p>
                  {stage.current && <p className="mt-0.5 text-[12px] text-[#5D6C8A]">Current</p>}
                </div>
                {stage.timestamp && (
                  <p className="text-[12px] text-[#5D6C8A] tabular-nums text-right whitespace-nowrap">
                    {stage.timestamp}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </QuoteCard>
  );
}