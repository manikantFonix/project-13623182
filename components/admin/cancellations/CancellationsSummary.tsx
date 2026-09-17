'use client';

import { cardBase } from '../tokens';
import { fmtInt, type CancelSummary } from './data';

interface Tile {
  id: string;
  label: string;
  figure: string;
  note: string;
  alert: boolean;
}

export default function CancellationsSummary({
  summary,
  periodRange,
}: {
  summary: CancelSummary;
  periodRange: string;
}) {
  const { cancelled, gaveReason, stillActive, ended } = summary;

  const tiles: Tile[] = [
    {
      id: 'cancelled',
      label: 'Cancelled this period',
      figure: fmtInt(cancelled),
      note:
        cancelled === 0
          ? 'Nobody cancelled in this period.'
          : 'Retailers whose subscription stopped here.',
      alert: false,
    },
    {
      id: 'reason',
      label: 'Gave a reason',
      figure: fmtInt(gaveReason),
      note:
        cancelled === 0
          ? 'Nothing to read this period.'
          : `${gaveReason} of ${cancelled} left an answer behind.`,
      alert: false,
    },
    {
      id: 'active',
      label: 'Still active until period end',
      figure: fmtInt(stillActive),
      note: 'Access runs on until their paid period closes.',
      alert: false,
    },
    {
      id: 'ended',
      label: 'Already ended',
      figure: fmtInt(ended),
      note: 'Access has already stopped for these retailers.',
      alert: false,
    },
  ];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <div key={tile.id} className={`${cardBase} px-5 py-4`}>
            <p className="text-[12px] font-medium text-[var(--text-sec)]">{tile.label}</p>
            <p className="mt-2 text-[26px] font-semibold tracking-[-0.02em] tabular-nums text-[var(--text)]">
              {tile.figure}
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--muted-text)]">{tile.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-[var(--muted-text)]">
        Figures cover <span className="tabular-nums">{periodRange}</span>.
      </p>
    </div>
  );
}