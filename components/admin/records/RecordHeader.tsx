'use client';

import RecordStatusPill from './RecordStatusPill';
import RecordsAccessNotice from './RecordsAccessNotice';
import { fmtDate, type RecordConfig, type RecordEntry } from './data';
import { focusRing } from '../tokens';

export default function RecordHeader({
  record,
  config,
  onBack,
}: {
  record: RecordEntry;
  config: RecordConfig;
  onBack: () => void;
}) {
  const isManufacturer = record.kind === 'manufacturers';

  return (
    <header className="max-w-[1280px]">
      <button
        type="button"
        onClick={onBack}
        className={`inline-flex items-center gap-1.5 rounded-sm text-[12px] font-medium text-[var(--text-sec)] transition-colors duration-150 hover:text-[var(--text)] ${focusRing}`}
      >
        <span className="w-4 h-4 flex items-center justify-center">
          <i className="ri-arrow-left-s-line text-[16px]" aria-hidden="true" />
        </span>
        All {config.countNoun}
      </button>

      <div className="mt-3 max-w-[760px]">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
            {record.name}
          </h1>
          {isManufacturer && (
            <RecordStatusPill tone={record.active ? 'success' : 'neutral'}>
              {record.active ? 'Active' : 'Inactive'}
            </RecordStatusPill>
          )}
        </div>
        <p className="mt-1 text-[13px] text-[var(--text-sec)]">
          Owned by <span className="font-medium text-[var(--text)]">{record.retailer}</span>
        </p>
        <p className="mt-2 text-[12px] tabular-nums text-[var(--muted-text)]">
          Created {fmtDate(record.created)}
        </p>
        <RecordsAccessNotice />
      </div>
    </header>
  );
}