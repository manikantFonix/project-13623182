export type RetailerStatus = 'active' | 'awaiting' | 'disabled';
export type PlanId = 'starter' | 'pro' | 'business';
export type RetailersState = 'populated' | 'no-match' | 'loading' | 'error';
export const RETAILERS_PAGE_SIZE = 8;
export type StatusFilter = 'all' | RetailerStatus;
export type PlanFilter = 'all' | 'free-trial' | PlanId;
export type PillTone = 'neutral' | 'success' | 'alert';
export type DetailVariant = 'active' | 'awaiting' | 'disabled' | 'no-catalogs' | 'no-widget';

export interface PlanMeta {
  id: PlanId;
  label: string;
  price: string;
  period: string;
  allowance: number;
  renewal: string;
}

export const PLANS: Record<PlanId, PlanMeta> = {
  starter: { id: 'starter', label: 'Starter', price: '$149', period: 'per month', allowance: 300, renewal: '1 September 2026' },
  pro: { id: 'pro', label: 'Pro', price: '$349', period: 'per month', allowance: 1200, renewal: '1 September 2026' },
  business: { id: 'business', label: 'Business', price: '$749', period: 'per month', allowance: 3500, renewal: '1 September 2026' },
};

export const planOrder: PlanId[] = ['starter', 'pro', 'business'];

export const statusLabels: Record<RetailerStatus, string> = {
  active: 'Active',
  awaiting: 'Free Trial',
  disabled: 'Inactive',
};

export const statusTone: Record<RetailerStatus, PillTone> = {
  active: 'success',
  awaiting: 'neutral',
  disabled: 'alert',
};

export interface Retailer {
  id: string;
  name: string;
  email: string;
  status: RetailerStatus;
  plan: PlanId | null;
  signedUp: string;
  lastActivity: string;
  lastActiveMins: number;
  nextBilling: string;
  catalogs: number;
  balance: number;
  createdBy: string;
  origin: string;
  hasWidget: boolean;
}

const RAW: Retailer[] = [
  { id: 'verity', name: 'Verity Jewels', email: 'studio@verityjewels.com', status: 'disabled', plan: 'business', signedUp: '4 March 2024', lastActivity: '3 days ago', lastActiveMins: 4320, nextBilling: '', catalogs: 3, balance: 0, createdBy: 'Self-registered', origin: 'verityjewels.com', hasWidget: true },
  { id: 'hallam', name: 'Hallam & Finch', email: 'hello@hallamfinch.co.uk', status: 'disabled', plan: 'pro', signedUp: '18 June 2024', lastActivity: '19 days ago', lastActiveMins: 27360, nextBilling: '', catalogs: 2, balance: 86, createdBy: 'Self-registered', origin: 'hallamfinch.co.uk', hasWidget: true },
  { id: 'bright', name: 'Bright & Stone', email: 'workshop@brightandstone.co', status: 'active', plan: 'starter', signedUp: '9 July 2026', lastActivity: '2 days ago', lastActiveMins: 2880, nextBilling: '9 October 2026', catalogs: 0, balance: 0, createdBy: 'ops@craftsmanai.com', origin: 'brightandstone.co', hasWidget: true },
  { id: 'corderie', name: 'La Corderie', email: 'atelier@lacorderie.fr', status: 'awaiting', plan: null, signedUp: '1 August 2026', lastActivity: '5 days ago', lastActiveMins: 7200, nextBilling: '', catalogs: 0, balance: 0, createdBy: 'ops@craftsmanai.com', origin: 'lacorderie.fr', hasWidget: false },
  { id: 'saintclair', name: 'Saint-Clair Joailliers', email: 'bonjour@saintclair.fr', status: 'awaiting', plan: null, signedUp: '4 August 2026', lastActivity: '6 days ago', lastActiveMins: 8640, nextBilling: '', catalogs: 1, balance: 0, createdBy: 'Self-registered', origin: 'saintclair.fr', hasWidget: false },
  { id: 'pearl', name: 'Pearl & Vine', email: 'shop@pearlandvine.co.uk', status: 'awaiting', plan: null, signedUp: '22 July 2026', lastActivity: '12 days ago', lastActiveMins: 17280, nextBilling: '', catalogs: 0, balance: 0, createdBy: 'Self-registered', origin: 'pearlandvine.co.uk', hasWidget: false },
  { id: 'lune', name: 'Lune Atelier', email: 'contact@luneatelier.fr', status: 'active', plan: 'business', signedUp: '2 February 2024', lastActivity: '3 minutes ago', lastActiveMins: 3, nextBilling: '2 October 2026', catalogs: 5, balance: 88, createdBy: 'Self-registered', origin: 'luneatelier.fr', hasWidget: true },
  { id: 'marchetti', name: 'Marchetti Fine Jewellery', email: 'info@marchetti.it', status: 'active', plan: 'business', signedUp: '11 January 2024', lastActivity: '8 minutes ago', lastActiveMins: 8, nextBilling: '11 October 2026', catalogs: 4, balance: 640, createdBy: 'ops@craftsmanai.com', origin: 'marchetti.it', hasWidget: true },
  { id: 'aurora', name: 'Aurora & Co', email: 'studio@aurora-co.com', status: 'active', plan: 'business', signedUp: '5 November 2023', lastActivity: '12 minutes ago', lastActiveMins: 12, nextBilling: '5 October 2026', catalogs: 3, balance: 412, createdBy: 'Self-registered', origin: 'shop.aurora-co.com', hasWidget: true },
  { id: 'ashford', name: 'Ashford & Vine', email: 'atelier@ashfordandvine.co.uk', status: 'active', plan: 'pro', signedUp: '27 May 2024', lastActivity: '26 minutes ago', lastActiveMins: 26, nextBilling: '27 September 2026', catalogs: 6, balance: 210, createdBy: 'Self-registered', origin: 'ashfordandvine.co.uk', hasWidget: true },
  { id: 'ravensworth', name: 'Ravensworth', email: 'hello@ravensworth.co.uk', status: 'active', plan: 'starter', signedUp: '16 September 2025', lastActivity: '40 minutes ago', lastActiveMins: 40, nextBilling: '16 September 2026', catalogs: 1, balance: 61, createdBy: 'nadia.rehman@craftsmanai.com', origin: 'ravensworth.co.uk', hasWidget: false },
  { id: 'ortega', name: 'Ortega Goldsmiths', email: 'taller@ortega-goldsmiths.com', status: 'active', plan: 'pro', signedUp: '9 July 2026', lastActivity: '3 hours ago', lastActiveMins: 180, nextBilling: '9 October 2026', catalogs: 2, balance: 2, createdBy: 'Self-registered', origin: 'ortega-goldsmiths.com', hasWidget: true },
];

