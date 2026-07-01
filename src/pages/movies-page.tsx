import { useMemo, useState } from "react";

import PageContainer from "@/components/layout/page-container";
import MoviesList from "@/components/movies/movies-list";
import MoviesPageHeader from "@/components/movies/movies-page-header";
import MoviesSearch from "@/components/movies/movies-search";
import { movies } from "@/data/movies";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const availableMovies = movies;

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

      <MoviesList movies={filteredMovies} />
    </PageContainer>
  );
};

export default MoviesPage;
