import type { ReactNode } from 'react';

export function SpecGroup({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div>
      {title && <p className="text-[12px] font-medium text-[#5D6C8A]">{title}</p>}
      <div className={`rounded-[10px] bg-[#F3F6FC] px-3 ${title ? 'mt-2' : ''}`}>{children}</div>
    </div>
  );
}

export function SpecRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-[#C6D0E6] py-2.5 first:border-t-0">
      <dt className="text-[13px] text-[#5D6C8A]">{label}</dt>
      <dd className="text-[13px] text-[#16233E] text-right tabular-nums">{value}</dd>
    </div>
  );
}