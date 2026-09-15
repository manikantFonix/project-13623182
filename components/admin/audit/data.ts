export type AuditScope = 'act' | 'access';

export type AuditGroup =
  | 'account'
  | 'widget'
  | 'billing'
  | 'settings'
  | 'provider'
  | 'access';

export type AuditState =
  | 'populated'
  | 'acts'
  | 'access'
  | 'noMatch'
  | 'oneAdmin'
  | 'loading'
  | 'error';

export type AuditScopeFilter = 'acts' | 'access' | 'all';
export type AuditPeriod = '24h' | '7d' | '30d' | 'all';

export interface AuditChange {
  label: string;
  from: string;
  to: string;
}

export interface AuditEntry {
  id: string;
  scope: AuditScope;
  group: AuditGroup;
  kind: string;
  subject: string;
  summary: string;
  change?: AuditChange;
  reason?: string;
  retailer?: string;
  actor: string;
  date: string;
  time: string;
}

const ACTORS = {
  anouk: 'anouk.de.vries@craftsmanai.com',
  priya: 'priya.raman@craftsmanai.com',
  tom: 'tom.becker@craftsmanai.com',
  sofia: 'sofia.marchetti@craftsmanai.com',
  system: 'System',
};

export const ADMIN_FOCUS = ACTORS.priya;