const rank = (r: Retailer): number => (r.status === 'disabled' ? 0 : r.balance === 0 ? 1 : 2);

export function orderRetailers(list: Retailer[]): Retailer[] {
  return [...list].sort(
    (a, b) => rank(a) - rank(b) || a.lastActiveMins - b.lastActiveMins || a.name.localeCompare(b.name)
  );
}

export const RETAILERS: Retailer[] = orderRetailers(RAW);

export const findRetailer = (id: string): Retailer | undefined => RETAILERS.find((r) => r.id === id);

export function filterRetailers(
  list: Retailer[],
  filters: { search: string; status: StatusFilter; plan: PlanFilter }
): Retailer[] {
  const term = filters.search.trim().toLowerCase();
  return list.filter((r) => {
    if (term && !r.name.toLowerCase().includes(term) && !r.email.toLowerCase().includes(term)) return false;
    if (filters.status !== 'all' && r.status !== filters.status) return false;
    if (filters.plan === 'free-trial' && r.plan !== null) return false;
    if (filters.plan !== 'all' && filters.plan !== 'free-trial' && r.plan !== filters.plan) return false;
    return true;
  });
}

export const balanceNote = (balance: number): string => {
  if (balance === 0) return 'none left';
  if (balance <= 25) return 'running low';
  return 'renders left';
};

export interface ConsumptionCause {
  id: string;
  label: string;
  value: number;
}

export interface ConsumptionPeriod {
  label: string;
  range: string;
  used: number;
  allowance: number;
  repairs: number;
}

export interface SubscriptionInfo {
  planLabel: string;
  price: string;
  period: string;
  renewal: string;
  nextBilling: string;
  allowance: number;
}

export interface CatalogEntry {
  id: string;
  name: string;
  products: number;
  published: boolean;
  serving: number;
}

export interface WidgetInfo {
  origin: string;
  install: string;
  installTone: PillTone;
  theme: string;
  themeTone: PillTone;
  lastSeen: string;
}

