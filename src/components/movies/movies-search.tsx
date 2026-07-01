import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  genres: string[];
  resultsCount: number;
  searchTerm: string;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  onSearchTermChange: (searchTerm: string) => void;
}

const MoviesSearch = ({
  genres,
  resultsCount,
  searchTerm,
  selectedGenre,
  onGenreChange,
  onSearchTermChange,
}: Props) => {
  return (
    <section
      aria-label="Movie filters"
      className="mb-8"
    >
      <div className="grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-[1fr_220px_auto] md:items-end">
        <div>
          <label
            htmlFor="movie-search"
            className="text-sm font-medium"
          >
            Search by title
          </label>

          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="movie-search"
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="Search movies"
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="movie-genre"
            className="text-sm font-medium"
          >
            Genre
          </label>

          <select
            id="movie-genre"
            value={selectedGenre}
            onChange={(event) => onGenreChange(event.target.value)}
            className="
              mt-2
              h-9
              w-full
              rounded-md
              border
              border-input
              bg-transparent
              px-3
              text-sm
              shadow-xs
              outline-none
              transition-colors
              focus-visible:border-ring
              focus-visible:ring-[3px]
              focus-visible:ring-ring/50
            "
          >
            <option value="all">
              All genres
            </option>

            {genres.map((genre) => (
              <option
                key={genre}
                value={genre}
              >
                {genre}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-muted-foreground md:pb-2">
          {resultsCount} {resultsCount === 1 ? "movie" : "movies"}
        </p>
      </div>
    </section>
  );
};

export default MoviesSearch;
