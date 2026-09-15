import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import ProvidersOversight from '../../../components/admin/providers/ProvidersOversight';
import ProvidersSkeleton from '../../../components/admin/providers/ProvidersSkeleton';

export default function AdminProvidersPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <div className="max-w-[1280px]">
              <ProvidersSkeleton />
            </div>
          </main>
        }
      >
        <ProvidersOversight />
      </Suspense>
    </AdminShell>
  );
}