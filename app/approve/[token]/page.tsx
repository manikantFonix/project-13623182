import type { Metadata } from 'next';
import { Suspense } from 'react';
import ApprovalRoute from '../../../components/approval/ApprovalRoute';

export const metadata: Metadata = {
  title: 'Design approval',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ token: 'preview-approval' }];
}

export const dynamicParams = false;

export default async function ApprovalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ApprovalRoute token={token} />
    </Suspense>
  );
}