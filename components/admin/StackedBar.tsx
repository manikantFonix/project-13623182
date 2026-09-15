'use client';

export interface StackSegment {
  label: string;
  value: number;
  tone: 'strong' | 'soft';
}

export default function StackedBar({ segments }: { segments: StackSegment[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const shown = segments.filter((s) => total > 0 && s.value > 0);

  return (
    <span
      className="flex h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]"
      aria-hidden="true"
    >
      {shown.map((s, i) => (
        <span
          key={s.label}
          className={`h-full transition-colors duration-150 ${
            s.tone === 'soft' ? 'bg-[var(--muted-text)]' : 'bg-[var(--accent)]'
          }`}
          style={{
            width: `${(s.value / total) * 100}%`,
            borderRight: i === shown.length - 1 ? 'none' : '2px solid var(--surface)',
          }}
        />
      ))}
    </span>
  );
}