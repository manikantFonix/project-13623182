'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { METAL_LIST } from '../lib/metals';
import RegenerateDialog from './RegenerateDialog';
import DeleteCatalogDialog from './catalog-publication/DeleteCatalogDialog';
import { defaultPublication } from './catalog-publication/types';
import StateSwitcherPanel from './ui/StateSwitcherPanel';
import CoverImagesSection from './catalog-settings/cover/CoverImagesSection';
import {
  COVER_STATES,
  coverLabel,
  type CoverState,
} from './catalog-settings/cover/data';

type SettingsDemo =
  | 'default'
  | 'changed'
  | 'dialogDefault'
  | 'dialogOption2'
  | 'dialogNotEnough'
  | 'remAttempt'
  | 'saved1'
  | 'saved2';

const METALS = METAL_LIST.map((m) => ({
  ...m,
  locked: m.id === 'yellow',
}));

const demos: SettingsDemo[] = [
  'default',
  'changed',
  'dialogDefault',
  'dialogOption2',
  'dialogNotEnough',
  'remAttempt',
  'saved1',
  'saved2',
];

const demoLabel: Record<SettingsDemo, string> = {
  default: 'Default',
  changed: 'Changed',
  dialogDefault: 'Dialog',
  dialogOption2: 'Opt 2',
  dialogNotEnough: 'No renders',
  remAttempt: 'Removal',
  saved1: 'Saved 1',
  saved2: 'Saved 2',
};

