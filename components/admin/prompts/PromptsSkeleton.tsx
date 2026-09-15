'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function RowBlock() {
  return (
    <div className="px-4 py-3 flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className={`${block} h-3 w-44`} />
        <div className={`${block} mt-2 h-3 w-64`} />
      </div>
      <div className={`${block} h-9 w-20 rounded-full`} />
    </div>
  );
}

export default function PromptsSkeleton() {
  return (
    <div aria-hidden="true" className="grid grid-cols-[300px_minmax(0,1fr)] gap-6">
      <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="px-4 py-3">
            <div className={`${block} h-3 w-32`} />
            <div className={`${block} mt-2 h-3 w-40`} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className={`${block} h-4 w-56`} />
        <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] py-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <RowBlock key={index} />
          ))}
        </div>
        <div className={`${block} h-4 w-56`} />
        <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] py-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <RowBlock key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}