'use client';

import { widgetRing } from './data';

export default function EstimateFailedCard({
  onSend,
  onRetry,
}: {
  onSend: () => void;
  onRetry: () => void;
}) {
  return (
    <div
      aria-live="polite"
      className="rounded-[12px] border border-[var(--w-border)] p-6"
      style={{ backgroundColor: 'var(--w-surface)' }}
    >
      <p className="text-[15px] font-medium" style={{ color: 'var(--w-text)' }}>
        {"We couldn't work out a price for this one."}
      </p>
      <p className="mt-2 text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
        It happens. The jeweler can give you a proper figure.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onSend}
          className={`h-11 w-full sm:flex-1 px-5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 cursor-pointer ${widgetRing}`}
          style={{
            backgroundColor: 'var(--w-primary)',
            color: 'var(--w-primary-text)',
          }}
        >
          Send this to the jeweler anyway
        </button>
        <button
          type="button"
          onClick={onRetry}
          className={`h-11 w-full sm:flex-1 px-5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 cursor-pointer border ${widgetRing}`}
          style={{
            backgroundColor: 'var(--w-surface)',
            borderColor: 'var(--w-border)',
            color: 'var(--w-text)',
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}