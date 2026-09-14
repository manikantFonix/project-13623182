'use client';

import { VIEW_IMAGES } from './pipeline';
import type { WidgetMetal, WidgetView } from './types';

interface Props {
  metal: WidgetMetal;
  view: WidgetView;
  alt: string;
  contain?: boolean;
  className?: string;
}

export default function ViewImage({
  metal,
  view,
  alt,
  contain,
  className,
}: Props) {
  const src = VIEW_IMAGES[metal][view];
  const fit = contain ? 'object-contain' : 'object-cover';
  return <img src={src} alt={alt} className={`${fit} ${className ?? ''}`} />;
}