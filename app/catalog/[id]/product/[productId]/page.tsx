import { notFound } from 'next/navigation';
import AppShell from '../../../../../components/AppShell';
import ProductDetail from '../../../../../components/ProductDetail';
import { CATALOG_IDS } from '@/lib/catalogs';

export function generateStaticParams() {
  return CATALOG_IDS.flatMap((id) =>
    Array.from({ length: 8 }, (_, i) => ({ id, productId: String(i + 1) }))
  );
}

export const dynamicParams = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { id, productId } = await params;
  if (!CATALOG_IDS.includes(id)) {
    notFound();
  }
  return (
    <AppShell>
      <ProductDetail productId={productId} />
    </AppShell>
  );
}