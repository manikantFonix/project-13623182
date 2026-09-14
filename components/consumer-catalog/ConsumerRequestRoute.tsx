'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelection } from './SelectionProvider';
import {
  resolveCatalog,
  servableProducts,
  METAL_LABEL,
  type Metal,
  type ConsumerProduct,
} from './data';
import ConsumerHeader from './ConsumerHeader';
import ConsumerFooter from './ConsumerFooter';
import UnavailablePage from './UnavailablePage';
import PreviewControl from './PreviewControl';
import { consumerTokenStyle } from './consumerTokens';
import RequestPiecesCard from './request/RequestPiecesCard';
import RequestDetailsCard, { type DetailsErrors } from './request/RequestDetailsCard';
import RequestSendCard from './request/RequestSendCard';
import type { DetailsFields, RequestPiece } from './request/types';

const SUBMIT_ADDR = 'https://readdy.ai/api/form/dah8k9boh653ivfvnobg';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SCENARIOS = [
  { id: 'default', label: 'Three pieces' },
  { id: 'single', label: 'One piece' },
  { id: 'one-metal', label: 'One color' },
  { id: 'noprice', label: 'No price' },
  { id: 'qty-min', label: 'Quantity at minimum' },
  { id: 'empty-fields', label: 'Required fields empty' },
  { id: 'invalid-email', label: 'Invalid email' },
  { id: 'some-dropped', label: 'Some dropped' },
  { id: 'all-dropped', label: 'All dropped' },
  { id: 'sending', label: 'Sending' },
  { id: 'send-failed', label: 'Send failed' },
];

const DEMO: DetailsFields = {
  name: 'Jane Whitfield',
  email: 'jane.whitfield@example.com',
  phone: '+1 555 014 2210',
  address: '',
  message: '',
};

