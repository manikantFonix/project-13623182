import { use, Suspense } from 'react';
import ConsumerRequestRoute from '../../../../components/consumer-catalog/ConsumerRequestRoute';

export function generateStaticParams() {
  return [
    { token: 'bridal-2026' },
    { token: 'preview-catalog' },
    { token: 'closed-catalog' },
  ];
}

export const dynamicParams = false;

export default function ConsumerRequestPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ConsumerRequestRoute token={token} />
    </Suspense>
  );
}