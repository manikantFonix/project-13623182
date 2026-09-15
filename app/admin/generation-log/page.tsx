import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import GenerationLog from '../../../components/admin/generation/GenerationLog';
import GenerationSkeleton from '../../../components/admin/generation/GenerationSkeleton';

export default function AdminGenerationLogPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <div className="max-w-[1280px]">
              <GenerationSkeleton />
            </div>
          </main>
        }
      >
        <GenerationLog />
      </Suspense>
    </AdminShell>
  );
}