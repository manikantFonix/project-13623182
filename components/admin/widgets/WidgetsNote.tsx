'use client';

export default function WidgetsNote() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3">
      <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--muted-text)]">
        <i className="ri-information-line text-[16px]" aria-hidden="true" />
      </span>
      <div className="text-[12px] leading-relaxed text-[var(--text-sec)] flex flex-col gap-2">
        <p>
          A neutral theme is intentional, not a fault. Dormant usually means nobody visited the page.
        </p>
        <p>
          Most origin refusals are the permitted-origin control working. A high count on their own
          domain is worth a call.
        </p>
        <p>
          Suspending is the only action here. There is no administrative route to a visitor's
          details, by design.
        </p>
      </div>
    </div>
  );
}