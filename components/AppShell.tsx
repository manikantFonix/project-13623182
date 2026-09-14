'use client';

import { useTheme } from './settings/theme/ThemeProvider';
import { varsFor } from './settings/theme/tokens';
import Sidebar from './Sidebar';
import type { ReactNode } from 'react';

export default function AppShell({ children }: { children: ReactNode }) {
  const { dark } = useTheme();
  return (
    <div className="min-h-screen bg-[var(--canvas)]" style={varsFor(dark)}>
      <Sidebar />
      <div className="pl-[128px] min-h-screen bg-[var(--canvas)]">{children}</div>
    </div>
  );
}