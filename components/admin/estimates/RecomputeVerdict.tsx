'use client';

import { differenceSentence, estimateMatches, labourOnlyChange, type Estimate } from './data';

export default function RecomputeVerdict({ estimate }: { estimate: Estimate }) {
  const matches = estimateMatches(estimate);
  const labourOnly = labourOnlyChange(estimate);

  const cause = labourOnly
    ? `Metal and stones are unchanged and only labor moved, so ${estimate.retailer}'s bench rate is the likely cause — the audit trail under Settings records the platform alternative.`
    : `Either the platform configuration or ${estimate.retailer}'s bench rate changed since it ran — the audit trail under Settings records a platform change, and a bench rate sits on that retailer's widget settings.`;

  return (
    <div
      className={`rounded-[12px] border border-[var(--border-strong)] px-5 py-5 ${
        matches ? 'bg-[var(--success-bg)]' : 'bg-[var(--amber-bg)]'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 w-5 h-5 flex items-center justify-center shrink-0 ${
            matches ? 'text-[var(--success)]' : 'text-[var(--alert-strong)]'
          }`}
        >
          <i
            className={`${matches ? 'ri-checkbox-circle-line' : 'ri-alert-line'} text-[19px]`}
            aria-hidden="true"
          />
        </span>
        <div>
          <p
            className={`text-[15px] font-semibold ${
              matches ? 'text-[var(--success)]' : 'text-[var(--alert-strong)]'
            }`}
          >
            {matches
              ? 'Matches — the figure reproduces'
              : 'Differs — the recompute no longer produces this figure'}
          </p>

          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-sec)]">
            {matches
              ? `Both come to ${estimate.shownRange}. The same calculation reproduces it.`
              : `The recompute produces ${estimate.nowRange}, against the stored ${estimate.shownRange}. ${differenceSentence(
                  estimate
                )}`}
          </p>

          <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-sec)]">
            {matches
              ? 'The estimate was right when it ran. Nothing was written.'
              : cause}
          </p>
        </div>
      </div>
    </div>
  );
}