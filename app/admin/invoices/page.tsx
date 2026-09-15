import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import InvoicesOversight from '../../../components/admin/invoices/InvoicesOversight';
import InvoicesSkeleton from '../../../components/admin/invoices/InvoicesSkeleton';

export default function AdminInvoicesPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <div className="max-w-[1280px]">
              <InvoicesSkeleton />
            </div>
          </main>
        }
      >
        <InvoicesOversight />
      </Suspense>
    </AdminShell>
  );
}