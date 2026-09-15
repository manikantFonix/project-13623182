'use client';

import type { ReactNode } from 'react';
import RetailerSection from './RetailerSection';
import RetailerStatusPill from './RetailerStatusPill';
import type { WidgetInfo } from './data';

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="text-[12px] text-[var(--text-sec)] whitespace-nowrap">{label}</dt>
      <dd className="m-0 text-right text-[13px] font-medium text-[var(--text)]">{children}</dd>
    </div>
  );
}

export default function WidgetSection({ widget }: { widget: WidgetInfo | null }) {
  if (!widget) {
    return (
      <RetailerSection title="Widget installation" description="The widget on their own website.">
        <p className="text-[13px] leading-relaxed text-[var(--text-sec)]">
          No widget installed. Nothing loads on their site yet.
        </p>
      </RetailerSection>
    );
  }

  return (
    <RetailerSection title="Widget installation" description="The widget on their own website.">
      <dl className="divide-y divide-[var(--muted)] border-t border-[var(--muted)]">
        <Row label="Origin">
          <span className="break-all">{widget.origin}</span>
        </Row>
        <Row label="Install">
          <RetailerStatusPill tone={widget.installTone}>{widget.install}</RetailerStatusPill>
        </Row>
        <Row label="Theme">
          <RetailerStatusPill tone={widget.themeTone}>{widget.theme}</RetailerStatusPill>
        </Row>
        <Row label="Last seen">{widget.lastSeen}</Row>
      </dl>
    </RetailerSection>
  );
}