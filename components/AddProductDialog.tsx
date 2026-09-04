'use client';

import { useEffect, useRef, useState } from 'react';

export type AddDemo =
  | 'default'
  | 'twoFilled'
  | 'noCategory'
  | 'ready'
  | 'uploading'
  | 'rejectedType'
  | 'rejectedSize'
  | 'rejectedDim'
  | 'notEnough'
  | 'failed';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  'Ring',
  'Necklace',
  'Pendant',
  'Earring',
  'Bracelet',
  'Body jewelry',
  'Brooch',
  'Grillz',
  'Watch',
  'Bail',
  'Clasp',
  'Buckle',
  'Cufflink',
];

const SLOT_IMAGES = [
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20ring%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=200&height=200&seq=31&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20ring%20back%20view%20showing%20the%20band%20and%20setting%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=200&height=200&seq=32&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20ring%20side%20profile%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewellery%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=200&height=200&seq=33&orientation=squarish',
];

const demos: AddDemo[] = [
  'default',
  'twoFilled',
  'noCategory',
  'ready',
  'uploading',
  'rejectedType',
  'rejectedSize',
  'rejectedDim',
  'notEnough',
  'failed',
];

const demoLabel: Record<AddDemo, string> = {
  default: 'Default',
  twoFilled: 'Two filled',
  noCategory: 'No cat',
  ready: 'Ready',
  uploading: 'Uploading',
  rejectedType: 'Type',
  rejectedSize: 'Size',
  rejectedDim: 'Small',
  notEnough: 'Renders',
  failed: 'Failed',
};

const REJECT_MSG: Record<string, string> = {
  type: "This file type isn't supported. Use JPEG, PNG, WebP or HEIC.",
  size: 'This image is larger than 15 MB.',
  dim: 'This image is smaller than 800 × 800 pixels.',
};

type ErrMode = 'none' | 'type' | 'size' | 'dim' | 'save';

interface Photo {
  filled: boolean;
  url: string;
}

