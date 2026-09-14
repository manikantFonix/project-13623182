import Card from './Card';
import { APPROVAL_STAGES, type ApprovalView } from './data';

export default function ProgressCard({ view }: { view: ApprovalView }) {
  const currentIndex = APPROVAL_STAGES.findIndex((s) => s.id === view.stage);
  const last = APPROVAL_STAGES.length - 1;

  return (
    <Card>
      <h2 className="text-[15px] font-medium text-[#16233E]">Progress</h2>

      <ol className="mt-4">
        {APPROVAL_STAGES.map((stage, i) => {
          const reached = i < currentIndex;
          const current = i === currentIndex;
          const filled = reached || current;
          const nameClass = filled ? 'text-[#16233E]' : 'text-[#5D6C8A]';
          const showExpected = stage.id === 'in-production' && Boolean(view.expectedBy);

          return (
            <li key={stage.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    filled ? 'bg-[var(--brand)]' : 'bg-[#E4E9F4]'
                  }`}
                >
                  {reached ? (
                    <i className="ri-check-line text-[12px] text-white w-3 h-3 flex items-center justify-center" />
                  ) : current ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  ) : null}
                </span>
                {i < last && <span className="w-px flex-1 min-h-[24px] bg-[#DCE3F0]" />}
              </div>

              <div className={`flex-1 ${i < last ? 'pb-5' : ''}`}>
                <p className={`text-[13px] ${nameClass}`}>{stage.label}</p>
                {current && <p className="mt-0.5 text-[12px] text-[#5D6C8A]">Current</p>}
                {current && stage.id === 'in-progress' && !view.expectedBy && (
                  <p className="mt-0.5 text-[12px] text-[#5D6C8A]">
                    Your jeweler is getting quotes. They&apos;ll confirm a date
                    soon.
                  </p>
                )}
                {showExpected && (
                  <div className="mt-1">
                    <p className="text-[13px] text-[#16233E]">
                      Expected by <span className="tabular-nums">{view.expectedBy}</span>
                    </p>
                    <p className="text-[12px] text-[#5D6C8A]">Your jeweler&apos;s estimate.</p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}