'use client';

import type { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import { adminVars } from './tokens';

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen bg-[var(--canvas)] text-[var(--text)]"
      style={{ ...adminVars, fontFamily: 'var(--font-archivo)' }}
    >
      <AdminSidebar />
      <div className="pl-[272px] min-h-screen">{children}</div>
    </div>
  );
}