import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import PageContainer from "@/components/layout/page-container";
import MoviesList from "@/components/movies/movies-list";
import MoviesPageHeader from "@/components/movies/movies-page-header";
import MoviesSearch from "@/components/movies/movies-search";
import { getPopularMovies } from "@/services/tmdb-service";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const { data: availableMovies = [], isLoading } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: getPopularMovies,
  });

  const genres = useMemo(() => {
    return Array.from(
      new Set(availableMovies.map((movie) => movie.genre)),
    ).sort();
  }, [availableMovies]);

  const filteredMovies = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return availableMovies.filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(normalizedSearchTerm);
      const matchesGenre =
        selectedGenre === "all" || movie.genre === selectedGenre;

      return matchesTitle && matchesGenre;
    });
  }, [availableMovies, searchTerm, selectedGenre]);

  return (
    <PageContainer>
      <MoviesPageHeader />

      <MoviesSearch
        genres={genres}
        resultsCount={filteredMovies.length}
        searchTerm={searchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        onSearchTermChange={setSearchTerm}
      />

      {isLoading ? (
        <p className="text-muted-foreground">Loading movies...</p>
      ) : (
        <MoviesList movies={filteredMovies} />
      )}
    </PageContainer>
  );
};

export default MoviesPage;