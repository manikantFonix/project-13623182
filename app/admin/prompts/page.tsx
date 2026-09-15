import { Suspense } from 'react';
import AdminShell from '../../../components/admin/AdminShell';
import PromptsOversight from '../../../components/admin/prompts/PromptsOversight';
import PromptsSkeleton from '../../../components/admin/prompts/PromptsSkeleton';

export default function AdminPromptsPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
            <div className="max-w-[1320px]">
              <PromptsSkeleton />
            </div>
          </main>
        }
      >
        <PromptsOversight />
      </Suspense>
    </AdminShell>
  );
}