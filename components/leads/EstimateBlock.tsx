'use client';

import type { ReactNode } from 'react';
import { METAL_LIST } from '../../lib/metals';
import type { Lead } from './data';

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--text-sec)]">
      {children}
    </p>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[13px] text-[var(--text-sec)]">{label}</span>
      <span className="inline-flex items-center gap-2 text-[13px] text-[var(--text)] tabular-nums text-right">
        {children}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="my-3 h-px bg-[var(--border)]" />;
}

export default function EstimateBlock({ lead }: { lead: Lead }) {
  if (!lead.estimate) return null;
  const e = lead.estimate;
  const metal = METAL_LIST.find((m) => m.id === (lead.metal ?? 'yellow'));

  return (
    <div className="mt-4 bg-[var(--muted)] border border-[var(--border)] rounded-[12px] p-4">
      <p className="text-[13px] font-medium text-[var(--text-sec)]">Their estimate</p>

      <div className="mt-3">
        <SectionLabel>What they asked for</SectionLabel>
        <div className="mt-2 space-y-2">
          <Row label="Metal">
            <span
              className="w-4 h-4 rounded-full shrink-0"
              style={{ backgroundColor: metal?.hex }}
            />
            {metal?.name ?? '—'}
          </Row>
          {e.size && <Row label="Size">{e.size}</Row>}
          <Row label="Stone">{e.stone}</Row>
          <Row label="Their budget">${e.budget.toLocaleString('en-US')}</Row>
        </div>
      </div>

      <Divider />

      <div>
        <SectionLabel>How long it takes</SectionLabel>
        <div className="mt-2">
          <Row label="Bench time">
            {e.benchDays} days · {e.benchLevel}
          </Row>
        </div>
      </div>

      <Divider />

      <div>
        <SectionLabel>The cost</SectionLabel>
        <div className="mt-2 space-y-2">
          <Row label="Metal">{e.metal}</Row>
          <Row label="Stones">{e.stones}</Row>
          <Row label="Labor">{e.labor}</Row>
        </div>
      </div>

      <Divider />

      <div className="flex items-end justify-between">
        <p className="text-[12px] text-[var(--text-sec)]">Estimated total</p>
        <p className="text-[20px] font-semibold text-[var(--text)] tabular-nums">
          ${e.low.toLocaleString('en-US')} – ${e.high.toLocaleString('en-US')}
        </p>
      </div>
      <p className="mt-1 text-[12px] text-[var(--text-sec)]">
        An estimate the customer saw. Not a quote.
      </p>
    </div>
  );
}