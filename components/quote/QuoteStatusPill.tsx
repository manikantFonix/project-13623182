const TONES = {
  muted: { wrap: 'bg-[#F3F6FC] text-[#5D6C8A]', dot: 'bg-[#5D6C8A]' },
  success: { wrap: 'bg-[#E8F1EC] text-[#3D6B54]', dot: 'bg-[#3D6B54]' },
  alert: { wrap: 'bg-white border border-[#A8552A] text-[#A8552A]', dot: 'bg-[#A8552A]' },
} as const;

export default function QuoteStatusPill({
  label,
  tone,
}: {
  label: string;
  tone: keyof typeof TONES;
}) {
  const t = TONES[tone];
  return (
    <span
      className={`shrink-0 inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[12px] font-medium whitespace-nowrap ${t.wrap}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}