export type CatalogState = 'populated' | 'no-match' | 'empty' | 'loading' | 'error';
export type CatalogPublish = 'all' | 'published' | 'unpublished';
export type CatalogRender = 'all' | 'flagged' | 'passed';

export const CATALOG_PAGE_SIZE = 20;

export interface Catalog {
  id: string;
  name: string;
  retailer: string;
  published: boolean;
  products: number;
  serving: number;
  flagged: number;
}

export interface CatalogSummaryData {
  catalogs: number;
  retailers: number;
  published: number;
  publishedProducts: number;
  servingProducts: number;
  notServed: number;
}

export const gapOf = (c: Catalog): number => Math.max(c.products - c.serving, 0);

export const needsAttention = (c: Catalog): boolean => c.published && gapOf(c) > 0;

const NOTABLE: Catalog[] = [
  {
    id: 'bridal',
    name: 'Bridal Collection',
    retailer: 'Marchetti Fine Jewellery',
    published: true,
    products: 48,
    serving: 14,
    flagged: 22,
  },
  {
    id: 'signature',
    name: 'Signature Range',
    retailer: 'Hallam & Finch',
    published: true,
    products: 62,
    serving: 35,
    flagged: 14,
  },
  {
    id: 'diamond',
    name: 'Diamond Edit',
    retailer: 'Verity Jewels',
    published: true,
    products: 40,
    serving: 21,
    flagged: 9,
  },
  {
    id: 'gold',
    name: 'Gold Essentials',
    retailer: 'Aurora & Co',
    published: true,
    products: 55,
    serving: 37,
    flagged: 6,
  },
  {
    id: 'arrivals',
    name: 'New Arrivals',
    retailer: 'Ortega Goldsmiths',
    published: true,
    products: 33,
    serving: 22,
    flagged: 4,
  },
  {
    id: 'winter',
    name: 'Winter 2026',
    retailer: 'Lune Atelier',
    published: true,
    products: 44,
    serving: 35,
    flagged: 3,
  },
  {
    id: 'heritage',
    name: 'Heritage Pieces',
    retailer: 'Bright & Stone',
    published: true,
    products: 29,
    serving: 21,
    flagged: 2,
  },
  {
    id: 'archive',
    name: 'Archive 2019–2023',
    retailer: 'Ashford & Vine',
    published: false,
    products: 940,
    serving: 883,
    flagged: 31,
  },
];

const FILLER_RETAILERS = [
  'Delacroix',
  'Ravensworth',
  'Sable & Co',
  'Northgate Jewellers',
  'Fairhaven',
  'Elowen',
  'Grays of Whitby',
  'Hartley & Rowe',
  'Ivory & Oak',
  'Jenner Bros.',
  'Kilburn & Co',
  'Larkin Jewels',
  'Marlowe & Grey',
  'Nightingale',
  'Orchard Fine',
  'Pembroke',
  'Quill & Co',
  'Redgrave',
  'Sinclair Jewellers',
  'Thorne & Daughters',
  'Underwood',
  'Vale & Mercer',
  'Westgate',
  'Yarrow Fine',
  'Alder & Beech',
  'Beaconsfield',
  'Calloway',
  'Danvers',
  'Ellery',
  'Fenwick',
  'Golding & Sons',
  'Holloway',
  'Ivy & Ash',
];

const FILLER_NAMES = [
  'Signature Range',
  'Bridal Collection',
  'Winter 2026',
  'Summer 2026',
  'New Arrivals',
  'Gold Essentials',
  'Platinum Line',
  'Diamond Edit',
  'Heritage Pieces',
  'Everyday Fine',
  'Gift Edit',
  'Ready to Ship',
  'Limited Edition',
  'Engagement',
  'Vintage Revival',
  'Wholesale',
];

function buildFiller(): Catalog[] {
  const out: Catalog[] = [];

  for (let k = 0; k < 51; k++) {
    const products = 24 + (k % 7) * 4 + (k < 13 ? 1 : 0);
    out.push({
      id: `pub-${k}`,
      name: FILLER_NAMES[(k * 5) % FILLER_NAMES.length],
      retailer: FILLER_RETAILERS[k % FILLER_RETAILERS.length],
      published: true,
      products,
      serving: products,
      flagged: 0,
    });
  }

  const flaggedAt: Record<number, number> = { 3: 2, 11: 4, 22: 3 };

  for (let k = 0; k < 37; k++) {
    const products = 14 + (k % 5) * 6;
    const flagged = flaggedAt[k] ?? 0;
    out.push({
      id: `unpub-${k}`,
      name: FILLER_NAMES[(k * 3 + 2) % FILLER_NAMES.length],
      retailer: FILLER_RETAILERS[(k + 7) % FILLER_RETAILERS.length],
      published: false,
      products,
      serving: products - flagged,
      flagged,
    });
  }

  return out;
}

export function orderCatalogs(list: Catalog[]): Catalog[] {
  return [...list].sort((a, b) => {
    const aAttention = needsAttention(a) ? 1 : 0;
    const bAttention = needsAttention(b) ? 1 : 0;
    if (aAttention !== bAttention) return bAttention - aAttention;
    if (aAttention && bAttention) {
      const diff = gapOf(b) - gapOf(a);
      if (diff !== 0) return diff;
    }
    return a.retailer.localeCompare(b.retailer) || a.name.localeCompare(b.name);
  });
}

function computeSummary(list: Catalog[]): CatalogSummaryData {
  const retailers = new Set(list.map((c) => c.retailer)).size;
  const published = list.filter((c) => c.published);
  const publishedProducts = published.reduce((sum, c) => sum + c.products, 0);
  const servingProducts = published.reduce((sum, c) => sum + c.serving, 0);
  return {
    catalogs: list.length,
    retailers,
    published: published.length,
    publishedProducts,
    servingProducts,
    notServed: publishedProducts - servingProducts,
  };
}

export const CATALOGS: Catalog[] = orderCatalogs([...NOTABLE, ...buildFiller()]);

export const PLATFORM_SUMMARY: CatalogSummaryData = computeSummary(CATALOGS);

export const EMPTY_SUMMARY: CatalogSummaryData = {
  catalogs: 0,
  retailers: 0,
  published: 0,
  publishedProducts: 0,
  servingProducts: 0,
  notServed: 0,
};

export function applyFilters(
  list: Catalog[],
  filters: { search: string; publish: CatalogPublish; render: CatalogRender }
): Catalog[] {
  const query = filters.search.trim().toLowerCase();
  return list.filter((c) => {
    if (
      query &&
      !c.name.toLowerCase().includes(query) &&
      !c.retailer.toLowerCase().includes(query)
    ) {
      return false;
    }
    if (filters.publish === 'published' && !c.published) return false;
    if (filters.publish === 'unpublished' && c.published) return false;
    if (filters.render === 'flagged' && c.flagged === 0) return false;
    if (filters.render === 'passed' && gapOf(c) > 0) return false;
    return true;
  });
}