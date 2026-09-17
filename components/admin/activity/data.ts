export type ActivityScope = 'act' | 'access';

export type ActivityGroup =
  | 'account'
  | 'widget'
  | 'billing'
  | 'settings'
  | 'provider'
  | 'access';

export type ActivityTone = 'attention' | 'good' | 'info';

export type ActivityState =
  | 'populated'
  | 'access'
  | 'noMatch'
  | 'loading'
  | 'error';

export type ActivityScopeFilter = 'act' | 'access' | 'all';
export type ActivityPeriod = '24h' | '7d' | '30d' | 'all';

export interface ActivityChange {
  label: string;
  from: string;
  to: string;
}

export interface ActivityEntry {
  id: string;
  scope: ActivityScope;
  group: ActivityGroup;
  tone: ActivityTone;
  kind: string;
  subject: string;
  summary: string;
  change?: ActivityChange;
  reason?: string;
  retailer?: string;
  date: string;
  time: string;
  relative: string;
}

export const ENTRIES: ActivityEntry[] = [
  {
    id: 'a-1501',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1301',
    summary: 'Opened while answering a support email.',
    retailer: 'Aurora & Co',
    date: '2026-09-15',
    time: '11:42',
    relative: '18 minutes ago',
  },
  {
    id: 'a-1502',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1301',
    summary: 'Reopened minutes later on the same call.',
    retailer: 'Aurora & Co',
    date: '2026-09-15',
    time: '11:38',
    relative: '22 minutes ago',
  },
  {
    id: 'a-1503',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-07',
    summary: 'Opened to check a quoted lead time.',
    date: '2026-09-15',
    time: '11:21',
    relative: '39 minutes ago',
  },
  {
    id: 'a-1504',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1177',
    summary: 'Opened to confirm a delivery address.',
    retailer: 'Lune Atelier',
    date: '2026-09-15',
    time: '11:05',
    relative: '55 minutes ago',
  },
  {
    id: 'a-1505',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-12',
    summary: 'Opened while comparing two quotes.',
    date: '2026-09-15',
    time: '10:58',
    relative: '1 hour ago',
  },
  {
    id: 'a-1506',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1042',
    summary: 'Opened to check a repair note.',
    retailer: 'Marchetti Fine Jewellery',
    date: '2026-09-15',
    time: '10:47',
    relative: '1 hour ago',
  },
  {
    id: 'a-1507',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1204',
    summary: 'Opened to review an earlier request.',
    retailer: 'Aurora & Co',
    date: '2026-09-15',
    time: '10:22',
    relative: '2 hours ago',
  },
  {
    id: 'a-1508',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-09',
    summary: 'Opened to check a manufacturer address.',
    date: '2026-09-15',
    time: '09:51',
    relative: '2 hours ago',
  },
  {
    id: 'a-1509',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-0988',
    summary: 'Opened after a delivery question.',
    retailer: 'Ortega Goldsmiths',
    date: '2026-09-15',
    time: '09:40',
    relative: '2 hours ago',
  },
  {
    id: 'a-1510',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-03',
    summary: 'Opened to confirm a published lead time.',
    date: '2026-09-15',
    time: '09:12',
    relative: '3 hours ago',
  },
  {
    id: 'a-1511',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1130',
    summary: 'Opened to read a past order.',
    retailer: 'Verity Jewels',
    date: '2026-09-15',
    time: '08:58',
    relative: '3 hours ago',
  },
  {
    id: 'a-1512',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-15',
    summary: 'Opened while drafting a quote.',
    date: '2026-09-15',
    time: '08:31',
    relative: '3 hours ago',
  },
  {
    id: 'a-1401',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1266',
    summary: 'Opened to check an older enquiry.',
    retailer: 'Hallam & Finch',
    date: '2026-09-14',
    time: '16:20',
    relative: 'Yesterday',
  },
  {
    id: 'a-1402',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-05',
    summary: 'Opened to check a response time.',
    date: '2026-09-14',
    time: '16:02',
    relative: 'Yesterday',
  },
  {
    id: 'a-1403',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-0921',
    summary: 'Opened after a product question.',
    retailer: 'Bright & Stone',
    date: '2026-09-14',
    time: '15:47',
    relative: 'Yesterday',
  },
  {
    id: 'a-1404',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-11',
    summary: 'Opened to review an earlier quote.',
    date: '2026-09-14',
    time: '14:30',
    relative: 'Yesterday',
  },
  {
    id: 'a-1405',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1077',
    summary: 'Opened to confirm a stone grade.',
    retailer: 'Lune Atelier',
    date: '2026-09-14',
    time: '13:05',
    relative: 'Yesterday',
  },
  {
    id: 'a-1406',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1355',
    summary: 'Opened to check an approval.',
    retailer: 'Marchetti Fine Jewellery',
    date: '2026-09-14',
    time: '11:15',
    relative: 'Yesterday',
  },
  {
    id: 'e-1401',
    scope: 'act',
    group: 'billing',
    tone: 'info',
    kind: 'Top-up price changed',
    subject: 'Top-up · price per 1,000 renders',
    summary: 'Applies to top-ups bought after this change.',
    change: { label: 'Price per 1,000 renders', from: '$9.00', to: '$12.00' },
    date: '2026-09-14',
    time: '10:03',
    relative: 'Yesterday',
  },
  {
    id: 'e-1301',
    scope: 'act',
    group: 'widget',
    tone: 'attention',
    kind: 'Widget suspended',
    subject: 'Hallam & Finch',
    summary: 'Their widget no longer serves on their site.',
    reason: 'Their site stopped loading the snippet on 12 August.',
    retailer: 'Hallam & Finch',
    date: '2026-09-13',
    time: '16:40',
    relative: '2 days ago',
  },
  {
    id: 'a-1301',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-14',
    summary: 'Opened while checking a quote.',
    date: '2026-09-13',
    time: '15:10',
    relative: '2 days ago',
  },
  {
    id: 'e-1302',
    scope: 'act',
    group: 'account',
    tone: 'good',
    kind: 'Retailer enabled',
    subject: 'Verity Jewels',
    summary: 'Their catalogs and widget are live again.',
    retailer: 'Verity Jewels',
    date: '2026-09-13',
    time: '14:05',
    relative: '2 days ago',
  },
  {
    id: 'a-1302',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Customer record · CUS-1402',
    summary: 'Opened to check the closed account.',
    retailer: 'Verity Jewels',
    date: '2026-09-13',
    time: '12:30',
    relative: '2 days ago',
  },
  {
    id: 'a-1303',
    scope: 'access',
    group: 'access',
    tone: 'info',
    kind: 'Record access',
    subject: 'Manufacturer record · MAN-02',
    summary: 'Opened to confirm a spec sheet.',
    date: '2026-09-13',
    time: '11:44',
    relative: '2 days ago',
  },
  {
    id: 'e-1303',
    scope: 'act',
    group: 'settings',
    tone: 'info',
    kind: 'Estimator setting changed',
    subject: 'Range uplift',
    summary: 'Widens every estimate produced from here on.',
    change: { label: 'Range uplift', from: '8%', to: '10%' },
    date: '2026-09-13',
    time: '11:20',
    relative: '2 days ago',
  },
  {
    id: 'e-1305',
    scope: 'act',
    group: 'billing',
    tone: 'info',
    kind: 'Plan archived',
    subject: 'Starter (legacy)',
    summary: 'No longer offered to new retailers.',
    date: '2026-09-13',
    time: '09:30',
    relative: '2 days ago',
  },
  {
    id: 'e-1201',
    scope: 'act',
    group: 'provider',
    tone: 'attention',
    kind: 'Webhook signature failed',
    subject: 'Stripe · invoice.paid',
    summary: 'Signature did not match the configured signing secret.',
    date: '2026-09-12',
    time: '22:01',
    relative: '3 days ago',
  },
  {
    id: 'e-1202',
    scope: 'act',
    group: 'provider',
    tone: 'attention',
    kind: 'Webhook signature failed',
    subject: 'Stripe · customer.subscription.deleted',
    summary: 'Signature verification failed before the event was read.',
    date: '2026-09-12',
    time: '21:58',
    relative: '3 days ago',
  },
  {
    id: 'e-1203',
    scope: 'act',
    group: 'provider',
    tone: 'info',
    kind: 'Provider signing secret replaced',
    subject: 'Stripe · signing secret',
    summary: 'Incoming events are verified against the new secret.',
    date: '2026-09-12',
    time: '21:44',
    relative: '3 days ago',
  },
  {
    id: 'e-1204',
    scope: 'act',
    group: 'settings',
    tone: 'info',
    kind: 'Prompt rolled back',
    subject: 'Ring · Phase 1 · Front view · Generation',
    summary: 'The earlier wording is in use again.',
    change: { label: 'Version', from: 'v5', to: 'v4' },
    reason: 'The v5 wording was widening the shank in renders.',
    date: '2026-09-12',
    time: '14:22',
    relative: '3 days ago',
  },
  {
    id: 'e-1205',
    scope: 'act',
    group: 'account',
    tone: 'good',
    kind: 'Retailer created',
    subject: 'Bright & Stone',
    summary: 'Created from the console with no plan attached.',
    retailer: 'Bright & Stone',
    date: '2026-09-12',
    time: '12:10',
    relative: '3 days ago',
  },
  {
    id: 'e-1206',
    scope: 'act',
    group: 'settings',
    tone: 'info',
    kind: 'AI setting changed',
    subject: 'Retry Limit',
    summary: 'Caps the automatic retries on a mismatched render.',
    change: { label: 'Retry Limit', from: '10', to: '5' },
    date: '2026-09-12',
    time: '10:05',
    relative: '3 days ago',
  },
  {
    id: 'e-1101',
    scope: 'act',
    group: 'account',
    tone: 'info',
    kind: 'Retailer disabled',
    subject: 'Verity Jewels',
    summary: 'Their catalogs and widget were taken offline.',
    reason: 'Repeated non-payment of the August invoice.',
    retailer: 'Verity Jewels',
    date: '2026-09-11',
    time: '09:15',
    relative: '4 days ago',
  },
];

