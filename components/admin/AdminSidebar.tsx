'use client';

import { adminNav } from './navData';
import AdminNavArea from './AdminNavArea';

export default function AdminSidebar() {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[272px] bg-[var(--accent)] flex flex-col">
      <div className="px-5 pt-6 pb-5 border-b border-[var(--nav-line)]">
        <img
          src="https://static.readdy.ai/image/51142f79a63ec984e1247bbe6b786694/a215e4ab0a515679431812d9851909ba.png"
          alt="CraftsmanAI"
          className="block w-[156px] h-auto"
        />
        <p className="mt-1 text-[12px] font-medium text-[var(--on-accent-soft)]">Admin console</p>
      </div>

      <nav aria-label="Admin console" className="flex-1 overflow-y-auto px-2 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex flex-col gap-3">
          {adminNav.map((area) => (
            <AdminNavArea key={area.key} area={area} />
          ))}
        </ul>
      </nav>

      <div className="px-5 py-4 border-t border-[var(--nav-line)] bg-[var(--nav-wash)]">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[var(--on-accent-muted)]">
            <i className="ri-lock-2-line text-[13px]" aria-hidden="true" />
          </span>
          <p className="text-[12px] leading-relaxed text-[var(--on-accent-muted)]">
            Every administrator has full access. There are no sub-roles.
          </p>
        </div>
      </div>
    </aside>
  );
}