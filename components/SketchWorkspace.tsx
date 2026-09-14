'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FOCUS_RING } from './requests/data';

interface Props {
  onClose: () => void;
  onAdd: (dataUrl: string) => void;
}

const STROKES = [2, 4, 7, 10];

const COLORS = [
  { value: '#2B7FFF', label: 'Blue' },
  { value: '#1A1A1A', label: 'Black' },
  { value: '#EF4444', label: 'Red' },
  { value: '#22C55E', label: 'Green' },
  { value: '#F59E0B', label: 'Amber' },
  { value: '#8B5CF6', label: 'Purple' },
];

export default function SketchWorkspace({ onClose, onAdd }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);

  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');
  const [width, setWidth] = useState(4);
  const [color, setColor] = useState(COLORS[0].value);
  const [has, setHas] = useState(false);

  const white = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const apply = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w === 0 || h === 0) return;
      if (w === sizeRef.current.w && h === sizeRef.current.h) return;
      const dpr = window.devicePixelRatio || 1;
      const prev = document.createElement('canvas');
      prev.width = canvas.width;
      prev.height = canvas.height;
      const pctx = prev.getContext('2d');
      if (pctx && prev.width) pctx.drawImage(canvas, 0, 0);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      white(ctx, w, h);
      if (prev.width) ctx.drawImage(prev, 0, 0, prev.width, prev.height, 0, 0, w, h);
      sizeRef.current = { w, h };
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [white]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const pos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const snapshot = () => canvasRef.current?.toDataURL() ?? '';

  const restore = (url: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const img = new Image();
    img.onload = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      white(ctx, w, h);
      ctx.drawImage(img, 0, 0, w, h);
    };
    img.src = url;
  };

  const begin = (e: React.PointerEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    undoStack.current.push(snapshot());
    if (undoStack.current.length > 40) undoStack.current.shift();
    redoStack.current = [];
    drawing.current = true;
    last.current = pos(e);
    canvas.setPointerCapture(e.pointerId);
  };

  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const p = pos(e);
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = tool === 'eraser' ? width + 8 : width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    setHas(true);
  };

  const end = () => {
    drawing.current = false;
  };

  const undo = () => {
    const prev = undoStack.current.pop();
    if (prev === undefined) return;
    redoStack.current.push(snapshot());
    restore(prev);
  };

  const redo = () => {
    const next = redoStack.current.pop();
    if (next === undefined) return;
    undoStack.current.push(snapshot());
    restore(next);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    undoStack.current.push(snapshot());
    redoStack.current = [];
    const { w, h } = sizeRef.current;
    ctx.clearRect(0, 0, w, h);
    white(ctx, w, h);
    setHas(false);
  };

  const iconBtn = (
    label: string,
    icon: string,
    onClick: () => void,
    active = false
  ) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150 ${FOCUS_RING} ${
        active
          ? 'bg-[var(--accent)]/10 text-[var(--accent-text)]'
          : 'text-[var(--text-sec)] hover:text-[var(--text)] hover:bg-[var(--muted)]'
      }`}
    >
      <i className={`${icon} text-[20px] w-5 h-5 flex items-center justify-center`} />
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--canvas)]">
      <header className="h-16 shrink-0 flex items-center gap-4 px-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="w-9 h-9 rounded-[10px] bg-[var(--accent)]/10 flex items-center justify-center">
            <i className="ri-quill-pen-line text-[19px] w-5 h-5 flex items-center justify-center text-[var(--accent-text)]" />
          </span>
          <span className="text-[15px] font-semibold text-[var(--text)] whitespace-nowrap">
            Sketch Workspace
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-3">
          <div className="flex items-center gap-0.5 p-1 rounded-full bg-[var(--muted)]">
            {iconBtn('Pencil', 'ri-pencil-line', () => setTool('pencil'), tool === 'pencil')}
            {iconBtn('Eraser', 'ri-eraser-line', () => setTool('eraser'), tool === 'eraser')}
          </div>

          <div className="flex items-center gap-0.5 p-1 rounded-full bg-[var(--muted)]" role="radiogroup" aria-label="Brush size">
            {STROKES.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={width === s}
                aria-label={`Brush ${s}`}
                onClick={() => setWidth(s)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 ${FOCUS_RING} ${
                  width === s ? 'bg-[var(--surface)] shadow-sm' : 'hover:bg-[var(--surface)]/60'
                }`}
              >
                <span
                  className="rounded-full bg-[var(--text)]"
                  style={{ width: s + 2, height: s + 2 }}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Colour">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                role="radio"
                aria-checked={color === c.value}
                aria-label={c.label}
                onClick={() => {
                  setColor(c.value);
                  setTool('pencil');
                }}
                className={`w-7 h-7 rounded-full border border-[var(--border-strong)] transition-transform duration-150 ${FOCUS_RING} ${
                  color === c.value
                    ? 'ring-2 ring-[var(--focus)] ring-offset-2 ring-offset-[var(--canvas)]'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>

          <div className="flex items-center gap-0.5 p-1 rounded-full bg-[var(--muted)]">
            {iconBtn('Undo', 'ri-arrow-go-back-line', undo)}
            {iconBtn('Redo', 'ri-arrow-go-forward-line', redo)}
            {iconBtn('Clear', 'ri-delete-bin-line', clear)}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            data-autofocus
            disabled={!has}
            onClick={() => {
              onAdd(snapshot());
              onClose();
            }}
            className={`h-9 px-4 rounded-full inline-flex items-center gap-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${FOCUS_RING} ${
              has
                ? 'bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]'
                : 'bg-[var(--muted)] text-[var(--text-sec)] cursor-not-allowed'
            }`}
          >
            <i className="ri-add-line text-[18px] w-5 h-5 flex items-center justify-center" />
            Add sketch
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sketch workspace"
            className={`w-9 h-9 flex items-center justify-center rounded-full text-[var(--text-sec)] hover:text-[var(--text)] hover:bg-[var(--muted)] transition-colors duration-150 ${FOCUS_RING}`}
          >
            <i className="ri-close-line text-[20px] w-5 h-5 flex items-center justify-center" />
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex flex-col px-5 pt-5 pb-4">
        <div className="flex-1 min-h-0 bg-[var(--surface)] border border-[var(--border)] rounded-[18px] shadow-sm overflow-hidden">
          <div ref={wrapRef} className="w-full h-full">
            <canvas
              ref={canvasRef}
              onPointerDown={begin}
              onPointerMove={move}
              onPointerUp={end}
              onPointerLeave={end}
              onPointerCancel={end}
              className="block touch-none cursor-crosshair focus:outline-none"
            />
          </div>
        </div>
        <div className="pt-3 flex items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--text-sec)]">
            You can describe it instead if that's easier.
          </p>
          <p className="text-[12px] text-[var(--text-sec)] tabular-nums">
            {has ? 'Ready to add' : 'Draw on the canvas to begin'}
          </p>
        </div>
      </div>
    </div>
  );
}