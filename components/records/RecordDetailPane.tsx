'use client';

import {
  CUSTOMER_FOCUS_RING,
  initials,
  type KindConfig,
  type RecordItem,
} from './data';
import RequestHistory from './RequestHistory';

interface Props {
  config: KindConfig;
  record: RecordItem;
  showExpand: boolean;
  onExpand: () => void;
  onBack: () => void;
  onEdit: () => void;
  onToggleActive: () => void;
  onDelete: () => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[12px] text-[var(--text-sec)]">{label}</p>
      <div className="mt-1 text-[13px] text-[var(--text)]">{children}</div>
    </div>
  );
}

export default function RecordDetailPane({
  config,
  record,
  showExpand,
  onExpand,
  onBack,
  onEdit,
  onToggleActive,
  onDelete,
}: Props) {
  const inactive = config.kind === 'manufacturer' && record.active === false;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-3">
        {showExpand && (
          <button
            type="button"
            onClick={onExpand}
            aria-label="Expand list"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--text)] hover:bg-[var(--muted)] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
          >
            <i className="ri-arrow-right-s-line text-[18px] w-5 h-5 flex items-center justify-center" />
          </button>
        )}
        <button
          type="button"
          onClick={onBack}
          className={`text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 lg:hidden ${CUSTOMER_FOCUS_RING}`}
        >
          Back to {config.title.toLowerCase()}
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <span className="w-14 h-14 rounded-full bg-[var(--muted)] text-[var(--text-sec)] flex items-center justify-center text-[18px] font-medium shrink-0">
            {initials(record.name)}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="text-[22px] font-semibold text-[var(--text)] truncate">
                {record.name}
              </h1>
              {inactive && (
                <span className="inline-flex h-6 items-center px-3 rounded-full bg-[var(--muted)] text-[var(--text-sec)] text-[12px] font-medium whitespace-nowrap">
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Edit
          </button>
          {config.kind === 'manufacturer' && (
            <button
              type="button"
              onClick={onToggleActive}
              className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
            >
              {inactive ? 'Activate' : 'Deactivate'}
            </button>
          )}
          <button
            type="button"
            onClick={onDelete}
            className={`text-[13px] font-medium text-[var(--alert)] hover:text-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-6 flex-1 min-h-0 overflow-y-auto pr-1">
        <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5 space-y-4">
          <Field label="Name">{record.name}</Field>
          <div>
            <Field label="Email">{record.email}</Field>
            <p className="mt-1 text-[12px] text-[var(--text-sec)]">{config.detailEmailNote}</p>
          </div>
          {config.kind === 'customer' && !!record.phone && (
            <Field label="Phone">{record.phone}</Field>
          )}
          {config.kind === 'customer' && !!record.address && (
            <Field label="Address">
              <div className="whitespace-pre-line">{record.address}</div>
            </Field>
          )}
          {config.kind === 'manufacturer' && !!record.contactName && (
            <Field label="Contact name">{record.contactName}</Field>
          )}
          {config.kind === 'manufacturer' && !!record.phone && (
            <Field label="Phone">{record.phone}</Field>
          )}
          {config.kind === 'manufacturer' && (
            <div>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex w-9 h-5 rounded-full p-0.5 items-center transition-colors duration-150 ${
                    inactive ? 'bg-[var(--border-strong)]' : 'bg-[var(--accent)]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-[var(--knob)] transition-transform duration-150 transform ${
                      inactive ? '' : 'translate-x-4'
                    }`}
                  />
                </span>
                <span className="text-[13px] font-medium text-[var(--text)]">
                  {inactive ? 'Inactive' : 'Active'}
                </span>
              </div>
              <p className="mt-2 text-[12px] text-[var(--text-sec)]">
                An inactive manufacturer isn't offered when you route a new request.
                Any request already with them is unaffected and they can still send a quote.
              </p>
            </div>
          )}
          {!!record.notes && (
            <div className="bg-[var(--muted)] border border-[var(--border)] rounded-[12px] p-3">
              <p className="text-[12px] text-[var(--text-sec)]">Your notes</p>
              <div className="mt-1 text-[13px] text-[var(--text)] whitespace-pre-line">
                {record.notes}
              </div>
              <p className="mt-1 text-[12px] text-[var(--text-sec)]">Only you can see these.</p>
            </div>
          )}
        </section>

        <div className="mt-4">
          <RequestHistory record={record} />
        </div>
      </div>
    </div>
  );
}