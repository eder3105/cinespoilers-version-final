import { create } from "zustand";

import type { Movie } from "@/types/movie";

interface CartItem {
  movie: Movie;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (movie: Movie) => void;
  removeFromCart: (movieId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (movie) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.movie.id === movie.id
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.movie.id === movie.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return { items: [...state.items, { movie, quantity: 1 }] };
    }),

  removeFromCart: (movieId) =>
    set((state) => ({
      items: state.items.filter((item) => item.movie.id !== movieId),
    })),

  clearCart: () => set({ items: [] }),

  getTotalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce(
      (total, item) => total + item.movie.price * item.quantity,
      0
    ),
}));