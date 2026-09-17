export type RecordKind = 'customers' | 'manufacturers';
export type RecordState = 'populated' | 'no-match' | 'loading' | 'error';
export type ActiveFilter = 'all' | 'active' | 'inactive';
export const RECORDS_PAGE_SIZE = 8;
export type DetailVariantId = 'several' | 'none' | 'active' | 'inactive' | 'no-note';
export type PillTone = 'neutral' | 'success' | 'alert';

export function requestStatusTone(status: string): PillTone {
  if (status === 'Approved' || status === 'Delivered') return 'success';
  if (status === 'Quoted') return 'alert';
  return 'neutral';
}

export function requestOutcomeTone(outcome: string): PillTone {
  if (outcome === 'Accepted') return 'success';
  if (outcome === 'Quote submitted') return 'alert';
  return 'neutral';
}

export type RecordsPreview =
  | 'route'
  | RecordState
  | 'detail-several'
  | 'detail-none'
  | 'detail-active'
  | 'detail-inactive'
  | 'detail-no-note'
  | 'detail-loading'
  | 'detail-error';

export interface RecordRequest {
  id: string;
  reference: string;
  piece: string;
  status: string;
  outcome?: string;
  date: string;
}

export interface RecordEntry {
  id: string;
  kind: RecordKind;
  name: string;
  retailer: string;
  tag?: string;
  created: string;
  note: string | null;
  email: string;
  phone: string;
  address?: string;
  contact?: string;
  specialty?: string;
  location?: string;
  active?: boolean;
  requests: RecordRequest[];
}

