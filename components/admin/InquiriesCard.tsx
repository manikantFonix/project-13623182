'use client';

import StackedBar from './StackedBar';
import type { ConsumerData } from './data';
import { fmt } from './data';

export default function InquiriesCard({ consumer }: { consumer: ConsumerData }) {
  const total = consumer.catalogInquiries + consumer.widgetInquiries;
  const catalogShare = total > 0 ? (consumer.catalogInquiries / total) * 100 : 0;
  const widgetShare = total > 0 ? (consumer.widgetInquiries / total) * 100 : 0;

  return (
    <div className="h-full rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col">
      <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">
        Inquiries raised
      </p>
      <p className="mt-3 text-[28px] font-semibold tabular-nums leading-none tracking-[-0.02em] text-[var(--text)]">
        {fmt(total)}
      </p>

      <div className="mt-4">
        <StackedBar
          segments={[
            { label: 'Catalog inquiries', value: consumer.catalogInquiries, tone: 'strong' },
            { label: 'Widget inquiries', value: consumer.widgetInquiries, tone: 'soft' },
          ]}
        />
      </div>

      <dl className="mt-3.5 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-[13px] text-[var(--text-sec)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            From catalogs
          </dt>
          <dd className="m-0 text-[13px] tabular-nums text-[var(--text)]">
            {fmt(consumer.catalogInquiries)} · {catalogShare.toFixed(0)}%
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-[13px] text-[var(--text-sec)]">
            <span className="h-2 w-2 rounded-full bg-[var(--muted-text)]" aria-hidden="true" />
            From widgets
          </dt>
          <dd className="m-0 text-[13px] tabular-nums text-[var(--text)]">
            {fmt(consumer.widgetInquiries)} · {widgetShare.toFixed(0)}%
          </dd>
        </div>
      </dl>

      <p className="mt-auto pt-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
        Split by where the visitor was standing.
      </p>
    </div>
  );
}