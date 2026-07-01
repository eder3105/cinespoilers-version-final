import { httpClient } from "./http-client";
import type { Movie } from "@/types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface TmdbGenre {
  id: number;
  name: string;
}

interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  genre_ids?: number[];
  genres?: TmdbGenre[];
}

let genreMap: Record<number, string> | null = null;

const getGenreMap = async () => {
  if (genreMap) return genreMap;

  const { data } = await httpClient.get<{ genres: TmdbGenre[] }>(
    "/genre/movie/list",
    { params: { language: "en-US" } }
  );

  genreMap = Object.fromEntries(data.genres.map((g) => [g.id, g.name]));

  return genreMap;
};

const mapToMovie = (
  tmdbMovie: TmdbMovie,
  genres: Record<number, string>
): Movie => {
  const firstGenreId =
    tmdbMovie.genre_ids?.[0] ?? tmdbMovie.genres?.[0]?.id;

  return {
    id: String(tmdbMovie.id),
    title: tmdbMovie.title,
    genre: firstGenreId ? genres[firstGenreId] ?? "Unknown" : "Unknown",
    posterUrl: tmdbMovie.poster_path
      ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}`
      : "",
    synopsis: tmdbMovie.overview,
    price: 25,
  };
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const genres = await getGenreMap();

  const { data } = await httpClient.get<{ results: TmdbMovie[] }>(
    "/movie/popular",
    { params: { language: "en-US", page: 1 } }
  );

  return data.results.map((m) => mapToMovie(m, genres));
};

export const getMovieById = async (movieId: string): Promise<Movie> => {
  const genres = await getGenreMap();

  const { data } = await httpClient.get<TmdbMovie>(`/movie/${movieId}`, {
    params: { language: "en-US" },
  });

  return mapToMovie(data, genres);
};