interface Props {
  icon: string;
  variant: 'muted' | 'alert' | 'success';
}

export default function CancelTile({ icon, variant }: Props) {
  const cls =
    variant === 'alert'
      ? 'bg-[var(--surface)] border border-[var(--alert)] text-[var(--alert)]'
      : variant === 'success'
        ? 'bg-[var(--success-bg)] text-[var(--success)]'
        : 'bg-[var(--muted)] text-[var(--text-sec)]';
  return (
    <span className={`w-12 h-12 flex items-center justify-center rounded-full shrink-0 ${cls}`}>
      <i className={`${icon} text-[24px]`} />
    </span>
  );
}