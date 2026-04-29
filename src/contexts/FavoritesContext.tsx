import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_FAV = "botynex-favorites";

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_FAV);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (next: string[]) => {
    setFavorites(next);
    try {
      localStorage.setItem(STORAGE_FAV, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const toggleFavorite = useCallback(
    (id: string) => {
      const exists = favorites.includes(id);
      const next = exists ? favorites.filter((x) => x !== id) : [...favorites, id];
      persist(next);
    },
    [favorites],
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) return { favorites: [], isFavorite: () => false, toggleFavorite: () => {} };
  return ctx;
}
