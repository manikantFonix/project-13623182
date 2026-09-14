'use client';

import { useEffect, useRef, useState } from 'react';
import type { Product } from './ProductTable';
import Alert from './Alert';

export type AddDemo =
  | 'default'
  | 'countError'
  | 'noCategory'
  | 'ready'
  | 'uploading'
  | 'notEnough'
  | 'unresolved'
  | 'failed';

interface Props {
  open: boolean;
  onClose: () => void;
  openButtonRef?: React.RefObject<HTMLButtonElement | null>;
  onAddProduct: (p: Product) => void;
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
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20ring%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=200&height=200&seq=31&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20ring%20back%20view%20showing%20the%20band%20and%20setting%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=200&height=200&seq=32&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20ring%20side%20profile%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=200&height=200&seq=33&orientation=squarish',
];

const DRAFT_DESC =
  'Bridal solitaire ring with a tapered band, a raised six-prong setting and a brilliant-cut center stone.';

const demos: AddDemo[] = [
  'default',
  'countError',
  'noCategory',
  'ready',
  'uploading',
  'notEnough',
  'unresolved',
  'failed',
];

const demoLabel: Record<AddDemo, string> = {
  default: 'Default',
  countError: 'Count',
  noCategory: 'No cat',
  ready: 'Ready',
  uploading: 'Uploading',
  notEnough: 'Renders',
  unresolved: 'Unresolved',
  failed: 'Failed',
};

