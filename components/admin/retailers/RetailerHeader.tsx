'use client';

import Link from 'next/link';
import RetailerStatusPill from './RetailerStatusPill';
import { statusLabels, statusTone, type Retailer } from './data';
import { focusRing } from '../tokens';

export default function RetailerHeader({
  retailer,
  onDisable,
  onEnable,
}: {
  retailer: Retailer;
  onDisable: () => void;
  onEnable: () => void;
}) {
  const disabled = retailer.status === 'disabled';

  return (
    <header className="max-w-[1280px]">
      <Link
        href="/admin/retailers"
        prefetch={false}
        className={`inline-flex items-center gap-1.5 rounded-sm text-[12px] font-medium text-[var(--text-sec)] transition-colors duration-150 hover:text-[var(--text)] ${focusRing}`}
      >
        <span className="w-4 h-4 flex items-center justify-center">
          <i className="ri-arrow-left-s-line text-[16px]" aria-hidden="true" />
        </span>
        All retailers
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-[760px]">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
              {retailer.name}
            </h1>
            <RetailerStatusPill tone={statusTone[retailer.status]}>
              {statusLabels[retailer.status]}
            </RetailerStatusPill>
          </div>
          <p className="mt-1 text-[13px] text-[var(--text-sec)] break-all">{retailer.email}</p>
          <p className="mt-2 text-[12px] tabular-nums text-[var(--muted-text)]">
            Signed up {retailer.signedUp} · last active {retailer.lastActivity}
          </p>
        </div>

        {disabled ? (
          <button
            type="button"
            onClick={onEnable}
            className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
          >
            Mark as active
          </button>
        ) : (
          <button
            type="button"
            onClick={onDisable}
            className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium whitespace-nowrap text-[var(--alert)] transition-colors duration-150 hover:bg-[var(--alert)]/10 ${focusRing}`}
          >
            Mark as inactive
          </button>
        )}
      </div>
    </header>
  );
}