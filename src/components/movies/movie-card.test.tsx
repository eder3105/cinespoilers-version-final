import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import MovieCard from "./movie-card";
import type { Movie } from "@/types/movie";

const mockMovie: Movie = {
  id: "1",
  title: "Test Movie",
  genre: "Action",
  posterUrl: "https://example.com/poster.jpg",
  synopsis: "A test movie synopsis.",
  price: 25,
};

describe("MovieCard", () => {
  it("renders the movie title", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("renders the movie genre", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders the 'Add to cart' button", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });
});