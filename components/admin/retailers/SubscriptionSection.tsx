'use client';

import type { ReactNode } from 'react';
import RetailerSection from './RetailerSection';
import { fmt } from '../data';
import type { SubscriptionInfo } from './data';

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="text-[12px] text-[var(--text-sec)] whitespace-nowrap">{label}</dt>
      <dd className="m-0 text-right text-[13px] font-medium text-[var(--text)]">{children}</dd>
    </div>
  );
}

export default function SubscriptionSection({ subscription }: { subscription: SubscriptionInfo | null }) {
  if (!subscription) {
    return (
      <RetailerSection title="Subscription" description="The plan this account is on.">
        <p className="text-[13px] leading-relaxed text-[var(--text-sec)]">
          Free Trial. No billing period, allowance or consumption yet.
        </p>
      </RetailerSection>
    );
  }

  return (
    <RetailerSection title="Subscription" description="The plan this account is on.">
      <dl className="divide-y divide-[var(--muted)] border-t border-[var(--muted)]">
        <Row label="Plan">{subscription.planLabel}</Row>
        <Row label="Price">
          <span className="tabular-nums">{subscription.price}</span> {subscription.period}
        </Row>
        <Row label="Included allowance">
          <span className="tabular-nums">{fmt(subscription.allowance)}</span> renders
        </Row>
        <Row label="Next billing date">{subscription.nextBilling}</Row>
        <Row label="Renews">{subscription.renewal}</Row>
      </dl>
    </RetailerSection>
  );
}