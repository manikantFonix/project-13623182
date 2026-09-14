import type { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-4 md:p-5">
      {children}
    </section>
  );
}