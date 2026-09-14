'use client';

import Link from 'next/link';

const primary =
  'w-full sm:w-auto h-11 sm:h-9 px-6 rounded-full text-[13px] font-medium text-white inline-flex items-center justify-center whitespace-nowrap transition-colors duration-150 hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]';

export default function RequestSendCard({
  token,
  droppedCount,
  allDropped,
  submitting,
  canSend,
  disabledReason,
  errorMessage,
}: {
  token: string;
  droppedCount: number;
  allDropped: boolean;
  submitting: boolean;
  canSend: boolean;
  disabledReason?: string;
  errorMessage: string;
}) {
  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      {droppedCount > 0 && (
        <p className="mb-4 border-l-2 border-[#A8552A] pl-3 text-[13px] text-[#A8552A]">
          {droppedCount} of your pieces aren&apos;t available any more and have been removed.
        </p>
      )}

      {allDropped ? (
        <div className="space-y-4">
          <p className="border-l-2 border-[#A8552A] pl-3 text-[13px] text-[#A8552A]">
            None of your pieces are available any more, so there&apos;s nothing to send.
          </p>
          <Link
            href={`/c/${token}`}
            className={primary}
            style={{ backgroundColor: 'var(--brand)' }}
          >
            Back to the catalog
          </Link>
        </div>
      ) : (
        <>
          {errorMessage && (
            <p
              role="alert"
              aria-live="assertive"
              className="mb-4 text-[13px] text-[#A8552A]"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            id="request-submit"
            disabled={!canSend || submitting}
            className={primary}
            style={{ backgroundColor: 'var(--brand)' }}
          >
            {submitting ? 'Sending…' : 'Send request'}
          </button>

          <p className="mt-2 text-[12px] text-[#5D6C8A]">
            The jeweler will get in touch. Nothing is ordered and nothing is charged.
          </p>
        </>
      )}
    </section>
  );
}