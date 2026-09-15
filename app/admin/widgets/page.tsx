import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import WidgetsOversight from '../../../components/admin/widgets/WidgetsOversight';
import WidgetsSkeleton from '../../../components/admin/widgets/WidgetsSkeleton';

export default function AdminWidgetsPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <div className="max-w-[1280px]">
              <WidgetsSkeleton />
            </div>
          </main>
        }
      >
        <WidgetsOversight />
      </Suspense>
    </AdminShell>
  );
}