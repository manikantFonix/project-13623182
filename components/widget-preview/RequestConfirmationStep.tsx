'use client';

import { widgetRing } from './data';

export default function RequestConfirmationStep({
  onDone,
}: {
  onDone: () => void;
}) {
  return (
    <div
      aria-live="polite"
      className="py-4 flex flex-col items-center text-center"
    >
      <span
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'var(--w-border)' }}
      >
        <i
          className="ri-check-line text-[24px] w-6 h-6 flex items-center justify-center"
          style={{ color: 'var(--w-primary)' }}
        />
      </span>
      <h2
        className="mt-4 text-[20px] font-semibold"
        style={{ color: 'var(--w-text)' }}
      >
        Request sent
      </h2>
      <p className="mt-2 text-[13px]" style={{ color: 'var(--w-text)' }}>
        The jeweler has your request.
      </p>
      <p className="mt-1 text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
        {"We've emailed you a copy. They'll be in touch on the number you gave us."}
      </p>
      <button
        type="button"
        onClick={onDone}
        className={`mt-6 h-11 w-full text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 cursor-pointer ${widgetRing}`}
        style={{
          backgroundColor: 'var(--w-primary)',
          color: 'var(--w-primary-text)',
        }}
      >
        Done
      </button>
    </div>
  );
}