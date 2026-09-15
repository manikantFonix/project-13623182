export type AdminState = 'populated' | 'quiet' | 'loading' | 'error';
export type AdminPeriodId = '30d' | '90d' | 'year';

export interface AdminPeriodOption {
  id: AdminPeriodId;
  label: string;
  range: string;
}

export const adminPeriods: AdminPeriodOption[] = [
  { id: '30d', label: 'Last 30 days', range: '1 – 30 August 2026' },
  { id: '90d', label: 'Last 90 days', range: '2 June – 30 August 2026' },
  { id: 'year', label: 'This year', range: '1 January – 30 August 2026' },
];

export const adminPeriodFor = (id: AdminPeriodId): AdminPeriodOption =>
  adminPeriods.find((p) => p.id === id)!;

export interface MetricRow {
  label: string;
  value: number;
}

export interface ConsumptionCause {
  id: string;
  label: string;
  note: string;
  value: number;
}

export type FeedTone = 'attention' | 'good' | 'info';

export interface FeedEvent {
  id: string;
  retailer: string;
  text: string;
  time: string;
  tone: FeedTone;
}

export interface AccountsData {
  active: number;
  newThisPeriod: number;
  awaiting: number;
  disabled: number;
}

export interface ConsumerData {
  visitors: number;
  catalogInquiries: number;
  widgetInquiries: number;
  estimates: number;
}

export interface AdminBucket {
  accounts: AccountsData;
  phases: { phase1: MetricRow[]; phase2: MetricRow[] };
  consumer: ConsumerData;
  consumption: ConsumptionCause[];
}

const CONSUMPTION_30: ConsumptionCause[] = [
  {
    id: 'custom',
    label: 'Custom design generation',
    note: 'Bespoke pieces made from a description',
    value: 4820,
  },
  {
    id: 'ingestion',
    label: 'Product ingestion',
    note: 'New products added to a catalog',
    value: 2140,
  },
  {
    id: 'repair',
    label: 'Repair passes',
    note: 'Automatic corrections when a render did not match its photograph',
    value: 1974,
  },
  {
    id: 'refine',
    label: 'Design refinement',
    note: 'Views a retailer asked to be redone',
    value: 1648,
  },
  {
    id: 'widget',
    label: 'Widget generation',
    note: 'Designs made by visitors on retailer websites',
    value: 1092,
  },
  {
    id: 'reupload',
    label: 'Re-uploads',
    note: 'Products regenerated after photographs were replaced',
    value: 604,
  },
  {
    id: 'color',
    label: 'Color extensions',
    note: 'Existing products generated in a color added later',
    value: 388,
  },
];

const CONSUMPTION_90: ConsumptionCause[] = [
  { id: 'custom', label: 'Custom design generation', note: 'Bespoke pieces made from a description', value: 11540 },
  { id: 'ingestion', label: 'Product ingestion', note: 'New products added to a catalog', value: 5180 },
  { id: 'repair', label: 'Repair passes', note: 'Automatic corrections when a render did not match its photograph', value: 4690 },
  { id: 'refine', label: 'Design refinement', note: 'Views a retailer asked to be redone', value: 3924 },
  { id: 'widget', label: 'Widget generation', note: 'Designs made by visitors on retailer websites', value: 2612 },
  { id: 'reupload', label: 'Re-uploads', note: 'Products regenerated after photographs were replaced', value: 1438 },
  { id: 'color', label: 'Color extensions', note: 'Existing products generated in a color added later', value: 926 },
];

const CONSUMPTION_YEAR: ConsumptionCause[] = [
  { id: 'custom', label: 'Custom design generation', note: 'Bespoke pieces made from a description', value: 26840 },
  { id: 'ingestion', label: 'Product ingestion', note: 'New products added to a catalog', value: 11620 },
  { id: 'repair', label: 'Repair passes', note: 'Automatic corrections when a render did not match its photograph', value: 10960 },
  { id: 'refine', label: 'Design refinement', note: 'Views a retailer asked to be redone', value: 8840 },
  { id: 'widget', label: 'Widget generation', note: 'Designs made by visitors on retailer websites', value: 5960 },
  { id: 'reupload', label: 'Re-uploads', note: 'Products regenerated after photographs were replaced', value: 3218 },
  { id: 'color', label: 'Color extensions', note: 'Existing products generated in a color added later', value: 2104 },
];

