'use client';

import Link from 'next/link';
import {
  CUSTOMER_FOCUS_RING,
  initials,
  primaryEmail,
  type RecordItem,
} from './data';

interface Props {
  record: RecordItem;
  showExpand: boolean;
  onExpand: () => void;
  onBack: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

const toneCls: Record<string, string> = {
  violet: 'bg-[var(--violet-bg)] text-[var(--violet)]',
  green: 'bg-[var(--success-bg)] text-[var(--success)]',
  gray: 'bg-[var(--muted)] text-[var(--text-sec)]',
};

function ContactRow({ icon, label, value }: { icon: string; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 h-5 flex items-center justify-center text-[var(--text-sec)]">
        <i className={`${icon} text-[15px]`} />
      </span>
      <span className="w-[108px] shrink-0 text-[13px] text-[var(--text)]">{label}</span>
      <span className="min-w-0 flex-1 text-[13px] text-[var(--text)] truncate">
        {value ?? '—'}
      </span>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: string;
  label: string;
  value: string;
  tone: 'blue' | 'green' | 'amber' | 'violet';
}) {
  const iconCls: Record<string, string> = {
    blue: 'bg-[var(--canvas)] text-[var(--accent-text)]',
    green: 'bg-[var(--success-bg)] text-[var(--success)]',
    amber: 'bg-[var(--amber-bg)] text-[var(--alert)]',
    violet: 'bg-[var(--violet-bg)] text-[var(--violet)]',
  };
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-4 flex items-center gap-3">
      <span className={`w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 ${iconCls[tone]}`}>
        <i className={`${icon} text-[18px] w-5 h-5 flex items-center justify-center`} />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] text-[var(--text-sec)] truncate">{label}</p>
        <p className="mt-0.5 text-[18px] font-semibold text-[var(--text)] tabular-nums truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ManufacturerDetailPane({
  record,
  showExpand,
  onExpand,
  onBack,
  onEdit,
  onRemove,
}: Props) {
  const emails = record.emails ?? [
    { label: 'Work', email: primaryEmail(record) },
  ];
  const sent = record.sentRequests ?? [];
  const timeline = record.timeline ?? [];
  const statusTone = record.mfrStatus === 'available' ? 'bg-[var(--success-bg)] text-[var(--success)]' : 'bg-[var(--violet-bg)] text-[var(--violet)]';
  const statusLabel = record.mfrStatus === 'available' ? 'Active' : record.mfrStatus === 'delayed' ? 'Delayed' : 'Active';

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-3">
        {showExpand && (
          <button
            type="button"
            onClick={onExpand}
            aria-label="Expand list"
            className={`w-7 h-7 rounded-full flex items-center justify-center bg-[var(--canvas)] border border-[var(--border)] text-[var(--accent-text)] hover:bg-[var(--muted)] hover:border-[var(--border-strong)] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
          >
            <i className="ri-arrow-right-s-line text-[18px] w-5 h-5 flex items-center justify-center" />
          </button>
        )}
        <button
          type="button"
          onClick={onBack}
          className={`text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 lg:hidden ${CUSTOMER_FOCUS_RING}`}
        >
          Back to manufacturers
        </button>
      </div>

      <div className="mt-4 flex-1 min-h-0 overflow-y-auto pr-1">
        <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <span className="w-14 h-14 rounded-full bg-[var(--muted)] text-[var(--text-sec)] flex items-center justify-center text-[18px] font-medium shrink-0">
                {initials(record.name)}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-[22px] font-semibold text-[var(--text)] truncate">
                    {record.name}
                  </h1>
                  <span className={`inline-flex h-6 items-center px-3 rounded-full text-[12px] font-medium whitespace-nowrap ${statusTone}`}>
                    {statusLabel}
                  </span>
                  {record.specialty && (
                    <span className="inline-flex h-6 items-center px-3 rounded-full bg-[var(--amber-bg)] text-[var(--alert)] text-[12px] font-medium whitespace-nowrap">
                      {record.specialty}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onEdit}
                className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
              >
                <i className="ri-edit-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Edit Manufacturer
              </button>
              <button
                type="button"
                onClick={onRemove}
                className={`h-9 px-4 text-[13px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] rounded-full hover:text-[var(--on-accent)] hover:bg-[var(--alert-strong)] hover:border-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
              >
                <i className="ri-delete-bin-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Remove Manufacturer
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2.5 border-t border-[var(--border)] pt-5">
            <ContactRow icon="ri-map-pin-line" label={record.location ?? 'Location'} value={record.address} />
            <ContactRow icon="ri-phone-line" label="Phone" value={record.phone} />
            {emails.map((e) => (
              <ContactRow key={e.email} icon="ri-mail-line" label={e.label} value={e.email} />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-[12px] text-[var(--text-sec)]">
            <span className="flex items-center gap-1.5 tabular-nums">
              <i className="ri-time-line text-[14px] w-4 h-4 flex items-center justify-center" />
              Avg response time
              <span className="text-[var(--text)] font-medium">{record.avgResponse}</span>
            </span>
            {record.lastActivity && (
              <span className="flex items-center gap-1.5 tabular-nums">
                <i className="ri-time-line text-[14px] w-4 h-4 flex items-center justify-center" />
                Last activity {record.lastActivity}
              </span>
            )}
          </div>
        </section>

        <div className="mt-4 grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard icon="ri-file-list-3-line" label="Total Requests" value={(record.totalRequests ?? 0).toString()} tone="blue" />
          <StatCard icon="ri-check-double-line" label="Completed" value={(record.completed ?? 0).toString()} tone="green" />
          <StatCard icon="ri-money-dollar-circle-line" label="Total Value" value={record.totalValue ?? '$0'} tone="amber" />
          <StatCard icon="ri-time-line" label="Pending" value={(record.pending ?? 0).toString()} tone="violet" />
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
          <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
            <p className="text-[15px] font-medium text-[var(--text)]">Sent Requests</p>
            {sent.length === 0 ? (
              <p className="mt-4 text-[13px] text-[var(--text-sec)]">No sent requests yet.</p>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                {sent.map((s) => (
                  <div
                    key={s.designNo}
                    className="flex items-center gap-3.5 border border-[var(--border)] rounded-[12px] p-3"
                  >
                    <img
                      src={s.thumb}
                      alt={s.category}
                      className="w-11 h-11 rounded-[10px] object-cover border border-[var(--border)] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-medium text-[var(--text)] truncate">
                          {s.designNo}
                        </p>
                        <span className="text-[12px] text-[var(--text-sec)] truncate">{s.category}</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className={`inline-flex h-5 px-2 rounded-full text-[11px] font-medium items-center ${toneCls[s.statusTone]}`}>
                          {s.statusText}
                        </span>
                        <span className="text-[11px] text-[var(--text-sec)] tabular-nums">{s.date}</span>
                      </div>
                    </div>
                    <Link
                      href={s.route}
                      className={`shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center text-[var(--text-sec)] border border-[var(--border)] hover:bg-[var(--canvas)] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
                      aria-label="Open request"
                    >
                      <i className="ri-arrow-right-up-line text-[15px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-medium text-[var(--text)]">Production Timeline</p>
              <span className="text-[12px] text-[var(--text-sec)] tabular-nums">
                {sent[0]?.designNo ?? '—'} · {sent[0]?.category ?? 'Pending'}
              </span>
            </div>

            {timeline.length === 0 ? (
              <p className="mt-4 text-[13px] text-[var(--text-sec)]">No timeline yet.</p>
            ) : (
              <div className="mt-4">
                <div className="mb-4 rounded-[12px] bg-[var(--violet-bg)] px-3 py-2.5 text-[12px] font-medium text-[var(--violet)] flex items-center gap-2">
                  <i className="ri-focus-3-line text-[14px] w-4 h-4 flex items-center justify-center" />
                  Currently in active production phase
                </div>
                <div className="flex flex-col">
                  {timeline.map((t) => (
                    <div
                      key={t.label}
                      className={`relative flex gap-3 rounded-[12px] p-2 -mx-2 last:pb-0 ${
                        t.current ? 'bg-[var(--violet-bg)] border border-[var(--violet-border)]' : ''
                      }`}
                    >
                      {!t.done && (
                        <span className="absolute left-[22px] top-10 bottom-0 w-px bg-[var(--border)]" />
                      )}
                      <span
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          t.current
                            ? 'bg-[var(--violet)] text-[var(--on-accent)]'
                            : t.done
                            ? 'bg-[var(--muted)] text-[var(--text-sec)]'
                            : 'bg-[var(--canvas)] text-[var(--border-strong)]'
                        }`}
                      >
                        <i className={`${t.icon} text-[15px] w-4 h-4 flex items-center justify-center`} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-[13px] font-medium ${
                            t.current
                              ? 'text-[var(--violet)]'
                              : t.done
                              ? 'text-[var(--text)]'
                              : 'text-[var(--text-sec)]'
                          }`}
                        >
                          {t.label}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={`text-[12px] tabular-nums ${
                            t.current ? 'text-[var(--violet)] font-medium' : 'text-[var(--text)]'
                          }`}
                        >
                          {t.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {record.latestNote && (
              <div className="mt-5 bg-[var(--muted)] border border-[var(--border)] rounded-[12px] p-3">
                <p className="text-[12px] font-medium text-[var(--text-sec)] flex items-center gap-1.5">
                  <i className="ri-information-line text-[14px] w-4 h-4 flex items-center justify-center" />
                  Latest Note
                </p>
                <p className="mt-1 text-[12px] text-[var(--text)] leading-relaxed">
                  {record.latestNote}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}