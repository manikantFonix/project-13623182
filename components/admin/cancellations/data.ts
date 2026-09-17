export type CancelPeriodId = '30d' | '90d' | 'year';

export type CancellationsState = 'populated' | 'none' | 'noReason' | 'loading' | 'error';

export interface CancelPeriod {
  id: CancelPeriodId;
  label: string;
  range: string;
  short: string;
}

export const CANCEL_PERIODS: CancelPeriod[] = [
  { id: '30d', label: 'Last 30 days', range: '17 August – 16 September 2026', short: '17 Aug – 16 Sep 2026' },
  { id: '90d', label: 'Last 90 days', range: '19 June – 16 September 2026', short: '19 Jun – 16 Sep 2026' },
  { id: 'year', label: 'This year', range: '1 January – 16 September 2026', short: '1 Jan – 16 Sep 2026' },
];

export const cancelPeriodFor = (id: CancelPeriodId): CancelPeriod =>
  CANCEL_PERIODS.find((p) => p.id === id)!;

export type ReasonId = 'expensive' | 'unused' | 'alternative' | 'closed' | 'other' | 'none';

export const REASON_LABELS: Record<ReasonId, string> = {
  expensive: 'Too expensive',
  unused: 'Not using it enough',
  alternative: 'Found something else',
  closed: 'Closed or pausing the business',
  other: 'Something else',
  none: 'No reason given',
};

export const REASON_ORDER: ReasonId[] = ['unused', 'expensive', 'other', 'alternative', 'closed'];

export const NO_REASON_LABEL = 'No reason given';

export interface CancelRow {
  id: string;
  name: string;
  email: string;
  plan: string;
  tenure: string;
  allowancePct: number;
  reason: ReasonId;
  reasonText?: string;
  cancelledOn: string;
  accessEnded: boolean;
  accessEndsOn?: string;
}

