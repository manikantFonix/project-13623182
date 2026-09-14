import { Suspense } from 'react';
import ConsumerSentRoute from '../../../../../components/consumer-catalog/ConsumerSentRoute';

export function generateStaticParams() {
  return [
    { token: 'bridal-2026' },
    { token: 'preview-catalog' },
    { token: 'closed-catalog' },
  ];
}

export const dynamicParams = false;

export default async function ConsumerRequestSentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ConsumerSentRoute token={token} />
    </Suspense>
  );
}