'use client';

import type { ReactNode } from 'react';
import RecordSection from './RecordSection';
import RecordStatusPill from './RecordStatusPill';
import { fmtDate, type RecordEntry } from './data';

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 py-2.5">
      <dt className="text-[12px] text-[var(--text-sec)] whitespace-nowrap">{label}</dt>
      <dd className="m-0 text-right text-[13px] font-medium text-[var(--text)] min-w-0">{children}</dd>
    </div>
  );
}

export default function RecordFacts({ record }: { record: RecordEntry }) {
  const isManufacturer = record.kind === 'manufacturers';

  return (
    <RecordSection
      title="Details"
      description="What the retailer entered."
    >
      <dl className="divide-y divide-[var(--muted)] border-t border-[var(--muted)]">
        <Row label="Name">
          <span className="break-words">{record.name}</span>
        </Row>
        {isManufacturer && record.contact && (
          <Row label="Contact name">
            <span className="break-words">{record.contact}</span>
          </Row>
        )}
        <Row label="Email">
          <span className="break-all select-all">{record.email}</span>
        </Row>
        <Row label="Phone">
          <span className="tabular-nums select-all">{record.phone}</span>
        </Row>
        {isManufacturer ? (
          <>
            {record.specialty && (
              <Row label="Specialty">
                <span className="break-words">{record.specialty}</span>
              </Row>
            )}
            {record.location && (
              <Row label="Location">
                <span className="break-words">{record.location}</span>
              </Row>
            )}
            <Row label="State">
              <RecordStatusPill tone={record.active ? 'success' : 'neutral'}>
                {record.active ? 'Active' : 'Inactive'}
              </RecordStatusPill>
            </Row>
          </>
        ) : (
          record.address && (
            <Row label="Address">
              <span className="break-words select-all">{record.address}</span>
            </Row>
          )
        )}
        <Row label="Created">{fmtDate(record.created)}</Row>
      </dl>
    </RecordSection>
  );
}