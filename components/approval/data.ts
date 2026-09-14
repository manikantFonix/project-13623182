export type ApprovalScenario =
  | 'awaiting'
  | 'approved'
  | 'in-progress'
  | 'changes'
  | 'newer'
  | 'cancelled'
  | 'expired'
  | 'loading';

export type ApprovalStage =
  | 'awaiting'
  | 'approved'
  | 'in-progress'
  | 'in-production'
  | 'completed';

export interface ApprovalBrand {
  brandName: string;
  logo?: string;
  phone?: string;
  email?: string;
  primaryColor: string;
}

export interface ApprovalView {
  title: string;
  reference: string;
  piece: string;
  description: string;
  sentBy: string;
  sentOn: string;
  brand: ApprovalBrand;
  hero: string;
  views: { key: string; label: string; src: string }[];
  stage: ApprovalStage;
  decision?: { outcome: 'approved' | 'changes'; date: string };
  expectedBy?: string;
}

export const APPROVAL_STAGES: { id: ApprovalStage; label: string }[] = [
  { id: 'awaiting', label: 'Awaiting Approval' },
  { id: 'approved', label: 'Approved' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'in-production', label: 'In Production' },
  { id: 'completed', label: 'Completed' },
];

export const APPROVAL_SCENARIOS: { id: ApprovalScenario; label: string }[] = [
  { id: 'awaiting', label: 'Awaiting' },
  { id: 'approved', label: 'Approved' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'changes', label: 'Changes requested' },
  { id: 'newer', label: 'Newer version' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'expired', label: 'Expired link' },
  { id: 'loading', label: 'Loading' },
];

export const FOCUS_BRAND =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const BRAND: ApprovalBrand = {
  brandName: 'Elite Jewelry Co.',
  phone: '+1 (555) 014-2018',
  email: 'hello@elitejewelryco.com',
  primaryColor: '#1E3A8A',
};

function signed(url: string): string {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}exp=1790000000&sig=b1f9c2d4`;
}

const CURRENT = {
  hero: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20with%20a%20round%20brilliant%20stone%20in%20a%20raised%20six%20prong%20setting%2C%20centred%20front%20view%20on%20a%20plain%20uniform%20pale%20neutral%20off%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=800&height=800&seq=901&orientation=squarish',
  side: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20in%20side%20profile%20view%20showing%20the%20band%20and%20the%20setting%20height%2C%20on%20a%20plain%20uniform%20pale%20neutral%20off%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=400&height=400&seq=902&orientation=squarish',
  back: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20seen%20from%20behind%20the%20setting%2C%20on%20a%20plain%20uniform%20pale%20neutral%20off%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=400&height=400&seq=903&orientation=squarish',
  worn: 'https://readdy.ai/api/search-image?query=Professional%20studio%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20worn%20on%20a%20hand%2C%20relaxed%20hand%20posed%20on%20a%20plain%20uniform%20pale%20neutral%20off%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=400&height=400&seq=904&orientation=squarish',
};

const NEWER = {
  hero: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20gold%20trilogy%20engagement%20ring%20with%20an%20emerald%20cut%20centre%20stone%20flanked%20by%20two%20tapered%20baguette%20stones%2C%20centred%20front%20view%20on%20a%20plain%20uniform%20pale%20neutral%20off%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=800&height=800&seq=911&orientation=squarish',
  side: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20gold%20trilogy%20emerald%20cut%20ring%20in%20side%20profile%20view%20showing%20the%20low%20band%20and%20stepped%20side%20stones%2C%20on%20a%20plain%20uniform%20pale%20neutral%20off%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=400&height=400&seq=912&orientation=squarish',
  back: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20gold%20trilogy%20emerald%20cut%20ring%20seen%20from%20behind%20the%20settings%2C%20on%20a%20plain%20uniform%20pale%20neutral%20off%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=400&height=400&seq=913&orientation=squarish',
  worn: 'https://readdy.ai/api/search-image?query=Professional%20studio%20photograph%20of%20a%20gold%20trilogy%20emerald%20cut%20ring%20worn%20on%20a%20hand%2C%20relaxed%20hand%20posed%20on%20a%20plain%20uniform%20pale%20neutral%20off%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=400&height=400&seq=914&orientation=squarish',
};

function viewsFor(set: typeof CURRENT): ApprovalView['views'] {
  return [
    { key: 'side', label: 'Side', src: signed(set.side) },
    { key: 'back', label: 'Back', src: signed(set.back) },
    { key: 'worn', label: 'Worn', src: signed(set.worn) },
  ];
}

function baseView(): ApprovalView {
  return {
    title: 'Diamond Engagement Ring',
    reference: 'REQ-1247',
    piece: 'Ring',
    description:
      'A six-prong solitaire in polished gold with a knife-edged band that rises to meet the stone.\n\nAn open gallery behind the stone so light passes through from every angle.',
    sentBy: BRAND.brandName,
    sentOn: '15 January 2026',
    brand: BRAND,
    hero: signed(CURRENT.hero),
    views: viewsFor(CURRENT),
    stage: 'awaiting',
  };
}

export function resolveApproval(
  token: string,
  scenario: ApprovalScenario,
): ApprovalView | null {
  if (!token) return null;
  const view = baseView();

  if (scenario === 'newer') {
    return { ...view, hero: signed(NEWER.hero), views: viewsFor(NEWER) };
  }
  if (scenario === 'approved') {
    return {
      ...view,
      stage: 'approved',
      decision: { outcome: 'approved', date: '12 March 2026' },
      expectedBy: '12 April 2026',
    };
  }
  if (scenario === 'in-progress') {
    return {
      ...view,
      stage: 'in-progress',
      decision: { outcome: 'approved', date: '12 March 2026' },
    };
  }
  if (scenario === 'changes') {
    return {
      ...view,
      decision: { outcome: 'changes', date: '12 March 2026' },
    };
  }
  return view;
}