'use client';

import { useEffect, useRef, useState } from 'react';

export type DialogDemo =
  | 'default'
  | 'valid'
  | 'tooLong'
  | 'noColour'
  | 'saving'
  | 'error';

interface Props {
  open: boolean;
  onClose: () => void;
}

const METALS = [
  { id: 'yellow', name: 'Yellow gold', hex: '#D9B45B' },
  { id: 'white', name: 'White gold', hex: '#C7CBCC' },
  { id: 'rose', name: 'Rose gold', hex: '#D19E92' },
];

const LONG_NAME =
  'This is a deliberately long catalogue name that exceeds eighty characters by quite a margin for the test.';

const demos: DialogDemo[] = [
  'default',
  'valid',
  'tooLong',
  'noColour',
  'saving',
  'error',
];

export default function NewCatalogueDialog({ open, onClose }: Props) {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<string[]>(['yellow']);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState<DialogDemo>('default');
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !saving) onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, saving, onClose]);

  if (!open) return null;

  const tooLong = name.length > 80;
  const nameFilled = name.trim().length > 0 && !tooLong;
  const hasColour = selected.length > 0;
  const canCreate = nameFilled && hasColour && !saving;
  const images = selected.length * 4;

  const toggleColour = (id: string) => {
    setError(false);
    if (selected.includes(id)) {
      if (selected.length === 1) return;
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const applyPreview = (d: DialogDemo) => {
    setPreview(d);
    setError(false);
    if (d === 'default') {
      setName('');
      setSelected(['yellow']);
      setSaving(false);
    } else {
      setName(d === 'tooLong' ? LONG_NAME : 'Bridal 2026');
      if (d === 'valid') setSelected(['yellow', 'white']);
      else if (d === 'noColour') setSelected([]);
      else setSelected(['yellow']);
      setSaving(d === 'saving');
      setError(d === 'error');
    }
  };

  const create = () => {
    if (!canCreate) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setError(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(19,26,31,0.4)]"
        onClick={() => !saving && onClose()}
      />
      <div className="relative w-[520px] bg-white border border-[#DDE3E6] rounded-[28px] p-7">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#131A1F]">
          New catalogue
        </h2>

        <div className="mt-6">
          <label className="block text-sm font-medium text-[#131A1F]">
            Catalogue name
          </label>
          <div
            className={`flex items-center border rounded-[12px] transition-colors duration-150 ${
              tooLong ? 'border-[#A8552A]' : 'border-[#DDE3E6]'
            }`}
          >
            <input
              type="text"
              value={name}
              disabled={saving}
              maxLength={90}
              onChange={(e) => {
                setError(false);
                setName(e.target.value);
              }}
              placeholder="Bridal 2026"
              className="w-full px-3 h-10 text-sm text-[#131A1F] placeholder:text-[#9AA6AD] bg-transparent outline-none disabled:bg-[#EFF2F3] disabled:text-[#5C6870] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
            />
          </div>
          <div className="mt-1 flex items-center justify-between">
            {tooLong ? (
              <span className="text-[13px] text-[#A8552A]">
                Catalogue names can be up to 80 characters.
              </span>
            ) : (
              <span />
            )}
            <span className="text-[13px] font-medium text-[#5C6870] tabular-nums">
              {name.length}/80
            </span>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-[#131A1F]">
            Metal colours
          </label>
          <p className="mt-1 text-[13px] text-[#5C6870]">
            Every product in this catalogue will be generated in the colours
            you pick.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {METALS.map((m) => {
              const isSel = selected.includes(m.id);
              return (
                <button
                  key={m.id}
                  disabled={saving}
                  onClick={() => toggleColour(m.id)}
                  className={`flex flex-col items-center gap-2 border-2 rounded-[12px] py-3 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
                    isSel
                      ? 'border-[#16323F]'
                      : 'border-[#DDE3E6] hover:border-[#C3CCD1]'
                  } disabled:opacity-60`}
                >
                  <span
                    className="relative w-7 h-7 rounded-full ring-1 ring-black/10"
                    style={{ backgroundColor: m.hex }}
                  >
                    {isSel && (
                      <span className="absolute inset-0 flex items-center justify-center text-white">
                        <i className="ri-check-line text-[16px]" />
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-[#131A1F]">{m.name}</span>
                </button>
              );
            })}
          </div>
          {!hasColour && (
            <p className="mt-2 text-[13px] text-[#A8552A]">
              Select at least one metal colour.
            </p>
          )}
        </div>

        <div className="mt-4 bg-[#EFF2F3] rounded-[12px] p-4">
          <p className="text-sm text-[#131A1F]">
            Each product will generate 4 views in each colour —{' '}
            <span className="font-medium tabular-nums">{images} images</span>{' '}
            per product.
          </p>
        </div>

        {error && (
          <div className="mt-4 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              We couldn't create this catalogue. Your details have been kept —
              try again.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            ref={cancelRef}
            onClick={() => !saving && onClose()}
            className="text-sm font-medium text-[#5C6870] hover:text-[#131A1F] transition-colors duration-150 px-2 h-9 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          >
            Cancel
          </button>
          <div className="flex flex-col items-center">
            <button
              onClick={create}
              disabled={!canCreate}
              className={`h-9 px-4 text-sm font-medium rounded-full border transition-colors duration-150 whitespace-nowrap flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
                canCreate
                  ? 'bg-[#16323F] border-[#16323F] text-white hover:bg-[#1F4353]'
                  : 'bg-[#EFF2F3] border-[#DDE3E6] text-[#9AA6AD]'
              }`}
            >
              {saving && (
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {saving ? 'Creating…' : 'Create catalogue'}
            </button>
            {!canCreate && !saving && (
              <span className="mt-1 text-[13px] text-[#5C6870]">
                Enter a name to continue.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-1 bg-white border border-[#DDE3E6] rounded-full p-1 shadow-[0_8px_20px_-10px_rgba(19,26,31,0.25)]">
        <span className="px-2 text-[13px] font-medium text-[#5C6870]">
          Dialog state
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
            {d === 'noColour'
              ? 'No colour'
              : d === 'tooLong'
              ? 'Too long'
              : d === 'default'
              ? 'Default'
              : d === 'valid'
              ? 'Valid'
              : d === 'saving'
              ? 'Saving'
              : 'Error'}
          </button>
        ))}
      </div>
    </div>
  );
}