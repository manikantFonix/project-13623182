'use client';

export function SkeletonStat() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5 space-y-3">
      <div className="h-3 w-1/2 rounded-full bg-[var(--muted)]" />
      <div className="h-7 w-16 rounded-full bg-[var(--muted)]" />
      <div className="h-3 w-2/3 rounded-full bg-[var(--muted)]" />
    </div>
  );
}

export function SkeletonTable({ rows = 3 }: { rows?: number }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] divide-y divide-[var(--border)]">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-4">
          <div className="h-3 flex-1 rounded-full bg-[var(--muted)]" />
          <div className="h-3 w-16 rounded-full bg-[var(--muted)]" />
          <div className="h-3 w-16 rounded-full bg-[var(--muted)]" />
          <div className="h-3 w-16 rounded-full bg-[var(--muted)]" />
        </div>
      ))}
    </div>
  );
}