const BASE: CancelRow[] = [
  {
    id: 'marchetti',
    name: 'Marchetti Fine Jewellery',
    email: 'sofia@marchettifinejewellery.co.uk',
    plan: 'Pro',
    tenure: '1 year 2 months',
    allowancePct: 88,
    reason: 'expensive',
    cancelledOn: '15 Sep 2026',
    accessEnded: false,
    accessEndsOn: '30 Sep 2026',
  },
  {
    id: 'hallam',
    name: 'Hallam & Finch',
    email: 'james@hallamfinch.com',
    plan: 'Starter',
    tenure: '7 months',
    allowancePct: 91,
    reason: 'expensive',
    cancelledOn: '14 Sep 2026',
    accessEnded: false,
    accessEndsOn: '22 Sep 2026',
  },
  {
    id: 'cleo',
    name: 'Cleo Atelier',
    email: 'cleo@cleoatelier.com',
    plan: 'Starter',
    tenure: '1 year 4 months',
    allowancePct: 14,
    reason: 'unused',
    cancelledOn: '14 Sep 2026',
    accessEnded: true,
  },
  {
    id: 'ortega',
    name: 'Ortega Goldsmiths',
    email: 'hello@ortegagoldsmiths.com',
    plan: 'Starter',
    tenure: '5 months',
    allowancePct: 9,
    reason: 'unused',
    cancelledOn: '13 Sep 2026',
    accessEnded: false,
    accessEndsOn: '20 Sep 2026',
  },
  {
    id: 'wren',
    name: 'Wren Goldsmiths',
    email: 'studio@wrengoldsmiths.co.uk',
    plan: 'Starter',
    tenure: '11 months',
    allowancePct: 12,
    reason: 'unused',
    cancelledOn: '12 Sep 2026',
    accessEnded: true,
  },
  {
    id: 'avalon',
    name: 'Avalon Jewels',
    email: 'contact@avalonjewels.com',
    plan: 'Pro',
    tenure: '2 years 1 month',
    allowancePct: 6,
    reason: 'unused',
    cancelledOn: '11 Sep 2026',
    accessEnded: false,
    accessEndsOn: '28 Sep 2026',
  },
  {
    id: 'rowan',
    name: 'Rowan & Vale',
    email: 'emma@rowanandvale.co.uk',
    plan: 'Pro',
    tenure: '1 year 9 months',
    allowancePct: 15,
    reason: 'other',
    reasonText:
      "We've been using the widgets less since we moved to selling mostly at shows. Hard to justify the monthly now.",
    cancelledOn: '10 Sep 2026',
    accessEnded: true,
  },
  {
    id: 'tanner',
    name: 'Tanner & Roe',
    email: 'sam@tannerroe.com',
    plan: 'Pro',
    tenure: '4 months',
    allowancePct: 62,
    reason: 'alternative',
    cancelledOn: '9 Sep 2026',
    accessEnded: false,
    accessEndsOn: '24 Sep 2026',
  },
  {
    id: 'penrose',
    name: 'Penrose & Co',
    email: 'info@penroseandco.com',
    plan: 'Pro',
    tenure: '3 years 2 months',
    allowancePct: 78,
    reason: 'closed',
    cancelledOn: '8 Sep 2026',
    accessEnded: true,
  },
  {
    id: 'quillon',
    name: 'Quillon Jewels',
    email: 'claire@quillonjewels.com',
    plan: 'Pro',
    tenure: '1 year 6 months',
    allowancePct: 71,
    reason: 'other',
    reasonText:
      'The tool is good but our accountant cut every subscription over £100 a month, so it had to go.',
    cancelledOn: '7 Sep 2026',
    accessEnded: false,
    accessEndsOn: '27 Sep 2026',
  },
  {
    id: 'sable',
    name: 'Sable & Marsh',
    email: 'info@sablemarsh.co.uk',
    plan: 'Business',
    tenure: '2 years 7 months',
    allowancePct: 79,
    reason: 'none',
    cancelledOn: '6 Sep 2026',
    accessEnded: false,
    accessEndsOn: '26 Sep 2026',
  },
  {
    id: 'ivy',
    name: 'Ivy & Stone',
    email: 'hello@ivyandstone.com',
    plan: 'Starter',
    tenure: '10 months',
    allowancePct: 41,
    reason: 'none',
    cancelledOn: '5 Sep 2026',
    accessEnded: true,
  },
  {
    id: 'bright',
    name: 'Bright & Stone',
    email: 'shop@brightandstone.co.uk',
    plan: 'Pro',
    tenure: '1 year 8 months',
    allowancePct: 66,
    reason: 'none',
    cancelledOn: '4 Sep 2026',
    accessEnded: true,
  },
  {
    id: 'verity',
    name: 'Verity Jewels',
    email: 'contact@verityjewels.com',
    plan: 'Pro',
    tenure: '2 years 3 months',
    allowancePct: 52,
    reason: 'none',
    cancelledOn: '3 Sep 2026',
    accessEnded: true,
  },
  {
    id: 'elara',
    name: 'Elara Fine Jewels',
    email: 'studio@elarafinejewels.com',
    plan: 'Business',
    tenure: '3 years 5 months',
    allowancePct: 73,
    reason: 'none',
    cancelledOn: '2 Sep 2026',
    accessEnded: false,
    accessEndsOn: '19 Sep 2026',
  },
  {
    id: 'hartley',
    name: 'Hartley & Sons',
    email: 'info@hartleyandsons.co.uk',
    plan: 'Business',
    tenure: '1 year 1 month',
    allowancePct: 48,
    reason: 'none',
    cancelledOn: '1 Sep 2026',
    accessEnded: true,
  },
  {
    id: 'northgate',
    name: 'Northgate Jewellers',
    email: 'hello@northgatejewellers.com',
    plan: 'Pro',
    tenure: '2 years 9 months',
    allowancePct: 57,
    reason: 'none',
    cancelledOn: '30 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'lune',
    name: 'Lune Atelier',
    email: 'bonjour@luneatelier.com',
    plan: 'Business',
    tenure: '4 years 2 months',
    allowancePct: 69,
    reason: 'none',
    cancelledOn: '28 Aug 2026',
    accessEnded: true,
  },
];

