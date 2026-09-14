import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SelectionProvider } from '../../components/consumer-catalog/SelectionProvider';
import ConsumerCatalogRoute from '../../components/consumer-catalog/ConsumerCatalogRoute';

export const metadata: Metadata = {
  title: 'Customer catalogue',
  robots: { index: false, follow: false },
};

const PREVIEW_TOKEN = 'bridal-2026';

export default function CataloguePreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <SelectionProvider token={PREVIEW_TOKEN}>
        <ConsumerCatalogRoute token={PREVIEW_TOKEN} />
      </SelectionProvider>
    </Suspense>
  );
}