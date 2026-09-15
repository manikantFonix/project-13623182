'use client';

import LeadFigure from './LeadFigure';
import { fmt } from '../data';
import type { LeadsTotals } from './data';

export default function LeadsSummary({ totals }: { totals: LeadsTotals }) {
  return (
    <section aria-label="Platform totals" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <LeadFigure
        label="Received"
        value={fmt(totals.received)}
        caption="raised on the platform this window"
      />
      <LeadFigure
        label="Decided"
        value={fmt(totals.decided)}
        caption="the retailer has recorded an outcome"
      />
      <LeadFigure
        label="Accepted"
        value={fmt(totals.accepted)}
        caption="the retailer said yes to the piece"
      />
      <LeadFigure
        label="Not decided yet"
        value={fmt(totals.undecided)}
        caption="open — no decision recorded"
      />
    </section>
  );
}