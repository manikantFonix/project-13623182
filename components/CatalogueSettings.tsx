'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import RegenerateDialog from './RegenerateDialog';

type SettingsDemo =
  | 'default'
  | 'changed'
  | 'dialogDefault'
  | 'dialogOption2'
  | 'dialogNotEnough'
  | 'remAttempt'
  | 'saved1'
  | 'saved2';

const METALS = [
  { id: 'yellow', name: 'Yellow gold', hex: '#D9B45B', locked: true },
  { id: 'white', name: 'White gold', hex: '#C7CBCC' },
  { id: 'rose', name: 'Rose gold', hex: '#D19E92' },
];

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

export default function CatalogueSettings() {
  const [cols, setCols] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [opt, setOpt] = useState<1 | 2>(1);
  const [notEnough, setNotEnough] = useState(false);
  const [remMsg, setRemMsg] = useState(false);
  const [confirm, setConfirm] = useState<null | 1 | 2>(null);
  const [preview, setPreview] = useState<SettingsDemo>('default');
  const remTimer = useRef<ReturnType<typeof setTimeout>>(null);

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
    <main className="min-h-screen bg-[#EFF2F3] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="text-[13px] text-[#5C6870]">
          <Link href="/" className="hover:text-[#131A1F] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]">Catalogues</Link>
          <span className="mx-1">/</span>
          <Link href="/catalogue/bridal-2026" className="hover:text-[#131A1F] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]">Bridal 2026</Link>
          <span className="mx-1">/</span>
          <span className="text-[#131A1F]">Settings</span>
        </nav>

        <h1 className="mt-4 text-[26px] font-semibold tracking-[-0.02em] text-[#131A1F]">
          Catalogue settings
        </h1>

        <div className="mt-6 max-w-[720px] bg-white border border-[#DDE3E6] rounded-[12px] p-6">
          <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#131A1F]">
            Metal colours
          </h2>
          <p className="mt-1 text-[13px] text-[#5C6870]">
            Products you add from now on will be generated in these colours.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {METALS.map((m) => {
              const locked = !!m.locked;
              const selected = locked || cols.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => (locked ? clickLocked() : toggle(m.id))}
                  className={`flex flex-col items-center gap-2 border-2 rounded-[12px] py-3 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
                    selected ? 'border-[#16323F]' : 'border-[#DDE3E6] hover:border-[#C3CCD1]'
                  } ${locked ? 'bg-[#F4F6F7] cursor-not-allowed' : ''}`}
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
                  <span className={`flex items-center gap-1 text-sm ${locked ? 'text-[#5C6870]' : 'text-[#131A1F]'}`}>
                    {m.name}
                    {locked && <i className="ri-lock-2-line text-[14px]" />}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-[13px] text-[#5C6870]">
            This colour has already been generated and can't be removed.
          </p>
          {remMsg && (
            <p className="mt-1 text-[13px] text-[#A8552A]">
              Yellow gold has already been generated and can't be removed.
            </p>
          )}

          {confirm === 1 && (
            <p className="mt-4 text-[13px] text-[#3D6B54]">
              New products will be generated in yellow gold and rose gold.
              Existing products are unchanged.
            </p>
          )}
          {confirm === 2 && (
            <div className="mt-4 text-[13px] text-[#3D6B54]">
              <p>Generating rose gold for 128 products.</p>
              <button className="mt-1 font-medium text-[#3D6B54] underline underline-offset-2 hover:text-[#2f5542] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]">
                View render status
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={openDialog}
              disabled={!saveEnabled}
              className={`h-10 px-4 text-sm font-medium rounded-full border transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
                saveEnabled
                  ? 'bg-[#16323F] border-[#16323F] text-white hover:bg-[#1F4353]'
                  : 'bg-[#EFF2F3] border-[#DDE3E6] text-[#9AA6AD]'
              }`}
            >
              Save colours
            </button>
          </div>
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

      <div className="fixed bottom-6 right-6 z-40 max-w-[40vw] flex items-center gap-1 bg-white border border-[#DDE3E6] rounded-full p-1 shadow-[0_8px_20px_-10px_rgba(19,26,31,0.25)]">
        <span className="px-2 text-[13px] font-medium text-[#5C6870]">
          Settings state
        </span>
        {demos.map((d) => (
          <button
            key={d}
            onClick={() => applyPreview(d)}
            className={`h-7 px-2 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
              preview === d
                ? 'bg-[#16323F] text-white'
                : 'text-[#5C6870] hover:bg-[#EFF2F3]'
            }`}
          >
            {demoLabel[d]}
          </button>
        ))}
      </div>
    </main>
  );
}