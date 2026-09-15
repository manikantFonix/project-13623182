'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function RowBlock() {
  return (
    <div className="flex items-start gap-6 py-4 border-b border-[var(--muted)] last:border-b-0">
      <div className={`${block} h-3 w-10`} />
      <div className="flex-1">
        <div className={`${block} h-5 w-32 rounded-full`} />
        <div className={`${block} mt-2 h-3 w-56`} />
        <div className={`${block} mt-2 h-3 w-72`} />
      </div>
      <div className={`${block} h-3 w-28`} />
      <div className={`${block} h-3 w-40`} />
    </div>
  );
}

export default function AuditSkeleton() {
  return (
    <div aria-hidden="true">
      <div className={`${block} h-4 w-32`} />
      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-3">
        <div className="flex items-center gap-3">
          <div className={`${block} h-9 flex-1 rounded-full`} />
          <div className={`${block} h-9 w-[220px] rounded-full`} />
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-[var(--muted)] pt-3">
          <div className={`${block} h-9 w-[120px] rounded-full`} />
          <div className={`${block} h-9 w-[170px] rounded-full`} />
          <div className={`${block} h-9 w-[140px] rounded-full`} />
          <div className={`${block} h-9 w-[130px] rounded-full`} />
        </div>
      </div>
      <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <RowBlock key={index} />
        ))}
      </div>
    </div>
  );
}