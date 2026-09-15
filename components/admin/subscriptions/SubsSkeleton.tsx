'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function RowBlock() {
  return (
    <div className="flex items-start gap-6 py-4 border-b border-[var(--muted)] last:border-b-0">
      <div className="min-w-[200px]">
        <div className={`${block} h-3 w-40`} />
        <div className={`${block} mt-2 h-5 w-24 rounded-full`} />
      </div>
      <div className={`${block} h-5 w-20 rounded-full`} />
      <div className={`${block} h-5 w-20 rounded-full`} />
      <div className="min-w-[130px]">
        <div className={`${block} h-3 w-20`} />
        <div className={`${block} mt-2 h-1.5 w-[110px] rounded-full`} />
      </div>
      <div className="min-w-[130px]">
        <div className={`${block} h-3 w-24`} />
        <div className={`${block} mt-2 h-1.5 w-[110px] rounded-full`} />
      </div>
      <div className={`${block} ml-auto h-3 w-14`} />
      <div className={`${block} h-3 w-14`} />
      <div className={`${block} h-3 w-16`} />
    </div>
  );
}

export default function SubsSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-4">
            <div className={`${block} h-3 w-32`} />
            <div className={`${block} mt-3 h-6 w-20`} />
            <div className={`${block} mt-2 h-3 w-40`} />
          </div>
        ))}
      </div>
      <div className={`${block} mt-8 h-4 w-32`} />
      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-3">
        <div className="flex items-center gap-2">
          <div className={`${block} h-9 flex-1 rounded-full`} />
          <div className={`${block} h-9 w-[150px] rounded-full`} />
          <div className={`${block} h-9 w-[140px] rounded-full`} />
        </div>
      </div>
      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <RowBlock key={index} />
        ))}
      </div>
    </div>
  );
}