export const ENTRIES: AuditEntry[] = [
  {
    id: 'a-1501',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1301',
    summary: 'Opened while answering a support email.',
    retailer: 'Aurora & Co',
    actor: ACTORS.anouk,
    date: '2026-09-15',
    time: '11:42',
  },
  {
    id: 'a-1502',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1301',
    summary: 'Reopened minutes later on the same call.',
    retailer: 'Aurora & Co',
    actor: ACTORS.anouk,
    date: '2026-09-15',
    time: '11:38',
  },
  {
    id: 'a-1503',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-07',
    summary: 'Opened to check a quoted lead time.',
    actor: ACTORS.priya,
    date: '2026-09-15',
    time: '11:21',
  },
  {
    id: 'a-1504',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1177',
    summary: 'Opened to confirm a delivery address.',
    retailer: 'Lune Atelier',
    actor: ACTORS.priya,
    date: '2026-09-15',
    time: '11:05',
  },
  {
    id: 'a-1505',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-12',
    summary: 'Opened while comparing two quotes.',
    actor: ACTORS.tom,
    date: '2026-09-15',
    time: '10:58',
  },
  {
    id: 'a-1506',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1042',
    summary: 'Opened to check a repair note.',
    retailer: 'Marchetti Fine Jewellery',
    actor: ACTORS.tom,
    date: '2026-09-15',
    time: '10:47',
  },
  {
    id: 'a-1507',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1204',
    summary: 'Opened to review an earlier request.',
    retailer: 'Aurora & Co',
    actor: ACTORS.anouk,
    date: '2026-09-15',
    time: '10:22',
  },
  {
    id: 'a-1508',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-09',
    summary: 'Opened to check a manufacturer address.',
    actor: ACTORS.sofia,
    date: '2026-09-15',
    time: '09:51',
  },
  {
    id: 'a-1509',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-0988',
    summary: 'Opened after a delivery question.',
    retailer: 'Ortega Goldsmiths',
    actor: ACTORS.sofia,
    date: '2026-09-15',
    time: '09:40',
  },
  {
    id: 'a-1510',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-03',
    summary: 'Opened to confirm a published lead time.',
    actor: ACTORS.priya,
    date: '2026-09-15',
    time: '09:12',
  },
  {
    id: 'a-1511',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1130',
    summary: 'Opened to read a past order.',
    retailer: 'Verity Jewels',
    actor: ACTORS.tom,
    date: '2026-09-15',
    time: '08:58',
  },
  {
    id: 'a-1512',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-15',
    summary: 'Opened while drafting a quote.',
    actor: ACTORS.anouk,
    date: '2026-09-15',
    time: '08:31',
  },
  {
    id: 'a-1401',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1266',
    summary: 'Opened to check an older enquiry.',
    retailer: 'Hallam & Finch',
    actor: ACTORS.priya,
    date: '2026-09-14',
    time: '16:20',
  },
  {
    id: 'a-1402',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-05',
    summary: 'Opened to check a response time.',
    actor: ACTORS.priya,
    date: '2026-09-14',
    time: '16:02',
  },
  {
    id: 'a-1403',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-0921',
    summary: 'Opened after a product question.',
    retailer: 'Bright & Stone',
    actor: ACTORS.sofia,
    date: '2026-09-14',
    time: '15:47',
  },
  {
    id: 'a-1404',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-11',
    summary: 'Opened to review an earlier quote.',
    actor: ACTORS.tom,
    date: '2026-09-14',
    time: '14:30',
  },
  {
    id: 'a-1405',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1077',
    summary: 'Opened to confirm a stone grade.',
    retailer: 'Lune Atelier',
    actor: ACTORS.anouk,
    date: '2026-09-14',
    time: '13:05',
  },
  {
    id: 'a-1406',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1355',
    summary: 'Opened to check an approval.',
    retailer: 'Marchetti Fine Jewellery',
    actor: ACTORS.anouk,
    date: '2026-09-14',
    time: '11:15',
  },
  {
    id: 'e-1401',
    scope: 'act',
    group: 'billing',
    kind: 'Top-up price changed',
    subject: 'Top-up · price per 1,000 renders',
    summary: 'Applies to top-ups bought after this change.',
    change: { label: 'Price per 1,000 renders', from: '$9.00', to: '$12.00' },
    actor: ACTORS.priya,
    date: '2026-09-14',
    time: '10:03',
  },
  {
    id: 'e-1402',
    scope: 'act',
    group: 'account',
    kind: 'Team member removed',
    subject: 'Marchetti Fine Jewellery',
    summary: 'One member\u2019s access removed at the retailer\u2019s request.',
    retailer: 'Marchetti Fine Jewellery',
    actor: ACTORS.tom,
    date: '2026-09-14',
    time: '09:20',
  },
  {
    id: 'e-1301',
    scope: 'act',
    group: 'widget',
    kind: 'Widget suspended',
    subject: 'Hallam & Finch',
    summary: 'The widget no longer serves on their site.',
    reason: 'Their site stopped loading the snippet on 12 August.',
    retailer: 'Hallam & Finch',
    actor: ACTORS.tom,
    date: '2026-09-13',
    time: '16:40',
  },
  {
    id: 'a-1301',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-14',
    summary: 'Opened while checking a quote.',
    actor: ACTORS.tom,
    date: '2026-09-13',
    time: '15:10',
  },
  {
    id: 'e-1302',
    scope: 'act',
    group: 'account',
    kind: 'Retailer enabled',
    subject: 'Verity Jewels',
    summary: 'Their catalogs and widget are live again.',
    retailer: 'Verity Jewels',
    actor: ACTORS.sofia,
    date: '2026-09-13',
    time: '14:05',
  },
  {
    id: 'a-1302',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Customer record · CUS-1402',
    summary: 'Opened to check the closed account.',
    retailer: 'Verity Jewels',
    actor: ACTORS.sofia,
    date: '2026-09-13',
    time: '12:30',
  },
  {
    id: 'a-1303',
    scope: 'access',
    group: 'access',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-02',
    summary: 'Opened to confirm a spec sheet.',
    actor: ACTORS.sofia,
    date: '2026-09-13',
    time: '11:44',
  },
  {
    id: 'e-1303',
    scope: 'act',
    group: 'settings',
    kind: 'Estimator setting changed',
    subject: 'Range uplift',
    summary: 'Widens every estimate produced from here on.',
    change: { label: 'Range uplift', from: '8%', to: '10%' },
    actor: ACTORS.priya,
    date: '2026-09-13',
    time: '11:20',
  },
  {
    id: 'e-1304',
    scope: 'act',
    group: 'billing',
    kind: 'Refund issued',
    subject: 'Marchetti Fine Jewellery',
    summary: 'Returned to the card on file.',
    change: { label: 'Refunded', from: '', to: '$1,240.00' },
    reason: 'Double charge on their August invoice.',
    retailer: 'Marchetti Fine Jewellery',
    actor: ACTORS.sofia,
    date: '2026-09-13',
    time: '10:12',
  },
  {
    id: 'e-1305',
    scope: 'act',
    group: 'billing',
    kind: 'Plan archived',
    subject: 'Starter (legacy)',
    summary: 'No longer offered to new retailers.',
    actor: ACTORS.tom,
    date: '2026-09-13',
    time: '09:30',
  },
  {
    id: 'e-1201',
    scope: 'act',
    group: 'provider',
    kind: 'Webhook signature failed',
    subject: 'Stripe · invoice.paid',
    summary: 'Signature did not match the configured signing secret.',
    actor: ACTORS.system,
    date: '2026-09-12',
    time: '22:01',
  },
  {
    id: 'e-1202',
    scope: 'act',
    group: 'provider',
    kind: 'Webhook signature failed',
    subject: 'Stripe · customer.subscription.deleted',
    summary: 'Signature verification failed before the event was read.',
    actor: ACTORS.system,
    date: '2026-09-12',
    time: '21:58',
  },
  {
    id: 'e-1203',
    scope: 'act',
    group: 'provider',
    kind: 'Provider signing secret replaced',
    subject: 'Stripe · signing secret',
    summary: 'Incoming events are verified against the new secret.',
    actor: ACTORS.tom,
    date: '2026-09-12',
    time: '21:44',
  },
  {
    id: 'e-1204',
    scope: 'act',
    group: 'settings',
    kind: 'Prompt rolled back',
    subject: 'Ring · Phase 1 · Front view · Generation',
    summary: 'The earlier wording is in use again.',
    change: { label: 'Version', from: 'v5', to: 'v4' },
    reason: 'The v5 wording was widening the shank in renders.',
    actor: ACTORS.anouk,
    date: '2026-09-12',
    time: '14:22',
  },
  {
    id: 'e-1205',
    scope: 'act',
    group: 'account',
    kind: 'Retailer created',
    subject: 'Bright & Stone',
    summary: 'Created from the console with no plan attached.',
    retailer: 'Bright & Stone',
    actor: ACTORS.sofia,
    date: '2026-09-12',
    time: '12:10',
  },
  {
    id: 'e-1206',
    scope: 'act',
    group: 'settings',
    kind: 'AI setting changed',
    subject: 'Retry Limit',
    summary: 'Caps the automatic retries on a mismatched render.',
    change: { label: 'Retry Limit', from: '10', to: '5' },
    actor: ACTORS.tom,
    date: '2026-09-12',
    time: '10:05',
  },
  {
    id: 'e-1101',
    scope: 'act',
    group: 'account',
    kind: 'Retailer disabled',
    subject: 'Verity Jewels',
    summary: 'Their catalogs and widget were taken offline.',
    reason: 'Repeated non-payment of the August invoice.',
    retailer: 'Verity Jewels',
    actor: ACTORS.anouk,
    date: '2026-09-11',
    time: '09:15',
  },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const fmtDay = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

export const GROUP_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All types' },
  { value: 'account', label: 'Accounts' },
  { value: 'widget', label: 'Widgets' },
  { value: 'billing', label: 'Plans and billing' },
  { value: 'settings', label: 'Settings' },
  { value: 'provider', label: 'Providers and webhooks' },
  { value: 'access', label: 'Record access' },
];

