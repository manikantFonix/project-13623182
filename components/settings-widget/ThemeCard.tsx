'use client';

import { themeCopy, themeStatusFor, type WidgetState } from './data';
import ConsumerPreview from './ConsumerPreview';

export default function ThemeCard({ state }: { state: WidgetState }) {
  const status = themeStatusFor(state);
  const c = themeCopy[status];

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <h3 className="text-[15px] font-medium text-[var(--text)]">How it looks</h3>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        The widget reads your website and matches it — your colors, your
        typeface, your button shape. There's nothing to set up.
      </p>

      <p className="mt-3 text-[13px] font-medium leading-none" style={{ color: c.color }}>
        {c.label}
      </p>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">{c.explanation}</p>

      <div className="mt-6">
        <p className="text-[13px] text-[var(--text-sec)]">What your customers see.</p>
        <div className="mt-2 rounded-[12px] bg-[var(--muted)] p-4">
          <ConsumerPreview />
        </div>
      </div>
    </section>
  );
}