export const GROUP_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All types' },
  { value: 'account', label: 'Accounts' },
  { value: 'widget', label: 'Widgets' },
  { value: 'billing', label: 'Plans and billing' },
  { value: 'settings', label: 'Settings' },
  { value: 'provider', label: 'Providers and webhooks' },
  { value: 'access', label: 'Record access' },
];

export const PERIOD_OPTIONS: { value: ActivityPeriod; label: string }[] = [
  { value: 'all', label: 'Any time' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
];

const PERIOD_CUTOFF: Record<Exclude<ActivityPeriod, 'all'>, string> = {
  '24h': '2026-09-15',
  '7d': '2026-09-09',
  '30d': '2026-08-16',
};

const unique = (values: string[]): string[] => Array.from(new Set(values)).sort();

export const RETAILER_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All retailers' },
  ...unique(
    ENTRIES.map((entry) => entry.retailer).filter((value): value is string => Boolean(value))
  ).map((retailer) => ({ value: retailer, label: retailer })),
];

export interface ActivityFilterState {
  scope: ActivityScopeFilter;
  group: string;
  retailer: string;
  period: ActivityPeriod;
  query: string;
}

export const filterEntries = (
  entries: ActivityEntry[],
  filters: ActivityFilterState
): ActivityEntry[] => {
  const term = filters.query.trim().toLowerCase();
  const cutoff = filters.period === 'all' ? null : PERIOD_CUTOFF[filters.period];

  return entries.filter((entry) => {
    if (filters.scope === 'act' && entry.scope !== 'act') return false;
    if (filters.scope === 'access' && entry.scope !== 'access') return false;
    if (filters.group !== 'all' && entry.group !== filters.group) return false;
    if (filters.retailer !== 'all' && entry.retailer !== filters.retailer) return false;
    if (cutoff && entry.date < cutoff) return false;
    if (!term) return true;
    return [entry.subject, entry.summary, entry.reason ?? '', entry.kind, entry.retailer ?? '']
      .join(' ')
      .toLowerCase()
      .includes(term);
  });
};

export const sortEntries = (entries: ActivityEntry[]): ActivityEntry[] =>
  [...entries].sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`));

export const toneMeta: Record<
  ActivityTone,
  { icon: string; color: string; label: string }
> = {
  attention: {
    icon: 'ri-error-warning-line',
    color: 'var(--alert-strong)',
    label: 'Needs attention',
  },
  good: {
    icon: 'ri-checkbox-circle-line',
    color: 'var(--success)',
    label: 'Went well',
  },
  info: {
    icon: 'ri-information-line',
    color: 'var(--text-sec)',
    label: 'Just happened',
  },
};