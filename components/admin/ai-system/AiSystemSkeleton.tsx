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
        <div className={`${block} h-9 w-40 rounded-full`} />
      </div>
    </div>
  );
}

export default function AiSystemSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6 max-w-[980px]">
      <div className={`${block} h-4 w-56`} />
      {Array.from({ length: 3 }).map((_, index) => (
        <SettingBlock key={index} />
      ))}
      <div className={`${block} h-4 w-56`} />
      <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <div className="px-5 py-4">
          <div className={`${block} h-3 w-32`} />
          <div className={`${block} mt-2 h-3 w-80`} />
        </div>
        <div className="border-t border-[var(--border-strong)] bg-[var(--muted)] px-5 py-4">
          <div className={`${block} h-8 w-48`} />
          <div className={`${block} mt-3 h-24 w-full`} />
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <SettingBlock key={index} />
      ))}
    </div>
  );
}