const EXTRA_90: CancelRow[] = [
  {
    id: 'fontaine',
    name: 'Fontaine & Co',
    email: 'hello@fontaineandco.com',
    plan: 'Pro',
    tenure: '1 year',
    allowancePct: 44,
    reason: 'none',
    cancelledOn: '26 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'kestrel',
    name: 'Kestrel Jewellery',
    email: 'studio@kestreljewellery.co.uk',
    plan: 'Starter',
    tenure: '9 months',
    allowancePct: 11,
    reason: 'unused',
    cancelledOn: '25 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'marlow',
    name: 'Marlow & Reid',
    email: 'contact@marlowandreid.com',
    plan: 'Pro',
    tenure: '2 years 2 months',
    allowancePct: 87,
    reason: 'expensive',
    cancelledOn: '24 Aug 2026',
    accessEnded: false,
    accessEndsOn: '18 Sep 2026',
  },
  {
    id: 'adair',
    name: 'Adair Fine Jewellery',
    email: 'info@adairfinejewellery.com',
    plan: 'Pro',
    tenure: '1 year 5 months',
    allowancePct: 58,
    reason: 'none',
    cancelledOn: '22 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'solene',
    name: 'Solene Atelier',
    email: 'hello@soleneatelier.com',
    plan: 'Starter',
    tenure: '8 months',
    allowancePct: 33,
    reason: 'other',
    reasonText:
      "We only ever needed it for one big seasonal push and that's finished now.",
    cancelledOn: '20 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'bramble',
    name: 'Bramble & Lock',
    email: 'shop@brambleandlock.co.uk',
    plan: 'Pro',
    tenure: '1 year 3 months',
    allowancePct: 61,
    reason: 'none',
    cancelledOn: '18 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'winterbourne',
    name: 'Winterbourne Jewels',
    email: 'hello@winterbournejewels.com',
    plan: 'Pro',
    tenure: '2 years 6 months',
    allowancePct: 69,
    reason: 'alternative',
    cancelledOn: '16 Aug 2026',
    accessEnded: false,
    accessEndsOn: '14 Sep 2026',
  },
  {
    id: 'ottoline',
    name: 'Ottoline Jewels',
    email: 'studio@ottolinejewels.com',
    plan: 'Starter',
    tenure: '11 months',
    allowancePct: 8,
    reason: 'unused',
    cancelledOn: '14 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'harlow',
    name: 'Harlow & Finch',
    email: 'info@harlowandfinch.co.uk',
    plan: 'Pro',
    tenure: '1 year 7 months',
    allowancePct: 54,
    reason: 'none',
    cancelledOn: '12 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'delamere',
    name: 'Delamere & Co',
    email: 'hello@delamereandco.com',
    plan: 'Pro',
    tenure: '3 years 1 month',
    allowancePct: 72,
    reason: 'closed',
    cancelledOn: '10 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'ines',
    name: 'Ines Jewellery',
    email: 'studio@inesjewellery.com',
    plan: 'Starter',
    tenure: '6 months',
    allowancePct: 47,
    reason: 'none',
    cancelledOn: '8 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'fairweather',
    name: 'Fairweather Jewels',
    email: 'hello@fairweatherjewels.co.uk',
    plan: 'Pro',
    tenure: '1 year 10 months',
    allowancePct: 17,
    reason: 'unused',
    cancelledOn: '6 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'lyra',
    name: 'Lyra Goldsmiths',
    email: 'contact@lyragoldsmiths.com',
    plan: 'Business',
    tenure: '2 years 4 months',
    allowancePct: 92,
    reason: 'expensive',
    cancelledOn: '4 Aug 2026',
    accessEnded: false,
    accessEndsOn: '12 Sep 2026',
  },
  {
    id: 'cormorant',
    name: 'Cormorant & Vale',
    email: 'info@cormorantandvale.com',
    plan: 'Pro',
    tenure: '9 months',
    allowancePct: 63,
    reason: 'none',
    cancelledOn: '2 Aug 2026',
    accessEnded: true,
  },
  {
    id: 'ashby',
    name: 'Ashby Fine',
    email: 'hello@ashbyfine.com',
    plan: 'Starter',
    tenure: '1 year 2 months',
    allowancePct: 5,
    reason: 'unused',
    cancelledOn: '30 Jul 2026',
    accessEnded: true,
  },
  {
    id: 'meridian',
    name: 'Meridian Jewels',
    email: 'studio@meridianjewels.co.uk',
    plan: 'Pro',
    tenure: '1 year 4 months',
    allowancePct: 59,
    reason: 'none',
    cancelledOn: '28 Jul 2026',
    accessEnded: true,
  },
];

