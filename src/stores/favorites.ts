import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: any[];
  setFavorites: (favorites: any[]) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      setFavorites: (favorites) => set({ favorites }),
    }),
    {
      name: "favorites",
      getStorage: () => localStorage,
    }
  )
);
