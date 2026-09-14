'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { resolveCatalog, servableProducts, type Metal } from './data';

interface SelectionContextValue {
  selected: string[];
  hydrated: boolean;
  toggle: (id: string) => void;
  clear: () => void;
  removeMany: (ids: string[]) => void;
  metalFor: (id: string) => Metal | undefined;
  setMetal: (id: string, metal: Metal) => void;
  quantityFor: (id: string) => number;
  setQuantity: (id: string, n: number) => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({
  token,
  children,
}: {
  token: string;
  children: ReactNode;
}) {
  const key = `consumer-selection:${token}`;
  const metalKey = `consumer-selection-metals:${token}`;
  const quantityKey = `consumer-selection-qty:${token}`;
  const [selected, setSelected] = useState<string[]>([]);
  const [metals, setMetals] = useState<Record<string, Metal>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(key);
      if (raw) {
        setSelected(JSON.parse(raw));
      } else {
        const catalog = resolveCatalog(token);
        const seed = catalog
          ? servableProducts(catalog)
              .slice(0, 3)
              .map((p) => p.id)
          : [];
        setSelected(seed);
        window.sessionStorage.setItem(key, JSON.stringify(seed));
      }
      const rawMetals = window.sessionStorage.getItem(metalKey);
      if (rawMetals) setMetals(JSON.parse(rawMetals));
      const rawQuantities = window.sessionStorage.getItem(quantityKey);
      if (rawQuantities) setQuantities(JSON.parse(rawQuantities));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [key, metalKey, quantityKey, token]);

  const persist = useCallback(
    (next: string[]) => {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [key],
  );

  const persistMetals = useCallback(
    (next: Record<string, Metal>) => {
      try {
        window.sessionStorage.setItem(metalKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [metalKey],
  );

  const persistQuantities = useCallback(
    (next: Record<string, number>) => {
      try {
        window.sessionStorage.setItem(quantityKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [quantityKey],
  );

  const toggle = useCallback(
    (id: string) => {
      setSelected((prev) => {
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const clear = useCallback(() => {
    setSelected([]);
    setMetals({});
    setQuantities({});
    try {
      window.sessionStorage.removeItem(key);
      window.sessionStorage.removeItem(metalKey);
      window.sessionStorage.removeItem(quantityKey);
    } catch {
      /* ignore */
    }
  }, [key, metalKey, quantityKey]);

  const removeMany = useCallback(
    (ids: string[]) => {
      setSelected((prev) => {
        const next = prev.filter((x) => !ids.includes(x));
        persist(next);
        return next;
      });
      setMetals((prev) => {
        const next = { ...prev };
        ids.forEach((id) => delete next[id]);
        persistMetals(next);
        return next;
      });
    },
    [persist, persistMetals],
  );

  const setMetal = useCallback(
    (id: string, metal: Metal) => {
      setMetals((prev) => {
        if (prev[id] === metal) return prev;
        const next = { ...prev, [id]: metal };
        persistMetals(next);
        return next;
      });
    },
    [persistMetals],
  );

  const metalFor = useCallback((id: string) => metals[id], [metals]);

  const quantityFor = useCallback((id: string) => quantities[id] ?? 1, [quantities]);

  const setQuantity = useCallback(
    (id: string, n: number) => {
      setQuantities((prev) => {
        const value = Math.max(1, n);
        if (prev[id] === value) return prev;
        const next = { ...prev, [id]: value };
        persistQuantities(next);
        return next;
      });
    },
    [persistQuantities],
  );

  const value = useMemo(
    () => ({
      selected,
      hydrated,
      toggle,
      clear,
      removeMany,
      metalFor,
      setMetal,
      quantityFor,
      setQuantity,
    }),
    [
      selected,
      hydrated,
      toggle,
      clear,
      removeMany,
      metalFor,
      setMetal,
      quantityFor,
      setQuantity,
    ],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within SelectionProvider');
  return ctx;
}