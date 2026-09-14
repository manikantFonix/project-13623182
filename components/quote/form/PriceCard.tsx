import QuoteCard from '../QuoteCard';

export default function PriceCard({
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
      <label htmlFor="quote-price" className="text-[15px] font-medium text-[#16233E]">
        Your price
      </label>
      <div className="relative mt-2">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-[#5D6C8A]">
          $
        </span>
        <input
          id="quote-price"
          name="price"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={invalid}
          aria-describedby={invalid ? 'quote-price-help quote-price-error' : 'quote-price-help'}
          className="w-full h-11 md:h-9 pl-7 pr-3 rounded-[12px] border border-[#DCE3F0] bg-white text-[15px] tabular-nums text-[#16233E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        />
      </div>
      <p id="quote-price-help" className="mt-2 text-[12px] text-[#5D6C8A]">
        What it will cost the jeweler to have this made. US dollars.
      </p>
      <p className="mt-1 text-[12px] text-[#5D6C8A]">Required.</p>
      {invalid && (
        <p id="quote-price-error" className="mt-1 text-[12px] text-[#A8552A]">
          Enter a price.
        </p>
      )}
    </QuoteCard>
  );
}