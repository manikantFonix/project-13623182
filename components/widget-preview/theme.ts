import type { CSSProperties } from 'react';
import type { WidgetTheme } from './types';

export const NEUTRAL_THEME: WidgetTheme = {
  source: 'neutral',
  surface: '#FFFFFF',
  text: '#16233E',
  secondaryText: '#5D6C8A',
  border: '#DCE3F0',
  primary: '#152E56',
  primaryText: '#FFFFFF',
  radius: 12,
  fontFamily: 'var(--font-archivo)',
};

export const SCRAPED_THEME: WidgetTheme = {
  source: 'scraped',
  surface: '#FDFBF7',
  text: '#241C15',
  secondaryText: '#7C6E5C',
  border: '#E7DDCE',
  primary: '#7A3E2E',
  primaryText: '#FFFFFF',
  radius: 8,
  fontFamily: 'Georgia, "Times New Roman", serif',
};

function toLinear(channel: number): number {
  const s = channel / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

export function resolveAccent(theme: WidgetTheme): {
  primary: string;
  primaryText: string;
} {
  if (contrastRatio(theme.primary, theme.primaryText) >= 4.5) {
    return { primary: theme.primary, primaryText: theme.primaryText };
  }
  return {
    primary: NEUTRAL_THEME.primary,
    primaryText: NEUTRAL_THEME.primaryText,
  };
}

export function themeStyle(theme: WidgetTheme): CSSProperties {
  const accent = resolveAccent(theme);
  return {
    '--w-primary': accent.primary,
    '--w-primary-text': accent.primaryText,
    '--w-surface': theme.surface,
    '--w-text': theme.text,
    '--w-text-sec': theme.secondaryText,
    '--w-border': theme.border,
    '--w-radius': `${theme.radius}px`,
    fontFamily: theme.fontFamily,
  } as CSSProperties;
}