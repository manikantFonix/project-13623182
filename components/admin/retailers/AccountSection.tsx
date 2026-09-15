'use client';

import type { ReactNode } from 'react';
import RetailerSection from './RetailerSection';
import RetailerStatusPill from './RetailerStatusPill';
import { statusLabels, statusTone, type Retailer } from './data';

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="text-[12px] text-[var(--text-sec)] whitespace-nowrap">{label}</dt>
      <dd className="m-0 text-right text-[13px] font-medium text-[var(--text)]">{children}</dd>
    </div>
  );
}

export default function AccountSection({ retailer }: { retailer: Retailer }) {
  return (
    <RetailerSection title="Account" description="Who they are and where they signed up.">
      <dl className="divide-y divide-[var(--muted)] border-t border-[var(--muted)]">
        <Row label="Business name">{retailer.name}</Row>
        <Row label="Email">
          <span className="break-all">{retailer.email}</span>
        </Row>
        <Row label="Status">
          <RetailerStatusPill tone={statusTone[retailer.status]}>
            {statusLabels[retailer.status]}
          </RetailerStatusPill>
        </Row>
        <Row label="Signed up">{retailer.signedUp}</Row>
        <Row label="Last activity">{retailer.lastActivity}</Row>
        <Row label="Created by">
          <span className="break-all">{retailer.createdBy}</span>
        </Row>
      </dl>
    </RetailerSection>
  );
}