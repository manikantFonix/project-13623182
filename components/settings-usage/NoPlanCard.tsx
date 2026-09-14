'use client';

import CardHeader from './CardHeader';
import { focusRingVar } from '../settings/theme/tokens';

const lines = [
  'Your account is set up and ready.',
  'Nothing generates until you choose a plan.',
  'You can change or cancel whenever you like.',
];

export default function NoPlanCard({ onSelect }: { onSelect: () => void }) {
  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <CardHeader
        icon="ri-vip-diamond-line"
        title="You don't have a plan yet"
        description="Pick one and you can start generating designs straight away."
      />

      <ul className="mt-5 space-y-2">
        {lines.map((line) => (
          <li key={line} className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center text-[var(--text-sec)] shrink-0">
              <i className="ri-check-line text-[16px]" />
            </span>
            <span className="text-[13px] text-[var(--text)]">{line}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button
          type="button"
          onClick={onSelect}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium hover:bg-[var(--accent-hover)] transition-colors duration-150 motion-reduce:transition-none whitespace-nowrap cursor-pointer ${focusRingVar}`}
        >
          Select a plan
        </button>
      </div>
    </section>
  );
}