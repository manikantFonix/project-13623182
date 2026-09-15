import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import PlansOversight from '../../../components/admin/plans/PlansOversight';
import PlansSkeleton from '../../../components/admin/plans/PlansSkeleton';

export default function AdminPlansPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <div className="max-w-[1280px]">
              <PlansSkeleton />
            </div>
          </main>
        }
      >
        <PlansOversight />
      </Suspense>
    </AdminShell>
  );
}