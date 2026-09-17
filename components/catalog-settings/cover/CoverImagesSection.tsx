'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import CoverSlot from './CoverSlot';
import RemoveCoverDialog from './RemoveCoverDialog';
import { buildCoverDemo } from './data';
import type { CoverImage, CoverState } from './types';

const MAX = 4;
const MIN_WIDTH = 1600;
const MAX_MB = 5;

export default function CoverImagesSection({ state }: { state: CoverState }) {
  const [images, setImages] = useState<CoverImage[]>([]);
  const [liveId, setLiveId] = useState<string | null>(null);
  const [refusal, setRefusal] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [announce, setAnnounce] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const d = buildCoverDemo(state);
    setImages(d.images);
    setLiveId(d.liveId);
    setRefusal(d.refusal);
    setUploading(d.uploading);
    setUploadError(d.error);
    setConfirmId(d.confirmLiveId);
    setAnnounce('');
  }, [state]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const live = images.find((i) => i.id === liveId) ?? null;
  const atLimit = images.length >= MAX;
  const emptyCount = Math.max(0, MAX - images.length - (uploading ? 1 : 0));

  const fail = (msg: string) => {
    setRefusal(msg);
    setAnnounce(msg);
  };

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || atLimit) return;
    setRefusal(null);
    setUploadError(false);

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      fail("That file type isn't supported. Use a JPEG or a PNG.");
      return;
    }
    const mb = file.size / (1024 * 1024);
    if (mb > MAX_MB) {
      fail(`That file is ${mb.toFixed(1)} MB. The limit is ${MAX_MB} MB.`);
      return;
    }

    const url = URL.createObjectURL(file);
    const probe = new window.Image();
    probe.onload = () => {
      if (probe.naturalWidth < MIN_WIDTH) {
        fail(
          `That image is ${probe.naturalWidth}px wide. It needs at least ${MIN_WIDTH}px, or it'll look soft across the top of your catalog.`,
        );
        URL.revokeObjectURL(url);
        return;
      }
      const id = `cover-${Date.now()}`;
      setUploading(true);
      timer.current = setTimeout(() => {
        setUploading(false);
        setImages((prev) => [...prev, { id, url }]);
        setLiveId((prev) => prev ?? id);
      }, 1200);
    };
    probe.src = url;
  };

  const selectImage = (id: string) => {
    setLiveId(id);
    setAnnounce('Cover image updated.');
  };

  const removeImage = (id: string) => {
    if (id === liveId) {
      setConfirmId(id);
      return;
    }
    setImages((prev) => prev.filter((i) => i.id !== id));
  };

  const confirmRemove = () => {
    if (!confirmId) return;
    setImages((prev) => prev.filter((i) => i.id !== confirmId));
    if (liveId === confirmId) {
      setLiveId(null);
      setAnnounce('Cover image removed.');
    }
    setConfirmId(null);
  };

  return (
    <section className="mt-6 max-w-[720px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <div className="flex items-center gap-3">
        <h2 className="text-[15px] font-medium text-[var(--text)]">Cover image</h2>
        <span className="text-[13px] text-[var(--text-sec)]">Optional</span>
      </div>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        Shown at the top of your shared catalog. Add up to four and switch
        between them whenever you like.
      </p>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <CoverSlot
            key={img.id}
            url={img.url}
            index={i + 1}
            live={img.id === liveId}
            onUse={() => selectImage(img.id)}
            onRemove={() => removeImage(img.id)}
          />
        ))}
        {uploading && (
          <CoverSlot index={images.length + 1} live={false} uploading />
        )}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <CoverSlot
            key={`empty-${i}`}
            index={images.length + (uploading ? 1 : 0) + i + 1}
            live={false}
            onAdd={() => inputRef.current?.click()}
          />
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={onFile}
      />

      <p className="mt-3 text-[12px] text-[var(--text-sec)]">
        JPEG or PNG, up to 5 MB, at least 1600px wide. It runs the full width of
        the page, so a wide photograph of the pieces works better than a
        close-up.
      </p>
      {atLimit && (
        <p className="mt-1 text-[12px] text-[var(--text-sec)]">
          That's four. Remove one to add another.
        </p>
      )}
      {!live && (
        <p className="mt-1 text-[13px] text-[var(--text-sec)]">
          No cover image. Your catalog shows its name and piece count at the
          top.
        </p>
      )}
      {refusal && (
        <p
          role="status"
          aria-live="polite"
          className="mt-1 text-[13px] text-[var(--alert)] tabular-nums"
        >
          {refusal}
        </p>
      )}
      {uploadError && (
        <p
          role="status"
          aria-live="polite"
          className="mt-1 text-[13px] text-[var(--alert)]"
        >
          We couldn't upload that. Nothing has changed — try again.
        </p>
      )}
      <span className="sr-only" aria-live="polite">
        {announce}
      </span>

      <RemoveCoverDialog
        open={!!confirmId}
        onCancel={() => setConfirmId(null)}
        onConfirm={confirmRemove}
      />
    </section>
  );
}