const EXTRA_YEAR: CancelRow[] = [
  {
    id: 'rathbone',
    name: 'Rathbone Jewels',
    email: 'hello@rathbonejewels.com',
    plan: 'Starter',
    tenure: '1 year',
    allowancePct: 13,
    reason: 'unused',
    cancelledOn: '16 Jun 2026',
    accessEnded: true,
  },
  {
    id: 'casterly',
    name: 'Casterly & Co',
    email: 'info@casterlyandco.com',
    plan: 'Pro',
    tenure: '2 years 1 month',
    allowancePct: 62,
    reason: 'none',
    cancelledOn: '14 Jun 2026',
    accessEnded: true,
  },
  {
    id: 'penhale',
    name: 'Penhale Jewellery',
    email: 'studio@penhalejewellery.co.uk',
    plan: 'Pro',
    tenure: '1 year 8 months',
    allowancePct: 84,
    reason: 'expensive',
    cancelledOn: '11 Jun 2026',
    accessEnded: false,
    accessEndsOn: '3 Sep 2026',
  },
  {
    id: 'osgood',
    name: 'Osgood Fine Jewels',
    email: 'hello@osgoodfinejewels.com',
    plan: 'Pro',
    tenure: '3 years',
    allowancePct: 49,
    reason: 'none',
    cancelledOn: '9 Jun 2026',
    accessEnded: true,
  },
  {
    id: 'vantage',
    name: 'Vantage Jewels',
    email: 'info@vantagejewels.com',
    plan: 'Business',
    tenure: '2 years 5 months',
    allowancePct: 66,
    reason: 'closed',
    cancelledOn: '7 Jun 2026',
    accessEnded: true,
  },
  {
    id: 'larkfield',
    name: 'Larkfield & Co',
    email: 'hello@larkfieldandco.co.uk',
    plan: 'Pro',
    tenure: '1 year 5 months',
    allowancePct: 55,
    reason: 'none',
    cancelledOn: '4 Jun 2026',
    accessEnded: true,
  },
  {
    id: 'merton',
    name: 'Merton Jewellers',
    email: 'studio@mertonjewellers.com',
    plan: 'Pro',
    tenure: '2 years',
    allowancePct: 55,
    reason: 'alternative',
    cancelledOn: '2 Jun 2026',
    accessEnded: false,
    accessEndsOn: '1 Sep 2026',
  },
  {
    id: 'selby',
    name: 'Selby & Daughters',
    email: 'hello@selbyanddaughters.com',
    plan: 'Business',
    tenure: '3 years 4 months',
    allowancePct: 71,
    reason: 'none',
    cancelledOn: '30 May 2026',
    accessEnded: true,
  },
  {
    id: 'alderton',
    name: 'Alderton Jewels',
    email: 'info@aldertonjewels.co.uk',
    plan: 'Starter',
    tenure: '10 months',
    allowancePct: 10,
    reason: 'unused',
    cancelledOn: '27 May 2026',
    accessEnded: true,
  },
  {
    id: 'ridgeway',
    name: 'Ridgeway Goldsmiths',
    email: 'contact@ridgewaygoldsmiths.com',
    plan: 'Pro',
    tenure: '1 year 9 months',
    allowancePct: 58,
    reason: 'none',
    cancelledOn: '24 May 2026',
    accessEnded: true,
  },
  {
    id: 'beaumont',
    name: 'Beaumont & Fell',
    email: 'hello@beaumontandfell.com',
    plan: 'Pro',
    tenure: '2 years 7 months',
    allowancePct: 40,
    reason: 'other',
    reasonText:
      "We're pausing the business for a year while the workshop relocates. We may be back.",
    cancelledOn: '21 May 2026',
    accessEnded: true,
  },
  {
    id: 'cardew',
    name: 'Cardew Jewels',
    email: 'studio@cardewjewels.com',
    plan: 'Starter',
    tenure: '1 year 1 month',
    allowancePct: 51,
    reason: 'none',
    cancelledOn: '18 May 2026',
    accessEnded: true,
  },
  {
    id: 'halstead',
    name: 'Halstead & Co',
    email: 'info@halsteadandco.co.uk',
    plan: 'Pro',
    tenure: '2 years 2 months',
    allowancePct: 64,
    reason: 'none',
    cancelledOn: '15 May 2026',
    accessEnded: true,
  },
  {
    id: 'pemberton',
    name: 'Pemberton Jewels',
    email: 'hello@pembertonjewels.com',
    plan: 'Starter',
    tenure: '8 months',
    allowancePct: 7,
    reason: 'unused',
    cancelledOn: '12 May 2026',
    accessEnded: true,
  },
  {
    id: 'ellery',
    name: 'Ellery Fine',
    email: 'studio@elleryfine.com',
    plan: 'Pro',
    tenure: '1 year 6 months',
    allowancePct: 57,
    reason: 'none',
    cancelledOn: '9 May 2026',
    accessEnded: true,
  },
  {
    id: 'norwood',
    name: 'Norwood Jewellers',
    email: 'info@norwoodjewellers.com',
    plan: 'Business',
    tenure: '3 years 1 month',
    allowancePct: 90,
    reason: 'expensive',
    cancelledOn: '6 May 2026',
    accessEnded: false,
    accessEndsOn: '29 Aug 2026',
  },
  {
    id: 'acton',
    name: 'Acton & Bell',
    email: 'hello@actonandbell.co.uk',
    plan: 'Pro',
    tenure: '1 year 3 months',
    allowancePct: 53,
    reason: 'none',
    cancelledOn: '3 May 2026',
    accessEnded: true,
  },
  {
    id: 'sutherland',
    name: 'Sutherland Jewels',
    email: 'studio@sutherlandjewels.com',
    plan: 'Pro',
    tenure: '2 years 3 months',
    allowancePct: 60,
    reason: 'none',
    cancelledOn: '29 Apr 2026',
    accessEnded: true,
  },
  {
    id: 'waverley',
    name: 'Waverley & Co',
    email: 'info@waverleyandco.com',
    plan: 'Pro',
    tenure: '1 year 11 months',
    allowancePct: 61,
    reason: 'alternative',
    cancelledOn: '26 Apr 2026',
    accessEnded: true,
  },
  {
    id: 'kingsley',
    name: 'Kingsley Jewels',
    email: 'hello@kingsleyjewels.co.uk',
    plan: 'Starter',
    tenure: '1 year',
    allowancePct: 45,
    reason: 'none',
    cancelledOn: '22 Apr 2026',
    accessEnded: true,
  },
];

