'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function RowBlock({ wide }: { wide: boolean }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-[var(--muted)] last:border-b-0">
      <div className={`${block} h-3 w-44`} />
      <div className={`${block} h-3 w-36`} />
      {wide && <div className={`${block} h-5 w-20 rounded-full`} />}
      <div className={`${block} h-3 w-10`} />
      <div className={`${block} h-3 w-24`} />
      <div className={`${block} h-8 w-20`} />
    </div>
  );
}

export default function RecordsSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div aria-hidden="true">
      <div className={`${block} h-3 w-32`} />
      <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-3">
        <div className={`${block} h-9 w-full max-w-[300px] rounded-full`} />
      </div>
      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <RowBlock key={index} wide={wide} />
        ))}
      </div>
    </div>
  );
}