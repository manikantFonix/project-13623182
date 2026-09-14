'use client';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CatalogSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-[260px]">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[16px] text-[var(--text-sec)] pointer-events-none">
        <i className="ri-search-line" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search catalogs"
        aria-label="Search catalogs"
        className="w-full h-9 pl-9 pr-9 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full placeholder:text-[var(--text-sec)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
      />
      {value !== '' && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-[14px] text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <i className="ri-close-line" />
        </button>
      )}
    </div>
  );
}