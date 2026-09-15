'use client';

import NumberStepper from './NumberStepper';
import { COST_REFERENCE, NOMINAL_TOKENS, mismatchMultiple, worstCaseTokens } from './data';

function Figure({ label, value, support }: { label: string; value: string; support: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--muted-text)]">
        {label}
      </div>
      <div className="mt-1 text-[30px] leading-none font-semibold tabular-nums text-[var(--text)]">
        {value}
      </div>
      <div className="mt-1.5 text-[12px] text-[var(--text-sec)]">{support}</div>
    </div>
  );
}

export default function RetryLimitCard({
  value,
  disabled,
  onChange,
}: {
  value: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  const tokens = worstCaseTokens(value);
  const multiple = mismatchMultiple(value);

  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h3 id="retry-limit-label" className="text-[13px] font-semibold text-[var(--text)]">
              Retry Limit
            </h3>
            <p
              id="retry-limit-desc"
              className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]"
            >
              How many times a render is repaired after it misses its photograph. It is also the
              largest determinant of what a catalog costs.
            </p>
          </div>
          <label htmlFor="retry-limit" className="sr-only">
            Retry Limit, in attempts
          </label>
          <NumberStepper
            inputId="retry-limit"
            describedBy="retry-limit-desc retry-limit-cost"
            value={value}
            min={1}
            max={10}
            unit="attempts"
            disabled={disabled}
            onChange={onChange}
          />
        </div>
      </div>

      <div
        id="retry-limit-cost"
        className="border-t border-[var(--border-strong)] bg-[var(--muted)] px-5 py-4"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="text-[13px] font-semibold text-[var(--text)]">Cost consequence</h4>
          <span className="text-[11px] text-[var(--muted-text)]">At the current value of {value}</span>
        </div>

        <div
          aria-live="polite"
          className="mt-3 grid grid-cols-2 gap-6"
        >
          <Figure
            label="Worst case per product"
            value={`${tokens}`}
            support={`${tokens} tokens if every view needs repair`}
          />
          <Figure
            label="Against nominal"
            value={`${multiple}\u00D7`}
            support={`${multiple} times the ${NOMINAL_TOKENS}-token nominal`}
          />
        </div>

        <p className="mt-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
          Nominal is {NOMINAL_TOKENS} tokens — four views in three metal colors. Everything above
          that is repair.
        </p>

        <table className="mt-4 w-full">
          <caption className="sr-only">Worst-case tokens by Retry Limit</caption>
          <thead>
            <tr className="text-left">
              <th
                scope="col"
                className="pb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--muted-text)]"
              >
                Retry Limit
              </th>
              <th
                scope="col"
                className="pb-2 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--muted-text)]"
              >
                Worst case
              </th>
              <th
                scope="col"
                className="pb-2 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--muted-text)]"
              >
                Multiple
              </th>
            </tr>
          </thead>
          <tbody>
            {COST_REFERENCE.map((point) => {
              const active = point.retryLimit === value;
              return (
                <tr
                  key={point.retryLimit}
                  className={active ? 'bg-[var(--surface)]' : undefined}
                >
                  <th
                    scope="row"
                    className="py-1.5 text-left text-[13px] font-medium text-[var(--text)]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="tabular-nums">{point.retryLimit}</span>
                      {active && (
                        <span className="text-[11px] font-semibold text-[var(--alert-strong)]">
                          Current
                        </span>
                      )}
                    </span>
                  </th>
                  <td className="py-1.5 text-right text-[13px] tabular-nums text-[var(--text)]">
                    {point.tokens} tokens
                  </td>
                  <td className="py-1.5 text-right text-[13px] tabular-nums text-[var(--text-sec)]">
                    {`${point.multiple}\u00D7`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}