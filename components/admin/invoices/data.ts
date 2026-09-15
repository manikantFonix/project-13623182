export type InvoiceStatus = 'paid' | 'failed' | 'refunded' | 'partial';
export type InvoiceKind = 'subscription' | 'topup';

export interface RefundRecord {
  amount: number;
  at: string;
  by: string;
  reason: string;
}

export interface Invoice {
  id: string;
  reference: string;
  retailer: string;
  kind: InvoiceKind;
  description: string;
  amount: number;
  status: InvoiceStatus;
  date: string;
  failedAt?: string;
  renders: { total: number; consumed: number };
  refunds?: RefundRecord[];
}

export type InvoicesState = 'populated' | 'no-match' | 'loading' | 'error';
export type InvoicesPreview =
  | 'populated'
  | 'no-match'
  | 'refund-sub'
  | 'refund-topup'
  | 'refund-noreason'
  | 'refund-submitting'
  | 'refund-failed'
  | 'loading'
  | 'error';

export const INVOICES: Invoice[] = [
  {
    id: 'inv-0915',
    reference: 'INV-2026-0915',
    retailer: 'Halden & Sons',
    kind: 'topup',
    description: '50-render pack',
    amount: 39.99,
    status: 'paid',
    date: '2026-09-15',
    renders: { total: 50, consumed: 38 },
  },
  {
    id: 'inv-0912',
    reference: 'INV-2026-0912',
    retailer: 'Aurora Fine Jewellers',
    kind: 'subscription',
    description: 'Catalog, 12 Aug – 12 Sep',
    amount: 349,
    status: 'paid',
    date: '2026-09-12',
    renders: { total: 1200, consumed: 340 },
  },
  {
    id: 'inv-0910',
    reference: 'INV-2026-0910',
    retailer: 'Bright Atelier',
    kind: 'subscription',
    description: 'Storefront, 10 Aug – 10 Sep',
    amount: 749,
    status: 'failed',
    date: '2026-09-10',
    failedAt: '2026-09-10',
    renders: { total: 3500, consumed: 0 },
  },
  {
    id: 'inv-0908',
    reference: 'INV-2026-0908',
    retailer: 'Marlow Jewellery',
    kind: 'subscription',
    description: 'Studio, 8 Aug – 8 Sep',
    amount: 149,
    status: 'paid',
    date: '2026-09-08',
    renders: { total: 300, consumed: 96 },
  },
  {
    id: 'inv-0905',
    reference: 'INV-2026-0905',
    retailer: 'Kestrel Designs',
    kind: 'topup',
    description: '25-render pack',
    amount: 24.99,
    status: 'paid',
    date: '2026-09-05',
    renders: { total: 25, consumed: 4 },
  },
  {
    id: 'inv-0903',
    reference: 'INV-2026-0903',
    retailer: 'Vane & Co',
    kind: 'subscription',
    description: 'Catalog, 3 Aug – 3 Sep',
    amount: 349,
    status: 'refunded',
    date: '2026-09-03',
    renders: { total: 1200, consumed: 210 },
    refunds: [
      {
        amount: 349,
        at: '2026-09-04',
        by: 'Admin · R. Mensah',
        reason: 'Duplicate charge on a settled billing period.',
      },
    ],
  },
  {
    id: 'inv-0901',
    reference: 'INV-2026-0901',
    retailer: 'Solace Studio',
    kind: 'subscription',
    description: 'Storefront, 1 Aug – 1 Sep',
    amount: 749,
    status: 'partial',
    date: '2026-09-01',
    renders: { total: 3500, consumed: 1280 },
    refunds: [
      {
        amount: 200,
        at: '2026-09-02',
        by: 'Admin · T. Okafor',
        reason: 'Partial credit for two days of widget downtime.',
      },
    ],
  },
  {
    id: 'inv-0828',
    reference: 'INV-2026-0828',
    retailer: 'Ardmore Fine Jewels',
    kind: 'topup',
    description: '100-render pack',
    amount: 49.99,
    status: 'paid',
    date: '2026-08-28',
    renders: { total: 100, consumed: 12 },
  },
  {
    id: 'inv-0825',
    reference: 'INV-2026-0825',
    retailer: 'Larkin Atelier',
    kind: 'subscription',
    description: 'Studio, 25 Jul – 25 Aug',
    amount: 149,
    status: 'paid',
    date: '2026-08-25',
    renders: { total: 300, consumed: 288 },
  },
  {
    id: 'inv-0822',
    reference: 'INV-2026-0822',
    retailer: 'Wren & Bell',
    kind: 'topup',
    description: '25-render pack',
    amount: 24.99,
    status: 'paid',
    date: '2026-08-22',
    renders: { total: 25, consumed: 25 },
  },
  {
    id: 'inv-0818',
    reference: 'INV-2026-0818',
    retailer: 'Pennant Jewellers',
    kind: 'subscription',
    description: 'Catalog, 18 Jul – 18 Aug',
    amount: 349,
    status: 'paid',
    date: '2026-08-18',
    renders: { total: 1200, consumed: 640 },
  },
];

export const STATUS_LABELS: Record<InvoiceStatus, string> = {
  paid: 'Paid',
  failed: 'Failed',
  refunded: 'Refunded',
  partial: 'Partially refunded',
};

export const KIND_LABELS: Record<InvoiceKind, string> = {
  subscription: 'Subscription',
  topup: 'Top-up',
};

export const fmtMoney = (n: number): string =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const fmtInt = (n: number): string => n.toLocaleString('en-US');

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const fmtDate = (iso: string): string => {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

export const refundedTotal = (invoice: Invoice): number =>
  (invoice.refunds ?? []).reduce((sum, entry) => sum + entry.amount, 0);

export const remainingRefundable = (invoice: Invoice): number =>
  Math.max(0, Math.round((invoice.amount - refundedTotal(invoice)) * 100) / 100);

const statusRank = (invoice: Invoice): number => (invoice.status === 'failed' ? 0 : 1);

export function sortInvoices(invoices: Invoice[]): Invoice[] {
  return [...invoices].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return statusRank(a) - statusRank(b);
  });
}

export function filterInvoices(
  invoices: Invoice[],
  filters: { search: string; status: string; kind: string }
): Invoice[] {
  const query = filters.search.trim().toLowerCase();
  return invoices.filter((invoice) => {
    if (filters.status !== 'all' && invoice.status !== filters.status) return false;
    if (filters.kind !== 'all' && invoice.kind !== filters.kind) return false;
    if (!query) return true;
    return (
      invoice.reference.toLowerCase().includes(query) ||
      invoice.retailer.toLowerCase().includes(query)
    );
  });
}

export interface Summary {
  invoiced: number;
  paid: number;
  failed: number;
  refunded: number;
}

export function summarise(invoices: Invoice[]): Summary {
  const invoiced = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paid = invoices
    .filter((invoice) => invoice.status === 'paid' || invoice.status === 'partial')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const failed = invoices
    .filter((invoice) => invoice.status === 'failed')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const refunded = invoices.reduce((sum, invoice) => sum + refundedTotal(invoice), 0);
  return { invoiced, paid, failed, refunded };
}