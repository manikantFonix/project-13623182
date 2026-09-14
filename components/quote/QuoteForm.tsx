'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormPieceCard from './form/FormPieceCard';
import PriceCard from './form/PriceCard';
import LeadTimeCard from './form/LeadTimeCard';
import NotesCard from './form/NotesCard';
import QuoteWarning from './form/QuoteWarning';
import QuoteConfirmDialog from './form/QuoteConfirmDialog';
import QuoteSuccessDialog from './form/QuoteSuccessDialog';
import { FOCUS, type QuoteView } from './data';

const linkFocus =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

export default function QuoteForm({ view, jobPath }: { view: QuoteView; jobPath: string }) {
  const router = useRouter();
  const [price, setPrice] = useState('');
  const [days, setDays] = useState('');
  const [notes, setNotes] = useState('');
  const [touched, setTouched] = useState({ price: false, days: false });
  const [dialog, setDialog] = useState<null | 'confirm' | 'success'>(null);

  const priceValid = price.trim() !== '';
  const daysValid = days.trim() !== '';
  const valid = priceValid && daysValid;

  const priceDisplay = priceValid
    ? `$${Number(price).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '';

  return (
    <>
      <div className="flex flex-col gap-4">
        <Link href={jobPath} className={`inline-flex w-fit text-[13px] font-medium text-[var(--brand)] rounded-sm ${linkFocus}`}>
          Back to the job
        </Link>

        <FormPieceCard view={view} />
        <PriceCard
          value={price}
          onChange={setPrice}
          onBlur={() => setTouched((t) => ({ ...t, price: true }))}
          invalid={touched.price && !priceValid}
        />
        <LeadTimeCard
          value={days}
          onChange={setDays}
          onBlur={() => setTouched((t) => ({ ...t, days: true }))}
          invalid={touched.days && !daysValid}
        />
        <NotesCard value={notes} onChange={setNotes} />
        <QuoteWarning />

        <div className="flex flex-col gap-3 md:flex-row">
          <button
            type="button"
            onClick={() => router.push(jobPath)}
            className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full text-[13px] font-medium text-[#5D6C8A] whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:bg-white transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`}
          >
            Cancel
          </button>
          <div className="flex flex-col gap-1.5 md:items-start">
            <button
              type="button"
              disabled={!valid}
              onClick={() => setDialog('confirm')}
              className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full text-[13px] font-medium whitespace-nowrap inline-flex items-center justify-center transition-colors duration-150 motion-reduce:transition-none ${
                valid
                  ? `bg-[var(--brand)] text-white cursor-pointer hover:opacity-95 ${FOCUS}`
                  : 'bg-[#E4E9F4] text-[#5D6C8A] cursor-not-allowed'
              }`}
            >
              Submit quote
            </button>
            {!valid && (
              <p className="text-[13px] text-[#5D6C8A]">
                Enter a price and how long it takes to continue.
              </p>
            )}
          </div>
        </div>
      </div>

      <QuoteConfirmDialog
        open={dialog === 'confirm'}
        piece={view.piece}
        reference={view.reference}
        jeweler={view.brand.brandName}
        price={priceDisplay}
        days={`${days} days`}
        onCancel={() => setDialog(null)}
        onConfirm={() => setDialog('success')}
      />

      <QuoteSuccessDialog
        open={dialog === 'success'}
        onClose={() => router.push(`${jobPath}?state=submitted`)}
      />
    </>
  );
}