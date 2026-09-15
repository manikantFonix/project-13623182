'use client';

import StatTile from './StatTile';
import type { AccountsData } from './data';
import { fmt } from './data';

export default function AccountsSection({
  accounts,
  periodLabel,
  total,
}: {
  accounts: AccountsData;
  periodLabel: string;
  total: number;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile
        label="Active retailers"
        value={fmt(accounts.active)}
        caption={`${fmt(accounts.newThisPeriod)} of them joined in ${periodLabel.toLowerCase()}.`}
      />
      <StatTile
        label="Awaiting a plan"
        value={fmt(accounts.awaiting)}
        caption="Verified but never subscribed."
      />
      <StatTile
        label="Disabled"
        value={fmt(accounts.disabled)}
        caption="Catalog links offline, widget not serving."
      />
      <StatTile
        label="Total renders spent"
        value={fmt(total)}
        caption="By cause in Where the renders went."
      />
    </div>
  );
}