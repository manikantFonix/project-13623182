'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function FigureBlock() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <div className={`${block} h-3 w-32`} />
      <div className={`${block} mt-4 h-8 w-24`} />
      <div className={`${block} mt-3 h-3 w-40`} />
    </div>
  );
}

function RowBlock() {
  return (
    <div className="flex items-center gap-6 py-4 border-b border-[var(--muted)] last:border-b-0">
      <div className={`${block} h-3 w-40`} />
      <div className={`${block} h-3 w-40`} />
      <div className={`${block} h-3 w-44`} />
      <div className={`${block} ml-auto h-3 w-24`} />
      <div className={`${block} h-3 w-28`} />
      <div className={`${block} h-9 w-28 rounded-full`} />
    </div>
  );
}

export default function EstimateSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className={`${block} h-3 w-32`} />
        <div className={`${block} mt-3 h-3 w-80 max-w-full`} />
        <div className={`${block} mt-4 h-9 w-full max-w-[420px] rounded-full`} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <FigureBlock />
        <FigureBlock />
        <FigureBlock />
      </div>

      <div className="mt-10">
        <div className={`${block} h-3 w-40`} />
        <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <RowBlock key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}