import { JEWELRY_TYPES, MORE_TYPES } from '../DesignTiles';

export const PREVIEW_WIDGET_TOKEN = 'preview-widget';

export const WIDGET_CONTACT: { phone: string | null; email: string | null } = {
  phone: '+44 20 7946 0958',
  email: 'studio@harlowewren.com',
};

export const SAMPLE_DESC =
  'A rose gold solitaire ring with a round brilliant centre stone in a six-prong setting and a softly tapered band.';

const ALL_TYPES = [...JEWELRY_TYPES, ...MORE_TYPES];

export function categoryLabel(id: string | null): string {
  const found = ALL_TYPES.find((t) => t.id === id);
  return found ? found.label : 'Ring';
}

export const widgetRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--w-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--w-surface)]';

export interface PreviewItem {
  value: string;
  label: string;
}

export interface PreviewGroup {
  group: string;
  items: PreviewItem[];
}

export const THEME_GROUP: PreviewGroup = {
  group: 'Theme',
  items: [
    { value: 'theme-scraped', label: 'Scraped theme' },
    { value: 'theme-neutral', label: 'Neutral theme' },
  ],
};

export const ACCESS_GROUP: PreviewGroup = {
  group: 'Access',
  items: [
    { value: 'access-allowed', label: 'Permitted site' },
    { value: 'access-blocked', label: 'Not permitted' },
  ],
};

export const SCREEN_ONE_GROUP: PreviewGroup = {
  group: 'Screen one',
  items: [
    { value: 's1-nothing', label: 'Nothing chosen' },
    { value: 's1-category', label: 'Category chosen' },
    { value: 's1-ready', label: 'Ready to generate' },
    { value: 's1-more', label: 'More expanded' },
  ],
};

export const SCREEN_TWO_GROUP: PreviewGroup = {
  group: 'Screen two',
  items: [
    { value: 's2-live', label: 'Generating · live' },
    { value: 's2-front-done', label: 'Front done · side running' },
    { value: 's2-fail-side', label: 'Mid-chain failure · side' },
    { value: 's2-arrived', label: 'All four arrived' },
  ],
};

export const PIPELINE_GROUP: PreviewGroup = {
  group: 'Pipeline stage',
  items: [
    { value: 's2-stage-0', label: '1 Front · draw' },
    { value: 's2-stage-1', label: '2 Front · check' },
    { value: 's2-stage-2', label: '3 Front · correct' },
    { value: 's2-stage-3', label: '4 Side · draw' },
    { value: 's2-stage-4', label: '5 Side · check' },
    { value: 's2-stage-5', label: '6 Side · correct' },
    { value: 's2-stage-6', label: '7 Back · draw' },
    { value: 's2-stage-7', label: '8 Back · check' },
    { value: 's2-stage-8', label: '9 Back · correct' },
    { value: 's2-stage-9', label: '10 Worn · draw' },
    { value: 's2-stage-10', label: '11 Worn · check' },
    { value: 's2-stage-11', label: '12 Worn · correct' },
  ],
};

export const ESTIMATE_GROUP: PreviewGroup = {
  group: 'Price estimate',
  items: [
    { value: 'est-closed', label: 'Modal closed' },
    { value: 'est-empty', label: 'Form · empty' },
    { value: 'est-part', label: 'Form · partly answered' },
    { value: 'est-ready', label: 'Form · all answered' },
    { value: 'est-ring', label: 'Ring size schema' },
    { value: 'est-pendant', label: 'Pendant height' },
    { value: 'est-generic', label: 'Other category' },
    { value: 'est-calculating', label: 'Calculating' },
    { value: 'est-normal', label: 'Result · normal range' },
    { value: 'est-over', label: 'Result · above budget' },
    { value: 'est-failed', label: 'Result · failed' },
  ],
};

export const ALLOWANCE_GROUP: PreviewGroup = {
  group: 'Allowance',
  items: [
    { value: 'allow-none', label: 'Allowance exhausted · no design' },
    { value: 'allow-design', label: 'Allowance exhausted · design ready' },
  ],
};

export const CONNECTION_GROUP: PreviewGroup = {
  group: 'Connection',
  items: [{ value: 'reconnecting', label: 'Reconnecting' }],
};

export const SECOND_INSTANCE_GROUP: PreviewGroup = {
  group: 'Second instance',
  items: [{ value: 'second-instance', label: 'Second instance ignored' }],
};

export const REQUEST_GROUP: PreviewGroup = {
  group: 'Request order',
  items: [
    { value: 'req-closed', label: 'Modal closed' },
    { value: 'req-with-estimate', label: 'Form · with estimate' },
    { value: 'req-no-estimate', label: 'Form · no estimate' },
    { value: 'req-empty', label: 'Form · required empty' },
    { value: 'req-invalid-email', label: 'Form · invalid email' },
    { value: 'req-min-qty', label: 'Form · quantity at minimum' },
    { value: 'req-sending', label: 'Sending' },
    { value: 'req-failed', label: 'Send failed' },
    { value: 'req-confirmation', label: 'Confirmation' },
  ],
};

export const SAMPLE_REQUEST_ESTIMATE = {
  metal: 420,
  stones: 900,
  labor: 560,
  low: 1880,
  high: 2070,
};

export const REQUEST_SUBMIT_URL =
  'https://readdy.ai/api/form/dahqacrp14a1h3mr6qe0';