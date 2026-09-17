'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

export default function CancellationsSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-4"
          >
            <div className={`${block} h-3 w-32`} />
            <div className={`${block} mt-3 h-6 w-14`} />
            <div className={`${block} mt-2 h-3 w-40`} />
          </div>
        ))}
      </div>

      <div className={`${block} mt-8 h-4 w-28`} />
      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className="flex items-center gap-4 py-2.5">
            <div className={`${block} h-3 w-40 shrink-0`} />
            <div className={`${block} h-3 flex-1 rounded-full`} />
            <div className={`${block} h-3 w-10 shrink-0`} />
          </div>
        ))}
      </div>

      <div className={`${block} mt-8 h-4 w-40`} />
      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="flex items-start gap-6 py-4 border-b border-[var(--muted)] last:border-b-0">
            <div className="min-w-[200px]">
              <div className={`${block} h-3 w-40`} />
              <div className={`${block} mt-2 h-3 w-48`} />
            </div>
            <div className={`${block} h-3 w-16`} />
            <div className={`${block} h-3 w-20`} />
            <div className={`${block} ml-auto h-3 w-12`} />
            <div className={`${block} h-3 w-24`} />
            <div className={`${block} h-3 w-20`} />
          </div>
        ))}
      </div>
    </div>
  );
}