const BUCKETS: Record<AdminPeriodId, AdminBucket> = {
  '30d': {
    accounts: { active: 148, newThisPeriod: 12, awaiting: 9, disabled: 4 },
    phases: {
      phase1: [
        { label: 'Designs generated', value: 1284 },
        { label: 'Refinements', value: 412 },
        { label: 'Sent to a customer', value: 806 },
        { label: 'Approved', value: 591 },
        { label: 'Rejected', value: 164 },
        { label: 'Quotes received', value: 438 },
        { label: 'Quotes accepted', value: 297 },
      ],
      phase2: [
        { label: 'Products ingested', value: 2140 },
        { label: 'Catalogs published', value: 96 },
        { label: 'Catalogs unpublished', value: 31 },
        { label: 'Renders passed', value: 7984 },
        { label: 'Renders flagged', value: 612 },
      ],
    },
    consumer: { visitors: 18420, catalogInquiries: 742, widgetInquiries: 318, estimates: 486 },
    consumption: CONSUMPTION_30,
  },
  '90d': {
    accounts: { active: 148, newThisPeriod: 34, awaiting: 9, disabled: 4 },
    phases: {
      phase1: [
        { label: 'Designs generated', value: 3090 },
        { label: 'Refinements', value: 984 },
        { label: 'Sent to a customer', value: 1942 },
        { label: 'Approved', value: 1426 },
        { label: 'Rejected', value: 393 },
        { label: 'Quotes received', value: 1048 },
        { label: 'Quotes accepted', value: 712 },
      ],
      phase2: [
        { label: 'Products ingested', value: 5180 },
        { label: 'Catalogs published', value: 214 },
        { label: 'Catalogs unpublished', value: 68 },
        { label: 'Renders passed', value: 19240 },
        { label: 'Renders flagged', value: 1466 },
      ],
    },
    consumer: { visitors: 43900, catalogInquiries: 1762, widgetInquiries: 806, estimates: 1168 },
    consumption: CONSUMPTION_90,
  },
  year: {
    accounts: { active: 148, newThisPeriod: 61, awaiting: 9, disabled: 4 },
    phases: {
      phase1: [
        { label: 'Designs generated', value: 5842 },
        { label: 'Refinements', value: 1904 },
        { label: 'Sent to a customer', value: 3688 },
        { label: 'Approved', value: 2742 },
        { label: 'Rejected', value: 786 },
        { label: 'Quotes received', value: 1986 },
        { label: 'Quotes accepted', value: 1412 },
      ],
      phase2: [
        { label: 'Products ingested', value: 11620 },
        { label: 'Catalogs published', value: 341 },
        { label: 'Catalogs unpublished', value: 118 },
        { label: 'Renders passed', value: 39840 },
        { label: 'Renders flagged', value: 2918 },
      ],
    },
    consumer: { visitors: 96400, catalogInquiries: 3964, widgetInquiries: 1742, estimates: 2486 },
    consumption: CONSUMPTION_YEAR,
  },
};

export const SNAPSHOT_DATE = '30 August 2026';

export const FEED: FeedEvent[] = [
  {
    id: 'f1',
    retailer: 'Aurora & Co',
    text: 'ran out of renders. Their widget has stopped generating.',
    time: '2 hours ago',
    tone: 'attention',
  },
  {
    id: 'f2',
    retailer: 'Lune Atelier',
    text: 'published "Winter 2026" with 84 products.',
    time: '5 hours ago',
    tone: 'good',
  },
  {
    id: 'f3',
    retailer: 'Hallam & Finch',
    text: 'has not been seen loading since 12 August.',
    time: 'Yesterday',
    tone: 'attention',
  },
  {
    id: 'f4',
    retailer: 'Verity Jewels',
    text: 'disabled by an administrator. 3 catalogs taken offline.',
    time: 'Yesterday',
    tone: 'info',
  },
  {
    id: 'f5',
    retailer: 'Platinum prices',
    text: 'serving beyond their window — provider unreachable.',
    time: '2 days ago',
    tone: 'attention',
  },
  {
    id: 'f6',
    retailer: 'Marchetti Fine Jewellery',
    text: 'verified and started on Catalog.',
    time: '3 days ago',
    tone: 'good',
  },
];

export interface AdminViewData {
  period: AdminPeriodOption;
  accounts: AccountsData;
  phase1: MetricRow[];
  phase2: MetricRow[];
  consumer: ConsumerData;
  causes: ConsumptionCause[];
  repairs: ConsumptionCause;
  total: number;
  feed: FeedEvent[];
}

const ZERO_ACCOUNTS: AccountsData = { active: 0, newThisPeriod: 0, awaiting: 0, disabled: 0 };

function zeroRows(rows: MetricRow[]): MetricRow[] {
  return rows.map((r) => ({ ...r, value: 0 }));
}

export function getAdminData(state: AdminState, period: AdminPeriodId): AdminViewData {
  const bucket = BUCKETS[period];
  const periodOpt = adminPeriodFor(period);
  const repairs = bucket.consumption.find((c) => c.id === 'repair')!;
  const others = bucket.consumption.filter((c) => c.id !== 'repair');
  const total = bucket.consumption.reduce((sum, c) => sum + c.value, 0);

  if (state === 'quiet') {
    return {
      period: periodOpt,
      accounts: ZERO_ACCOUNTS,
      phase1: zeroRows(bucket.phases.phase1),
      phase2: zeroRows(bucket.phases.phase2),
      consumer: { visitors: 0, catalogInquiries: 0, widgetInquiries: 0, estimates: 0 },
      causes: others.map((c) => ({ ...c, value: 0 })),
      repairs: { ...repairs, value: 0 },
      total: 0,
      feed: [],
    };
  }

  return {
    period: periodOpt,
    accounts: bucket.accounts,
    phase1: bucket.phases.phase1,
    phase2: bucket.phases.phase2,
    consumer: bucket.consumer,
    causes: others,
    repairs,
    total,
    feed: FEED,
  };
}

export const fmt = (n: number): string => n.toLocaleString('en-US');