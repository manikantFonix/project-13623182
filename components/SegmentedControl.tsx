'use client';

interface Props {
  mode: 'custom' | 'catalog';
  onChange: (mode: 'custom' | 'catalog') => void;
  count: number;
}

export default function SegmentedControl({ mode, onChange, count }: Props) {
  const base =
    'h-9 px-4 rounded-full text-[13px] font-medium transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]';

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-[var(--surface)] border border-[var(--border)]">
      <button
        onClick={() => onChange('custom')}
        className={`${base} ${
          mode === 'custom'
            ? 'bg-[var(--accent)] text-[var(--on-accent)]'
            : 'text-[var(--text-sec)] hover:text-[var(--text)]'
        }`}
      >
        Custom design
      </button>
      <button
        onClick={() => onChange('catalog')}
        className={`${base} ${
          mode === 'catalog'
            ? 'bg-[var(--accent)] text-[var(--on-accent)]'
            : 'text-[var(--text-sec)] hover:text-[var(--text)]'
        }`}
      >
        Catalog
        <span
          className={`inline-flex items-center justify-center ml-1.5 h-5 min-w-5 px-1.5 rounded-full text-[11px] leading-none tabular-nums ${
            mode === 'catalog'
              ? 'bg-[var(--on-accent)] text-[var(--accent)]'
              : 'bg-[var(--accent)]/10 text-[var(--accent-text)]'
          }`}
        >
          {count}
        </span>
      </button>
    </div>
  );
}