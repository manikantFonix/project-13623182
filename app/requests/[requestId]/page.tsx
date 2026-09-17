import { use, Suspense } from 'react';
import { notFound } from 'next/navigation';
import AppShell from '../../../components/AppShell';
import RequestsWorkspace from '../../../components/requests/RequestsWorkspace';

const KNOWN_IDS = [
  'new-request',
  'r1',
  'r2',
  'r3',
  'r4',
  'r5',
  'r6',
  'r7',
  'r8',
  'r9',
  'r10',
  'r11',
  'r12',
];

export function generateStaticParams() {
  return KNOWN_IDS.map((requestId) => ({ requestId }));
}

export const dynamicParams = false;

export default function RequestDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = use(params);
  if (!KNOWN_IDS.includes(requestId)) {
    notFound();
  }
  return (
    <AppShell>
      <Suspense
        fallback={<div className="min-h-screen bg-[var(--canvas)] pt-8 pb-16" />}
      >
        <RequestsWorkspace selectedId={requestId} />
      </Suspense>
    </AppShell>
  );
}