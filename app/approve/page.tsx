import type { Metadata } from 'next';
import { Suspense } from 'react';
import ApprovalRoute from '../../components/approval/ApprovalRoute';

export const metadata: Metadata = {
  title: 'Design approval',
  robots: { index: false, follow: false },
};

export default function ApprovalPreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ApprovalRoute token="preview-approval" />
    </Suspense>
  );
}