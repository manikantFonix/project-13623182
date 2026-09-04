'use client';

interface Props {
  mode: 'custom' | 'catalogue';
  onChange: (mode: 'custom' | 'catalogue') => void;
  count: number;
}

export default function SegmentedControl({ mode, onChange, count }: Props) {
  const base =
    'h-9 px-4 rounded-full text-[13px] font-medium transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]';

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-[#EFF2F3]">
      <button
        onClick={() => onChange('custom')}
        className={`${base} ${
          mode === 'custom'
            ? 'bg-[#16323F] text-white'
            : 'text-[#5C6870] hover:text-[#131A1F]'
        }`}
      >
        Custom design
      </button>
      <button
        onClick={() => onChange('catalogue')}
        className={`${base} ${
          mode === 'catalogue'
            ? 'bg-[#16323F] text-white'
            : 'text-[#5C6870] hover:text-[#131A1F]'
        }`}
      >
        Catalogue{' '}
        <span className="inline-block ml-1 tabular-nums">{count}</span>
      </button>
    </div>
  );
}