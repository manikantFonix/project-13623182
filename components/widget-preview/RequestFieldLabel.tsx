'use client';

export default function RequestFieldLabel({
  htmlFor,
  label,
  optional,
}: {
  htmlFor: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <label
        htmlFor={htmlFor}
        className="text-[13px] font-medium"
        style={{ color: 'var(--w-text)' }}
      >
        {label}
      </label>
      {optional && (
        <span className="text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
          Optional
        </span>
      )}
    </div>
  );
}