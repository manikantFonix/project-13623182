'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { varsFor } from '../settings/theme/tokens';
import { resolveQuote, isQuoteState, type QuoteState } from './data';
import QuoteHeader from './QuoteHeader';
import JobSummaryCard from './JobSummaryCard';
import QuoteDesignCard from './QuoteDesignCard';
import MaterialsCard from './MaterialsCard';
import SizeCard from './SizeCard';
import QuoteProgressCard from './QuoteProgressCard';
import BeforeYouQuote from './BeforeYouQuote';
import JobActions from './JobActions';
import QuoteSummaryCard from './QuoteSummaryCard';
import PassedCard from './PassedCard';
import QuoteCancelledState from './QuoteCancelledState';
import QuoteLoadingState from './QuoteLoadingState';
import QuoteInvalidState from './QuoteInvalidState';
import QuoteStateControl from './QuoteStateControl';

export default function QuoteJobRoute({ basePath }: { basePath: string }) {
  const search = useSearchParams();
  const raw = search.get('state');
  const state: QuoteState = isQuoteState(raw) && raw !== 'form' ? raw : 'job';
  const view = resolveQuote(state);

  if (state === 'invalid') {
    return (
      <div className="min-h-screen bg-[#EDF1FA]">
        <QuoteInvalidState />
        <QuoteStateControl value={state} jobPath={basePath} />
      </div>
    );
  }

  const style = {
    ...varsFor(false),
    ['--brand']: view.brand.primaryColor,
  } as CSSProperties;

  let footer: ReactNode = null;
  if (state === 'job') {
    footer = <JobActions jobPath={basePath} />;
  } else if (state === 'submitted' || state === 'accepted' || state === 'not-taken-forward') {
    footer = <QuoteSummaryCard view={view} state={state} />;
  } else if (state === 'passed') {
    footer = <PassedCard view={view} />;
  }

  return (
    <div className="min-h-screen bg-[#EDF1FA]" style={style}>
      <QuoteHeader brand={view.brand} page="Request" />

      {state === 'cancelled' ? (
        <QuoteCancelledState />
      ) : state === 'loading' ? (
        <QuoteLoadingState />
      ) : (
        <main className="max-w-[880px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-4">
          <JobSummaryCard view={view} />
          <QuoteDesignCard view={view} />
          <div className="grid gap-4 md:grid-cols-2">
            <MaterialsCard view={view} />
            <SizeCard view={view} />
          </div>
          <QuoteProgressCard state={state} />
          <BeforeYouQuote />
          {footer}
        </main>
      )}

      <QuoteStateControl value={state} jobPath={basePath} />
    </div>
  );
}