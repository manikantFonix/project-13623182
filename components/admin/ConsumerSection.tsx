'use client';

import StatTile from './StatTile';
import InquiriesCard from './InquiriesCard';
import type { ConsumerData } from './data';
import { fmt } from './data';

export default function ConsumerSection({ consumer }: { consumer: ConsumerData }) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <StatTile
        label="Visitors"
        value={fmt(consumer.visitors)}
        caption="Deduplicated once per session."
      />
      <InquiriesCard consumer={consumer} />
      <StatTile
        label="Estimates produced"
        value={fmt(consumer.estimates)}
        caption="Price ranges shown to visitors."
      />
    </div>
  );
}