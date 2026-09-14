'use client';

import AppShell from '../AppShell';
import type { ReactNode } from 'react';

export default function SettingsShell({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}