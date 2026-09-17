export type ProviderMode = 'live' | 'test';
export type EventResult = 'accepted' | 'rejected';

export interface ProviderKey {
  id: string;
  label: string;
  purpose: string;
  prefix: string;
  tail: string;
  set: boolean;
  enteredAt?: string;
  enteredBy?: string;
}

export interface ProviderEvent {
  id: string;
  type: string;
  at: string;
  result: EventResult;
  note?: string;
}

export type ProvidersPreview =
  | 'populated'
  | 'never-entered'
  | 'replacing'
  | 'replace-confirm'
  | 'saving'
  | 'save-failed'
  | 'events-accepted'
  | 'events-failures'
  | 'events-none'
  | 'loading'
  | 'error';

export const PROVIDER_MODE: ProviderMode = 'live';

export const ENDPOINT_URL = 'https://api.craftsmanai.app/functions/v1/stripe-webhook';

export const PROVIDER_KEYS: ProviderKey[] = [
  {
    id: 'publishable',
    label: 'Publishable key',
    purpose: 'Identifies the account to the browser. Masked here all the same.',
    prefix: 'pk_live',
    tail: '4f9a',
    set: true,
    enteredAt: '2026-08-12',
    enteredBy: 'Admin · R. Mensah',
  },
  {
    id: 'secret',
    label: 'Secret key',
    purpose: 'Authenticates charges. Never displayed after entry.',
    prefix: 'sk_live',
    tail: 'c21d',
    set: true,
    enteredAt: '2026-08-12',
    enteredBy: 'Admin · R. Mensah',
  },
  {
    id: 'signing',
    label: 'Signing secret',
    purpose: 'Verifies that incoming webhook events came from the provider.',
    prefix: 'whsec',
    tail: '7b3e',
    set: true,
    enteredAt: '2026-09-03',
    enteredBy: 'Admin · You',
  },
];

export const PROVIDER_EVENTS: ProviderEvent[] = [
  { id: 'ev-9', type: 'invoice.paid', at: '2026-09-15 14:22', result: 'accepted' },
  { id: 'ev-8', type: 'customer.subscription.updated', at: '2026-09-15 13:05', result: 'accepted' },
  { id: 'ev-6', type: 'invoice.payment_failed', at: '2026-09-14 09:12', result: 'accepted' },
  { id: 'ev-5', type: 'checkout.session.completed', at: '2026-09-13 16:30', result: 'accepted' },
  { id: 'ev-4', type: 'payment_intent.succeeded', at: '2026-09-13 11:04', result: 'accepted' },
  {
    id: 'ev-3',
    type: 'invoice.paid',
    at: '2026-09-12 22:01',
    result: 'rejected',
    note: 'Signature does not match the configured signing secret.',
  },
  {
    id: 'ev-2',
    type: 'customer.subscription.deleted',
    at: '2026-09-12 21:58',
    result: 'rejected',
    note: 'Signature verification failed before the event was read.',
  },
];

export const TAX_FACTS: { term: string; value: string }[] = [
  { term: 'Tax calculation', value: 'Performed by the provider' },
  { term: 'Default behaviour', value: 'Exclusive — tax added to the price' },
  { term: 'Product tax code', value: 'txcd_10000000 · General services' },
  { term: 'Registrations', value: 'United States only' },
  { term: 'Reverse charge', value: 'Off' },
];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const fmtDate = (iso: string): string => {
  const [date] = iso.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

export const fmtDateTime = (iso: string): string => {
  const [date, time] = iso.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}, ${time}`;
};

export const maskKey = (key: ProviderKey): string =>
  `${key.prefix}_${'•'.repeat(8)}${key.tail}`;

export const acceptedEvents = (events: ProviderEvent[]): ProviderEvent[] =>
  events.filter((event) => event.result === 'accepted');

export const rejectedEvents = (events: ProviderEvent[]): ProviderEvent[] =>
  events.filter((event) => event.result === 'rejected');