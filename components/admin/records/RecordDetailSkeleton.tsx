'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function SectionBlock({ rows }: { rows: number }) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className={`${block} h-3 w-24`} />
      <div className="mt-4 flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className={`${block} h-3 w-24`} />
            <div className={`${block} h-3 w-48`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RecordDetailSkeleton() {
  return (
    <div aria-hidden="true" className="max-w-[1280px]">
      <div className={`${block} h-3 w-28`} />
      <div className={`${block} mt-4 h-7 w-64`} />
      <div className={`${block} mt-3 h-3 w-48`} />
      <div className="mt-8 flex flex-col gap-4">
        <SectionBlock rows={6} />
        <SectionBlock rows={2} />
        <SectionBlock rows={5} />
      </div>
    </div>
  );
}