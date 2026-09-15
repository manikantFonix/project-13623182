import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import RecordsOversight from '../../../components/admin/records/RecordsOversight';
import RecordsSkeleton from '../../../components/admin/records/RecordsSkeleton';

export default function AdminCustomersPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <RecordsSkeleton />
          </main>
        }
      >
        <RecordsOversight kind="customers" />
      </Suspense>
    </AdminShell>
  );
}