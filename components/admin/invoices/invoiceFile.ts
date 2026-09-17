import {
  KIND_LABELS,
  STATUS_LABELS,
  fmtDate,
  fmtInt,
  fmtMoney,
  type Invoice,
} from './data';

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function buildInvoiceDocument(invoice: Invoice): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(invoice.reference)}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #16233E; margin: 0; padding: 48px; background: #ffffff; }
  .card { max-width: 720px; margin: 0 auto; border: 1px solid #E2E6EF; border-radius: 12px; padding: 32px; }
  .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  h1 { font-size: 22px; margin: 0; letter-spacing: -0.02em; }
  .muted { color: #6B7488; font-size: 13px; margin-top: 4px; }
  h2 { font-size: 14px; margin: 28px 0 8px; }
  dl { display: grid; grid-template-columns: 1fr auto; gap: 8px 16px; margin: 20px 0 0; border-top: 1px solid #E2E6EF; padding-top: 16px; }
  dt { color: #6B7488; font-size: 13px; margin: 0; }
  dd { font-size: 13px; margin: 0; text-align: right; font-variant-numeric: tabular-nums; }
  .total dd { font-size: 16px; font-weight: 600; }
  ul { margin: 0; padding-left: 18px; font-size: 13px; color: #4A5468; }
  li { margin-bottom: 10px; }
  li span { color: #6B7488; }
  .foot { margin-top: 32px; border-top: 1px solid #E2E6EF; padding-top: 16px; font-size: 12px; color: #6B7488; }
</style>
</head>
<body>
  <div class="card">
    <div class="top">
      <div>
        <h1>${escapeHtml(invoice.reference)}</h1>
        <p class="muted">Issued ${escapeHtml(fmtDate(invoice.date))}</p>
      </div>
      <div class="muted">${escapeHtml(STATUS_LABELS[invoice.status])}</div>
    </div>

    <dl>
      <dt>Retailer</dt><dd>${escapeHtml(invoice.retailer)}</dd>
      <dt>For</dt><dd>${escapeHtml(invoice.description)} · ${escapeHtml(
    KIND_LABELS[invoice.kind]
  )}</dd>
      <dt class="total">Amount</dt><dd class="total">${escapeHtml(fmtMoney(invoice.amount))}</dd>
      <dt>Renders</dt><dd>${escapeHtml(fmtInt(invoice.renders.consumed))} of ${escapeHtml(
    fmtInt(invoice.renders.total)
  )} used</dd>
    </dl>
  </div>
</body>
</html>`;
}

export function downloadInvoice(invoice: Invoice): void {
  const blob = new Blob([buildInvoiceDocument(invoice)], {
    type: 'text/html;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${invoice.reference}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}