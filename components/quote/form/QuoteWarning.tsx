export default function QuoteWarning() {
  return (
    <div className="bg-white border-l-2 border-[#A8552A] rounded-[12px] p-3">
      <p className="text-[13px] font-medium text-[#A8552A]">
        Once you send this, it can&apos;t be changed.
      </p>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        You can&apos;t edit it, withdraw it or send another one for this job. Check the price and
        the timing before you submit.
      </p>
    </div>
  );
}