export default function CatalogSettings() {
  const [cols, setCols] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [opt, setOpt] = useState<1 | 2>(1);
  const [notEnough, setNotEnough] = useState(false);
  const [remMsg, setRemMsg] = useState(false);
  const [confirm, setConfirm] = useState<null | 1 | 2>(null);
  const [preview, setPreview] = useState<SettingsDemo>('default');
  const [coverPreview, setCoverPreview] = useState<CoverState>('none');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const deleteData = defaultPublication(true);
  const remTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (remTimer.current) clearTimeout(remTimer.current);
    };
  }, []);

  const saveEnabled = cols.length > 0;

  const applyPreview = (d: SettingsDemo) => {
    setPreview(d);
    setDialogOpen(['dialogDefault', 'dialogOption2', 'dialogNotEnough'].includes(d));
    setOpt(d === 'dialogOption2' ? 2 : 1);
    setNotEnough(d === 'dialogNotEnough');
    setCols(['changed', 'dialogDefault', 'dialogOption2', 'dialogNotEnough', 'saved1', 'saved2'].includes(d) ? ['rose'] : []);
    setConfirm(d === 'saved1' ? 1 : d === 'saved2' ? 2 : null);
    setRemMsg(d === 'remAttempt');
  };

  const selectPreview = (v: string) => {
    if ((COVER_STATES as string[]).includes(v)) {
      setCoverPreview(v as CoverState);
    } else {
      applyPreview(v as SettingsDemo);
    }
  };

  const toggle = (id: string) => {
    setConfirm(null);
    setRemMsg(false);
    if (cols.includes(id)) setCols(cols.filter((c) => c !== id));
    else setCols([...cols, id]);
  };

  const clickLocked = () => {
    setCols([]);
    setConfirm(null);
    setRemMsg(true);
    if (remTimer.current) clearTimeout(remTimer.current);
    remTimer.current = setTimeout(() => setRemMsg(false), 2600);
  };

  const openDialog = () => {
    setDialogOpen(true);
    setOpt(1);
    setNotEnough(false);
  };

  const saveDialog = () => {
    setDialogOpen(false);
    setConfirm(opt);
    if (remTimer.current) clearTimeout(remTimer.current);
  };

  return (
    <main className="min-h-screen bg-[var(--canvas)] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="text-[13px] text-[var(--text-sec)]">
          <Link href="/" className="hover:text-[var(--text)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]">Catalogs</Link>
          <span className="mx-1">/</span>
          <Link href="/catalog/bridal-2026" className="hover:text-[var(--text)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]">Bridal 2026</Link>
          <span className="mx-1">/</span>
          <span className="text-[var(--text)]">Settings</span>
        </nav>

        <h1 className="mt-4 text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Catalog settings
        </h1>

        <CoverImagesSection state={coverPreview} />

        <div className="mt-6 max-w-[720px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
          <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[var(--text)]">
            Metal colors
          </h2>
          <p className="mt-1 text-[13px] text-[var(--text-sec)]">
            Products you add from now on will be generated in these colors.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {METALS.map((m) => {
              const locked = !!m.locked;
              const selected = locked || cols.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => (locked ? clickLocked() : toggle(m.id))}
                  className={`flex flex-col items-center gap-2 border-2 rounded-[12px] py-3 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${
                    selected ? 'border-[var(--accent)]' : 'border-[var(--border)] hover:border-[var(--border-strong)]'
                  } ${locked ? 'bg-[var(--muted)] cursor-not-allowed' : ''}`}
                >
                  <span
                    className="relative w-7 h-7 rounded-full ring-1 ring-black/10"
                    style={{ backgroundColor: m.hex }}
                  >
                    {selected && (
                      <span className={`absolute inset-0 flex items-center justify-center text-white ${locked ? 'opacity-50' : ''}`}>
                        <i className="ri-check-line text-[16px]" />
                      </span>
                    )}
                  </span>
                  <span className={`flex items-center gap-1 text-[13px] ${locked ? 'text-[var(--text-sec)]' : 'text-[var(--text)]'}`}>
                    {m.name}
                    {locked && <i className="ri-lock-2-line text-[14px]" />}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-[13px] text-[var(--text-sec)]">
            This color has already been generated and can't be removed.
          </p>
          {remMsg && (
            <p className="mt-1 text-[13px] text-[var(--alert)]">
              Yellow gold has already been generated and can't be removed.
            </p>
          )}

          {confirm === 1 && (
            <p className="mt-4 text-[13px] text-[var(--success)]">
              New products will be generated in yellow gold and rose gold.
              Existing products are unchanged.
            </p>
          )}
          {confirm === 2 && (
            <div className="mt-4 text-[13px] text-[var(--success)]">
              <p>Generating rose gold for 128 products.</p>
              <button className="mt-1 font-medium text-[var(--success)] underline underline-offset-2 hover:text-[var(--success)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]">
                View render status
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={openDialog}
              disabled={!saveEnabled}
              className={`h-10 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${
                saveEnabled
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]'
                  : 'bg-[var(--canvas)] border-[var(--border)] text-[var(--text-sec)]'
              }`}
            >
              Save colors
            </button>
          </div>
        </div>

        <div className="mt-8 max-w-[720px] border-t border-[var(--border)] pt-8">
          <h2 className="text-[15px] font-medium text-[var(--text)]">
            Delete this catalog
          </h2>
          <p className="mt-1 text-[13px] text-[var(--text-sec)]">
            This destroys the catalog and everything in it. It cannot be
            undone.
          </p>
          <button
            ref={deleteButtonRef}
            onClick={() => setDeleteOpen(true)}
            className="mt-4 h-9 px-4 text-[13px] font-medium text-[var(--alert)] bg-white border border-[var(--alert)] rounded-full hover:bg-[var(--muted)] hover:text-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
          >
            Delete catalog
          </button>
        </div>
      </div>

      <RegenerateDialog
        open={dialogOpen}
        option={opt}
        notEnough={notEnough}
        onOption={setOpt}
        onCancel={() => setDialogOpen(false)}
        onSave={saveDialog}
      />

      <DeleteCatalogDialog
        open={deleteOpen}
        catalogName="Bridal 2026"
        data={deleteData}
        onCancel={() => setDeleteOpen(false)}
        triggerRef={deleteButtonRef}
      />

      <StateSwitcherPanel
        title="Settings state"
        icon="ri-settings-3-line"
        hint="Switch how the catalog settings page looks"
        groups={[
          { label: 'Metal colors', options: demos.map((d) => ({ value: d, label: demoLabel[d] })) },
          { label: 'Cover image', options: COVER_STATES.map((d) => ({ value: d, label: coverLabel[d] })) },
        ]}
        active={(v) => preview === v || coverPreview === v}
        onSelect={selectPreview}
      />
    </main>
  );
}