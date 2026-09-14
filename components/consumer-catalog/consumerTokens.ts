import type { CSSProperties } from 'react';
import { varsFor } from '../settings/theme/tokens';

export function consumerTokenStyle(brandColor: string): CSSProperties {
  return {
    ...varsFor(false),
    ['--brand' as any]: brandColor,
  } as CSSProperties;
}