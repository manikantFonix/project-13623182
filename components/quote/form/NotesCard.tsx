import QuoteCard from '../QuoteCard';

export default function NotesCard({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <QuoteCard>
      <div className="flex items-baseline gap-2">
        <label htmlFor="quote-notes" className="text-[15px] font-medium text-[#16233E]">
          Anything to add?
        </label>
        <span className="text-[13px] text-[#5D6C8A]">Optional</span>
      </div>
      <textarea
        id="quote-notes"
        name="notes"
        rows={4}
        maxLength={500}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Sourcing, substitutions, anything the jeweler should know."
        className="mt-2 w-full rounded-[12px] border border-[#DCE3F0] bg-white p-3 text-[13px] text-[#16233E] placeholder:text-[#5D6C8A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      />
    </QuoteCard>
  );
}