'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function RowBlock() {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-[var(--muted)] last:border-b-0">
      <div className={`${block} h-3 w-28`} />
      <div className={`${block} h-3 w-16`} />
      <div className={`${block} h-3 w-16`} />
      <div className={`${block} h-3 w-14`} />
      <div className={`${block} h-3 w-10`} />
      <div className={`${block} h-8 w-24`} />
    </div>
  );
}

export default function PlansSkeleton() {
  return (
    <div aria-hidden="true">
      <div className={`${block} h-3 w-24`} />
      <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <RowBlock key={index} />
        ))}
      </div>
      <div className={`${block} mt-8 h-3 w-32`} />
      <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <RowBlock key={index} />
        ))}
      </div>
    </div>
  );
}