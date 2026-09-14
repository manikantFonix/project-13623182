'use client';

import ViewSlot from './ViewSlot';
import { VIEW_IMAGES, VIEW_LABEL, VIEW_ORDER } from './pipeline';
import { widgetRing } from './data';
import type { ViewStatus, WidgetView } from './types';

interface Props {
  statuses: Record<WidgetView, ViewStatus>;
  stageLabel: string | null;
  failed: boolean;
  categoryLabel: string;
  onRetry: () => void;
  reconnecting?: boolean;
}

export default function PipelinePanel({
  statuses,
  stageLabel,
  failed,
  categoryLabel,
  onRetry,
  reconnecting,
}: Props) {
  return (
    <div
      aria-live="polite"
      className="mt-4 rounded-[12px] border border-[var(--w-border)] p-4"
      style={{ backgroundColor: 'var(--w-surface)' }}
    >
      {!failed && stageLabel && (
        <p className="mb-3 text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
          {stageLabel}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {VIEW_ORDER.map((v) => (
          <ViewSlot
            key={v}
            name={VIEW_LABEL[v]}
            status={statuses[v]}
            image={VIEW_IMAGES.yellow[v]}
            alt={`${categoryLabel} design, ${VIEW_LABEL[v]} view`}
          />
        ))}
      </div>

      {!failed && reconnecting && (
        <p className="mt-3 text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
          Still working — this carries on even if you lose signal.
        </p>
      )}

      {failed && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <p className="text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
            We stopped there — the later views are built from that one.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className={`h-10 px-5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 cursor-pointer border ${widgetRing}`}
            style={{
              backgroundColor: 'var(--w-surface)',
              borderColor: 'var(--w-border)',
              color: 'var(--w-text)',
            }}
          >
            Try again
          </button>
        </div>
      )}

      <style>{`@keyframes w-indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>
    </div>
  );
}