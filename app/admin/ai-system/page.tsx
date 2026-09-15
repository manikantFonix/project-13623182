import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import AiSystemOversight from '../../../components/admin/ai-system/AiSystemOversight';
import AiSystemSkeleton from '../../../components/admin/ai-system/AiSystemSkeleton';

export default function AdminAiSystemPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <div className="max-w-[980px]">
              <AiSystemSkeleton />
            </div>
          </main>
        }
      >
        <AiSystemOversight />
      </Suspense>
    </AdminShell>
  );
}