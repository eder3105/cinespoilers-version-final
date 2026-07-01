import { useQuery } from "@tanstack/react-query";

import { getPopularMovies } from "@/services/tmdb-service";

import MovieCard from "./movie-card";

const MoviesGrid = () => {
  const { data: movies = [], isLoading, isError } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: getPopularMovies,
  });

  return (
    <section className="py-4">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Featured Movies</h2>
        <p className="mt-2 text-muted-foreground">
          Most popular releases right now.
        </p>
      </header>

      {isLoading && (
        <p className="text-muted-foreground">Loading movies...</p>
      )}

      {isError && (
        <p className="text-destructive">
          Could not load movies. Check your API token in .env.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MoviesGrid;