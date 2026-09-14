'use client';

import { useState, type CSSProperties } from 'react';
import { varsFor } from '../settings/theme/tokens';
import { resolveApproval, type ApprovalScenario } from './data';
import ApprovalHeader from './ApprovalHeader';
import ApprovalSummary from './ApprovalSummary';
import DesignCard from './DesignCard';
import DetailsCard from './DetailsCard';
import ProgressCard from './ProgressCard';
import DecisionCard from './DecisionCard';
import ContactCard from './ContactCard';
import CancelledState from './CancelledState';
import ExpiredState from './ExpiredState';
import LoadingState from './LoadingState';
import ApprovalPreviewControl from './ApprovalPreviewControl';

export default function ApprovalRoute({ token }: { token: string }) {
  const [scenario, setScenario] = useState<ApprovalScenario>('awaiting');
  const view = resolveApproval(token, scenario);

  if (scenario === 'expired' || !view) {
    return (
      <div className="min-h-screen bg-[#EDF1FA]" style={varsFor(false)}>
        <ExpiredState />
        <ApprovalPreviewControl value={scenario} onChange={setScenario} />
      </div>
    );
  }

  const brand = view.brand;
  const hasContact = Boolean(brand.phone || brand.email);
  const showDecision = scenario === 'awaiting' || scenario === 'newer';

  return (
    <div
      className="min-h-screen bg-[#EDF1FA]"
      style={{ ...varsFor(false), ['--brand']: brand.primaryColor } as CSSProperties}
    >
      <ApprovalHeader brand={brand} />

      {scenario === 'cancelled' ? (
        <CancelledState brand={brand} />
      ) : scenario === 'loading' ? (
        <LoadingState />
      ) : (
        <main className="max-w-[720px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-4">
          <ApprovalSummary view={view} />
          <DesignCard view={view} />
          <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
            <DetailsCard view={view} />
            <ProgressCard view={view} />
          </div>
          {showDecision && (
            <DecisionCard
              onDecision={(outcome) => setScenario(outcome === 'approved' ? 'approved' : 'changes')}
            />
          )}
          {hasContact && <ContactCard brand={brand} />}
        </main>
      )}

      <ApprovalPreviewControl value={scenario} onChange={setScenario} />
    </div>
  );
}