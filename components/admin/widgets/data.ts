export type WidgetsState = 'populated' | 'none' | 'loading' | 'error';
export type WidgetsFilter = 'all' | 'look';
export type InstallStatus = 'working' | 'dormant' | 'suspended' | 'awaiting';
export type ThemeStatus = 'matched' | 'neutral' | 'outdated' | 'notRead';
export type PillTone = 'neutral' | 'success' | 'alert';

export interface Installation {
  id: string;
  retailer: string;
  origin: string;
  install: InstallStatus;
  lastSeen: string;
  theme: ThemeStatus;
  themeReason: string;
  refusals: number;
  refusalNote: string;
  frameBlocked: boolean;
}

export const installLabels: Record<InstallStatus, string> = {
  working: 'Working',
  dormant: 'Dormant',
  suspended: 'Suspended',
  awaiting: 'Awaiting installation',
};

export const installTone: Record<InstallStatus, PillTone> = {
  working: 'success',
  dormant: 'alert',
  suspended: 'alert',
  awaiting: 'neutral',
};

export const themeLabels: Record<ThemeStatus, string> = {
  matched: 'Matched to their site',
  neutral: 'Neutral',
  outdated: 'Out of date',
  notRead: 'Not read yet',
};

export const themeTone: Record<ThemeStatus, PillTone> = {
  matched: 'success',
  neutral: 'neutral',
  outdated: 'alert',
  notRead: 'neutral',
};

export const INSTALLATIONS: Installation[] = [
  {
    id: 'aurora',
    retailer: 'Aurora & Co',
    origin: 'shop.aurora-co.com',
    install: 'working',
    lastSeen: 'Last seen loading 12 minutes ago',
    theme: 'neutral',
    themeReason: 'Partial extraction — 3 of 7 tokens read.',
    refusals: 388,
    refusalNote: 'The snippet is on www., but the permitted host is shop.',
    frameBlocked: false,
  },
  {
    id: 'lune',
    retailer: 'Lune Atelier',
    origin: 'luneatelier.fr',
    install: 'working',
    lastSeen: 'Last seen loading 3 minutes ago',
    theme: 'matched',
    themeReason: 'Read from the site on its last successful load.',
    refusals: 0,
    refusalNote: 'None this period.',
    frameBlocked: false,
  },
  {
    id: 'marchetti',
    retailer: 'Marchetti Fine Jewellery',
    origin: 'marchetti.it',
    install: 'working',
    lastSeen: 'Last seen loading 8 minutes ago',
    theme: 'outdated',
    themeReason:
      'Could not re-read the site; serving the theme read on 3 August.',
    refusals: 0,
    refusalNote: 'None this period.',
    frameBlocked: false,
  },
  {
    id: 'ortega',
    retailer: 'Ortega Goldsmiths',
    origin: 'ortega-goldsmiths.myshopify.com',
    install: 'working',
    lastSeen: 'Last seen loading 1 hour ago',
    theme: 'neutral',
    themeReason: 'Contrast validation failed, so neutral was used.',
    refusals: 21,
    refusalNote: 'A preview domain hitting the production key.',
    frameBlocked: false,
  },
  {
    id: 'hallam',
    retailer: 'Hallam & Finch',
    origin: 'hallamfinch.co.uk',
    install: 'dormant',
    lastSeen: 'Last seen loading 19 days ago',
    theme: 'notRead',
    themeReason: 'Never read, because the widget has never loaded.',
    refusals: 0,
    refusalNote: 'None this period.',
    frameBlocked: true,
  },
  {
    id: 'verity',
    retailer: 'Verity Jewels',
    origin: 'verityjewels.com',
    install: 'suspended',
    lastSeen: 'Suspended — not loading on their site',
    theme: 'matched',
    themeReason: 'Read from the site before this installation was suspended.',
    refusals: 0,
    refusalNote: 'None this period.',
    frameBlocked: false,
  },
  {
    id: 'bright',
    retailer: 'Bright & Stone',
    origin: 'brightandstone.co',
    install: 'awaiting',
    lastSeen: 'Never seen loading',
    theme: 'notRead',
    themeReason: 'Not read yet — the widget has never been seen loading.',
    refusals: 0,
    refusalNote: 'None this period.',
    frameBlocked: false,
  },
];

export const needsLook = (i: Installation): boolean => i.install !== 'working';

export const WIDGETS_ATTENTION = INSTALLATIONS.filter(needsLook).length;

export function applyWidgetFilter(list: Installation[], filter: WidgetsFilter): Installation[] {
  return filter === 'all' ? list : list.filter(needsLook);
}

export const findInstallation = (id: string): Installation | undefined =>
  INSTALLATIONS.find((i) => i.id === id);