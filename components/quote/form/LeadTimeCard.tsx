import QuoteCard from '../QuoteCard';

export default function LeadTimeCard({
  value,
  onChange,
  onBlur,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  invalid: boolean;
}) {
  return (
    <QuoteCard>
      <label htmlFor="quote-days" className="text-[15px] font-medium text-[#16233E]">
        How long it takes
      </label>
      <div className="mt-2 flex items-center gap-2">
        <input
          id="quote-days"
          name="days"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={invalid}
          aria-describedby={invalid ? 'quote-days-help quote-days-error' : 'quote-days-help'}
          className="flex-1 h-11 md:h-9 px-3 rounded-[12px] border border-[#DCE3F0] bg-white text-[15px] tabular-nums text-[#16233E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        />
        <span className="text-[15px] text-[#5D6C8A]">days</span>
      </div>
      <p id="quote-days-help" className="mt-2 text-[12px] text-[#5D6C8A]">
        Working days from when the jeweler accepts, to the piece being ready.
      </p>
      <p className="mt-1 text-[12px] text-[#5D6C8A]">Required.</p>
      {invalid && (
        <p id="quote-days-error" className="mt-1 text-[12px] text-[#A8552A]">
          Enter how many days it takes.
        </p>
      )}
    </QuoteCard>
  );
}