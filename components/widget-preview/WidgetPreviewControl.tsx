'use client';

import StateSwitcherPanel from '../ui/StateSwitcherPanel';
import type { PreviewGroup } from './data';

export default function WidgetPreviewControl({
  groups,
  isActive,
  onSelect,
}: {
  groups: PreviewGroup[];
  isActive: (value: string) => boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <StateSwitcherPanel
      title="Widget preview"
      icon="ri-window-2-line"
      hint="Switch how the embedded widget looks"
      groups={groups.map((g) => ({ label: g.group, options: g.items }))}
      active={isActive}
      onSelect={onSelect}
    />
  );
}