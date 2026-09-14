import CardHeader from './CardHeader';
import { activityEventsData } from './data';

export default function BillingActivityCard() {
  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <CardHeader
        icon="ri-history-line"
        title="Activity"
        description="What's happened on your account."
      />

      <div className="mt-3">
        {activityEventsData.slice(0, 6).map((e) => (
          <div
            key={`${e.event}-${e.at}`}
            className="flex items-start gap-3 py-4 border-b border-[var(--border)] last:border-b-0"
          >
            <span className="w-9 h-9 flex items-center justify-center rounded-[12px] bg-[var(--muted)] shrink-0">
              <i className={`${e.icon} text-[16px] text-[var(--text-sec)]`} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-[var(--text)]">
                {e.event}
              </p>
              <p className="mt-0.5 text-[13px] text-[var(--text-sec)]">
                {e.description}
              </p>
              <p
                className="mt-1 text-[12px] text-[var(--text-sec)] tabular-nums"
                suppressHydrationWarning
              >
                {e.at}
              </p>
            </div>
            <span
              className={`inline-flex items-center h-5 px-2 rounded-full text-[11px] font-medium whitespace-nowrap shrink-0 ${
                e.tone === 'success'
                  ? 'text-[var(--success)] bg-[var(--success-bg)]'
                  : 'text-[var(--text-sec)] bg-[var(--muted)]'
              }`}
            >
              {e.status}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[12px] text-[var(--text-sec)]">
        Showing the most recent six events.
      </p>
    </section>
  );
}