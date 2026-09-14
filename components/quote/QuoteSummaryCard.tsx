import QuoteCard from './QuoteCard';
import QuoteStatusPill from './QuoteStatusPill';
import type { QuoteState, QuoteView } from './data';

export default function QuoteSummaryCard({
  view,
  state,
}: {
  view: QuoteView;
  state: QuoteState;
}) {
  const quote = view.quote;
  if (!quote) return null;

  const pill =
    state === 'accepted'
      ? { label: 'Accepted', tone: 'success' as const }
      : state === 'not-taken-forward'
        ? { label: 'Not taken forward', tone: 'alert' as const }
        : { label: 'Submitted', tone: 'muted' as const };

  return (
    <QuoteCard>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-medium text-[#16233E]">Your quote</h2>
        <QuoteStatusPill label={pill.label} tone={pill.tone} />
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-[26px] font-semibold text-[#16233E] tabular-nums">
          {quote.price}
        </span>
        <span className="text-[13px] text-[#5D6C8A] tabular-nums">{quote.days} days</span>
      </div>

      {quote.notes && <p className="mt-2 text-[13px] text-[#5D6C8A]">{quote.notes}</p>}

      <p className="mt-3 text-[12px] text-[#5D6C8A] tabular-nums">
        Submitted {quote.submittedAt}
      </p>

      {state === 'submitted' && (
        <p className="mt-3 text-[13px] text-[#5D6C8A]">
          This can&apos;t be changed. The jeweler will be in touch.
        </p>
      )}

      {state === 'accepted' && quote.acceptedOn && (
        <p className="mt-3 text-[13px] text-[#3D6B54]">
          Accepted on <span className="tabular-nums">{quote.acceptedOn}</span>. The jeweler has
          asked you to go ahead.
        </p>
      )}

      {state === 'not-taken-forward' && (
        <p className="mt-3 text-[13px] text-[#16233E]">
          The jeweler didn&apos;t go ahead with this quote.
        </p>
      )}
    </QuoteCard>
  );
}