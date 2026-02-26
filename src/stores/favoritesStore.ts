import { create } from "zustand";

interface FavoritesState {
  favoriteIds: Set<string>;
  toggleFavorite: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: new Set(),
  toggleFavorite: (eventId) =>
    set((state) => {
      const next = new Set(state.favoriteIds);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return { favoriteIds: next };
    }),
  isFavorite: (eventId) => get().favoriteIds.has(eventId),
}));
