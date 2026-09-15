'use client';

import { useRef, useState } from 'react';
import PlansDialog from './PlansDialog';
import { focusRing } from '../tokens';
import { intervalLabel, type BillingInterval, type Plan } from './data';

const inputClass = `mt-1.5 w-full h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`;
const labelClass = 'block text-[12px] font-semibold text-[var(--text)]';

export interface PlanValues {
  name: string;
  price: number;
  interval: BillingInterval;
  allowance: number;
  seats: number;
}

export default function PlanDialog({
  plan,
  submitting,
  failed,
  onCancel,
  onConfirm,
}: {
  plan?: Plan;
  submitting: boolean;
  failed: boolean;
  onCancel: () => void;
  onConfirm: (values: PlanValues) => void;
}) {
  const safeRef = useRef<HTMLButtonElement>(null);
  const editing = Boolean(plan);
  const [name, setName] = useState(plan?.name ?? '');
  const [price, setPrice] = useState(plan ? String(plan.price) : '');
  const [interval, setInterval] = useState<BillingInterval>(plan?.interval ?? 'month');
  const [allowance, setAllowance] = useState(plan ? String(plan.allowance) : '');
  const [seats, setSeats] = useState(plan ? String(plan.seats) : '');

  const parsedPrice = Number(price);
  const parsedAllowance = Number(allowance);
  const parsedSeats = Number(seats);
  const valid =
    name.trim().length > 0 &&
    Number.isFinite(parsedPrice) &&
    parsedPrice > 0 &&
    Number.isFinite(parsedAllowance) &&
    parsedAllowance > 0 &&
    Number.isFinite(parsedSeats) &&
    parsedSeats > 0;

  const intervalWord = interval === 'month' ? 'per month' : 'per year';

  return (
    <PlansDialog labelledBy="plan-dialog-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="plan-dialog-title" className="text-[18px] font-semibold text-[var(--text)]">
        {editing ? `Edit ${plan?.name}` : 'Create a plan'}
      </h2>
      <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
        {editing
          ? 'Changes apply to new subscribers. Existing subscribers keep their terms.'
          : 'A new plan a retailer can be put on. Gating is set outside this screen.'}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label htmlFor="plan-name" className={labelClass}>
            Plan name
          </label>
          <input
            id="plan-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={submitting}
            placeholder="e.g. Atelier"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="plan-price" className={labelClass}>
            Price (USD, {intervalWord})
          </label>
          <input
            id="plan-price"
            type="number"
            min="1"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            disabled={submitting}
            className={inputClass}
          />
        </div>

        <div>
          <span className={labelClass}>Billing interval</span>
          <div className="mt-1.5 flex gap-1 p-1 rounded-full bg-[var(--muted)]">
            {(['month', 'year'] as BillingInterval[]).map((value) => {
              const active = interval === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  disabled={submitting}
                  onClick={() => setInterval(value)}
                  className={`flex-1 h-7 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                    active
                      ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                      : 'text-[var(--text-sec)] hover:text-[var(--text)]'
                  }`}
                >
                  {intervalLabel(value)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="plan-allowance" className={labelClass}>
            Base allowance (renders)
          </label>
          <input
            id="plan-allowance"
            type="number"
            min="1"
            value={allowance}
            onChange={(event) => setAllowance(event.target.value)}
            disabled={submitting}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="plan-seats" className={labelClass}>
            Seats
          </label>
          <input
            id="plan-seats"
            type="number"
            min="1"
            value={seats}
            onChange={(event) => setSeats(event.target.value)}
            disabled={submitting}
            className={inputClass}
          />
        </div>
      </div>

      {failed && (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-[var(--border-strong)] bg-[var(--amber-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--alert-strong)]"
        >
          The plan could not be saved. Nothing changed. Try again.
        </p>
      )}

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          ref={safeRef}
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] disabled:opacity-50 ${focusRing}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() =>
            onConfirm({
              name: name.trim(),
              price: parsedPrice,
              interval,
              allowance: parsedAllowance,
              seats: parsedSeats,
            })
          }
          disabled={!valid || submitting}
          className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-default ${focusRing}`}
        >
          {submitting ? 'Saving' : editing ? 'Save changes' : 'Create plan'}
        </button>
      </div>
    </PlansDialog>
  );
}