export default function AddProductDialog({ open, onClose }: Props) {
  const [photos, setPhotos] = useState<Photo[]>([
    { filled: false, url: '' },
    { filled: false, url: '' },
    { filled: false, url: '' },
  ]);
  const [category, setCategory] = useState('');
  const [catOpen, setCatOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [notEnough, setNotEnough] = useState(false);
  const [errMode, setErrMode] = useState<ErrMode>('none');
  const [flagIdx, setFlagIdx] = useState<number | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [preview, setPreview] = useState<AddDemo>('default');
  const cancelRef = useRef<HTMLButtonElement>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !uploading) onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, uploading, onClose]);

  if (!open) return null;

  const filledCount = photos.filter((p) => p.filled).length;
  const allFilled = filledCount === 3;
  const categorySet = category !== '';
  const canCreate = allFilled && categorySet && !uploading && !notEnough;

  const reason = !allFilled
    ? 'Add all three photographs to continue.'
    : !categorySet
      ? 'Choose a category to continue.'
      : null;

  const setPhotoAt = (idx: number, photo: Photo) => {
    setErrMode('none');
    setFlagIdx(null);
    setNotEnough(false);
    setPhotos((prev) => prev.map((p, i) => (i === idx ? photo : p)));
  };

  const removePhoto = (idx: number) => setPhotoAt(idx, { filled: false, url: '' });

  const validate = (file: File): ErrMode => {
    const ok = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!ok.includes(file.type)) return 'type';
    if (file.size > 15 * 1024 * 1024) return 'size';
    return 'none';
  };

  const addFile = (idx: number, file: File) => {
    const mode = validate(file);
    if (mode !== 'none') {
      setErrMode(mode);
      setFlagIdx(idx);
      return;
    }
    const url = URL.createObjectURL(file);
    setPhotoAt(idx, { filled: true, url });
  };

  const openPicker = (idx: number) => inputs.current[idx]?.click();

  const applyPreview = (d: AddDemo) => {
    setPreview(d);
    setUploading(d === 'uploading');
    setNotEnough(d === 'notEnough');
    const rejected = ['rejectedType', 'rejectedSize', 'rejectedDim'].includes(d);
    const filled = ['twoFilled', 'noCategory', 'ready', 'uploading'].includes(d)
      ? d === 'twoFilled'
        ? [true, true, false]
        : [true, true, true]
      : ['notEnough', 'failed'].includes(d)
        ? [true, true, true]
        : [false, false, false];
    setPhotos(
      filled.map((f, i) => ({ filled: f, url: f ? SLOT_IMAGES[i] : '' }))
    );
    setFlagIdx(rejected ? 0 : null);
    setCategory(
      ['ready', 'uploading', 'notEnough', 'failed'].includes(d) ? 'Ring' : ''
    );
    setDesc(d === 'failed' ? 'Bridal solitaire ring' : '');
    setPrice(d === 'failed' ? '1,240' : '');
    setErrMode(
      d === 'rejectedType'
        ? 'type'
        : d === 'rejectedSize'
          ? 'size'
          : d === 'rejectedDim'
            ? 'dim'
            : d === 'failed'
              ? 'save'
              : 'none'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(19,26,31,0.4)]"
        onClick={() => !uploading && onClose()}
      />
      <div className="relative w-[680px] max-h-[90vh] overflow-auto bg-white border border-[#DDE3E6] rounded-[28px] p-7">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#131A1F]">
          Add product
        </h2>
        <p className="mt-1 text-[13px] text-[#5C6870]">
          Upload three photographs of the piece. We'll work out which angle
          each one is.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {photos.map((photo, idx) => (
            <div key={idx}>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragIdx(idx);
                }}
                onDragLeave={() => setDragIdx(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragIdx(null);
                  const file = e.dataTransfer.files?.[0];
                  if (file) addFile(idx, file);
                }}
                onClick={() => !photo.filled && !uploading && openPicker(idx)}
                className={`relative aspect-square rounded-[12px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-150 ${
                  photo.filled
                    ? 'border border-[#DDE3E6]'
                    : errMode !== 'none' && flagIdx === idx
                      ? 'border border-dashed border-[#A8552A]'
                      : dragIdx === idx
                        ? 'border border-dashed border-[#16323F] bg-white'
                        : 'border border-dashed border-[#C3CCD1] bg-white hover:border-[#16323F]'
                } overflow-hidden`}
              >
                {photo.filled ? (
                  <>
                    <img
                      src={photo.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {uploading && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-[#16323F]">
                        <div className="absolute inset-y-0 left-0 w-2/3 bg-[#1F4353]" />
                      </div>
                    )}
                    {!uploading && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto(idx);
                        }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-[#DDE3E6] flex items-center justify-center text-[#5C6870] hover:text-[#131A1F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
                      >
                        <i className="ri-close-line text-[14px]" />
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {!uploading && (
                      <i className="ri-add-line text-[24px] text-[#5C6870]" />
                    )}
                    <span className="text-sm text-[#5C6870]">
                      {uploading ? 'Uploading…' : ['Front', 'Back', 'Side'][idx]}
                    </span>
                  </>
                )}
              </div>
              <input
                ref={(el) => {
                  inputs.current[idx] = el;
                }}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) addFile(idx, file);
                  e.target.value = '';
                }}
              />
            </div>
          ))}
        </div>

        {errMode !== 'none' && errMode !== 'save' && (
          <p className="mt-2 text-[13px] text-[#A8552A]">{REJECT_MSG[errMode]}</p>
        )}

        <div className="mt-5">
          <label className="block text-sm font-medium text-[#131A1F]">
            Category
          </label>
          <div className="mt-1 relative">
            <button
              disabled={uploading}
              onClick={() => setCatOpen((o) => !o)}
              className="w-full h-10 px-3 text-sm border border-[#DDE3E6] rounded-[12px] bg-white text-left flex items-center justify-between transition-colors duration-150 hover:border-[#C3CCD1] disabled:bg-[#EFF2F3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
            >
              <span className={category ? 'text-[#131A1F]' : 'text-[#9AA6AD]'}>
                {category || 'Choose a category'}
              </span>
              <span className="w-4 h-4 flex items-center justify-center text-[#5C6870]">
                <i
                  className={`${
                    catOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                  } text-[16px]`}
                />
              </span>
            </button>
            {catOpen && (
              <div className="absolute z-30 mt-1 w-full bg-white border border-[#DDE3E6] rounded-[12px] p-1 max-h-56 overflow-auto">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCategory(c);
                      setCatOpen(false);
                    }}
                    className="w-full text-left px-3 h-9 text-sm text-[#131A1F] hover:bg-[#EFF2F3] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-[#131A1F]">
              Description
            </label>
            <span className="text-[13px] text-[#5C6870]">Optional</span>
          </div>
          <textarea
            value={desc}
            disabled={uploading}
            rows={3}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-sm border border-[#DDE3E6] rounded-[12px] text-[#131A1F] outline-none focus:border-[#16323F] resize-none disabled:bg-[#EFF2F3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          />
          <p className="mt-1 text-[13px] text-[#5C6870]">
            Leave blank and we'll write one from the photographs.
          </p>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-[#131A1F]">Price</label>
            <span className="text-[13px] text-[#5C6870]">Optional</span>
          </div>
          <div className="mt-1 flex items-center border border-[#DDE3E6] rounded-[12px] focus-within:border-[#16323F] bg-white disabled:bg-[#EFF2F3]">
            <span className="pl-3 text-sm text-[#5C6870]">$</span>
            <input
              value={price}
              disabled={uploading}
              onChange={(e) => setPrice(e.target.value.replace(/[^\d,.]/g, ''))}
              placeholder="1,240"
              className="w-full h-10 pl-2 pr-3 text-sm text-[#131A1F] outline-none bg-transparent tabular-nums disabled:bg-[#EFF2F3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
            />
          </div>
          <p className="mt-1 text-[13px] text-[#5C6870]">
            Leave blank to show Price on request.
          </p>
        </div>

        {(notEnough || errMode === 'save') && (
          <div className="mt-5 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              {notEnough
                ? "You don't have enough renders left for this product. You need 12 and have 4."
                : "We couldn't save this product. Nothing was added — try again."}
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[13px] text-[#5C6870]">This will use 12 renders.</p>
          <div className="flex items-center gap-4">
            <button
              ref={cancelRef}
              onClick={() => !uploading && onClose()}
              className="px-2 h-9 text-sm font-medium text-[#5C6870] hover:text-[#131A1F] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
            >
              {uploading ? 'Cancel upload' : 'Cancel'}
            </button>
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  setUploading(true);
                  setTimeout(() => {
                    setUploading(false);
                    setErrMode('save');
                  }, 1400);
                }}
                disabled={!canCreate}
                className={`h-9 px-4 text-sm font-medium rounded-full border transition-colors duration-150 whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
                  canCreate
                    ? 'bg-[#16323F] border-[#16323F] text-white hover:bg-[#1F4353]'
                    : 'bg-[#EFF2F3] border-[#DDE3E6] text-[#9AA6AD]'
                }`}
              >
                {uploading ? 'Adding…' : 'Add product'}
              </button>
              {reason && !uploading && null}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-50 max-w-[60vw] flex items-center gap-1 bg-white border border-[#DDE3E6] rounded-full p-1 shadow-[0_8px_20px_-10px_rgba(19,26,31,0.25)]">
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
            {demoLabel[d]}
          </button>
        ))}
      </div>
    </div>
  );
}