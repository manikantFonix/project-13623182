'use client';

import RecordsAccessNotice from './RecordsAccessNotice';
import { type RecordConfig, type RecordEntry } from './data';
import { focusRing } from '../tokens';

export default function RecordHeader({
  record,
  config,
  onBack,
  onToggle,
}: {
  record: RecordEntry;
  config: RecordConfig;
  onBack: () => void;
  onToggle: () => void;
}) {
  const isActive = record.active ?? true;

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

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-[760px]">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
            {record.name}
          </h1>
          <p className="mt-1 text-[13px] text-[var(--text-sec)]">
            Owned by <span className="font-medium text-[var(--text)]">{record.retailer}</span>
          </p>
          <RecordsAccessNotice />
        </div>

        {config.hasActive && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={isActive ? 'Set to inactive' : 'Set to active'}
            className={`h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 ${focusRing} ${
              isActive
                ? 'border border-[var(--success)] bg-[var(--surface)] text-[var(--success)] hover:bg-[var(--success-bg)]'
                : 'border border-[var(--alert)] bg-[var(--surface)] text-[var(--alert)] hover:bg-[var(--alert)]/10'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </button>
        )}
      </div>
    </header>
  );
}