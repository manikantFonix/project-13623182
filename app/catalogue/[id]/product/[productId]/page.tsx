import Sidebar from '../../../../../components/Sidebar';
import ProductDetail from '../../../../../components/ProductDetail';

export function generateStaticParams() {
  return [
    { id: 'bridal-2026', productId: '1' },
    { id: 'bridal-2026', productId: '2' },
    { id: 'bridal-2026', productId: '3' },
    { id: 'bridal-2026', productId: '4' },
    { id: 'bridal-2026', productId: '5' },
    { id: 'bridal-2026', productId: '6' },
    { id: 'bridal-2026', productId: '7' },
    { id: 'bridal-2026', productId: '8' },
  ];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { productId } = await params;

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-[116px]">
        <ProductDetail productId={productId} />
      </div>
    </div>
  );
}