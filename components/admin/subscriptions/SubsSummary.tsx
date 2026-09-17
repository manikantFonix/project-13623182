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
  inactive,
  expired,
  cancelling,
  consumed,
}: {
  active: number;
  inactive: number;
  expired: number;
  cancelling: number;
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
      id: 'inactive',
      label: 'Inactive',
      figure: fmtInt(inactive),
      note:
        inactive > 0
          ? 'No plan running. Nothing is being generated.'
          : 'Every retailer has a running plan.',
      alert: false,
    },
    {
      id: 'expired',
      label: 'Expired',
      figure: fmtInt(expired),
      note:
        expired > 0
          ? 'The billing period ended without renewal.'
          : 'No subscription has lapsed.',
      alert: expired > 0,
    },
    {
      id: 'cancelling',
      label: 'Cancelling at period end',
      figure: fmtInt(cancelling),
      note: 'Access continues until the period ends.',
      alert: false,
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