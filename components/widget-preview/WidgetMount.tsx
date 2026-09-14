'use client';

import { useEffect, useRef, type ReactNode } from 'react';

let claimed = false;

export default function WidgetMount({ children }: { children: ReactNode }) {
  const owned = useRef(false);

  if (!owned.current && !claimed) {
    claimed = true;
    owned.current = true;
  }

  useEffect(() => {
    if (!owned.current) return;
    return () => {
      claimed = false;
      owned.current = false;
    };
  }, []);

  if (!owned.current) return null;

  return <>{children}</>;
}