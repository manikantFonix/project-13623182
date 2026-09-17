import type { Metadata } from 'next';
import { use } from 'react';
import QuoteFormRoute from '../../../../components/quote/QuoteFormRoute';

export const metadata: Metadata = {
  title: 'Quote',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ token: 'preview-quote' }];
}

export const dynamicParams = false;

export default function QuoteSubmitPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  return <QuoteFormRoute basePath={`/quote/${token}`} />;
}