export default function AddProductDialog({
  open,
  onClose,
  openButtonRef,
  onAddProduct,
}: Props) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [countError, setCountError] = useState(false);
  const [category, setCategory] = useState('');
  const [catOpen, setCatOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [aiWritten, setAiWritten] = useState(false);
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [notEnough, setNotEnough] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [preview, setPreview] = useState<AddDemo>('default');
  const [dragOver, setDragOver] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const addTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addTimer.current) clearTimeout(addTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setPreview('default');
    setPhotos([]);
    setCountError(false);
    setCategory('');
    setCatOpen(false);
    setDesc('');
    setAiWritten(false);
    setPrice('');
    setUploading(false);
    setNotEnough(false);
    setSaveError(false);
    setDragOver(false);
    cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !uploading) {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const els = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.style.display !== 'none');
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, uploading]);

  const close = () => {
    openButtonRef?.current?.focus();
    onClose();
  };

  if (!open) return null;

  const photosReady = photos.length === 3;
  const categorySet = category !== '';
  const canCreate = photosReady && categorySet && !uploading && !notEnough;

  const handleFiles = (files: File[]) => {
    setCountError(false);
    if (files.length !== 3) {
      setCountError(true);
      return;
    }
    setPhotos(files.map((f) => URL.createObjectURL(f)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    handleFiles(files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const removePhoto = () => {
    setCountError(false);
    setPhotos([]);
  };

  const fillDraft = () => {
    setDesc(DRAFT_DESC);
    setAiWritten(true);
  };

  const buildProduct = (unresolved: boolean): Product => ({
    id: String(Date.now()),
    category,
    description: desc.trim() || 'Bridal piece',
    renderStatus: unresolved ? 'pending' : 'complete',
    price: price === '' ? null : Number(price.replace(/,/g, '')),
    active: true,
    image: photos[0] ?? '',
    angleWarning: unresolved,
  });

  const submit = () => {
    if (!canCreate) return;
    if (preview === 'notEnough') {
      setUploading(true);
      addTimer.current = setTimeout(() => {
        setUploading(false);
        setNotEnough(true);
      }, 900);
      return;
    }
    setUploading(true);
    addTimer.current = setTimeout(() => {
      setUploading(false);
      if (preview === 'failed') {
        setSaveError(true);
        return;
      }
      onAddProduct(buildProduct(preview === 'unresolved'));
      close();
    }, 1200);
  };

  const applyPreview = (d: AddDemo) => {
    setPreview(d);
    setUploading(d === 'uploading');
    setNotEnough(d === 'notEnough');
    setSaveError(d === 'failed');
    setCountError(d === 'countError');
    setAiWritten(false);
    const withPhotos = ['noCategory', 'ready', 'uploading', 'notEnough', 'unresolved', 'failed'].includes(d);
    setPhotos(withPhotos ? SLOT_IMAGES : []);
    setCategory(['ready', 'uploading', 'notEnough', 'unresolved', 'failed'].includes(d) ? 'Ring' : '');
    setDesc(d === 'unresolved' ? 'Bridal solitaire ring' : '');
    setPrice(d === 'failed' ? '1,240' : '');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={() => !uploading && close()}
      />
      <div
        ref={dialogRef}
        className="relative w-[680px] max-h-[90vh] overflow-auto bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-7"
      >
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Add product
        </h2>
        <p className="mt-1 text-[13px] text-[var(--text-sec)]">
          Upload three photographs of the piece.
        </p>

        {photosReady ? (
          <div className="mt-5">
            <div className="flex gap-3">
              {photos.map((url, i) => (
                <div key={i} className="relative w-20 h-20">
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full rounded-[12px] object-cover border border-[var(--border)]"
                  />
                  <button
                    onClick={removePhoto}
                    aria-label="Remove photograph"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
                  >
                    <i className="ri-close-line text-[14px]" />
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-[var(--text-sec)]">
              We'll work out which angle each one is.
            </p>
          </div>
        ) : (
          <div className="mt-5">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !uploading && fileRef.current?.click()}
              className={`h-[160px] rounded-[12px] border border-dashed bg-[var(--surface)] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors duration-150 ${
                dragOver ? 'border-[var(--accent)]' : 'border-[var(--border-strong)] hover:border-[var(--accent)]'
              }`}
            >
              <i className="ri-add-line text-[24px] text-[var(--text-sec)]" />
              <span className="text-[13px] text-[var(--text)]">
                Add three photographs
              </span>
              <span className="text-[13px] text-[var(--text-sec)]">
                Drop them here or click to choose. Upload all three at once.
              </span>
            </div>
            <input
              ref={fileRef}
              type="file"
              multiple
              className="hidden"
              disabled={uploading}
              onChange={handleInputChange}
            />
            {countError && (
              <p className="mt-2 text-[13px] text-[var(--alert)]">
                Add exactly three photographs. This one needs all three together.
              </p>
            )}
            {!countError && (
              <Alert variant="info" className="mt-3">
                Add all three photographs to continue.
              </Alert>
            )}
          </div>
        )}

        <div className="mt-5">
          <label className="block text-[13px] font-medium text-[var(--text)]">
            Category
          </label>
          <div className="mt-1 relative">
            <button
              disabled={uploading}
              onClick={() => setCatOpen((o) => !o)}
              className="w-full h-10 px-3 text-[13px] border border-[var(--border)] rounded-[12px] bg-[var(--surface)] text-left flex items-center justify-between transition-colors duration-150 hover:border-[var(--border-strong)] disabled:bg-[var(--canvas)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
            >
              <span className={category ? 'text-[var(--text)]' : 'text-[var(--text-sec)]'}>
                {category || 'Choose a category'}
              </span>
              <span className="w-4 h-4 flex items-center justify-center text-[var(--text-sec)]">
                <i
                  className={`${
                    catOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                  } text-[16px]`}
                />
              </span>
            </button>
            {catOpen && (
              <div className="absolute z-30 mt-1 w-full bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-1 max-h-56 overflow-auto">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCategory(c);
                      setCatOpen(false);
                    }}
                    className="w-full text-left px-3 h-9 text-[13px] text-[var(--text)] hover:bg-[var(--canvas)] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
          {photosReady && !categorySet && (
            <Alert variant="info" className="mt-2">
              Choose a category to continue.
            </Alert>
          )}
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-[13px] font-medium text-[var(--text)]">
                Description
              </label>
              <span className="text-[13px] text-[var(--text-sec)]">Optional</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={!photosReady || uploading}
                onClick={fillDraft}
                className="h-9 px-4 text-[13px] font-medium bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--canvas)] transition-colors duration-150 whitespace-nowrap disabled:bg-[var(--canvas)] disabled:text-[var(--text-sec)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
              >
                Write it for me
              </button>
              {!photosReady && (
                <span className="text-[13px] text-[var(--text-sec)]">
                  Add the photographs first.
                </span>
              )}
            </div>
          </div>
          <textarea
            value={desc}
            disabled={uploading}
            rows={3}
            onChange={(e) => {
              setDesc(e.target.value);
              setAiWritten(false);
            }}
            className="mt-1 w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-[12px] text-[var(--text)] outline-none focus:border-[var(--accent)] resize-none disabled:bg-[var(--canvas)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
          />
          <p className="mt-1 text-[13px] text-[var(--text-sec)]">
            Leave blank and we'll write one from the photographs.
          </p>
          {aiWritten && (
            <p className="mt-1 text-[13px] text-[var(--text-sec)]">
              Written by AI. Edit it however you like.
            </p>
          )}
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <label className="text-[13px] font-medium text-[var(--text)]">Price</label>
            <span className="text-[13px] text-[var(--text-sec)]">Optional</span>
          </div>
          <div className="mt-1 flex items-center border border-[var(--border)] rounded-[12px] focus-within:border-[var(--accent)] bg-[var(--surface)] disabled:bg-[var(--canvas)]">
            <span className="pl-3 text-[13px] text-[var(--text-sec)]">$</span>
            <input
              value={price}
              disabled={uploading}
              onChange={(e) => setPrice(e.target.value.replace(/[^\d,.]/g, ''))}
              placeholder="1,240"
              className="w-full h-10 pl-2 pr-3 text-[13px] text-[var(--text)] outline-none bg-transparent tabular-nums disabled:bg-[var(--canvas)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
            />
          </div>
          <p className="mt-1 text-[13px] text-[var(--text-sec)]">
            Leave blank to show Price on request.
          </p>
        </div>

        {notEnough && (
          <Alert variant="warning" className="mt-5">
            You don't have enough renders left for this product. You need at
            least 12 and have 4. Nothing has been added and no renders have
            been used.
          </Alert>
        )}
        {saveError && (
          <Alert variant="error" className="mt-5">
            We couldn't save this product. Nothing was added — try again.
          </Alert>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[13px] text-[var(--text-sec)]">
            This will use at least 12 renders.
          </p>
          <div className="flex items-center gap-4">
            <button
              ref={cancelRef}
              onClick={() => !uploading && close()}
              className="px-2 h-9 text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
            >
              {uploading ? 'Cancel upload' : 'Cancel'}
            </button>
            <button
              onClick={submit}
              disabled={!canCreate}
              className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${
                canCreate
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]'
                  : 'bg-[var(--canvas)] border-[var(--border)] text-[var(--text-sec)]'
              }`}
            >
              {uploading ? 'Adding…' : 'Add product'}
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-50 max-w-[60vw] flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-full p-1">
        <span className="px-2 text-[13px] font-medium text-[var(--text-sec)]">
          Dialog state
        </span>
        {demos.map((d) => (
          <button
            key={d}
            onClick={() => applyPreview(d)}
            className={`h-7 px-2 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${
              preview === d
                ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                : 'text-[var(--text-sec)] hover:bg-[var(--canvas)]'
            }`}
          >
            {demoLabel[d]}
          </button>
        ))}
      </div>
    </div>
  );
}