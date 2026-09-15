'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function KeyBlock() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5 flex items-start justify-between gap-6">
      <div className="flex-1">
        <div className={`${block} h-3 w-40`} />
        <div className={`${block} mt-2.5 h-3 w-64`} />
        <div className={`${block} mt-4 h-3 w-52`} />
        <div className={`${block} mt-2 h-3 w-44`} />
      </div>
      <div className={`${block} h-9 w-28 rounded-full`} />
    </div>
  );
}

export default function ProvidersSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <KeyBlock />
        <KeyBlock />
      </div>
      <div className="flex flex-col gap-3">
        <KeyBlock />
        <KeyBlock />
      </div>
      <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-6 py-4 border-b border-[var(--muted)] last:border-b-0"
          >
            <div className={`${block} h-3 w-52`} />
            <div className={`${block} h-3 w-36`} />
            <div className={`${block} h-5 w-20 rounded-full`} />
          </div>
        ))}
      </div>
    </div>
  );
}