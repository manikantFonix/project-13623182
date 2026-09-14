'use client';

import Link from 'next/link';
import {
  CUSTOMER_FOCUS_RING,
  initials,
  linkedProjects,
  primaryEmail,
  type RecordItem,
} from './data';
import ActivityTimeline from './ActivityTimeline';

interface Props {
  record: RecordItem;
  showExpand: boolean;
  onExpand: () => void;
  onBack: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

const STATS: { key: string; icon: string; label: string }[] = [
  { key: 'requests', icon: 'ri-file-list-3-line', label: 'Total Requests' },
  { key: 'active', icon: 'ri-vip-diamond-line', label: 'Active Projects' },
  { key: 'spent', icon: 'ri-money-dollar-circle-line', label: 'Total Spent' },
  { key: 'interaction', icon: 'ri-time-line', label: 'Last Interaction' },
];

function statusPill(status: string) {
  if (status === 'approved')
    return 'bg-[var(--success-bg)] text-[var(--success)]';
  if (status === 'draft') return 'bg-[var(--muted)] text-[var(--text-sec)]';
  return 'bg-[var(--muted)] text-[var(--text)]';
}

function ContactRow({ icon, label, value }: { icon: string; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 h-5 flex items-center justify-center text-[var(--text-sec)]">
        <i className={`${icon} text-[15px]`} />
      </span>
      <span className="w-20 shrink-0 text-[13px] text-[var(--text)]">{label}</span>
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
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-4 flex items-center gap-3">
      <span className="w-9 h-9 rounded-[12px] bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)] shrink-0">
        <i className={`${icon} text-[18px] w-5 h-5 flex items-center justify-center`} />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] text-[var(--text-sec)] truncate">{label}</p>
        <p className="mt-0.5 text-[20px] font-semibold text-[var(--text)] tabular-nums truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function CustomerDetailPane({
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
  const projects = linkedProjects(record);
  const count = record.requestIds.length;

  const requests = count.toString();
  const active = (record.activeProjects ?? 0).toString();

  const stats: Record<string, { value: string; sub: string }> = {
    requests: { value: requests, sub: count === 1 ? 'request' : 'requests' },
    active: { value: active, sub: 'projects' },
    spent: { value: record.totalSpent ?? '$0', sub: 'all time' },
    interaction: { value: record.lastInteraction ?? '—', sub: 'last touch' },
  };

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
          Back to customers
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
                  {record.tag && (
                    <span className="inline-flex h-6 items-center px-3 rounded-full bg-[var(--success-bg)] text-[var(--success)] text-[12px] font-medium whitespace-nowrap">
                      {record.tag}
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
                Edit Client
              </button>
              <button
                type="button"
                onClick={onRemove}
                className={`h-9 px-4 text-[13px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] rounded-full hover:text-[var(--on-accent)] hover:bg-[var(--alert-strong)] hover:border-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
              >
                <i className="ri-delete-bin-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Remove Client
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2.5 border-t border-[var(--border)] pt-5">
            {emails.map((e) => (
              <ContactRow key={e.email} icon="ri-mail-line" label={e.label} value={e.email} />
            ))}
            <ContactRow icon="ri-phone-line" label="Phone" value={record.phone} />
            <ContactRow icon="ri-map-pin-line" label="Location" value={record.address} />
          </div>
        </section>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard
              key={s.key}
              icon={s.icon}
              label={s.label}
              value={stats[s.key].value}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
          <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-medium text-[var(--text)]">Linked Projects</p>
              {projects.length > 0 && (
                <span className="text-[12px] text-[var(--text-sec)] tabular-nums">
                  {count} {count === 1 ? 'project' : 'projects'}
                </span>
              )}
            </div>
            {projects.length === 0 ? (
              <p className="mt-4 text-[13px] text-[var(--text-sec)]">
                No linked projects yet.
              </p>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3.5 border border-[var(--border)] rounded-[12px] p-3"
                  >
                    <img
                      src={p.thumb}
                      alt={p.category}
                      className="w-11 h-11 rounded-[10px] object-cover border border-[var(--border)] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-medium text-[var(--text)] truncate">
                          {p.designNo}
                        </p>
                        <span className="text-[12px] text-[var(--text-sec)] truncate">
                          {p.category}
                        </span>
                      </div>
                      <span
                        className={`inline-flex mt-1.5 h-5 px-2 rounded-full text-[11px] font-medium items-center ${statusPill(p.status)}`}
                      >
                        Shared with customer
                      </span>
                    </div>
                    <Link
                      href={`/requests/${p.id}`}
                      className={`shrink-0 h-9 px-3 text-[12px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap inline-flex items-center gap-1 ${CUSTOMER_FOCUS_RING}`}
                    >
                      View request
                      <i className="ri-arrow-right-s-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          <ActivityTimeline record={record} />
        </div>
      </div>
    </div>
  );
}