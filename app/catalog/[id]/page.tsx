import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import AppShell from '../../../components/AppShell';
import CatalogWorkspace from '../../../components/CatalogWorkspace';
import { CATALOG_IDS } from '../../../lib/catalogs';

export function generateStaticParams() {
  return CATALOG_IDS.map((id) => ({ id }));
}

export const dynamicParams = false;

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!CATALOG_IDS.includes(id)) {
    notFound();
  }
  return (
    <AppShell>
      <Suspense fallback={<div className="min-h-screen pt-8 pb-16" />}>
        <CatalogWorkspace id={id} />
      </Suspense>
    </AppShell>
  );
}