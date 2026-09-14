'use client';

import type { CSSProperties } from 'react';
import { varsFor } from '../settings/theme/tokens';
import { resolveQuote } from './data';
import QuoteHeader from './QuoteHeader';
import QuoteForm from './QuoteForm';
import QuoteStateControl from './QuoteStateControl';

export default function QuoteFormRoute({ basePath }: { basePath: string }) {
  const view = resolveQuote('job');

  const style = {
    ...varsFor(false),
    ['--brand']: view.brand.primaryColor,
  } as CSSProperties;

  return (
    <div className="min-h-screen bg-[#EDF1FA]" style={style}>
      <QuoteHeader brand={view.brand} page="Quote" />
      <main className="max-w-[720px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <QuoteForm view={view} jobPath={basePath} />
      </main>
      <QuoteStateControl value="form" jobPath={basePath} />
    </div>
  );
}