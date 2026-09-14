import Card from './Card';

function Block({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-[#E4E9F4] animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}

export default function LoadingState() {
  return (
    <main
      aria-busy="true"
      className="max-w-[720px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-4"
    >
      <Card>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Block className="h-6 w-[220px] rounded-[8px]" />
            <Block className="mt-2 h-4 w-[90px] rounded-[8px]" />
          </div>
          <Block className="h-6 w-[120px] rounded-full" />
        </div>
        <Block className="mt-4 h-4 w-[260px] rounded-[8px]" />
      </Card>

      <Card>
        <Block className="h-5 w-[100px] rounded-[8px]" />
        <div className="mt-3 flex flex-col gap-2 md:flex-row md:gap-3">
          <Block className="flex-1 aspect-square rounded-[12px]" />
          <div className="flex gap-2 md:flex-col md:w-[112px]">
            <Block className="flex-1 md:flex-none aspect-square rounded-[12px]" />
            <Block className="flex-1 md:flex-none aspect-square rounded-[12px]" />
            <Block className="flex-1 md:flex-none aspect-square rounded-[12px]" />
          </div>
        </div>
      </Card>

      <Card>
        <Block className="h-5 w-[70px] rounded-[8px]" />
        <Block className="mt-3 h-4 w-[200px] rounded-[8px]" />
        <Block className="mt-2 h-4 w-[280px] rounded-[8px]" />
      </Card>

      <Card>
        <Block className="h-5 w-[80px] rounded-[8px]" />
        <div className="mt-3 flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Block className="w-5 h-5 rounded-full" />
              <Block className="h-4 w-[140px] rounded-[8px]" />
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}