export interface RecordConfig {
  kind: RecordKind;
  basePath: string;
  title: string;
  lede: string;
  sectionTitle: string;
  sectionPurpose: string;
  countNoun: string;
  itemNoun: string;
  searchPlaceholder: string;
  icon: string;
  hasActive: boolean;
  emptyTitle: string;
  emptyBody: string;
  errorTitle: string;
  errorBody: string;
  detailErrorTitle: string;
  detailErrorBody: string;
  noRequests: string;
  requestsDescription: string;
  note: string;
  detailNote: string;
  detailVariants: DetailVariantId[];
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const fmtDate = (iso: string): string => {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

const PIECES = [
  'Ring — lab-grown, yellow',
  'Pendant — natural, white',
  'Earring — lab-grown, white',
  'Bracelet — natural, yellow',
  'Necklace — natural, white',
  'Ring — natural, rose',
  'Pendant — lab-grown, yellow',
  'Earring — natural, white',
];

const CUSTOMER_STATUSES = [
  'Awaiting reply',
  'Sent to customer',
  'Quoted',
  'Approved',
  'In production',
  'Delivered',
];

const MANUFACTURER_OUTCOMES = ['Awaiting quote', 'Quote submitted', 'Accepted', 'Passed'];

function retailerPrefix(name: string): string {
  const initials = name
    .split(/\s+/)
    .map((word) => word.replace(/[^A-Za-z]/g, ''))
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .join('');
  return initials || 'REQ';
}

function buildRequests(kind: RecordKind, seed: number, count: number, retailer: string): RecordRequest[] {
  const prefix = retailerPrefix(retailer);
  const out: RecordRequest[] = [];
  for (let i = 0; i < count; i++) {
    const month = ((seed * 7 + i * 3) % 8) + 1;
    const day = ((seed * 11 + i * 5) % 27) + 1;
    const seq = ((seed * 13 + i * 17) % 90) + 10;
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    out.push({
      id: `${kind}-req-${seed}-${i}`,
      reference: `${prefix}-2026${mm}${dd}-${seq}`,
      piece: PIECES[(seed + i) % PIECES.length],
      status: kind === 'manufacturers' ? '' : CUSTOMER_STATUSES[(seed + i * 2) % CUSTOMER_STATUSES.length],
      outcome:
        kind === 'manufacturers'
          ? MANUFACTURER_OUTCOMES[(seed + i) % MANUFACTURER_OUTCOMES.length]
          : undefined,
      date: `2026-${mm}-${dd}`,
    });
  }
  return out;
}

interface RawRecord {
  id: string;
  name: string;
  retailer: string;
  tag?: string;
  created: string;
  note: string | null;
  email: string;
  phone: string;
  address?: string;
  contact?: string;
  specialty?: string;
  location?: string;
  active?: boolean;
  requestCount: number;
}

const RAW_CUSTOMERS: RawRecord[] = [
  { id: 'cu-marguerite', name: 'Marguerite Ellison', retailer: 'Aurora & Co', tag: 'Retail', created: '2026-03-12', note: 'Prefers yellow gold. Sized at 6.5 last March.', email: 'marguerite.ellison@example.com', phone: '+1 415 555 0138', address: '18 Winthrop Road, Boston, MA 02116', active: true, requestCount: 4 },
  { id: 'cu-dario', name: 'Dario Fontana', retailer: 'Lune Atelier', tag: 'Private', created: '2026-04-03', note: 'Engagement piece — the partner is not to be contacted about it.', email: 'dario.fontana@example.com', phone: '+39 02 5555 0174', address: 'Via Solferino 22, 20121 Milano', active: true, requestCount: 2 },
  { id: 'cu-priya', name: 'Priya Raghunathan', retailer: 'Marchetti Fine Jewellery', tag: 'Wholesale', created: '2026-04-21', note: 'Wedding set. Coordination goes through her sister.', email: 'priya.raghunathan@example.com', phone: '+44 20 7946 0231', address: '40 Pembridge Road, London W11 3HN', active: true, requestCount: 3 },
  { id: 'cu-edouard', name: 'Édouard Brissac', retailer: 'Saint-Clair Joailliers', tag: 'Retail', created: '2026-05-02', note: null, email: 'edouard.brissac@example.com', phone: '+33 1 45 55 01 92', address: '7 Rue de Verneuil, 75007 Paris', active: false, requestCount: 1 },
  { id: 'cu-helena', name: 'Helena Whitfield', retailer: 'Ortega Goldsmiths', tag: 'Private', created: '2026-05-09', note: null, email: 'helena.whitfield@example.com', phone: '+44 161 555 0147', address: '3 Deansgate Mews, Manchester M3 2BW', active: false, requestCount: 0 },
  { id: 'cu-callum', name: 'Callum Baird', retailer: 'Ashford & Vine', tag: 'VIP Client', created: '2026-05-18', note: 'Repeat client since 2021. Allergic to nickel.', email: 'callum.baird@example.com', phone: '+44 131 555 0188', address: '12 William Street, Edinburgh EH3 7NH', active: true, requestCount: 5 },
  { id: 'cu-ingrid', name: 'Ingrid Sørensen', retailer: 'Ravensworth', tag: 'Wholesale', created: '2026-05-27', note: 'Prefers platinum. Quote only in euro.', email: 'ingrid.sorensen@example.com', phone: '+45 33 555 0121', address: 'Bredgade 41, 1260 København', active: true, requestCount: 2 },
  { id: 'cu-tomas', name: 'Tomas Alvarez', retailer: 'Aurora & Co', tag: 'Retail', created: '2026-06-06', note: null, email: 'tomas.alvarez@example.com', phone: '+1 305 555 0163', address: '2200 Brickell Avenue, Miami, FL 33129', active: false, requestCount: 1 },
  { id: 'cu-beatrix', name: 'Beatrix Nolan', retailer: 'Lune Atelier', tag: 'Private', created: '2026-06-14', note: null, email: 'beatrix.nolan@example.com', phone: '+353 1 555 0119', address: '9 Fitzwilliam Square, Dublin D02', active: true, requestCount: 0 },
  { id: 'cu-rafael', name: 'Rafael Mendes', retailer: 'Marchetti Fine Jewellery', tag: 'VIP Client', created: '2026-06-30', note: 'Family commission — three pieces, delivered together.', email: 'rafael.mendes@example.com', phone: '+351 21 555 0142', address: 'Rua Garrett 60, 1200-204 Lisboa', active: true, requestCount: 6 },
];

const RAW_MANUFACTURERS: RawRecord[] = [
  { id: 'mf-castellan', name: 'Castellan & Bright Foundry', retailer: 'Aurora & Co', created: '2026-02-19', note: 'Long-standing partner. Holds our sizing archive.', email: 'workshop@castellanbright.com', phone: '+1 401 555 0104', contact: 'Mirella Castellan', specialty: 'Lost-wax casting and finishing', location: 'Providence, Rhode Island', active: true, requestCount: 5 },
  { id: 'mf-vaucanson', name: 'Atelier Vaucanson', retailer: 'Lune Atelier', created: '2026-03-08', note: 'Preferred for hand engraving. Two-week lead time.', email: 'contact@atelier-vaucanson.fr', phone: '+33 4 72 55 01 88', contact: 'Bastien Vaucanson', specialty: 'Hand engraving and stone setting', location: 'Lyon, France', active: true, requestCount: 3 },
  { id: 'mf-theobauld', name: 'Theobauld Casting House', retailer: 'Marchetti Fine Jewellery', created: '2026-03-25', note: 'No longer offered for new routing. Existing work continues.', email: 'info@theobauld.it', phone: '+39 0131 555 0142', contact: 'Léon Theobauld', specialty: 'Platinum casting', location: 'Valenza, Italy', active: false, requestCount: 2 },
  { id: 'mf-norcross', name: 'Norcross Stone Setting', retailer: 'Aurora & Co', created: '2026-04-11', note: 'Fast turnaround on pavé. Invoices monthly.', email: 'studio@norcross-setting.co.uk', phone: '+44 121 555 0193', contact: 'Ada Norcross', specialty: 'Pavé and channel setting', location: 'Birmingham, England', active: true, requestCount: 4 },
  { id: 'mf-halden', name: 'Halden & Roe Manufactory', retailer: 'Ortega Goldsmiths', created: '2026-04-28', note: null, email: 'hello@haldenroe.co.uk', phone: '+44 114 555 0158', contact: 'Jonas Roe', specialty: 'Small-run production', location: 'Sheffield, England', active: true, requestCount: 1 },
  { id: 'mf-ferrante', name: 'Ferrante Orfèvrerie', retailer: 'Saint-Clair Joailliers', created: '2026-05-14', note: 'Stopped taking new routing in April. Still finishes open jobs.', email: 'atelier@ferrante-orfevrerie.it', phone: '+39 055 555 0129', contact: 'Chiara Ferrante', specialty: 'Filigree and hand finish', location: 'Florence, Italy', active: false, requestCount: 2 },
  { id: 'mf-wrenfield', name: 'Wrenfield Engraving', retailer: 'Ashford & Vine', created: '2026-05-30', note: 'Preferred for monogram work.', email: 'engraving@wrenfield.co.uk', phone: '+44 1225 555 0176', contact: 'Peter Wrenfield', specialty: 'Hand engraving', location: 'Bath, England', active: true, requestCount: 3 },
  { id: 'mf-solvang', name: 'Solvang Guld Smedie', retailer: 'Ravensworth', created: '2026-06-12', note: null, email: 'smedie@solvang-guld.dk', phone: '+45 33 555 0198', contact: 'Mette Solvang', specialty: 'Granulation and filigree', location: 'Copenhagen, Denmark', active: false, requestCount: 0 },
  { id: 'mf-pemberton', name: 'Pemberton & Vale', retailer: 'Marchetti Fine Jewellery', created: '2026-06-27', note: 'Holds the Marchetti setting schedule. Ten-day lead.', email: 'works@pembertonvale.co.uk', phone: '+44 20 7946 0188', contact: 'Harriet Bowden', specialty: 'Setting and polishing', location: 'Hatton Garden, London', active: true, requestCount: 6 },
];

function toEntries(kind: RecordKind, raws: RawRecord[]): RecordEntry[] {
  return raws
    .map((raw, index) => ({
      ...raw,
      kind,
      requests: buildRequests(kind, index + 2, raw.requestCount, raw.retailer),
    }))
    .sort((a, b) => (a.created < b.created ? 1 : -1));
}

export const RECORDS: Record<RecordKind, RecordEntry[]> = {
  customers: toEntries('customers', RAW_CUSTOMERS),
  manufacturers: toEntries('manufacturers', RAW_MANUFACTURERS),
};

export function filterRecords(
  list: RecordEntry[],
  filters: { search: string; retailer: string; active: ActiveFilter }
): RecordEntry[] {
  const term = filters.search.trim().toLowerCase();
  return list.filter((record) => {
    if (term && !record.name.toLowerCase().includes(term) && !record.retailer.toLowerCase().includes(term) && !record.email.toLowerCase().includes(term)) {
      return false;
    }
    if (filters.retailer !== 'all' && record.retailer !== filters.retailer) return false;
    if (filters.active !== 'all') {
      const isActive = record.active ?? true;
      if (filters.active === 'active' && !isActive) return false;
      if (filters.active === 'inactive' && isActive) return false;
    }
    return true;
  });
}

export function retailerOptions(list: RecordEntry[]): string[] {
  return Array.from(new Set(list.map((record) => record.retailer))).sort();
}

export function findRecord(kind: RecordKind, id: string): RecordEntry | undefined {
  return RECORDS[kind].find((record) => record.id === id);
}

export const DETAIL_VARIANT_IDS: Record<RecordKind, Record<DetailVariantId, string>> = {
  customers: {
    several: 'cu-marguerite',
    none: 'cu-helena',
    'no-note': 'cu-edouard',
    active: 'cu-marguerite',
    inactive: 'cu-helena',
  },
  manufacturers: {
    active: 'mf-castellan',
    inactive: 'mf-theobauld',
    'no-note': 'mf-halden',
    several: 'mf-castellan',
    none: 'mf-solvang',
  },
};

export const RECORD_CONFIG: Record<RecordKind, RecordConfig> = {
  customers: {
    kind: 'customers',
    basePath: '/admin/customers',
    title: 'Customers',
    lede: 'Every customer record across every retailer.',
    sectionTitle: 'Every customer',
    sectionPurpose: 'Newest first.',
    countNoun: 'customers',
    itemNoun: 'customer',
    searchPlaceholder: 'Search name, email or retailer',
    icon: 'ri-user-search-line',
    hasActive: true,
    emptyTitle: 'No customers match these filters',
    emptyBody: 'Every record is excluded by the current search or filters.',
    errorTitle: 'The customer list could not be loaded',
    errorBody: 'Records are unaffected. Try again to reload the list.',
    detailErrorTitle: 'This record could not be loaded',
    detailErrorBody: 'Nothing was changed. Try again to reload the record.',
    noRequests: 'No requests reference this customer yet. That is ordinary.',
    requestsDescription: 'Requests that reference this customer.',
    note: 'Read-only apart from marking active or inactive. Support changes go back to the retailer.',
    detailNote: 'Read-only apart from marking active or inactive. Support changes go back to the retailer.',
    detailVariants: ['several', 'none', 'active', 'inactive', 'no-note'],
  },
  manufacturers: {
    kind: 'manufacturers',
    basePath: '/admin/manufacturers',
    title: 'Manufacturers',
    lede: 'Every manufacturer record across every retailer.',
    sectionTitle: 'Every manufacturer',
    sectionPurpose: 'Newest first.',
    countNoun: 'manufacturers',
    itemNoun: 'manufacturer',
    searchPlaceholder: 'Search name, email or retailer',
    icon: 'ri-building-2-line',
    hasActive: true,
    emptyTitle: 'No manufacturers match these filters',
    emptyBody: 'Every record is excluded by the current search or filters.',
    errorTitle: 'The manufacturer list could not be loaded',
    errorBody: 'Records are unaffected. Try again to reload the list.',
    detailErrorTitle: 'This record could not be loaded',
    detailErrorBody: 'Nothing was changed. Try again to reload the record.',
    noRequests: 'No requests reference this manufacturer yet. That is ordinary.',
    requestsDescription: 'Requests that reference this manufacturer.',
    note: 'Read-only apart from marking active or inactive. Inactive only means no new routing.',
    detailNote: 'Read-only apart from marking active or inactive. Inactive only stops new routing. Existing requests continue.',
    detailVariants: ['active', 'inactive', 'no-note'],
  },
};

export const VARIANT_LABELS: Record<DetailVariantId, string> = {
  several: 'Several requests',
  none: 'No requests',
  active: 'Active',
  inactive: 'Inactive',
  'no-note': 'No note',
};