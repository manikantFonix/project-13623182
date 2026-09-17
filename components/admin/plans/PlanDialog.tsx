'use client';

import { useRef, useState } from 'react';
import PlansDialog from './PlansDialog';
import PlanToggle from './PlanToggle';
import PlanPointsField from './PlanPointsField';
import PlanAccessField from './PlanAccessField';
import { focusRing } from '../tokens';
import {
  type AccessKey,
  type Plan,
  type PlanStatus,
} from './data';

const inputClass = `mt-1.5 w-full h-9 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 text-[13px] text-[var(--text)] placeholder:text-[var(--muted-text)] transition-colors duration-150 ${focusRing}`;
const labelClass = 'block text-[12px] font-semibold text-[var(--text)]';
const sectionClass = 'mt-5 border-t border-[var(--border)] pt-5';
const sectionTitle = 'text-[13px] font-semibold text-[var(--text)]';
const sectionHint = 'mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]';

export interface PlanValues {
  name: string;
  description: string;
  price: number;
  allowance: number;
  popular: boolean;
  points: string[];
  access: AccessKey[];
  status: PlanStatus;
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
  const [description, setDescription] = useState(plan?.description ?? '');
  const [price, setPrice] = useState(plan ? String(plan.price) : '');
  const [allowance, setAllowance] = useState(plan ? String(plan.allowance) : '');
  const [popular, setPopular] = useState(Boolean(plan?.popular));
  const [points, setPoints] = useState<string[]>(plan?.points ?? ['']);
  const [access, setAccess] = useState<AccessKey[]>(plan?.access ?? []);
  const [status, setStatus] = useState<PlanStatus>(plan?.status ?? 'live');

  const parsedPrice = Number(price);
  const parsedAllowance = Number(allowance);
  const valid =
    name.trim().length > 0 &&
    Number.isFinite(parsedPrice) &&
    parsedPrice > 0 &&
    Number.isFinite(parsedAllowance) &&
    parsedAllowance > 0;

  return (
    <PlansDialog labelledBy="plan-dialog-title" onClose={onCancel} initialFocus={safeRef}>
      <h2 id="plan-dialog-title" className="text-[18px] font-semibold text-[var(--text)]">
        {editing ? `Edit ${plan?.name}` : 'Create a plan'}
      </h2>
      <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
        {editing
          ? 'Changes apply to new subscribers. Existing subscribers keep their terms.'
          : 'A new plan a retailer can be put on. Set its price, what it includes and what it unlocks.'}
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

        <div className="col-span-2">
          <label htmlFor="plan-description" className={labelClass}>
            Description
          </label>
          <textarea
            id="plan-description"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={submitting}
            placeholder="Who this plan is for and what it covers."
            className={`mt-1.5 w-full rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-3 py-2.5 text-[13px] leading-relaxed text-[var(--text)] placeholder:text-[var(--muted-text)] resize-none transition-colors duration-150 ${focusRing}`}
          />
        </div>

        <div>
          <label htmlFor="plan-price" className={labelClass}>
            Price (USD, per month)
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
      </div>

      <div className={sectionClass}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className={sectionTitle}>Mark as popular</span>
            <p className={sectionHint}>
              Highlights this plan on the pricing screen as the recommended tier.
            </p>
          </div>
          <div className="mt-2 shrink-0">
            <PlanToggle
              checked={popular}
              onChange={setPopular}
              label="Mark as popular"
              disabled={submitting}
            />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <span className={sectionTitle}>Feature points</span>
        <p className={sectionHint}>The bullets a retailer sees on this plan.</p>
        <div className="mt-3">
          <PlanPointsField points={points} onChange={setPoints} disabled={submitting} />
        </div>
      </div>

      <div className={sectionClass}>
        <span className={sectionTitle}>Plan access options</span>
        <p className={sectionHint}>What this plan unlocks for the retailer.</p>
        <div className="mt-3">
          <PlanAccessField access={access} onChange={setAccess} disabled={submitting} />
        </div>
      </div>

      <div className={sectionClass}>
        <span className={sectionTitle}>Status</span>
        <p className={sectionHint}>Inactive plans stay hidden from new retailers.</p>
        <div className="mt-3 flex gap-1 p-1 rounded-full bg-[var(--muted)] w-[280px]">
          {(
            [
              { value: 'live' as PlanStatus, label: 'Active' },
              { value: 'archived' as PlanStatus, label: 'Inactive' },
            ]
          ).map((option) => {
            const active = status === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                disabled={submitting}
                onClick={() => setStatus(option.value)}
                className={`flex-1 h-7 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                  active
                    ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                    : 'text-[var(--text-sec)] hover:text-[var(--text)]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
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
              description: description.trim(),
              price: parsedPrice,
              allowance: parsedAllowance,
              popular,
              points: points.map((point) => point.trim()).filter(Boolean),
              access,
              status,
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