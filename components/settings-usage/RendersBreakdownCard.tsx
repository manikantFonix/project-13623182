import CardHeader from './CardHeader';
import { consumptionData } from './data';

export default function RendersBreakdownCard() {
  const total = consumptionData.reduce((sum, row) => sum + row.count, 0);

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <CardHeader
        icon="ri-list-check-2"
        title="Where your renders went"
        description="This period, by cause."
      />

      <div className="mt-5">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 pb-2 border-b border-[var(--border)]">
          <span className="text-[13px] font-medium text-[var(--text-sec)]">
            Cause
          </span>
          <span className="text-[13px] font-medium text-[var(--text-sec)] text-right">
            Renders
          </span>
        </div>

        {consumptionData.map((row) => (
          <div
            key={row.cause}
            className="grid grid-cols-[1fr_auto] items-center gap-4 py-3 border-b border-[var(--border)]"
          >
            <div>
              <p className="text-[13px] text-[var(--text)]">{row.cause}</p>
              <p className="mt-0.5 text-[12px] text-[var(--text-sec)]">
                {row.subline}
              </p>
            </div>
            <p className="text-[13px] font-medium text-[var(--text)] tabular-nums text-right">
              {row.count}
            </p>
          </div>
        ))}

        <div className="grid grid-cols-[1fr_auto] items-center gap-4 pt-3">
          <span className="text-[13px] font-semibold text-[var(--text)]">
            Total
          </span>
          <span className="text-[13px] font-semibold text-[var(--text)] tabular-nums text-right">
            {total}
          </span>
        </div>
      </div>

      <p className="mt-4 text-[13px] text-[var(--text-sec)]">
        Repairs are the ones you can't predict. When a render doesn't match your
        photograph the system corrects it and rechecks, and each attempt costs a
        render. That's why a product quoted at least 12 can end up costing more.
      </p>
    </section>
  );
}