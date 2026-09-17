import type { Metadata } from 'next';
import { use, Suspense } from 'react';
import QuoteJobRoute from '../../../components/quote/QuoteJobRoute';

export const metadata: Metadata = {
  title: 'Request',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ token: 'preview-quote' }];
}

export const dynamicParams = false;

export default function QuoteJobPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <QuoteJobRoute basePath={`/quote/${token}`} />
    </Suspense>
  );
}