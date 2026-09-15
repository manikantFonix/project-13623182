import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import EstimateRecompute from '../../../components/admin/estimates/EstimateRecompute';
import EstimateSkeleton from '../../../components/admin/estimates/EstimateSkeleton';

export default function AdminEstimateRecomputePage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <div className="max-w-[1280px]">
              <EstimateSkeleton />
            </div>
          </main>
        }
      >
        <EstimateRecompute />
      </Suspense>
    </AdminShell>
  );
}