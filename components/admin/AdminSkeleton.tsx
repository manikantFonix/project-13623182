'use client';

const block = 'bg-[var(--muted)] rounded-[8px] animate-pulse motion-reduce:animate-none';

function Tile({ height }: { height: string }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <div className={`${block} h-3 w-24`} />
      <div className={`${block} mt-4 ${height} w-32`} />
      <div className={`${block} mt-3 h-3 w-40`} />
    </div>
  );
}

function Row() {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className={`${block} h-3 w-40`} />
      <div className={`${block} h-3 w-14`} />
    </div>
  );
}

export default function AdminSkeleton() {
  return (
    <div aria-hidden="true">
      <div className={`${block} h-3 w-40`} />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Tile height="h-8" />
        <Tile height="h-8" />
        <Tile height="h-8" />
        <Tile height="h-8" />
      </div>
      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5 lg:col-span-2">
          <div className={`${block} h-3 w-36`} />
          <div className="mt-4 divide-y divide-[var(--border)]">
            {Array.from({ length: 6 }).map((_, i) => (
              <Row key={i} />
            ))}
          </div>
          <div className="mt-2 border-t border-[var(--border-strong)]">
            <Row />
          </div>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
          <div className={`${block} h-3 w-28`} />
          <div className={`${block} mt-4 h-10 w-24`} />
          <div className={`${block} mt-3 h-3 w-full`} />
          <div className={`${block} mt-2 h-3 w-4/5`} />
        </div>
      </div>
      <div className="mt-8 grid gap-3 lg:grid-cols-2">
        {[0, 1].map((c) => (
          <div key={c} className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
            <div className={`${block} h-3 w-36`} />
            <div className="mt-4 divide-y divide-[var(--border)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Row key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}