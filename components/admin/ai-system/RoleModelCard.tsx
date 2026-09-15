'use client';

import ModelSelect from './ModelSelect';
import { MODELS, PROVIDERS, type ModelChoice } from './data';

export default function RoleModelCard({
  roleId,
  label,
  purpose,
  choice,
  disabled,
  onChange,
}: {
  roleId: string;
  label: string;
  purpose: string;
  choice: ModelChoice;
  disabled?: boolean;
  onChange: (choice: ModelChoice) => void;
}) {
  const models = MODELS[choice.provider] ?? [];

  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-[13px] font-semibold text-[var(--text)]">{label}</h3>
          <p id={`${roleId}-desc`} className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
            {purpose}
          </p>
        </div>
        <span className="text-[13px] tabular-nums text-[var(--muted-text)] whitespace-nowrap">
          {choice.model}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${roleId}-provider`} className="block text-[12px] font-semibold text-[var(--text)]">
            Provider
          </label>
          <div className="mt-1.5">
            <ModelSelect
              id={`${roleId}-provider`}
              label={`${label} provider`}
              value={choice.provider}
              options={PROVIDERS}
              disabled={disabled}
              onChange={(provider) => {
                const nextModels = MODELS[provider] ?? [];
                const model = nextModels.includes(choice.model) ? choice.model : nextModels[0];
                onChange({ provider, model });
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${roleId}-model`} className="block text-[12px] font-semibold text-[var(--text)]">
            Model
          </label>
          <div className="mt-1.5">
            <ModelSelect
              id={`${roleId}-model`}
              label={`${label} model`}
              value={choice.model}
              options={models}
              disabled={disabled}
              onChange={(model) => onChange({ provider: choice.provider, model })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}