export default function BeforeYouQuote() {
  return (
    <div className="bg-[#F3F6FC] rounded-[12px] p-4 flex gap-3">
      <span className="w-8 h-8 rounded-[10px] bg-white flex items-center justify-center text-[#5D6C8A] shrink-0">
        <i className="ri-information-line text-[16px] w-4 h-4 flex items-center justify-center" />
      </span>
      <div>
        <p className="text-[13px] font-medium text-[#16233E]">
          Check the specification before you quote.
        </p>
        <p className="mt-1 text-[13px] text-[#5D6C8A]">
          Make sure the metal and stones can be sourced as described.
        </p>
      </div>
    </div>
  );
}