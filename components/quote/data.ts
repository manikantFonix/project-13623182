export type QuoteState =
  | 'job'
  | 'form'
  | 'submitted'
  | 'accepted'
  | 'not-taken-forward'
  | 'passed'
  | 'cancelled'
  | 'loading'
  | 'invalid';

export interface QuoteBrand {
  brandName: string;
  primaryColor: string;
  logo?: string;
}

export interface QuoteQuote {
  price: string;
  days: string;
  notes?: string;
  submittedAt: string;
  acceptedOn?: string;
}

export interface QuoteView {
  piece: string;
  reference: string;
  brand: QuoteBrand;
  sentOn: string;
  statusLabel: string;
  metal: { type: string; karat: string; color: string };
  stone: { type: string; count: string; size: string; setting: string };
  dimensions: string;
  ringSize: string;
  customNote: string;
  hero: string;
  views: { key: string; label: string; src: string }[];
  quote?: QuoteQuote;
  passedOn?: string;
}

export interface QuoteStage {
  id: string;
  label: string;
  reached: boolean;
  current: boolean;
  timestamp?: string;
}

export const QUOTE_STATES: { id: QuoteState; label: string }[] = [
  { id: 'job', label: 'Job' },
  { id: 'form', label: 'Quote form' },
  { id: 'submitted', label: 'Quote submitted' },
  { id: 'accepted', label: 'Quote accepted' },
  { id: 'not-taken-forward', label: 'Not taken forward' },
  { id: 'passed', label: 'Passed on it' },
  { id: 'cancelled', label: 'Request cancelled' },
  { id: 'loading', label: 'Loading' },
  { id: 'invalid', label: 'Invalid link' },
];

export function isQuoteState(value: string | null): value is QuoteState {
  return QUOTE_STATES.some((s) => s.id === value);
}

export const FOCUS =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export const QUOTE_REFERENCE = 'JOB-2024-1234';

const BRAND: QuoteBrand = {
  brandName: 'Timeless Treasures',
  primaryColor: '#1E3A8A',
};

function signed(url: string): string {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}exp=1790000000&sig=q7c1e8a2`;
}

const IMG = {
  hero: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20an%2018k%20white%20gold%20vintage%20halo%20diamond%20ring%20with%20a%20round%20brilliant%20centre%20stone%20and%20a%20fine%20milgrain%20halo%2C%20centred%20front%20view%20on%20a%20plain%20uniform%20pale%20neutral%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=800&height=800&seq=921&orientation=squarish',
  side: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20an%2018k%20white%20gold%20vintage%20halo%20diamond%20ring%20in%20side%20profile%20view%20showing%20the%20band%20and%20the%20halo%20setting%20height%2C%20on%20a%20plain%20uniform%20pale%20neutral%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=400&height=400&seq=922&orientation=squarish',
  back: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20an%2018k%20white%20gold%20vintage%20halo%20diamond%20ring%20seen%20from%20behind%20the%20setting%20showing%20the%20gallery%2C%20on%20a%20plain%20uniform%20pale%20neutral%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=400&height=400&seq=923&orientation=squarish',
  worn: 'https://readdy.ai/api/search-image?query=Professional%20studio%20photograph%20of%20an%2018k%20white%20gold%20vintage%20halo%20diamond%20ring%20worn%20on%20a%20hand%2C%20relaxed%20hand%20posed%20on%20a%20plain%20uniform%20pale%20neutral%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=400&height=400&seq=924&orientation=squarish',
};

const T_RECEIVED = '17 January 2026, 09:15';
const T_SUBMITTED = '18 January 2026, 10:42';
const T_REVIEWED = '20 January 2026, 14:05';

export function resolveQuote(state: QuoteState): QuoteView {
  const view: QuoteView = {
    piece: 'Vintage Halo Diamond Ring',
    reference: QUOTE_REFERENCE,
    brand: BRAND,
    sentOn: '17 January 2026',
    statusLabel: 'New',
    metal: { type: 'White Gold', karat: '18K', color: 'White' },
    stone: { type: 'Diamond', count: '1', size: '1.0 ct total', setting: 'Drop style' },
    dimensions: '21.5 mm × 12.4 mm × 6.3 mm',
    ringSize: 'US 6.5',
    customNote: 'Allow for a small adjustment after the first fitting.',
    hero: signed(IMG.hero),
    views: [
      { key: 'side', label: 'Side', src: signed(IMG.side) },
      { key: 'back', label: 'Back', src: signed(IMG.back) },
      { key: 'worn', label: 'Worn', src: signed(IMG.worn) },
    ],
  };

  if (state === 'submitted' || state === 'accepted' || state === 'not-taken-forward') {
    view.quote = {
      price: '$2,400',
      days: '12',
      notes: 'Stones sourced and set in-house.',
      submittedAt: T_SUBMITTED,
      acceptedOn: state === 'accepted' ? '12 May 2026' : undefined,
    };
  }

  if (state === 'passed') {
    view.passedOn = '19 January 2026';
  }

  return view;
}

export function stagesFor(state: QuoteState): QuoteStage[] {
  const received = { id: 'received', label: 'Job received' };
  const submitted = { id: 'submitted', label: 'Quote submitted' };
  const review = { id: 'review', label: 'Under review' };

  if (state === 'accepted') {
    return [
      { ...received, reached: true, current: false, timestamp: T_RECEIVED },
      { ...submitted, reached: true, current: false, timestamp: T_SUBMITTED },
      { ...review, reached: true, current: false, timestamp: T_REVIEWED },
      { id: 'production', label: 'In production', reached: false, current: true },
    ];
  }

  if (state === 'submitted' || state === 'not-taken-forward') {
    return [
      { ...received, reached: true, current: false, timestamp: T_RECEIVED },
      { ...submitted, reached: true, current: false, timestamp: T_SUBMITTED },
      { ...review, reached: false, current: true },
    ];
  }

  if (state === 'passed') {
    return [
      { ...received, reached: true, current: false, timestamp: T_RECEIVED },
      { ...submitted, reached: false, current: false },
      { ...review, reached: false, current: false },
    ];
  }

  return [
    { ...received, reached: true, current: true, timestamp: T_RECEIVED },
    { ...submitted, reached: false, current: false },
    { ...review, reached: false, current: false },
  ];
}