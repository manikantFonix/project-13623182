'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  designNo: string;
  onDesignNoChange: (v: string) => void;
  generating: boolean;
  attachments: { id: string; name: string; thumb: string }[];
  onRemoveAttachment: (id: string) => void;
  onAttach: () => void;
  onCamera: () => void;
  onOpenSketch: () => void;
  onOpenVoice: () => void;
  generateEnabled: boolean;
  disabledReason: string | null;
  onGenerate: () => void;
}

export default function DesignDescription({
  value,
  onChange,
  designNo,
  onDesignNoChange,
  generating,
  attachments,
  onRemoveAttachment,
  onAttach,
  onCamera,
  onOpenSketch,
  onOpenVoice,
  generateEnabled,
  disabledReason,
  onGenerate,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(designNo);
  const inputRef = useRef<HTMLInputElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    const twoLines = 2 * 24.375 + 16;
    el.style.height = 'auto';
    const next = Math.min(el.scrollHeight, twoLines);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > twoLines ? 'auto' : 'hidden';
  }, [value]);

  useEffect(() => {
    setDraft(designNo);
  }, [designNo]);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const commit = () => {
    const next = draft.trim();
    if (next) onDesignNoChange(next);
    else setDraft(designNo);
    setEditing(false);
  };

  return (
    <div className="relative bg-[var(--surface)] border border-[var(--border)] rounded-[28px] overflow-hidden focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20">
      <div className="px-4 pt-3.5 pb-3 flex items-center justify-between gap-3 border-b border-[var(--canvas)]">
        <span className="text-[13px] font-medium text-[var(--text)]">Describe your design</span>
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-[var(--text-sec)]">Design number</span>
          {editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit();
                if (e.key === 'Escape') {
                  setDraft(designNo);
                  setEditing(false);
                }
              }}
              maxLength={20}
              aria-label="Design number"
              className="w-[92px] h-7 px-2 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 tabular-nums"
            />
          ) : (
            <span className="text-[13px] font-medium text-[var(--text)] tabular-nums">
              {designNo}
            </span>
          )}
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label="Rename design number"
            className="w-7 h-7 flex items-center justify-center rounded-full text-[var(--text-sec)] hover:text-[var(--text)] hover:bg-[var(--muted)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
          >
            <i className="ri-edit-line text-[18px]" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={onAttach}
          aria-label="Attach a reference"
          title="Attach"
          className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full text-[var(--text-sec)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--muted)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
        >
          <i className="ri-attachment-2 text-[20px]" />
        </button>

        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={generating}
          placeholder="Describe the piece — the stone, the metal, the setting, and anything the customer has asked for."
          rows={1}
          className="w-full min-h-[40px] py-2 text-[15px] leading-relaxed text-[var(--text)] placeholder-[var(--text-sec)] bg-transparent outline-none resize-none border-0 overflow-hidden"
        />

        <div className="shrink-0 flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Take a photo"
            title="Take a photo"
            onClick={onCamera}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--text-sec)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--muted)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
          >
            <i className="ri-camera-line text-[20px]" />
          </button>
          <button
            type="button"
            aria-label="Draw a sketch"
            title="Draw a sketch"
            onClick={onOpenSketch}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--text-sec)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--muted)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
          >
            <i className="ri-pencil-line text-[20px]" />
          </button>
          <button
            type="button"
            aria-label="Record a description"
            title="Record a description"
            onClick={onOpenVoice}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--text-sec)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--muted)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
          >
            <i className="ri-mic-line text-[20px]" />
          </button>
          <button
            type="button"
            onClick={onGenerate}
            disabled={!generateEnabled}
            className={`h-10 px-5 text-[13px] font-medium rounded-full whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${
              generateEnabled
                ? 'text-[var(--on-accent)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors duration-150'
                : 'text-[var(--text-sec)] bg-[var(--canvas)] cursor-not-allowed'
            }`}
          >
            Generate render
          </button>
        </div>
      </div>

      {attachments.length > 0 && !generating && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {attachments.map((a) => (
            <div
              key={a.id}
              className="h-8 inline-flex items-center gap-2 border border-[var(--border)] rounded-full bg-[var(--surface)] pl-1.5 pr-2"
            >
              <img src={a.thumb} alt="" className="w-5 h-5 rounded-full object-cover" />
              <span className="text-[13px] text-[var(--text)] max-w-[160px] truncate tabular-nums">
                {a.name}
              </span>
              <button
                type="button"
                aria-label={`Remove ${a.name}`}
                onClick={() => onRemoveAttachment(a.id)}
                className="w-5 h-5 flex items-center justify-center rounded-full text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
              >
                <i className="ri-close-line text-[14px]" />
              </button>
            </div>
          ))}
        </div>
      )}

      {generating && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
          <div className="h-full w-1/3 animate-[custom-progress_1.4s_ease-in-out_infinite] bg-[var(--accent)]" />
        </div>
      )}
      <style>{`@keyframes custom-progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>
    </div>
  );
}