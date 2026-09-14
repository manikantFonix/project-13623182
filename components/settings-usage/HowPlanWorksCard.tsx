import CardHeader from './CardHeader';
import { planLimits } from './data';

export default function HowPlanWorksCard() {
  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <CardHeader
        icon="ri-information-line"
        title="How your plan will work"
        description="A few rules worth knowing before you start."
      />

      <ul className="mt-5 space-y-2">
        {planLimits.map((line) => (
          <li key={line} className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center text-[var(--text-sec)] shrink-0">
              <i className="ri-check-line text-[16px]" />
            </span>
            <span className="text-[13px] text-[var(--text)]">{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}