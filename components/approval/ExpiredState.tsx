export default function ExpiredState() {
  return (
    <main className="min-h-screen bg-[#EDF1FA] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-[18px] font-semibold text-[#16233E]">
          This link isn&apos;t valid any more.
        </h1>
        <p className="mx-auto mt-2 max-w-[320px] text-[13px] text-[#5D6C8A]">
          Ask whoever sent it to you for a new one.
        </p>
      </div>
    </main>
  );
}