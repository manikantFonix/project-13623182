'use client';

export default function RankMarker({ position }: { position: number }) {
  return (
    <div className="hidden md:flex w-8 shrink-0 justify-center pt-5" aria-hidden="true">
      <span className="w-6 h-6 rounded-full border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[12px] font-semibold tabular-nums text-[var(--text-sec)]">
        {position}
      </span>
    </div>
  );
}