export function getRows(period: CancelPeriodId): CancelRow[] {
  if (period === '30d') return BASE;
  if (period === '90d') return [...BASE, ...EXTRA_90];
  return [...BASE, ...EXTRA_90, ...EXTRA_YEAR];
}

export function stripReasons(rows: CancelRow[]): CancelRow[] {
  return rows.map((row) => ({ ...row, reason: 'none' as ReasonId, reasonText: undefined }));
}

export interface CancelSummary {
  cancelled: number;
  gaveReason: number;
  stillActive: number;
  ended: number;
}

export function summarise(rows: CancelRow[]): CancelSummary {
  const cancelled = rows.length;
  const gaveReason = rows.filter((row) => row.reason !== 'none').length;
  const stillActive = rows.filter((row) => !row.accessEnded).length;
  return { cancelled, gaveReason, stillActive, ended: cancelled - stillActive };
}

export interface ReasonCount {
  id: ReasonId;
  label: string;
  count: number;
  share: number;
}

export function reasonCounts(rows: CancelRow[]): ReasonCount[] {
  const total = rows.filter((row) => row.reason !== 'none').length;
  return REASON_ORDER.map((id) => {
    const count = rows.filter((row) => row.reason === id).length;
    return {
      id,
      label: REASON_LABELS[id],
      count,
      share: total === 0 ? 0 : Math.round((count / total) * 100),
    };
  }).sort((a, b) => b.count - a.count);
}

export function noReasonCount(rows: CancelRow[]): number {
  return rows.filter((row) => row.reason === 'none').length;
}

export interface ReasonUsage {
  id: ReasonId;
  label: string;
  retailers: number;
  average: number;
  low: number;
  high: number;
}

export function usageByReason(rows: CancelRow[]): ReasonUsage[] {
  return reasonCounts(rows)
    .filter((reason) => reason.count > 0)
    .map((reason) => {
      const group = rows.filter((row) => row.reason === reason.id);
      const values = group.map((row) => row.allowancePct);
      const sum = values.reduce((acc, value) => acc + value, 0);
      return {
        id: reason.id,
        label: reason.label,
        retailers: group.length,
        average: Math.round(sum / group.length),
        low: Math.min(...values),
        high: Math.max(...values),
      };
    });
}

export function freeTextEntries(rows: CancelRow[]): CancelRow[] {
  return rows.filter((row) => row.reason === 'other' && !!row.reasonText);
}

export const fmtInt = (n: number): string => n.toLocaleString('en-US');