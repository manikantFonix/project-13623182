'use client';

export default function EstimateCalculating() {
  return (
    <div className="py-12 flex flex-col items-center gap-3">
      <span
        className="w-spin w-6 h-6 rounded-full border-2 anim-spin"
        style={{
          borderColor: 'var(--w-border)',
          borderTopColor: 'var(--w-primary)',
        }}
      />
      <p className="text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
        Working out a range{'\u2026'}
      </p>
    </div>
  );
}