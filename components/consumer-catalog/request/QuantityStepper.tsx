'use client';

const btn =
  'w-11 h-11 lg:w-8 lg:h-8 shrink-0 inline-flex items-center justify-center text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]';

export default function QuantityStepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center w-fit rounded-full border border-[#DCE3F0] bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label={`Decrease quantity of ${label}`}
        disabled={value <= 1}
        className={`${btn} disabled:opacity-40 disabled:pointer-events-none`}
      >
        <i className="ri-subtract-line text-[16px] w-4 h-4 inline-flex items-center justify-center" aria-hidden />
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={String(value)}
        onChange={(e) => {
          const digits = e.target.value.replace(/[^0-9]/g, '');
          if (digits === '') {
            onChange(1);
            return;
          }
          onChange(Math.max(1, parseInt(digits, 10)));
        }}
        aria-label={`Quantity of ${label}`}
        className="w-12 h-11 lg:h-8 text-center text-[13px] tabular-nums text-[#16233E] bg-white outline-none border-x border-[#DCE3F0] focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-inset"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={`Increase quantity of ${label}`}
        className={btn}
      >
        <i className="ri-add-line text-[16px] w-4 h-4 inline-flex items-center justify-center" aria-hidden />
      </button>
    </div>
  );
}