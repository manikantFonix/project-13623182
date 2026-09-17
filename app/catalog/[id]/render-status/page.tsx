import { use, Suspense } from 'react';
import AppShell from '@/components/AppShell';
import RenderStatusRoute from '@/components/render-status/RenderStatusRoute';
import { CATALOG_IDS } from '@/lib/catalogs';

export function generateStaticParams() {
  return CATALOG_IDS.map((id) => ({ id }));
}

export default function RenderStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AppShell>
      <Suspense
        fallback={<div className="min-h-screen bg-[var(--canvas)] pt-8 pb-16" />}
      >
        <RenderStatusRoute catalogId={id} />
      </Suspense>
    </AppShell>
  );
}