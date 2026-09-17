'use client';

import { cardBase } from '../tokens';
import { fmtInt } from './data';

interface Tile {
  id: string;
  label: string;
  figure: string;
  note: string;
  alert: boolean;
}

export default function SubsSummary({
  active,
  trial,
  cancelling,
  atZero,
  consumed,
}: {
  active: number;
  trial: number;
  cancelling: number;
  atZero: number;
  consumed: number;
}) {
  const tiles: Tile[] = [
    {
      id: 'active',
      label: 'Active subscriptions',
      figure: fmtInt(active),
      note: 'Paying and inside their billing period.',
      alert: false,
    },
    {
      id: 'trial',
      label: 'On free trial',
      figure: fmtInt(trial),
      note:
        trial > 0
          ? 'No charge yet. Billing starts when the trial ends.'
          : 'Nobody is on a trial right now.',
      alert: false,
    },
    {
      id: 'cancelling',
      label: 'Cancelling at period end',
      figure: fmtInt(cancelling),
      note: 'Access continues until the period ends.',
      alert: false,
    },
    {
      id: 'zero',
      label: 'At zero renders',
      figure: fmtInt(atZero),
      note:
        atZero > 0
          ? 'Their widgets have stopped generating.'
          : 'Every retailer has renders left.',
      alert: atZero > 0,
    },
    {
      id: 'consumed',
      label: 'Renders consumed',
      figure: fmtInt(consumed),
      note: 'Across every retailer this period.',
      alert: false,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className={`${cardBase} px-5 py-4 ${
            tile.alert ? 'border-[var(--alert)] bg-[var(--amber-bg)]' : ''
          }`}
        >
          <p
            className={`text-[12px] font-medium ${
              tile.alert ? 'text-[var(--alert-strong)]' : 'text-[var(--text-sec)]'
            }`}
          >
            {tile.label}
          </p>
          <p
            className={`mt-2 text-[26px] font-semibold tracking-[-0.02em] tabular-nums ${
              tile.alert ? 'text-[var(--alert-strong)]' : 'text-[var(--text)]'
            }`}
          >
            {tile.figure}
          </p>
          <p
            className={`mt-1.5 text-[12px] leading-relaxed ${
              tile.alert ? 'text-[var(--alert-strong)]' : 'text-[var(--muted-text)]'
            }`}
          >
            {tile.note}
          </p>
        </div>
      ))}
    </div>
  );
}