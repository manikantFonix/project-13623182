'use client';

import WidgetStatusPill from './WidgetStatusPill';
import {
  installLabels,
  installTone,
  themeLabels,
  themeTone,
  type Installation,
} from './data';
import { fmt } from '../data';
import { focusRing } from '../tokens';

const head =
  'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]';

function Row({
  installation,
  onSuspend,
  onReinstate,
}: {
  installation: Installation;
  onSuspend: (id: string) => void;
  onReinstate: (id: string) => void;
}) {
  const suspended = installation.install === 'suspended';

  return (
    <tr className="border-b border-[var(--muted)] last:border-b-0">
      <th scope="row" className="pl-5 pr-4 py-4 text-left align-top font-normal min-w-[210px]">
        <span className="block text-[13px] font-semibold text-[var(--text)]">
          {installation.retailer}
        </span>
        <span className="mt-0.5 block text-[12px] break-words text-[var(--text-sec)]">
          {installation.origin}
        </span>
      </th>

      <td className="px-4 py-4 align-top">
        <WidgetStatusPill tone={installTone[installation.install]}>
          {installLabels[installation.install]}
        </WidgetStatusPill>
        <span className="mt-1.5 block text-[12px] leading-relaxed text-[var(--text-sec)]">
          {installation.lastSeen}
        </span>
      </td>

      <td className="px-4 py-4 align-top min-w-[220px]">
        <WidgetStatusPill tone={themeTone[installation.theme]}>
          {themeLabels[installation.theme]}
        </WidgetStatusPill>
        <span className="mt-1.5 block text-[12px] leading-relaxed text-[var(--text-sec)]">
          {installation.themeReason}
        </span>
      </td>

      <td className="px-4 py-4 align-top text-right min-w-[180px]">
        <span className="block text-[13px] tabular-nums text-[var(--text)]">
          {fmt(installation.refusals)}
        </span>
        <span className="mt-1.5 block text-[12px] leading-relaxed text-[var(--text-sec)]">
          {installation.refusalNote}
        </span>
      </td>

      <td className="px-4 py-4 align-top min-w-[130px]">
        {installation.frameBlocked ? (
          <span className="inline-flex items-start gap-1.5 text-[12px] leading-relaxed text-[var(--alert-strong)]">
            <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0">
              <i className="ri-shield-cross-line text-[14px]" aria-hidden="true" />
            </span>
            Blocked by site policy
          </span>
        ) : (
          <span className="text-[12px] leading-relaxed text-[var(--text-sec)]">
            Not blocked
          </span>
        )}
      </td>

      <td className="pl-4 pr-5 py-4 align-top text-right whitespace-nowrap">
        {suspended ? (
          <button
            type="button"
            onClick={() => onReinstate(installation.id)}
            className={`h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium transition-colors duration-150 hover:bg-[var(--accent-hover)] ${focusRing}`}
          >
            Reinstate
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onSuspend(installation.id)}
            className={`h-9 px-4 rounded-full border border-[var(--alert)] bg-[var(--surface)] text-[13px] font-medium text-[var(--alert)] transition-colors duration-150 hover:bg-[var(--alert)]/10 ${focusRing}`}
          >
            Suspend
          </button>
        )}
      </td>
    </tr>
  );
}

export default function WidgetsTable({
  installations,
  onSuspend,
  onReinstate,
}: {
  installations: Installation[];
  onSuspend: (id: string) => void;
  onReinstate: (id: string) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full min-w-[1080px]">
        <caption className="sr-only">
          Every widget installation, with install status and when it was last seen, theme status and
          the reason where not matched, origin refusals this period, and whether the site blocks the
          frame.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="pl-5 pr-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-text)]">
              Installation
            </th>
            <th scope="col" className={`${head} text-left`}>Install</th>
            <th scope="col" className={`${head} text-left`}>Theme</th>
            <th scope="col" className={`${head} text-right`}>Origin refusals</th>
            <th scope="col" className={`${head} text-left`}>Frame</th>
            <th scope="col" className={`${head} text-right`}>
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {installations.map((installation) => (
            <Row
              key={installation.id}
              installation={installation}
              onSuspend={onSuspend}
              onReinstate={onReinstate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}