export default function ConsumerRequestRoute({ token }: { token: string }) {
  const catalog = resolveCatalog(token);
  const router = useRouter();
  const { selected, hydrated, clear, removeMany, metalFor, setMetal, quantityFor } = useSelection();

  const [scenario, setScenario] = useState('default');
  const [fields, setFields] = useState<DetailsFields>({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState<DetailsErrors>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [metals, setMetals] = useState<Record<string, Metal>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [droppedCount, setDroppedCount] = useState(0);

  useEffect(() => {
    setStatus('idle');
    setFormError('');
    setErrors({});
    setDroppedCount(0);
    if (scenario === 'invalid-email') {
      setFields({ ...DEMO, email: 'jane.whitfield@' });
      setErrors({ email: 'Enter a valid email address.' });
    } else if (scenario === 'sending') {
      setFields(DEMO);
      setStatus('submitting');
    } else if (scenario === 'send-failed') {
      setFields(DEMO);
      setStatus('error');
      setFormError("We couldn't send that. Nothing has been sent — try again.");
    } else if (scenario === 'some-dropped') {
      setFields(DEMO);
      setDroppedCount(2);
    } else {
      setFields({ name: '', email: '', phone: '', address: '', message: '' });
    }
  }, [scenario]);

  const servable: ConsumerProduct[] = catalog ? servableProducts(catalog) : [];
  const basePieces: RequestPiece[] = servable
    .filter((p) => selected.includes(p.id))
    .map((p) => {
      const metal = metals[p.id] ?? metalFor(p.id) ?? p.metals[0];
      return {
        id: p.id,
        category: p.category,
        price: p.price,
        metals: p.metals,
        metal,
        quantity: quantities[p.id] ?? quantityFor(p.id),
        image: p.images[metal]?.front,
      };
    });

  let pieces = basePieces;
  if (scenario === 'single') pieces = basePieces.slice(0, 1);
  else if (scenario === 'some-dropped') pieces = basePieces.slice(0, 1);
  else if (scenario === 'all-dropped') pieces = [];
  else if (scenario === 'one-metal' && pieces[0])
    pieces = [{ ...pieces[0], metals: [pieces[0].metals[0]] }, ...pieces.slice(1)];
  else if (scenario === 'noprice' && pieces[0])
    pieces = [{ ...pieces[0], price: null }, ...pieces.slice(1)];
  else if (scenario === 'qty-min') pieces = pieces.map((p) => ({ ...p, quantity: 1 }));

  const allDropped = scenario === 'all-dropped';

  useEffect(() => {
    if (!hydrated) return;
    if (scenario !== 'default') return;
    if (selected.length === 0) {
      const t = window.setTimeout(() => router.replace(`/c/${token}`), 0);
      return () => window.clearTimeout(t);
    }
  }, [hydrated, scenario, selected.length, router, token]);

  if (!catalog || !catalog.available) return <UnavailablePage />;

  const brand = catalog.brand;

  const nameVal = fields.name.trim();
  const emailVal = fields.email.trim();
  const phoneVal = fields.phone.trim();
  const emailOk = EMAIL_RE.test(emailVal);

  let disabledReason = '';
  if (!nameVal) disabledReason = 'Add your name to continue.';
  else if (!emailVal) disabledReason = 'Add an email address to continue.';
  else if (!phoneVal) disabledReason = 'Add a phone number to continue.';
  else if (!emailOk) disabledReason = 'Enter a valid email address.';

  const canSend = !disabledReason && pieces.length > 0;

  function finish(count: number) {
    try {
      window.sessionStorage.setItem(
        `consumer-request-sent:${token}`,
        JSON.stringify({ count }),
      );
    } catch {
      /* ignore */
    }
    clear();
    router.push(`/c/${token}/request/sent`);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting' || allDropped) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const honeypot = String(fd.get('company_alt') ?? '').trim();
    fd.delete('company_alt');

    if (honeypot) {
      finish(pieces.length);
      return;
    }

    const nextErrors: DetailsErrors = {};
    if (!nameVal) nextErrors.name = 'Enter your name.';
    if (!emailVal) nextErrors.email = 'Enter your email address.';
    else if (!emailOk) nextErrors.email = 'Enter a valid email address.';
    if (!phoneVal) nextErrors.phone = 'Enter your phone number.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstId = nextErrors.name
        ? 'request-name'
        : nextErrors.email
          ? 'request-email'
          : 'request-phone';
      window.setTimeout(() => document.getElementById(firstId)?.focus(), 0);
      return;
    }

    setErrors({});
    setStatus('submitting');
    setFormError('');

    try {
      const res = await fetch(SUBMIT_ADDR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(fd as unknown as Record<string, string>).toString(),
      });
      const responseText = await res.text();
      let parsed: Record<string, any> | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }
      const serverMsg =
        parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || '';
      const isSpam = /spam/i.test(String(serverMsg)) || /spam/i.test(responseText);

      if (res.ok && parsed?.code === 'OK' && !isSpam) {
        finish(pieces.length);
      } else {
        setStatus('error');
        setFormError(
          serverMsg ||
            "We couldn't send that. Nothing has been sent — try again.",
        );
      }
    } catch {
      setStatus('error');
      setFormError("We couldn't send that. Nothing has been sent — try again.");
    }
  }

  const summary = pieces
    .map((p) => `${p.category} × ${p.quantity} — ${METAL_LABEL[p.metal]}`)
    .join('; ');

  return (
    <div
      className="min-h-screen bg-[#EDF1FA]"
      style={consumerTokenStyle(brand.primaryColor)}
    >
      <style>{`.rq-hp-field-4b{position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;}`}</style>
      <ConsumerHeader brand={brand} />

      <div className="max-w-[640px] mx-auto px-4 md:px-6 pt-6 pb-24">
        <Link
          href={`/c/${token}`}
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--brand)] hover:underline underline-offset-2 rounded-[6px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        >
          <i className="ri-arrow-left-s-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" aria-hidden />
          Back to the catalog
        </Link>

        <form
          id="consumer-request-form"
          data-readdy-form
          onSubmit={onSubmit}
          className="mt-6 lg:mt-10 space-y-4"
        >
          {pieces.length > 0 && (
            <RequestPiecesCard
              pieces={pieces}
              onQuantity={(id, n) => setQuantities((prev) => ({ ...prev, [id]: n }))}
              onMetal={(id, m) => {
                setMetals((prev) => ({ ...prev, [id]: m }));
                setMetal(id, m);
              }}
              onRemove={(id) => removeMany([id])}
            />
          )}

          <RequestDetailsCard
            fields={fields}
            errors={errors}
            onChange={(key, value) => {
              setFields((prev) => ({ ...prev, [key]: value }));
              if (key === 'name' || key === 'email' || key === 'phone') {
                setErrors((prev) => ({ ...prev, [key]: undefined }));
              }
            }}
          />

          <RequestSendCard
            token={token}
            droppedCount={droppedCount}
            allDropped={allDropped}
            submitting={status === 'submitting'}
            canSend={canSend}
            disabledReason={disabledReason}
            errorMessage={status === 'error' ? formError : ''}
          />

          <input type="hidden" name="pieces" value={summary} />
          <label className="rq-hp-field-4b" aria-hidden="true">
            <input
              type="text"
              name="company_alt"
              tabIndex={-1}
              autoComplete="off"
              readOnly
            />
          </label>
        </form>
      </div>

      <ConsumerFooter brand={brand} />

      <PreviewControl
        label="Request states"
        scenarios={SCENARIOS}
        value={scenario}
        onChange={setScenario}
      />
    </div>
  );
}