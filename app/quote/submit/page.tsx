import type { Metadata } from 'next';
import QuoteFormRoute from '../../../components/quote/QuoteFormRoute';

export const metadata: Metadata = {
  title: 'Quote',
  robots: { index: false, follow: false },
};

export default function QuoteFormPreviewPage() {
  return <QuoteFormRoute basePath="/quote" />;
}