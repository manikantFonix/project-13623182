import type { CSSProperties } from 'react';

export const adminVars = {
  '--canvas': '#EDF1FA',
  '--surface': '#FFFFFF',
  '--muted': '#F3F6FC',
  '--text': '#16233E',
  '--text-sec': '#5D6C8A',
  '--muted-text': '#748AB4',
  '--border': '#DCE3F0',
  '--border-strong': '#C6D0E6',
  '--success': '#3D6B54',
  '--success-bg': '#E8F1EC',
  '--alert': '#A8552A',
  '--alert-strong': '#91441E',
  '--amber-bg': '#F5EFE5',
  '--accent': '#152E56',
  '--accent-text': '#152E56',
  '--accent-hover': '#172D54',
  '--on-accent': '#FFFFFF',
  '--on-accent-soft': 'rgba(255, 255, 255, 0.80)',
  '--on-accent-muted': 'rgba(255, 255, 255, 0.62)',
  '--on-accent-faint': 'rgba(255, 255, 255, 0.45)',
  '--nav-line': 'rgba(116, 138, 180, 0.38)',
  '--nav-guide': 'rgba(116, 138, 180, 0.22)',
  '--nav-wash': 'rgba(116, 138, 180, 0.09)',
  '--focus': '#152E56',
} as CSSProperties;

export const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]';

export const focusRingOnDark =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--on-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)]';

export const cardBase = 'bg-[var(--surface)] border border-[var(--border)] rounded-[12px]';

export const num = 'tabular-nums';