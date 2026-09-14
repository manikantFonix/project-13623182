import type { ReactNode } from 'react';

interface Props {
  icon: string;
  title: string;
  description: string;
  right?: ReactNode;
}

export default function CardHeader({ icon, title, description, right }: Props) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 flex items-center justify-center rounded-[12px] bg-[var(--muted)] shrink-0">
          <i className={`${icon} text-[20px] text-[var(--text-sec)]`} />
        </span>
        <div>
          <h3 className="text-[15px] font-medium text-[var(--text)]">{title}</h3>
          <p className="mt-0.5 text-[13px] text-[var(--text-sec)]">{description}</p>
        </div>
      </div>
      {right}
    </div>
  );
}