'use client';

import { useState, type RefObject } from 'react';
import ViewImage from './ViewImage';
import AngleThumbs from './AngleThumbs';
import WidgetMetalSwitcher from './WidgetMetalSwitcher';
import WidgetDesignPrompt from './WidgetDesignPrompt';
import { VIEW_LABEL } from './pipeline';
import { METAL_LIST } from '../../lib/metals';
import { categoryLabel, widgetRing } from './data';
import { useWidgetState } from './store';
import type { WidgetMetal, WidgetView } from './types';

interface Props {
  category: string;
  description: string;
  onTrySomethingElse: () => void;
  onGetPrice: () => void;
  getPriceRef?: RefObject<HTMLButtonElement | null>;
}

export default function DesignResult({
  category,
  description,
  onTrySomethingElse,
  onGetPrice,
  getPriceRef,
}: Props) {
  const [active, setActive] = useState<WidgetView>('front');
  const [state, update] = useWidgetState();
  const metal = state.designMetal;
  const setMetal = (m: WidgetMetal) => update({ designMetal: m });
  const label = categoryLabel(category);
  const metalName = METAL_LIST.find((m) => m.id === metal)?.name ?? '';
  const activeLabel = VIEW_LABEL[active];

  return (
    <div className="mt-4">
      <p aria-live="polite" className="sr-only">
        Showing the {activeLabel} view in {metalName}.
      </p>

      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div
          className="relative flex-1 aspect-square sm:aspect-auto rounded-[12px] border border-[var(--w-border)] overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: 'var(--w-border)' }}
        >
          <div className="w-[62%] h-[62%]">
            <ViewImage
              metal={metal}
              view={active}
              alt={`${label} design, ${activeLabel} view in ${metalName}`}
              contain
              className="w-full h-full"
            />
          </div>

          <p
            className="absolute top-2 left-3 text-[15px] font-medium"
            style={{ color: 'var(--w-text)' }}
          >
            {label}
          </p>

          <div className="absolute top-2 right-2 flex items-center gap-2.5">
            <span
              className="text-[12px] whitespace-nowrap"
              style={{ color: 'var(--w-text-sec)' }}
            >
              {metalName}
            </span>
            <WidgetMetalSwitcher value={metal} onChange={setMetal} />
          </div>

          <span
            className="absolute bottom-2 left-3 text-[12px]"
            style={{ color: 'var(--w-text-sec)' }}
          >
            {activeLabel}
          </span>
        </div>

        <AngleThumbs
          active={active}
          onChange={setActive}
          categoryLabel={label}
          metal={metal}
        />
      </div>

      <div className="mt-4">
        <WidgetDesignPrompt
          categoryLabel={label}
          description={description}
        />
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onGetPrice}
          ref={getPriceRef}
          className={`h-11 w-full sm:flex-1 px-5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 cursor-pointer ${widgetRing}`}
          style={{
            backgroundColor: 'var(--w-primary)',
            color: 'var(--w-primary-text)',
          }}
        >
          Get a price for this
        </button>
        <button
          type="button"
          onClick={onTrySomethingElse}
          className={`h-11 w-full sm:flex-1 px-5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 cursor-pointer border ${widgetRing}`}
          style={{
            backgroundColor: 'var(--w-surface)',
            borderColor: 'var(--w-border)',
            color: 'var(--w-text)',
          }}
        >
          Try something else
        </button>
      </div>
      {/* PLACEHOLDER: virtual try-on (M-19, held on dependency D-1). Inert card only — no provider, contract or behaviour is specified. Replace the whole card when the integration lands. */}
      <div
        aria-hidden="true"
        className="mt-4 w-full flex items-center gap-3 rounded-[12px] p-5"
        style={{
          backgroundColor: 'var(--w-surface)',
          border: '1px dashed var(--w-border)',
        }}
      >
        <div
          className="w-10 h-10 shrink-0 rounded-[12px] flex items-center justify-center"
          style={{ backgroundColor: 'var(--w-border)' }}
        >
          <i
            className="ri-camera-line text-[20px] w-5 h-5 flex items-center justify-center"
            style={{ color: 'var(--w-text-sec)' }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-medium" style={{ color: 'var(--w-text)' }}>
            See it on
          </p>
          <p className="mt-0.5 text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
            Try the piece on before you ask about it.
          </p>
        </div>
        <span
          className="h-6 px-3 shrink-0 rounded-full flex items-center text-[12px] font-medium whitespace-nowrap"
          style={{
            backgroundColor: 'var(--w-border)',
            color: 'var(--w-text-sec)',
          }}
        >
          Coming soon
        </span>
      </div>
    </div>
  );
}