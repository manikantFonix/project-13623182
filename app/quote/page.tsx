import type { Metadata } from 'next';
import { Suspense } from 'react';
import QuoteJobRoute from '../../components/quote/QuoteJobRoute';

export const metadata: Metadata = {
  title: 'Request',
  robots: { index: false, follow: false },
};

export default function QuotePreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <QuoteJobRoute basePath="/quote" />
    </Suspense>
  );
}