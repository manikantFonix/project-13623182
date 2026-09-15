'use client';

import GenerationDialog from './GenerationDialog';
import StepStatusPill from './StepStatusPill';
import RenderCostChip from './RenderCostChip';
import { focusRing } from '../tokens';
import {
  CURRENT_VERSION,
  PROMPT_SET,
  operationLabels,
  statusLabels,
  type LogImage,
  type LogStep,
} from './data';

function ImagePane({
  title,
  images,
  note,
  alert = false,
}: {
  title: string;
  images: LogImage[];
  note: string;
  alert?: boolean;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--muted)] p-3.5">
      <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-sec)]">
        {title}
      </p>
      <div className="mt-3 flex flex-col gap-3">
        {images.map((image) => (
          <figure key={`${title}-${image.name}`}>
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full aspect-[4/3] rounded-[8px] border border-[var(--border)] bg-[var(--surface)] object-cover object-top"
            />
            <figcaption className="mt-2 text-[12px] leading-relaxed text-[var(--text-sec)]">
              <span className="font-mono text-[12px] text-[var(--text)]">{image.name}</span>
              {' · '}
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <p
        className={`mt-3 text-[12px] leading-relaxed ${
          alert ? 'font-medium text-[var(--alert-strong)]' : 'text-[var(--muted-text)]'
        }`}
      >
        {note}
      </p>
    </div>
  );
}

export default function GenerationStepDetail({ step, onClose }: { step: LogStep; onClose: () => void }) {
  const score = step.score ? ` ${step.score}` : '';

  return (
    <GenerationDialog labelledBy="generation-step-title" onClose={onClose}>
      <header className="border-b border-[var(--border)] px-6 py-5">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Step detail · read-only
            </p>
            <h2
              id="generation-step-title"
              className="mt-2 text-[19px] font-semibold tracking-[-0.02em] text-[var(--text)]"
            >
              {step.view} · {operationLabels[step.operation]}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StepStatusPill status={step.status} label={`${statusLabels[step.status]}${score}`} />
              <RenderCostChip costsRender={step.costsRender} />
              <span className="text-[12px] tabular-nums text-[var(--muted-text)]">{step.time}</span>
            </div>
            <p className="mt-3 max-w-[720px] text-[13px] leading-relaxed text-[var(--text-sec)]">
              {step.summary}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close step detail"
            className={`w-9 h-9 shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text-sec)] transition-colors duration-150 hover:bg-[var(--muted)] ${focusRing}`}
          >
            <i className="ri-close-line text-[18px]" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <section aria-label="Images for this step">
          <div className="grid gap-3 sm:grid-cols-2">
            <ImagePane
              title="Input"
              images={step.inputs}
              note={
                step.inputs.length > 1
                  ? 'Both passed views were supplied to this step.'
                  : 'The image this step read, as it was at the time.'
              }
            />
            <ImagePane
              title={step.output.checked ? 'Checked' : 'Output'}
              images={[step.output]}
              note={
                step.output.failedCheck
                  ? `Failed: ${step.output.failedCheck}`
                  : step.output.checked
                    ? 'A check makes no image; this is the render it examined.'
                    : 'Produced by this step, and why it was billed.'
              }
              alert={Boolean(step.output.failedCheck)}
            />
          </div>
        </section>

        <section aria-label="Prompt sent for this step" className="mt-7">
          <h3 className="text-[13px] font-semibold text-[var(--text)]">
            Prompt sent for this step
          </h3>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
            {step.prompt.label} · pinned version {step.prompt.version}, shown as sent — not as the set
            reads today. Select the text to compare or copy it.
          </p>
          <pre className="mt-3 select-text whitespace-pre-wrap break-words rounded-[12px] border border-[var(--border)] bg-[var(--muted)] p-4 font-mono text-[12px] leading-relaxed text-[var(--text)]">
            {step.prompt.text}
          </pre>
        </section>

        <section aria-label="Model and settings" className="mt-7">
          <h3 className="text-[13px] font-semibold text-[var(--text)]">Model and settings</h3>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {step.prompt.settings.map((setting) => (
              <div
                key={setting.label}
                className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
              >
                <dt className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--muted-text)]">
                  {setting.label}
                </dt>
                <dd className="mt-1.5 font-mono text-[12px] tabular-nums text-[var(--text)]">
                  {setting.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[12px] leading-relaxed text-[var(--text-sec)]">
            {step.costsRender
              ? 'This step produced an image, so it was billed as one render.'
              : 'No image produced, so nothing was billed — a check never is.'}
          </p>
        </section>

        <section
          aria-label="Pinned prompt version"
          className="mt-7 rounded-[12px] border border-[var(--border)] bg-[var(--muted)] px-5 py-4 flex items-start gap-3"
        >
          <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-sec)]">
            <i className="ri-pushpin-2-line text-[15px]" aria-hidden="true" />
          </span>
          <p className="text-[12px] leading-relaxed text-[var(--text-sec)]">
            Pinned to version {step.prompt.version} when this step ran; the {PROMPT_SET} set reads
            version {CURRENT_VERSION} now. The later text is never shown in its place.
          </p>
        </section>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] px-6 py-4">
        <p className="text-[12px] text-[var(--muted-text)]">
          Link to this step:{' '}
          <span className="font-mono break-all text-[var(--text-sec)]">
            /admin/generation-log?step={step.id}
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className={`h-9 px-5 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
        >
          Close
        </button>
      </footer>
    </GenerationDialog>
  );
}