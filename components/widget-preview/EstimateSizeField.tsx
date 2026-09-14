'use client';

import EstimateRingSizeSelect from './EstimateRingSizeSelect';
import { GENERIC_SIZE_NOTE, isGenericSize, sizeSchemaFor } from './estimate';

interface Props {
  category: string;
  value: string;
  onChange: (v: string) => void;
}

export default function EstimateSizeField({ category, value, onChange }: Props) {
  if (category === 'ring') {
    return <EstimateRingSizeSelect value={value} onChange={onChange} />;
  }

  const schema = sizeSchemaFor(category);
  const generic = isGenericSize(category);

  return (
    <div>
      <label
        htmlFor="estimate-size"
        className="block text-[13px] font-medium"
        style={{ color: 'var(--w-text)' }}
      >
        {schema.label}
      </label>
      <div className="mt-2 relative">
        <input
          id="estimate-size"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ''))}
          className="w-full h-11 pl-3.5 pr-12 rounded-[12px] border border-[var(--w-border)] text-[13px] tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-[var(--w-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--w-surface)]"
          style={{
            backgroundColor: 'var(--w-surface)',
            color: 'var(--w-text)',
          }}
        />
        <span
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[13px]"
          style={{ color: 'var(--w-text-sec)' }}
        >
          {schema.unit}
        </span>
      </div>
      {generic && (
        <p className="mt-2 text-[12px]" style={{ color: 'var(--w-text-sec)' }}>
          {GENERIC_SIZE_NOTE}
        </p>
      )}
    </div>
  );
}