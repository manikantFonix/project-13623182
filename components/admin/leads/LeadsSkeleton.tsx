'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function FigureBlock() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <div className={`${block} h-3 w-24`} />
      <div className={`${block} mt-4 h-8 w-28`} />
      <div className={`${block} mt-3 h-3 w-36`} />
    </div>
  );
}

function RowBlock() {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-[var(--muted)] last:border-b-0">
      <div className={`${block} h-3 w-44`} />
      <div className={`${block} h-3 w-12`} />
      <div className={`${block} h-3 w-12`} />
      <div className={`${block} h-3 w-12`} />
      <div className={`${block} h-3 w-12`} />
      <div className={`${block} h-3 w-16`} />
    </div>
  );
}

export default function LeadsSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className={`${block} h-9 w-[280px] rounded-full`} />
        <div className={`${block} h-3 w-40`} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <FigureBlock />
        <FigureBlock />
        <FigureBlock />
        <FigureBlock />
      </div>

      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
        <div className={`${block} h-3 w-24`} />
        <div className={`${block} mt-3 h-6 w-20`} />
      </div>

      <div className="mt-10">
        <div className={`${block} h-3 w-28`} />
        <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <RowBlock key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}