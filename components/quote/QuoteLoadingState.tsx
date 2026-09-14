import QuoteCard from './QuoteCard';

function Block({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-[#E4E9F4] animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}

export default function QuoteLoadingState() {
  return (
    <main
      aria-busy="true"
      className="max-w-[880px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-4"
    >
      <QuoteCard>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Block className="h-7 w-[250px] rounded-[8px]" />
            <Block className="mt-3 h-4 w-[110px] rounded-[8px]" />
            <Block className="mt-2 h-4 w-[150px] rounded-[8px]" />
          </div>
          <Block className="h-6 w-[64px] rounded-full" />
        </div>
      </QuoteCard>

      <QuoteCard>
        <Block className="h-5 w-[80px] rounded-[8px]" />
        <div className="mt-3 flex flex-col gap-2 md:flex-row md:gap-3">
          <Block className="md:flex-1 aspect-square rounded-[12px]" />
          <div className="flex gap-2 md:flex-col md:w-[112px]">
            <Block className="flex-1 md:flex-none aspect-square rounded-[12px]" />
            <Block className="flex-1 md:flex-none aspect-square rounded-[12px]" />
            <Block className="flex-1 md:flex-none aspect-square rounded-[12px]" />
          </div>
        </div>
      </QuoteCard>

      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1].map((c) => (
          <QuoteCard key={c}>
            <Block className="h-5 w-[110px] rounded-[8px]" />
            <Block className="mt-3 h-4 w-full rounded-[8px]" />
            <Block className="mt-2 h-4 w-[70%] rounded-[8px]" />
            <Block className="mt-2 h-4 w-[85%] rounded-[8px]" />
          </QuoteCard>
        ))}
      </div>

      <QuoteCard>
        <Block className="h-5 w-[80px] rounded-[8px]" />
        <div className="mt-4 flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Block className="w-5 h-5 rounded-full" />
              <Block className="h-4 w-[150px] rounded-[8px]" />
            </div>
          ))}
        </div>
      </QuoteCard>
    </main>
  );
}