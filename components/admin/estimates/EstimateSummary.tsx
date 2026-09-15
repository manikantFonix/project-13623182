'use client';

import EstimateFigure from './EstimateFigure';
import { ESTIMATES, PERIOD_LABEL, RECOMPUTES_TODAY, TOTAL_IN_PERIOD } from './data';

export default function EstimateSummary() {
  return (
    <section aria-label="What is here" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <EstimateFigure
        label="Estimates in the period"
        value={TOTAL_IN_PERIOD.toLocaleString('en-US')}
        caption={`${PERIOD_LABEL}, across every retailer`}
      />
      <EstimateFigure
        label="Listed below"
        value={String(ESTIMATES.length)}
        caption="the most recent, newest first"
      />
      <EstimateFigure
        label="Recomputes run today"
        value={String(RECOMPUTES_TODAY)}
        caption="each an audit; none wrote anything"
      />
    </section>
  );
}