export interface RetailerDetail {
  retailer: Retailer;
  subscription: SubscriptionInfo | null;
  consumption: {
    current: ConsumptionPeriod;
    causes: ConsumptionCause[];
    previous: ConsumptionPeriod[];
  } | null;
  catalogs: CatalogEntry[];
  widget: WidgetInfo | null;
}

const CAUSE_DEFS = [
  { id: 'custom', label: 'Custom design generation', weight: 0.42 },
  { id: 'ingestion', label: 'Product ingestion', weight: 0.2 },
  { id: 'refine', label: 'Design refinement', weight: 0.16 },
  { id: 'widget', label: 'Widget generation', weight: 0.11 },
  { id: 'reupload', label: 'Re-uploads', weight: 0.06 },
  { id: 'color', label: 'Color extensions', weight: 0.05 },
];

function buildConsumption(r: Retailer): RetailerDetail['consumption'] {
  if (!r.plan) return null;
  const allowance = PLANS[r.plan].allowance;
  const used = Math.max(allowance - r.balance, 0);
  const repairs = Math.round(used * 0.12);
  const nonRepair = used - repairs;
  const causes = CAUSE_DEFS.map((c) => ({ id: c.id, label: c.label, value: Math.round(nonRepair * c.weight) }));
  return {
    current: { label: 'August 2026', range: '1 – 30 August 2026', used, allowance, repairs },
    causes,
    previous: [
      { label: 'July 2026', range: '1 – 31 July 2026', used: Math.round(used * 0.88), allowance, repairs: Math.round(used * 0.88 * 0.13) },
      { label: 'June 2026', range: '1 – 30 June 2026', used: Math.round(used * 0.94), allowance, repairs: Math.round(used * 0.94 * 0.11) },
    ],
  };
}

const CATALOG_NAMES = [
  'Bridal Collection',
  'Signature Range',
  'Diamond Edit',
  'Gold Essentials',
  'New Arrivals',
  'Winter 2026',
  'Heritage Pieces',
  'Everyday Fine',
];

function buildCatalogs(r: Retailer): CatalogEntry[] {
  return Array.from({ length: r.catalogs }).map((_, i) => {
    const products = 16 + i * 7;
    const published = r.status === 'active';
    const flagged = published && i === 0 && r.catalogs > 1 ? 2 : 0;
    return {
      id: `${r.id}-cat-${i}`,
      name: CATALOG_NAMES[i % CATALOG_NAMES.length],
      products,
      published,
      serving: published ? products - flagged : 0,
    };
  });
}

const THEME_MAP: Record<string, { label: string; tone: PillTone }> = {
  aurora: { label: 'Neutral', tone: 'neutral' },
  lune: { label: 'Matched to their site', tone: 'success' },
  marchetti: { label: 'Out of date', tone: 'alert' },
  ortega: { label: 'Neutral', tone: 'neutral' },
  bright: { label: 'Matched to their site', tone: 'success' },
  ashford: { label: 'Matched to their site', tone: 'success' },
  verity: { label: 'Matched to their site', tone: 'success' },
  hallam: { label: 'Not read yet', tone: 'neutral' },
};

function buildWidget(r: Retailer): WidgetInfo | null {
  if (!r.hasWidget) return null;
  const active = r.status === 'active';
  const theme = THEME_MAP[r.id] ?? { label: 'Neutral', tone: 'neutral' as PillTone };
  return {
    origin: r.origin,
    install: active ? 'Working' : 'Suspended',
    installTone: active ? 'success' : 'alert',
    theme: theme.label,
    themeTone: theme.tone,
    lastSeen: active ? 'Last seen loading 12 minutes ago' : 'Suspended — not loading on their site',
  };
}

export function getDetail(id: string, statusOverride?: RetailerStatus): RetailerDetail | null {
  const found = findRetailer(id);
  if (!found) return null;
  const retailer = statusOverride ? { ...found, status: statusOverride } : found;
  const plan = retailer.plan ? PLANS[retailer.plan] : null;
  return {
    retailer,
    subscription: plan
      ? { planLabel: plan.label, price: plan.price, period: plan.period, renewal: plan.renewal, nextBilling: retailer.nextBilling, allowance: plan.allowance }
      : null,
    consumption: buildConsumption(retailer),
    catalogs: buildCatalogs(retailer),
    widget: buildWidget(retailer),
  };
}

export const VARIANT_IDS: Record<DetailVariant, string> = {
  active: 'aurora',
  awaiting: 'pearl',
  disabled: 'verity',
  'no-catalogs': 'bright',
  'no-widget': 'ravensworth',
};