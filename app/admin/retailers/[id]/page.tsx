import { use, Suspense } from 'react';
import AdminShell from '../../../../components/admin/AdminShell';
import RetailerDetail from '../../../../components/admin/retailers/RetailerDetail';
import RetailerDetailSkeleton from '../../../../components/admin/retailers/RetailerDetailSkeleton';

export async function generateStaticParams() {
  return [
    { id: 'aurora' },
    { id: 'lune' },
    { id: 'marchetti' },
    { id: 'ashford' },
    { id: 'ravensworth' },
    { id: 'ortega' },
    { id: 'bright' },
    { id: 'corderie' },
    { id: 'saintclair' },
    { id: 'pearl' },
    { id: 'verity' },
    { id: 'hallam' },
  ];
}

export default function RetailerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <RetailerDetailSkeleton />
          </main>
        }
      >
        <RetailerDetail retailerId={resolvedParams.id} />
      </Suspense>
    </AdminShell>
  );
}