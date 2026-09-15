'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function RowBlock() {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-[var(--muted)] last:border-b-0">
      <div className={`${block} h-3 w-28`} />
      <div className={`${block} h-3 w-36`} />
      <div className={`${block} h-3 w-44`} />
      <div className={`${block} h-3 w-16`} />
      <div className={`${block} h-5 w-24 rounded-full`} />
      <div className={`${block} h-3 w-20`} />
    </div>
  );
}

export default function InvoicesSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-4">
            <div className={`${block} h-3 w-28`} />
            <div className={`${block} mt-3 h-6 w-24`} />
            <div className={`${block} mt-2 h-3 w-32`} />
          </div>
        ))}
      </div>
      <div className="mt-8 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-3">
        <div className={`${block} h-9 w-full max-w-[300px] rounded-full`} />
      </div>
      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <RowBlock key={index} />
        ))}
      </div>
    </div>
  );
}