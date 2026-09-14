'use client';

import { useState } from 'react';
import Dropdown from '../Dropdown';
import {
  CUSTOMER_FOCUS_RING,
  activityForRequest,
  requestOptionsFor,
  type RecordItem,
} from './data';

const ACTIVITY_ICON: Record<string, { icon: string; cls: string }> = {
  render: { icon: 'ri-cpu-line', cls: 'bg-[var(--muted)] text-[var(--text-sec)]' },
  design: { icon: 'ri-quill-pen-line', cls: 'bg-[var(--muted)] text-[var(--text-sec)]' },
  request: { icon: 'ri-add-circle-line', cls: 'bg-[var(--muted)] text-[var(--text-sec)]' },
};

export default function ActivityTimeline({ record }: { record: RecordItem }) {
  const options = requestOptionsFor(record);
  const [selectedId, setSelectedId] = useState<string | null>(options[0]?.id ?? null);
  const [open, setOpen] = useState(false);
  const activity = activityForRequest(record, selectedId);
  const selected = options.find((o) => o.id === selectedId) ?? options[0];

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-medium text-[var(--text)]">Activity Timeline</p>
        {options.length > 0 && (
          <span className="text-[12px] text-[var(--text-sec)] tabular-nums">
            {options.length} {options.length === 1 ? 'request' : 'requests'}
          </span>
        )}
      </div>

      {options.length > 0 && (
        <div className="mt-3">
          <Dropdown
            open={open}
            onToggle={setOpen}
            align="left"
            panelClass="w-full"
            trigger={
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={`w-full h-10 px-3 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2 text-left text-[13px] font-medium text-[var(--text)] hover:border-[var(--border-strong)] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
              >
                <i className="ri-file-list-3-line text-[14px] w-4 h-4 shrink-0 flex items-center justify-center text-[var(--text-sec)]" />
                <span className="tabular-nums shrink-0">{selected?.designNo}</span>
                <span className="text-[var(--text-sec)] truncate">
                  {selected?.category}
                </span>
                <i
                  className={`ml-auto ri-arrow-down-s-line text-[16px] w-4 h-4 shrink-0 flex items-center justify-center text-[var(--text-sec)] transition-transform duration-150 ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>
            }
          >
            <div className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-[var(--text-sec)]">
              Select a request
            </div>
            <div role="listbox" aria-label="Requests">
              {options.map((o) => {
                const active = o.id === selectedId;
                return (
                  <button
                    key={o.id}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setSelectedId(o.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] text-left transition-colors duration-150 ${CUSTOMER_FOCUS_RING} ${
                      active
                        ? 'bg-[var(--muted)]'
                        : 'hover:bg-[var(--muted)]'
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-[var(--text)] tabular-nums truncate">
                        {o.designNo}
                      </span>
                      <span className="block text-[12px] text-[var(--text-sec)] truncate">
                        {o.category} · {o.date}
                      </span>
                    </span>
                    {active && (
                      <i className="ri-check-line text-[15px] w-4 h-4 shrink-0 flex items-center justify-center text-[var(--accent-text)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </Dropdown>
        </div>
      )}

      {activity.length === 0 ? (
        <p className="mt-4 text-[13px] text-[var(--text-sec)]">No activity yet.</p>
      ) : (
        <div className="mt-4 flex flex-col">
          {activity.map((a, i) => (
            <div key={a.id} className="relative flex gap-3 pb-5 last:pb-0">
              {i < activity.length - 1 && (
                <span className="absolute left-4 top-8 bottom-0 w-px bg-[var(--border)]" />
              )}
              <span
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${ACTIVITY_ICON[a.kind].cls}`}
              >
                <i
                  className={`${ACTIVITY_ICON[a.kind].icon} text-[15px] w-4 h-4 flex items-center justify-center`}
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-[var(--text)]">{a.title}</p>
                <p className="mt-0.5 text-[12px] text-[var(--text-sec)] leading-relaxed">
                  {a.project}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[12px] text-[var(--text)] tabular-nums">{a.time}</p>
                <p className="mt-0.5 text-[11px] text-[var(--text-sec)] tabular-nums">
                  {a.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}