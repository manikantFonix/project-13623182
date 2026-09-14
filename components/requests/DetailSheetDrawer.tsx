'use client';

import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING, type Request } from './data';
import NotesField from './NotesField';
import { updateDetailSheetSpecs } from './detailSheet';

interface Props {
  open: boolean;
  req: Request;
  onClose: () => void;
  onSend: () => void;
}

function SectionIcon({ icon }: { icon: string }) {
  return (
    <span className="w-5 h-5 flex items-center justify-center text-[var(--text-sec)]">
      <i className={`${icon} text-[15px]`} />
    </span>
  );
}

function Section({
  icon,
  title,
  action,
  children,
}: {
  icon: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SectionIcon icon={icon} />
          <p className="text-[13px] font-semibold text-[var(--text)]">{title}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[12px] text-[var(--text-sec)]">
        {label}
        {required && <span className="text-[var(--alert)]"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls = `mt-1 w-full h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] tabular-nums outline-none placeholder:text-[var(--muted-text)] ${FOCUS_RING}`;

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 px-3 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
        selected
          ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--on-accent)]'
          : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-sec)] hover:bg-[var(--canvas)]'
      }`}
    >
      {label}
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-[var(--muted)] last:border-0">
      <span className="text-[12px] text-[var(--text-sec)]">{label}</span>
      <span className="text-[12px] text-[var(--text)] tabular-nums">{value}</span>
    </div>
  );
}

const METAL_OPTIONS = ['Gold', 'Silver', 'Platinum', 'Palladium'];
const STONE_OPTIONS = [
  'Natural Diamond',
  'Lab Grown Diamond',
  'Moissanite',
  'Ruby',
  'Emerald',
  'Blue Sapphire',
  'Yellow Sapphire',
  'Pearl',
  'Cubic Zirconia (CZ)',
  'No Stone',
];
const SETTING_OPTIONS = [
  'Bezel',
  'Prong',
  'Halo',
  'Pavé',
  'Channel',
  'Flush',
  'Tension',
  'Cluster',
  'Invisible',
];

function DropdownSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={ref} className="relative mt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full h-10 pl-3 pr-9 text-[13px] text-left text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none flex items-center justify-between gap-2 ${FOCUS_RING}`}
      >
        <span className="flex-1 truncate text-left">{value}</span>
        <span className="w-5 h-5 flex items-center justify-center text-[var(--text-sec)] shrink-0">
          <i className={`ri-${open ? 'arrow-up-s' : 'arrow-down-s'}-line text-[16px]`} />
        </span>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-lg py-1 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full h-9 px-3 text-[13px] text-left flex items-center justify-between gap-2 transition-colors duration-150 whitespace-nowrap ${
                value === opt
                  ? 'bg-[var(--canvas)] text-[var(--accent-text)] font-medium'
                  : 'text-[var(--text-sec)] hover:bg-[var(--muted)]'
              }`}
            >
              {opt}
              {value === opt && (
                <i className="ri-check-line text-[15px] text-[var(--accent-text)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MetalTypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <DropdownSelect value={value} onChange={onChange} options={METAL_OPTIONS} />
  );
}

function StoneTypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <DropdownSelect value={value} onChange={onChange} options={STONE_OPTIONS} />
  );
}

function SettingTypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <DropdownSelect value={value} onChange={onChange} options={SETTING_OPTIONS} />
  );
}

export default function DetailSheetDrawer({
  open,
  req,
  onClose,
  onSend,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [budget, setBudget] = useState('400');
  const [metalType, setMetalType] = useState('Gold');
  const [metalWeight, setMetalWeight] = useState('');
  const [threeTone, setThreeTone] = useState('');
  const [metalColor, setMetalColor] = useState('Yellow Gold');
  const [tone, setTone] = useState('Two Tone');
  const [stoneType, setStoneType] = useState('Natural Diamond');
  const [settingType, setSettingType] = useState('Prong');
  const [stoneCount, setStoneCount] = useState('34');
  const [stoneSize, setStoneSize] = useState('14');
  const [length, setLength] = useState('14');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('14');
  const [notes, setNotes] = useState(
    'Design a luxury 18k gold pendant with a 0.5ct round diamond in a prong setting, surrounded by delicate filigree work. The piece should feel timeless and elegant, suitable for a VIP client.'
  );

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const readyPill = (
    <span className="inline-flex h-6 px-3 rounded-full text-[12px] font-medium items-center whitespace-nowrap bg-[var(--success-bg)] text-[var(--success)]">
      Ready for Review
    </span>
  );

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Detail sheet"
        className="absolute top-0 right-0 h-full w-full max-w-[560px] bg-[var(--canvas)] flex flex-col"
      >
        <div className="flex items-start justify-between gap-3 px-5 py-4 bg-[var(--surface)] border-b border-[var(--border)]">
          <div>
            <h2 className="text-[18px] font-semibold text-[var(--text)]">
              Detail Sheet
            </h2>
            <p className="mt-0.5 text-[12px] text-[var(--text-sec)]">
              Review manufacturing specifications before sending.
            </p>
          </div>
          <button
            type="button"
            ref={closeRef}
            onClick={onClose}
            aria-label="Close detail sheet"
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--text)] hover:bg-[var(--muted)] transition-colors duration-150 shrink-0 ${FOCUS_RING}`}
          >
            <i className="ri-close-line text-[18px] w-5 h-5 flex items-center justify-center" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-4">
          <Section icon="ri-file-list-3-line" title="Design Summary" action={readyPill}>
            <div className="mt-3 grid grid-cols-[1fr_88px] gap-3">
              <img
                src={req.views.front}
                alt="Design front view"
                className="w-full aspect-square object-cover rounded-[12px] border border-[var(--border)]"
              />
              <div className="grid grid-rows-3 gap-2">
                {['side', 'back', 'worn'].map((k) => (
                  <img
                    key={k}
                    src={req.views[k as keyof typeof req.views]}
                    alt={`${k} view`}
                    className="w-full h-full object-cover rounded-[8px] border border-[var(--border)]"
                  />
                ))}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[12px] text-[var(--text-sec)]">
              <span>{req.designNo}</span>
              <span className="inline-flex h-5 px-2 rounded-full text-[11px] font-medium items-center bg-[var(--muted)] text-[var(--text-sec)]">
                V3
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {['Pendant', '18k Gold', 'Diamond - 0.5ct', 'Prong / Filigree', '$4,500 - $5,800'].map(
                (t) => (
                  <span
                    key={t}
                    className="inline-flex h-6 px-2.5 rounded-full text-[11px] font-medium items-center bg-[var(--muted)] text-[var(--text-sec)] whitespace-nowrap"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
            <p className="mt-3 text-[14px] font-semibold text-[var(--text)]">
              {req.category}
            </p>
          </Section>

          <Section icon="ri-money-dollar-circle-line" title="Budget">
            <Field label="Budget ($)">
              <input
                inputMode="numeric"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="400"
                className={inputCls}
              />
            </Field>
          </Section>

          <Section icon="ri-vip-diamond-line" title="Metal Details">
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Metal Type" required>
                <MetalTypeSelect value={metalType} onChange={setMetalType} />
              </Field>
              <Field label="Metal Karat" required>
                <input value="14K" readOnly className={inputCls} />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Metal Weight (grams)">
                <input
                  inputMode="decimal"
                  value={metalWeight}
                  onChange={(e) => {
                    setMetalWeight(e.target.value);
                    updateDetailSheetSpecs({ metalWeight: e.target.value });
                  }}
                  placeholder="e.g. 4.2"
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="mt-3">
              <p className="text-[12px] text-[var(--text-sec)]">
                Metal Color<span className="text-[var(--alert)]"> *</span>
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {['Yellow Gold', 'White Gold', 'Rose Gold'].map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    selected={metalColor === c}
                    onClick={() => setMetalColor(c)}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[12px] text-[var(--text-sec)]">Tone Specification</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {['Two Tone', 'Three Tone'].map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    selected={tone === c}
                    onClick={() => {
                      setTone(c);
                      updateDetailSheetSpecs({ toneSpecification: c });
                    }}
                  />
                ))}
              </div>
            </div>
            {tone === 'Three Tone' && (
              <div className="mt-3">
                <Field label="Three Tone Specification">
                  <input
                    value={threeTone}
                    onChange={(e) => {
                      setThreeTone(e.target.value);
                      updateDetailSheetSpecs({ threeToneSpecification: e.target.value });
                    }}
                    placeholder="e.g. Rose + White + Yellow"
                    className={inputCls}
                  />
                </Field>
              </div>
            )}
          </Section>

          <Section icon="ri-star-line" title="Stone Details">
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Stone Type" required>
                <StoneTypeSelect value={stoneType} onChange={setStoneType} />
              </Field>
              <Field label="Setting Type" required>
                <SettingTypeSelect value={settingType} onChange={setSettingType} />
              </Field>
              <Field label="Stone Count">
                <input
                  inputMode="numeric"
                  value={stoneCount}
                  onChange={(e) => setStoneCount(e.target.value)}
                  placeholder="34"
                  className={inputCls}
                />
              </Field>
              <Field label="Stone Size">
                <input
                  inputMode="numeric"
                  value={stoneSize}
                  onChange={(e) => setStoneSize(e.target.value)}
                  placeholder="14"
                  className={inputCls}
                />
              </Field>
            </div>
          </Section>

          <Section icon="ri-ruler-2-line" title="Size &amp; Dimensions">
            <div className="mt-3">
              <p className="text-[12px] text-[var(--text-sec)]">
                Pendant Size (L × W × H)<span className="text-[var(--alert)]"> *</span>
              </p>
              <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Length">
                  <input
                    inputMode="numeric"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="14"
                    className={inputCls}
                  />
                </Field>
                <Field label="Width">
                  <input
                    inputMode="numeric"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="14"
                    className={inputCls}
                  />
                </Field>
                <Field label="Height">
                  <input
                    inputMode="numeric"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="14"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
            <div className="mt-3">
              <Field label="Add Size (L × W × H)">
                <input placeholder="e.g. 14 × 14 × 14 mm" className={inputCls} />
              </Field>
            </div>
            <div className="mt-3">
              <label className="block">
                <span className="text-[12px] text-[var(--text-sec)]">Custom Notes</span>
                <textarea
                  rows={2}
                  placeholder="Additional sizing or proportion notes..."
                  className={`mt-1 w-full px-3 py-2 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--muted-text)] resize-none ${FOCUS_RING}`}
                />
              </label>
            </div>
          </Section>

          <Section icon="ri-quill-pen-line" title="Manufacturing Notes">
            <div className="mt-3">
              <NotesField
                value={notes}
                onChange={(val) => {
                  setNotes(val);
                  updateDetailSheetSpecs({ specialInstructions: val });
                }}
                maxLength={180}
                rows={5}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                className={`h-8 px-3 text-[12px] font-medium text-[var(--accent-text)] border border-[var(--border)] rounded-full hover:bg-[var(--muted)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
              >
                Upload
              </button>
            </div>
          </Section>

          <Section icon="ri-list-check" title="Sheet Summary">
            <div className="mt-3 flex items-center gap-2 text-[12px] text-[var(--text-sec)]">
              <i className="ri-checkbox-circle-line text-[15px] text-[var(--success)]" />
              Complete required fields
            </div>
            <div className="mt-2">
              <InfoRow label="Product" value={req.category} />
              <InfoRow label="Metal" value="—" />
              <InfoRow label="Budget" value="—" />
            </div>
          </Section>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-4 bg-[var(--surface)] border-t border-[var(--border)]">
          <button
            type="button"
            className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] hover:text-[var(--accent-text)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={onSend}
            className={`h-9 px-5 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            <i className="ri-send-plane-fill text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
            Send to Manufacturer
          </button>
        </div>
      </aside>
    </div>
  );
}