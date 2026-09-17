'use client';

import MetricColumn from './MetricColumn';
import type { MetricRow } from './data';

export default function ActivitySection({
  phase1,
  phase2,
  period,
}: {
  phase1: MetricRow[];
  phase2: MetricRow[];
  period: string;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <MetricColumn
        title="Bespoke design"
        subtitle="A piece designed from a description and quoted one at a time."
        rows={phase1}
        period={period}
        tone="strong"
      />
      <MetricColumn
        title="Catalogs"
        subtitle="A retailer's existing stock ingested and published for browsing."
        rows={phase2}
        period={period}
        tone="soft"
      />
    </div>
  );
}