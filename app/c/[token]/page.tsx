import { use, Suspense } from 'react';
import ConsumerCatalogRoute from '../../../components/consumer-catalog/ConsumerCatalogRoute';

export function generateStaticParams() {
  return [
    { token: 'bridal-2026' },
    { token: 'preview-catalog' },
    { token: 'closed-catalog' },
  ];
}

export const dynamicParams = false;

export default function ConsumerCatalogPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ConsumerCatalogRoute token={token} />
    </Suspense>
  );
}