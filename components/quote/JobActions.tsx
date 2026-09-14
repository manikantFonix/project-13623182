'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuotePassDialog from './QuotePassDialog';
import { FOCUS } from './data';

export default function JobActions({ jobPath }: { jobPath: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row">
        <button
          type="button"
          onClick={() => router.push(`${jobPath}/submit`)}
          className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full bg-[var(--brand)] text-white text-[13px] font-medium whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:opacity-95 transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`}
        >
          Submit a quote
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`h-11 lg:h-9 w-full md:w-auto px-5 rounded-full bg-white border border-[#A8552A] text-[#A8552A] text-[13px] font-medium whitespace-nowrap cursor-pointer inline-flex items-center justify-center hover:bg-[#A8552A]/5 hover:text-[#91441E] hover:border-[#91441E] transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`}
        >
          Can&apos;t take this on
        </button>
      </div>

      <QuotePassDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          router.push(`${jobPath}?state=passed`);
        }}
      />
    </>
  );
}