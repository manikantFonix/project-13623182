'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function RowBlock() {
  return (
    <div className="flex items-start justify-between gap-6 py-4 border-b border-[var(--muted)] last:border-b-0">
      <div className="min-w-[210px]">
        <div className={`${block} h-3 w-40`} />
        <div className={`${block} mt-2 h-3 w-32`} />
      </div>
      <div className={`${block} h-5 w-24 rounded-full`} />
      <div className="w-[220px]">
        <div className={`${block} h-5 w-28 rounded-full`} />
        <div className={`${block} mt-2 h-3 w-full`} />
      </div>
      <div className={`${block} h-3 w-10`} />
      <div className={`${block} h-3 w-20`} />
      <div className={`${block} h-9 w-24 rounded-full`} />
    </div>
  );
}

export default function WidgetsSkeleton() {
  return (
    <div aria-hidden="true">
      <div className={`${block} h-3 w-32`} />
      <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-3">
        <div className={`${block} h-9 w-[240px] rounded-full`} />
      </div>
      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <RowBlock key={index} />
        ))}
      </div>
    </div>
  );
}