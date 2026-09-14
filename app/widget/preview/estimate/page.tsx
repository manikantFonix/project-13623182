import { Suspense } from 'react';
import WidgetPreviewRoute from '../../../../components/widget-preview/WidgetPreviewRoute';

export default function WidgetEstimatePreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F1F3F9]" />}>
      <WidgetPreviewRoute screen="estimate" />
    </Suspense>
  );
}