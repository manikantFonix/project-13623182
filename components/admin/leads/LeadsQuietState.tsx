'use client';

export default function LeadsQuietState() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-6 py-12 flex flex-col items-center text-center">
      <span className="w-9 h-9 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
        <i className="ri-inbox-2-line text-[20px]" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-[15px] font-semibold text-[var(--text)]">
        No inquiries in this window
      </h3>
      <p className="mt-2 max-w-[480px] text-[13px] leading-relaxed text-[var(--text-sec)]">
        Nothing came through across any retailer or origin. A zero is a real answer, not a broken
        figure.
      </p>
    </div>
  );
}