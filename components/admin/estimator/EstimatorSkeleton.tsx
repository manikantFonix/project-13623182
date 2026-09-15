'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function SettingBlock() {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className={`${block} h-3 w-40`} />
          <div className={`${block} mt-2 h-3 w-72`} />
        </div>
        <div className={`${block} h-9 w-32 rounded-full`} />
      </div>
    </div>
  );
}

export default function EstimatorSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6">
      <div className={`${block} h-4 w-56`} />
      <SettingBlock />
      <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className={`${block} h-3 w-44`} />
        <div className={`${block} mt-2 h-3 w-64`} />
        <div className={`${block} mt-4 h-[300px] w-full`} />
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <SettingBlock key={index} />
      ))}
    </div>
  );
}