export const PERIOD_OPTIONS: { value: AuditPeriod; label: string }[] = [
  { value: 'all', label: 'Any time' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
];

const PERIOD_CUTOFF: Record<Exclude<AuditPeriod, 'all'>, string> = {
  '24h': '2026-09-15',
  '7d': '2026-09-09',
  '30d': '2026-08-16',
};

const unique = (values: string[]): string[] => Array.from(new Set(values)).sort();

export const ACTOR_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All administrators' },
  ...unique(ENTRIES.map((entry) => entry.actor)).map((actor) => ({
    value: actor,
    label: actor,
  })),
];

export const RETAILER_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All retailers' },
  ...unique(
    ENTRIES.map((entry) => entry.retailer).filter((value): value is string => Boolean(value))
  ).map((retailer) => ({ value: retailer, label: retailer })),
];

export interface AuditFilterState {
  scope: AuditScopeFilter;
  group: string;
  actor: string;
  retailer: string;
  period: AuditPeriod;
  query: string;
}

export const filterEntries = (entries: AuditEntry[], filters: AuditFilterState): AuditEntry[] => {
  const term = filters.query.trim().toLowerCase();
  const cutoff = filters.period === 'all' ? null : PERIOD_CUTOFF[filters.period];

  return entries.filter((entry) => {
    if (filters.scope === 'acts' && entry.scope !== 'act') return false;
    if (filters.scope === 'access' && entry.scope !== 'access') return false;
    if (filters.group !== 'all' && entry.group !== filters.group) return false;
    if (filters.actor !== 'all' && entry.actor !== filters.actor) return false;
    if (filters.retailer !== 'all' && entry.retailer !== filters.retailer) return false;
    if (cutoff && entry.date < cutoff) return false;
    if (!term) return true;
    return [entry.subject, entry.summary, entry.reason ?? '', entry.kind, entry.retailer ?? '']
      .join(' ')
      .toLowerCase()
      .includes(term);
  });
};

export interface AuditDay {
  date: string;
  label: string;
  entries: AuditEntry[];
}

export const groupByDay = (entries: AuditEntry[]): AuditDay[] => {
  const days: AuditDay[] = [];
  entries.forEach((entry) => {
    const last = days[days.length - 1];
    if (last && last.date === entry.date) {
      last.entries.push(entry);
    } else {
      days.push({ date: entry.date, label: fmtDay(entry.date), entries: [entry] });
    }
  });
  return days;
};