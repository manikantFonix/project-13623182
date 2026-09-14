'use client';

import ErrorBlock from './ErrorBlock';
import { SkeletonStat } from './SkeletonStat';
import type { PipelineStage, SectionMode } from './data';

function FunnelRow({ stage, first }: { stage: PipelineStage; first: number }) {
  const proportion = first > 0 ? (stage.count / first) * 100 : 0;
  const width = `${proportion}%`;
  const inside = proportion >= 12;
  return (
    <div className="flex items-center gap-3">
      <div className="w-[140px] shrink-0 flex items-center gap-2">
        <span className="text-[13px] truncate text-[var(--text)]">{stage.label}</span>
      </div>
      <div className="flex-1 h-9 rounded-full bg-[var(--muted)] relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full rounded-full bg-[var(--accent)]" style={{ width }} />
        {inside ? (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[13px] font-medium text-[var(--on-accent)] tabular-nums whitespace-nowrap">
            {stage.count.toLocaleString('en-US')}
          </span>
        ) : (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[13px] font-medium text-[var(--text)] tabular-nums whitespace-nowrap">
            {stage.count.toLocaleString('en-US')}
          </span>
        )}
      </div>
      <div className="w-[56px] shrink-0 text-right text-[13px] text-[var(--text-sec)] tabular-nums">
        {Math.round(proportion)}%
      </div>
    </div>
  );
}

function FunnelCard({ mode, pipeline }: { mode: SectionMode; pipeline: PipelineStage[] }) {
  if (mode === 'loading') {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5 space-y-4">
        <div className="h-4 w-36 rounded-full bg-[var(--muted)]" />
        <div className="h-3 w-48 rounded-full bg-[var(--muted)]" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-[140px] h-3 rounded-full bg-[var(--muted)]" />
            <div className="flex-1 h-9 rounded-full bg-[var(--muted)]" />
            <div className="w-[56px] h-3 rounded-full bg-[var(--muted)]" />
          </div>
        ))}
      </div>
    );
  }
  if (mode === 'error') {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
        <ErrorBlock />
      </div>
    );
  }
  if (pipeline.length === 0) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
        <h3 className="text-[15px] font-medium text-[var(--text)]">Request pipeline</h3>
        <p className="mt-0.5 text-[12px] text-[var(--text-sec)]">Where your requests have reached</p>
        <p className="mt-4 text-[13px] text-[var(--text-sec)]">No requests in this period.</p>
      </div>
    );
  }
  const first = pipeline[0].count;
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <h3 className="text-[15px] font-medium text-[var(--text)]">Request pipeline</h3>
      <p className="mt-0.5 text-[12px] text-[var(--text-sec)]">Where your requests have reached</p>
      <div className="mt-5 space-y-3">
        {pipeline.map((stage) => (
          <FunnelRow key={stage.label} stage={stage} first={first} />
        ))}
      </div>
    </div>
  );
}

export default function PipelineFunnel({
  mode,
  pipeline,
  approvalDays,
  refinementsPerDesign,
  reachingProduction,
}: {
  mode: SectionMode;
  pipeline: PipelineStage[];
  approvalDays: number;
  refinementsPerDesign: number;
  reachingProduction: number;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      <FunnelCard mode={mode} pipeline={pipeline} />
      <div className="flex flex-col gap-4">
        {mode === 'loading' ? (
          <>
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
          </>
        ) : mode === 'error' ? (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
            <ErrorBlock />
          </div>
        ) : (
          <>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
              <div className="w-10 h-10 rounded-[12px] bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
                <i className="ri-time-line text-[20px]" />
              </div>
              <div className="mt-3 text-[26px] font-semibold tabular-nums leading-none text-[var(--text)]">
                {approvalDays > 0 ? `${approvalDays} days` : '—'}
              </div>
              <div className="mt-1 text-[13px] text-[var(--text-sec)]">Average time to approval</div>
              <div className="mt-1 text-[12px] text-[var(--text-sec)]">
                From sharing a design to the customer deciding.
              </div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
              <div className="w-10 h-10 rounded-[12px] bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
                <i className="ri-refresh-line text-[20px]" />
              </div>
              <div className="mt-3 text-[26px] font-semibold tabular-nums leading-none text-[var(--text)]">
                {refinementsPerDesign > 0 ? refinementsPerDesign.toFixed(1) : '—'}
              </div>
              <div className="mt-1 text-[13px] text-[var(--text-sec)]">Average refinements per design</div>
              <div className="mt-1 text-[12px] text-[var(--text-sec)]">
                How often a design goes back for changes.
              </div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
              <div className="w-10 h-10 rounded-[12px] bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
                <i className="ri-tools-line text-[20px]" />
              </div>
              <div className="mt-3 text-[26px] font-semibold tabular-nums leading-none text-[var(--text)]">
                {reachingProduction > 0 ? `${reachingProduction}%` : '—'}
              </div>
              <div className="mt-1 text-[13px] text-[var(--text-sec)]">Requests reaching production</div>
              <div className="mt-1 text-[12px] text-[var(--text-sec)]">
                Of every request you've started.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}