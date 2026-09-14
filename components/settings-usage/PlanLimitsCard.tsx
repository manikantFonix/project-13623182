import { planLimits } from './data';

export default function PlanLimitsCard() {
  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-5">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--success-bg)]">
          <i className="ri-file-list-2-line text-[15px] text-[var(--success)]" />
        </span>
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Plan Limits & Behavior
        </h2>
      </div>
      <ul className="mt-5 space-y-3">
        {planLimits.map((line) => (
          <li key={line} className="flex items-start gap-3">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--text-sec)] shrink-0" />
            <p className="text-[13px] text-[var(--text)]">{line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}