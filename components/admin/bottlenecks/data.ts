export type BottlenecksState = 'attention' | 'clear' | 'error';

export interface BottleneckAccount {
  id: string;
  name: string;
  detail: string;
}

export interface BottleneckIndicator {
  id: string;
  title: string;
  icon: string;
  figure: string;
  clearFigure: string;
  unit: string;
  measures: string;
  threshold?: string;
  accounts: BottleneckAccount[];
  moreCount: number;
  moreNoun: string;
  goingOn: string;
  above: boolean;
}

interface IndicatorSeed {
  id: string;
  title: string;
  icon: string;
  figure: string;
  clearFigure: string;
  unit: string;
  measures: string;
  threshold?: string;
  accounts: BottleneckAccount[];
  moreCount: number;
  moreNoun: string;
  goingOn: string;
}

const SEEDS: IndicatorSeed[] = [
  {
    id: 'balance',
    title: 'Balance exhaustion',
    icon: 'ri-battery-low-line',
    figure: '4',
    clearFigure: '0',
    unit: 'retailers',
    measures:
      'Retailers at zero renders; their widgets have stopped generating.',
    accounts: [
      { id: 'aurora-and-co', name: 'Aurora & Co', detail: 'at zero 2 hours ago' },
      { id: 'bright-and-stone', name: 'Bright & Stone', detail: 'at zero yesterday' },
      { id: 'ortega-goldsmiths', name: 'Ortega Goldsmiths', detail: 'at zero 3 days ago' },
    ],
    moreCount: 1,
    moreNoun: 'retailer',
    goingOn:
      'Their widget shows a plain unavailable message; catalogs and data are untouched.',
  },
  {
    id: 'repair',
    title: 'Repair intensity',
    icon: 'ri-tools-line',
    figure: '1.8',
    clearFigure: '1.2',
    unit: 'average passes per render',
    measures:
      'A retailer well above the average is paying far more per product than they expect.',
    accounts: [
      { id: 'marchetti', name: 'Marchetti Fine Jewellery', detail: '4.2 per render' },
      { id: 'aurora-and-co', name: 'Aurora & Co', detail: '3.1 per render' },
      { id: 'hallam-and-finch', name: 'Hallam & Finch', detail: '2.6 per render' },
    ],
    moreCount: 0,
    moreNoun: 'retailer',
    goingOn:
      'Usually their photographs, not the platform — call before it becomes a dispute.',
  },
  {
    id: 'flagged',
    title: 'Flagged render rate',
    icon: 'ri-flag-line',
    figure: '7.1%',
    clearFigure: '2.1%',
    unit: 'platform-wide',
    measures:
      'Renders that did not match the photograph and sent the retailer back to re-shoot.',
    accounts: [
      {
        id: 'marchetti',
        name: 'Marchetti Fine Jewellery',
        detail: '23.4%, three times the average',
      },
      { id: 'hallam-and-finch', name: 'Hallam & Finch', detail: '18.9%' },
      { id: 'verity-jewels', name: 'Verity Jewels', detail: '12.2%' },
    ],
    moreCount: 0,
    moreNoun: 'retailer',
    goingOn:
      'A photography conversation, not a technical one; each re-shoot costs again.',
  },
  {
    id: 'ageing',
    title: 'Ageing requests',
    icon: 'ri-time-line',
    figure: '6',
    clearFigure: '0',
    unit: 'past the threshold',
    measures: 'Requests sitting in an awaiting state longer than the configured 5 days.',
    threshold: 'A setting under Settings → AI & system.',
    accounts: [
      { id: 'aurora-and-co', name: 'Aurora & Co', detail: '3 awaiting a customer' },
      { id: 'verity-jewels', name: 'Verity Jewels', detail: '2 awaiting a quote' },
      { id: 'lune-atelier', name: 'Lune Atelier', detail: '1 awaiting a customer' },
    ],
    moreCount: 0,
    moreNoun: 'retailer',
    goingOn:
      'Usually a link sent and never opened. Worth a call, not a platform fix.',
  },
  {
    id: 'degraded-widgets',
    title: 'Degraded widgets',
    icon: 'ri-palette-line',
    figure: '3',
    clearFigure: '0',
    unit: 'installations',
    measures:
      'Widget installations rendering the neutral theme, or never seen loading at all.',
    accounts: [
      { id: 'hallam-and-finch', name: 'Hallam & Finch', detail: 'never seen loading, 19 days' },
      { id: 'ortega-goldsmiths', name: 'Ortega Goldsmiths', detail: 'neutral since 3 August' },
      { id: 'aurora-and-co', name: 'Aurora & Co', detail: 'neutral since 12 August' },
    ],
    moreCount: 0,
    moreNoun: 'installation',
    goingOn:
      'Neutral is intentional, not a failure. Never loading usually means the origin was never added.',
  },
  {
    id: 'origin-refusals',
    title: 'Origin refusals',
    icon: 'ri-forbid-2-line',
    figure: '412',
    clearFigure: '0',
    unit: 'this period',
    measures:
      'Requests refused because the page was not on a permitted origin list.',
    accounts: [
      { id: 'shop-aurora-co', name: 'shop.aurora-co.com', detail: '388, origin not listed' },
      {
        id: 'ortega-goldsmiths-myshopify',
        name: 'ortega-goldsmiths.myshopify.com',
        detail: '21, a preview domain',
      },
      { id: 'unknown-origins', name: '3 unknown origins', detail: '3, possibly a copied snippet' },
    ],
    moreCount: 0,
    moreNoun: 'origin',
    goingOn:
      'Most are the origin list working. A high count on their own domain is worth a call.',
  },
  {
    id: 'price-staleness',
    title: 'Price data staleness',
    icon: 'ri-price-tag-3-line',
    figure: '1',
    clearFigure: '0',
    unit: 'metal',
    measures: 'Metals serving a price beyond its window because the provider is unreachable.',
    threshold: 'Window set under Settings → Estimator.',
    accounts: [
      {
        id: 'platinum',
        name: 'Platinum',
        detail: 'a 31-hour-old price, unreachable since 04:10',
      },
    ],
    moreCount: 0,
    moreNoun: 'metal',
    goingOn:
      'Estimates keep working from the last known price. A heads-up, not a fault.',
  },
];

export interface BottleneckView {
  indicators: BottleneckIndicator[];
  aboveCount: number;
  total: number;
}

export function getBottleneckView(state: BottlenecksState): BottleneckView {
  const clear = state === 'clear';

  const indicators: BottleneckIndicator[] = SEEDS.map((seed) => ({
    id: seed.id,
    title: seed.title,
    icon: seed.icon,
    figure: clear ? seed.clearFigure : seed.figure,
    clearFigure: seed.clearFigure,
    unit: seed.unit,
    measures: seed.measures,
    threshold: seed.threshold,
    accounts: clear ? [] : seed.accounts,
    moreCount: clear ? 0 : seed.moreCount,
    moreNoun: seed.moreNoun,
    goingOn: clear ? '' : seed.goingOn,
    above: !clear,
  }));

  return {
    indicators,
    aboveCount: indicators.filter((i) => i.above).length,
    total: indicators.length,
  };
}