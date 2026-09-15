'use client';

import { useState } from 'react';
import SectionHeading from '../SectionHeading';
import IndicatorCard from './IndicatorCard';
import RankMarker from './RankMarker';
import BottlenecksSummary from './BottlenecksSummary';
import DerivedNote from './DerivedNote';
import BottlenecksErrorState from './BottlenecksErrorState';
import BottlenecksStateControl from './BottlenecksStateControl';
import { getBottleneckView, type BottlenecksState } from './data';

export default function BottlenecksScreen() {
  const [state, setState] = useState<BottlenecksState>('attention');
  const data = getBottleneckView(state);

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <div className="max-w-[1120px]">
        <header>
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-[var(--text)]">
            Bottlenecks
          </h1>
          <p className="mt-2 max-w-[760px] text-[13px] leading-relaxed text-[var(--text-sec)]">
            The dashboard reports aggregates. This screen names the retailer behind each problem.
          </p>
          <p className="mt-2.5 text-[12px] tabular-nums text-[var(--muted-text)]">
            Derived on this request from live account state · read-only · no period
          </p>
        </header>

        <div className="mt-7">
          {state === 'error' ? (
            <BottlenecksErrorState onRetry={() => setState('attention')} />
          ) : (
            <>
              <BottlenecksSummary aboveCount={data.aboveCount} total={data.total} />

              <section aria-label="Indicators" className="mt-10">
                <SectionHeading
                  title="Indicators"
                  purpose="Ordered by how soon each needs someone."
                  period={`${data.aboveCount} of ${data.total} above threshold`}
                />

                <ol className="flex flex-col gap-3">
                  {data.indicators.map((indicator, index) => (
                    <li key={indicator.id} className="flex items-start gap-3">
                      <RankMarker position={index + 1} />
                      <div className="flex-1 min-w-0">
                        <IndicatorCard indicator={indicator} />
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <div className="mt-10">
                <DerivedNote />
              </div>
            </>
          )}
        </div>
      </div>

      <BottlenecksStateControl state={state} onChange={setState} />
    </main>
  );
}