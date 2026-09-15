'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function FigureBlock() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <div className={`${block} h-3 w-24`} />
      <div className={`${block} mt-4 h-8 w-24`} />
      <div className={`${block} mt-3 h-3 w-32`} />
    </div>
  );
}

function StepBlock() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <div className="flex items-center gap-4">
        <div className={`${block} h-7 w-7 rounded-full`} />
        <div className={`${block} h-3 w-40`} />
        <div className={`ml-auto ${block} h-6 w-32 rounded-full`} />
      </div>
      <div className={`${block} mt-4 h-3 w-80 max-w-full`} />
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--muted)] pt-3.5">
        <div className={`${block} h-3 w-28`} />
        <div className={`${block} h-9 w-44 rounded-full`} />
      </div>
    </div>
  );
}

export default function GenerationSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className={`${block} h-3 w-24`} />
        <div className={`${block} mt-3 h-3 w-72 max-w-full`} />
        <div className={`${block} mt-4 h-9 w-full max-w-[420px] rounded-full`} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <FigureBlock />
        <FigureBlock />
        <FigureBlock />
        <FigureBlock />
      </div>

      <div className="mt-10 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <StepBlock key={index} />
        ))}
      </div>
    </div>
  );
}