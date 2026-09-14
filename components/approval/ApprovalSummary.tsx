import Card from './Card';
import StatusPill from './StatusPill';
import type { ApprovalView } from './data';

export default function ApprovalSummary({ view }: { view: ApprovalView }) {
  const decision = view.decision;
  const tone =
    decision?.outcome === 'approved'
      ? 'success'
      : decision?.outcome === 'changes'
        ? 'alert'
        : 'muted';
  const label =
    decision?.outcome === 'approved'
      ? 'Approved'
      : decision?.outcome === 'changes'
        ? 'Rejected'
        : 'Awaiting Approval';

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-[22px] md:text-[28px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#16233E]">
          {view.title}
        </h1>
        <StatusPill label={label} tone={tone} />
      </div>

      <div className="mt-4 border-t border-[#DCE3F0] pt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <p className="text-[13px] text-[#5D6C8A] tabular-nums">{view.reference}</p>
        <span className="hidden md:block w-px h-3 bg-[#DCE3F0]" aria-hidden="true" />
        <p className="text-[13px] text-[#5D6C8A]">
          Sent by {view.sentBy} on <span className="tabular-nums">{view.sentOn}</span>.
        </p>
      </div>

      {decision?.outcome === 'approved' && (
        <p className="mt-3 text-[13px] text-[#3D6B54]">
          You approved this on <span className="tabular-nums">{decision.date}</span>.
        </p>
      )}

      {decision?.outcome === 'changes' && (
        <>
          <p className="mt-3 text-[13px] text-[#A8552A]">
            You asked for changes on <span className="tabular-nums">{decision.date}</span>.
          </p>
          <p className="mt-1 text-[13px] text-[#5D6C8A]">
            Your jeweler is working on it and will send a new version.
          </p>
        </>
      )}
    </Card>
  );
}