import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import EstimatorOversight from '../../../components/admin/estimator/EstimatorOversight';
import EstimatorSkeleton from '../../../components/admin/estimator/EstimatorSkeleton';

export default function AdminEstimatorPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <div className="max-w-[1100px]">
              <EstimatorSkeleton />
            </div>
          </main>
        }
      >
        <EstimatorOversight />
      </Suspense>
    </AdminShell>
  );
}