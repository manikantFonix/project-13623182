import { Suspense } from 'react';
import AppShell from '../../components/AppShell';
import RequestsWorkspace from '../../components/requests/RequestsWorkspace';

export default function RequestsPage() {
  return (
    <AppShell>
      <Suspense
        fallback={<div className="min-h-screen bg-[var(--canvas)] pt-8 pb-16" />}
      >
        <RequestsWorkspace />
      </Suspense>
    </AppShell>
  );
}