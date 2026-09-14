import { notFound } from 'next/navigation';
import AppShell from '../../../../components/AppShell';
import CatalogSettings from '../../../../components/CatalogSettings';
import { CATALOG_IDS } from '@/lib/catalogs';

export function generateStaticParams() {
  return CATALOG_IDS.map((id) => ({ id }));
}

export const dynamicParams = false;

export default async function SettingsPage({
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
      <CatalogSettings />
    </AppShell>
  );
}