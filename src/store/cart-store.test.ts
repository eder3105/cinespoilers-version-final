import { beforeEach, describe, expect, it } from "vitest";

import { useCartStore } from "./cart-store";
import type { Movie } from "@/types/movie";

const mockMovie: Movie = {
  id: "1",
  title: "Test Movie",
  genre: "Action",
  posterUrl: "https://example.com/poster.jpg",
  synopsis: "A test movie synopsis.",
  price: 25,
};

describe("cart-store", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("starts empty", () => {
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("adds a movie to the cart", () => {
    useCartStore.getState().addToCart(mockMovie);

    const { items } = useCartStore.getState();

    expect(items).toHaveLength(1);
    expect(items[0].movie.title).toBe("Test Movie");
    expect(items[0].quantity).toBe(1);
  });

  it("increases quantity when adding the same movie twice", () => {
    useCartStore.getState().addToCart(mockMovie);
    useCartStore.getState().addToCart(mockMovie);

    const { items } = useCartStore.getState();

    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("removes a movie from the cart", () => {
    useCartStore.getState().addToCart(mockMovie);
    useCartStore.getState().removeFromCart(mockMovie.id);

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("calculates total price correctly", () => {
    useCartStore.getState().addToCart(mockMovie);
    useCartStore.getState().addToCart(mockMovie);

    expect(useCartStore.getState().getTotalPrice()).toBe(50);
  });
});